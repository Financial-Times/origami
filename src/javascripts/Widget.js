"use strict";

var auth = require('./auth.js');
var envConfig = require('./config.js'),
	WidgetUi = require('./WidgetUi.js'),
	utils = require('./utils.js'),
	oCommentUtilities = require('o-comment-utilities'),
	userDialogs = require('./userDialogs.js'),
	i18n = require('./i18n.js'),
	globalEvents = require('./globalEvents.js'),

	oCommentUi = require('o-comment-ui'),
	oCommentApi = require('o-comment-api');
var resourceLoader = require('./resourceLoader.js');

/* global Livefyre */

/**
 * Incorporates the loading of Livefyre core resources, communication with SUDS and caching,
 * Livefyre authentication, Livefyre's widget loading mechanism with the possibility to extend and modify
 * the process.
 *
 * #### Configuration:
 * ##### Mandatory fields:
 *  - elId: ID of the HTML element in which the widget should be loaded
 *  - articleId: ID of the article, any string
 *  - url: canonical URL of the page
 *  - title: Title of the page
 *
 * ##### Optional fields:
 *  - stream_type: livecomments, livechat, liveblog
 *  - livefyre: object which contains key-value pairs which should be added to the init object
 *  - stringOverrides: key-value pairs which override default LF strings
 *  - authPageReload: if authentication needs a page reload. By default it's false.
 *  - section: Override the default mapping based on URL or CAPI with an explicit mapping. Section parameter should be a valid FT metadata term (Primary section)
 *  - tags: Tags which will be added to the collection in Livefyre
 *
 * @param {object|string} rootEl Root element in which the widget should be loaded.
 * @param {object}        config Configuration object. See in the description the fields that are mandatory.
 */
function Widget () {
	oCommentUi.Widget.apply(this, arguments);

	var self = this;

	if (!this.config) {
		return;
	}

	this.forceMode = false;

	this.config.stream_type = this.config.stream_type || "livecomments";
	this.config.layout = this.config.layout || 'main';
	if (!this.config.livefyre || typeof this.config.livefyre !== 'object') {
		this.config.livefyre = {};
	}
	this.config.livefyre.editorCss = this.config.livefyre.editorCss || 'p { margin-bottom: 10px !important; }';

	/**
	 * Avatar disabled.
	 */
	this.config.livefyre.disableAvatars = typeof this.config.livefyre.disableAvatars === 'boolean' ? this.config.livefyre.disableAvatars : true;

	/**
	 * Disable HTML5 shiv by Livefyre
	 */
	this.config.livefyre.disableIE8Shim = typeof this.config.livefyre.disableIE8Shim === 'boolean' ? this.config.livefyre.disableIE8Shim : true;

	/**
	 * Disable Livefyre internal analytics
	 */
	this.config.livefyre.disableThirdPartyAnalytics = typeof this.config.livefyre.disableThirdPartyAnalytics === 'boolean' ? this.config.livefyre.disableThirdPartyAnalytics : true;


	if (this.getWidgetEl().className.indexOf('o-comments') === -1) {
		this.getWidgetEl().className += ' o-comments';
	}
	if (this.getWidgetEl().className.indexOf('o-comments--lf-overrides') === -1) {
		this.getWidgetEl().className += ' o-comments--lf-overrides';
	}
	if (this.getWidgetEl().className.indexOf('o-comments--comment-type-' + self.config.stream_type) === -1) {
		this.getWidgetEl().className += ' o-comments--comment-type-' + self.config.stream_type;
	}
	if (this.config.layout) {
		this.getWidgetEl().className += ' o-comments--comment-layout-' + this.config.layout;
	}
	this.getWidgetEl().setAttribute('data-o-comments-built', 'true');

	this.config.stringOverrides = this.config.stringOverrides || {};

	this.ui = new WidgetUi(this.getWidgetEl(), {
		layout: this.config.layout,
		stream_type: this.config.stream_type
	});

	/**
	 * Merge custom string overrides with FT specific string overrides.
	 * @type {Object}
	 */
	var stringOverrides = self.config.stringOverrides ? oCommentUtilities.merge({}, i18n.lfStringOverride, self.config.stringOverrides) : i18n.lfStringOverride;
	self.config.stringOverrides = stringOverrides;

	var lastBannedCommentId = null;
	var lastBannedCommentDate = null;
	var lastOwnCommentDate = null;
	var destroyed = false;


	if (utils.isLivefyreActionQueuePresent()) {
		oCommentUtilities.logger.log("Force flag set.");

		this.forceMode = true;
	}


	var executeWhenNotDestroyed = function (func) {
		return function () {
			if (!destroyed) {
				func.apply(this, arguments);
			}
		};
	};

	/**
	 * Loads init data from the SUDS service.
	 */
	this.loadInitData = function (callback) {
		var config = {
			title: self.config.title,
			url: self.config.url,
			articleId: self.config.articleId,
			elId: self.config.elId,
			stream_type: self.config.stream_type
		};
		if (typeof self.config.section !== 'undefined') {
			config.section = self.config.section;
		}
		if (typeof self.config.tags !== 'undefined') {
			config.tags = self.config.tags;
		}

		oCommentApi.api.getLivefyreInitConfig(config, executeWhenNotDestroyed(function (err, initData) {
			if (err) {
				callback(err);
				return;
			}

			callback(null, initData);
		}));
	};

	this.render = function (initData, callback) {
		if (initData && !destroyed) {
			if (initData.unclassifiedArticle !== true) {
				resourceLoader.loadLivefyreCore(executeWhenNotDestroyed(function (err) {
					if (err) {
						self.trigger('error.widget', err);
						self.onError(err);



						return;
					}

					self.trigger('widget.ready');

					// extends the init data received from SUDS with some user specified fields.
					var key;
					for (key in self.config.livefyre) {
						if (self.config.livefyre.hasOwnProperty(key)) {
							initData[key] = self.config.livefyre[key];
						}
					}

					if (self.config.authPageReload === true || self.config.livefyre.authPageReload) {
						initData.authPageReload = true;
						auth.authPageReload = true;
					}

					var networkConfig = {
						network: envConfig.get().livefyre.network
					};
					if (self.config.stringOverrides) {
						networkConfig.strings = self.config.stringOverrides;
					}

					Livefyre.require(['fyre.conv#3', 'auth'], executeWhenNotDestroyed(function (Conv, lfAuth) {
						lfAuth.delegate(auth.getAuthDelegate());

						self.ui.clearContainer();

						oCommentUtilities.logger.debug('initData passed to Livefyre', initData);

						new Conv(networkConfig, [initData], executeWhenNotDestroyed(function (widget) {
							if (widget) {
								callback();

								self.lfWidget = widget;
								self.trigger('widget.load', {
									lfWidget: widget
								});

								widget.on('initialRenderComplete', executeWhenNotDestroyed(function () {
									var collectionAttributes = self.lfWidget.getCollection().attributes;
									// init stream to monitor banned comments
									initStreamForBannedComments(collectionAttributes.id, collectionAttributes.event);

									if (envConfig.get().emailNotifications !== true) {
										self.ui.hideFollowButton();
									}
									self.ui.addTermsAndGuidelineMessage();

									if (self.config.layout !== 'side') {
										self.ui.moveCommentCountOut();
									}

									auth.login(function (loggedIn, authData) {
										if (!authData) {
											authData = null;
										}

										self.trigger('data.auth', authData);

										if (loggedIn) {
											if (self.forceMode === true) {
												setTimeout(self.ui.scrollToWidget, 2000);
											}
										} else {
											auth.logout();
											if (authData) {
												if (authData.pseudonym === false) {
													if (self.forceMode === true) {
														auth.loginRequiredPseudonymMissing(null, true);
													}

													self.ui.hideSignInLink();
												} else if (authData.serviceUp === false) {
													self.ui.makeReadOnly();
													self.ui.hideSignInLink();
													self.ui.addAuthNotAvailableMessage();
												}
											}
										}
									});

									self.trigger('widget.renderComplete');
								}));

								var siteId = parseInt(initData.siteId, 10);
								widget.on('commentPosted', executeWhenNotDestroyed(function (eventData) {
									if (!auth.pseudonymWasMissing) {
										oCommentApi.api.getAuth(function (err, authData) {
											if (err) {
												authData = null;
												return;
											}

											if (self.config.emailAlert !== false && envConfig.get().emailNotifications === true) {
												if (authData && typeof authData === 'object') {
													if (authData.token && !authData.settings) {
														userDialogs.showEmailAlertDialog();
													}
												}
											}
										});
									} else {
										auth.pseudonymWasMissing = false;
									}

									handleNewCommentForBannedComments();

									self.trigger('tracking.postComment', {
										siteId: siteId,
										lfEventData: eventData
									});
								}));

								widget.on('commentLiked', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.likeComment', {
										siteId: siteId,
										lfEventData: eventData
									});
								}));

								widget.on('commentShared', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.shareComment', {
										siteId: siteId,
										lfEventData: eventData
									});
								}));

								widget.on('socialMention', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.socialMention', {
										siteId: siteId,
										lfEventData: eventData
									});
								}));
							}
						}));
					}));
				}));
			} else {
				callback({
					unclassifiedArticle: true
				});
			}
		}
	};

	this.onError = function (err) {
		self.ui.clearContainer();

		if (typeof err !== 'object' || !err || err.unclassifiedArticle !== true) {
			self.ui.addNotAvailableMessage();
		}
	};



	/**
	 * Adds the "Commenting settings" link when login occurs.
	 */
	function login () {
		var showSettingsDialog = function () {
			oCommentApi.api.getAuth(function (err, currentAuthData) {
				if (!err && currentAuthData) {
					userDialogs.showSettingsDialog(currentAuthData, function (err, newAuthData) {
						if (err) {
							return;
						}

						if (newAuthData && newAuthData.token) {
							oCommentUtilities.logger.debug('new settings', newAuthData);
						}
					});
				}
			});
		};

		var showChangePseudonymDialog = function () {
			oCommentApi.api.getAuth(function (err, currentAuthData) {
				if (!err && currentAuthData) {
					userDialogs.showChangePseudonymDialog(currentAuthData.displayName, function (err, newAuthData) {
						if (err) {
							return;
						}

						if (newAuthData && newAuthData.token) {
							oCommentUtilities.logger.debug('new settings', newAuthData);
						}
					});
				}
			});
		};

		var showConfigDialog = executeWhenNotDestroyed(function () {
			if (envConfig.get().emailNotifications !== true) {
				showChangePseudonymDialog();
			} else {
				showSettingsDialog();
			}
		});

		self.ui.addSettingsLink({
			onClick: function () {
				auth.loginRequired(function (err) {
					if (err) {
						return;
					}

					showConfigDialog();
				});
			}
		});
	}
	globalEvents.on('auth.login', login);

	/**
	 * Removes the "Commenting settings" link when logout occurs.
	 */
	function logout () {
		self.ui.removeSettingsLink();
	}
	globalEvents.on('auth.logout', logout);


	function initStreamForBannedComments (collectionId, lastEventId) {
		oCommentApi.api.stream.create(collectionId, {
			lastEventId: lastEventId,
			callback: handleStreamEventForBannedComments
		});
	}

	function handleStreamEventForBannedComments (eventData) {
		if (eventData.comment && eventData.comment.visibility === 2 && !eventData.comment.updated) {
			lastBannedCommentDate = new Date();
			lastBannedCommentId = eventData.comment.commentId;
			checkIfOwnCommentIsBanned();
		}
	}

	function handleNewCommentForBannedComments () {
		lastOwnCommentDate = new Date();
		checkIfOwnCommentIsBanned();
	}

	function checkIfOwnCommentIsBanned () {
		if (lastBannedCommentDate && lastOwnCommentDate) {
			if (lastBannedCommentDate.getTime() - lastOwnCommentDate.getTime() <= 1000) {
				self.ui.showOwnCommentBanned(lastBannedCommentId);

				lastOwnCommentDate = null;
				lastBannedCommentDate = null;
				lastBannedCommentId = null;
			}
		}
	}



	var __superDestroy = this.destroy;
	this.destroy = function () {
		destroyed = true;
		self.forceMode = null;

		if (self.lfWidget && self.lfWidget.getCollection().attributes) {
			oCommentApi.api.stream.destroy(self.lfWidget.getCollection().attributes.id, {
				callback: handleStreamEventForBannedComments
			});
		}

		self.lfWidget = null;

		lastOwnCommentDate = null;
		lastBannedCommentDate = null;
		lastBannedCommentId = null;

		globalEvents.off('auth.login', login);
		globalEvents.off('auth.logout', logout);

		__superDestroy();
		__superDestroy = null;

		self = null;
	};



	// init
	if (this.config.autoInit !== false) {
		this.init.call(this);
	}
}
oCommentUi.Widget.__extend(Widget, 'oComments', 'o-comments');

Widget.__extend = function(child, eventNamespace, classNamespace) {
	if (typeof Object.create === 'function') {
		child.prototype = Object.create(Widget.prototype);
	} else {
		var Tmp = function () {};
		Tmp.prototype = Widget.prototype;
		child.prototype = new Tmp();
		child.prototype.constructor = child;
	}

	if (eventNamespace) {
		child.prototype.eventNamespace = eventNamespace;
		child.prototype.classNamespace = classNamespace;
	}
};

module.exports = Widget;
