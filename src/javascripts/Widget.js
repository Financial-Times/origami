const auth = require('./auth.js');
const envConfig = require('./config.js');
const WidgetUi = require('./WidgetUi.js');
const utils = require('./utils.js');
const oCommentUtilities = require('o-comment-utilities');
const userDialogs = require('./userDialogs.js');
const i18n = require('./i18n.js');
const globalEvents = require('./globalEvents.js');
const oCommentUi = require('o-comment-ui');
const oCommentApi = require('o-comment-api');
const resourceLoader = require('./resourceLoader.js');
const oTrackingIntegration = require('./oTrackingIntegration');

/* global Livefyre */

/**
 * Incorporates the loading of Livefyre core resources, communication with SUDS and caching,
 * Livefyre authentication, Livefyre's widget loading mechanism with the possibility to extend and modify
 * the process.
 *
 * #### Configuration:
 * ##### Mandatory fields:
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
 * @return {undefined}
 */
function Widget () {
	oCommentUi.Widget.apply(this, arguments);

	let self = this;

	if (!this.config) {
		return;
	}

	this.forceMode = false;

	this.config.stream_type = this.config.stream_type || 'livecomments';
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

	this.config.livefyre.replyShowMoreInitial = this.config.livefyre.replyShowMoreInitial ? parseInt(this.config.livefyre.replyShowMoreInitial, 10) : 3;


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
	const stringOverrides = self.config.stringOverrides ? oCommentUtilities.merge({}, i18n.lfStringOverride, self.config.stringOverrides) : i18n.lfStringOverride;
	self.config.stringOverrides = stringOverrides;

	let destroyed = false;


	if (utils.isLivefyreActionQueuePresent()) {
		oCommentUtilities.logger.log('Force flag set.');

		this.forceMode = true;
	}


	const executeWhenNotDestroyed = function (func) {
		return function () {
			if (!destroyed) {
				func.apply(this, arguments);
			}
		};
	};

	/**
	 * Loads init data from the SUDS service.
	 * @param {Function} callback function (err, data), where data is the init object
	 * @returns {undefined}
	 */
	this.loadInitData = function (callback) {
		const config = {
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
			if (initData.unclassifiedArticle !== true && initData.notAllowedToCreateCollection !== true) {
				resourceLoader.loadLivefyreCore(executeWhenNotDestroyed(function (err) {
					if (err) {
						self.trigger('error.widget', err);
						self.onError(err);

						return;
					}

					self.trigger('widget.ready');

					// extends the init data received from SUDS with some user specified fields.
					let key;
					for (key in self.config.livefyre) {
						if (self.config.livefyre.hasOwnProperty(key)) {
							initData[key] = self.config.livefyre[key];
						}
					}

					if (self.config.authPageReload === true || self.config.livefyre.authPageReload) {
						initData.authPageReload = true;
						auth.authPageReload = true;
					}

					const networkConfig = {
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
								oTrackingIntegration.trackSuccessLoad();

								widget.on('initialRenderComplete', executeWhenNotDestroyed(function () {
									const collectionAttributes = self.lfWidget.getCollection().attributes;
									// init stream to monitor banned comments
									initStreamForBannedComments(collectionAttributes.id, collectionAttributes.event);

									self.ui.addTermsAndGuidelineMessage();

									if (envConfig.get().emailNotifications !== true) {
										self.ui.hideFollowButton();
									}

									if (self.config.layout !== 'side') {
										self.ui.moveCommentCountOut();
									}

									if (envConfig.get().showEnvironment === true) {
										self.ui.showEnvironment(envConfig.get().livefyre.network);
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
													self.ui.hideTermsAndGuidelinesMessage();
												}
											}
										}
									});

									self.trigger('widget.renderComplete');
								}));

								const siteId = parseInt(initData.siteId, 10);
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

									self.trigger('tracking.postComment', {
										siteId: siteId,
										lfEventData: eventData
									});
									oTrackingIntegration.trackPost(siteId, eventData.parent);

									if (eventData.sharedToFacebook === true) {
										oTrackingIntegration.trackShare(siteId, 'facebook');
									} else if (eventData.sharedToTwitter === true) {
										oTrackingIntegration.trackShare(siteId, 'twitter');
									}
								}));

								widget.on('commentLiked', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.likeComment', {
										siteId: siteId,
										lfEventData: eventData
									});
									oTrackingIntegration.trackLike(siteId);
								}));

								widget.on('commentShared', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.shareComment', {
										siteId: siteId,
										lfEventData: eventData
									});

									if (eventData.sharedToFacebook === true) {
										oTrackingIntegration.trackShare(siteId, 'facebook');
									}

									if (eventData.sharedToTwitter === true) {
										oTrackingIntegration.trackShare(siteId, 'twitter');
									}
								}));

								widget.on('socialMention', executeWhenNotDestroyed(function (eventData) {
									self.trigger('tracking.socialMention', {
										siteId: siteId,
										lfEventData: eventData
									});
									oTrackingIntegration.trackLike(siteId, eventData.provider);
								}));
							}
						}));
					}));
				}));
			} else {
				if (initData.unclassifiedArticle === true) {
					callback({
						unclassifiedArticle: true
					});
				} else if (initData.notAllowedToCreateCollection === true) {
					callback({
						notAllowedToCreateCollection: true
					});
				}
			}
		}
	};

	this.onError = function (err) {
		self.ui.clearContainer();

		if (typeof err === 'object'&& err.unclassifiedArticle !== true && err.notAllowedToCreateCollection !== true) {
			self.ui.addNotAvailableMessage();
		}
	};

	let errorTrackSent = false;
	this.on('error.widget', function (evt) {
		const err = evt.detail.data;

		if ((err && !err.unclassifiedArticle &&!err.notAllowedToCreateCollection) || !err) {
			if (!errorTrackSent) {
				errorTrackSent = true;

				if (typeof Livefyre === 'undefined') {
					oTrackingIntegration.trackLivefyreDown();
				} else {
					oTrackingIntegration.trackSudsDown();
				}
			}
		}
	});

	this.on('error.init', function () {
		if (!errorTrackSent) {
			errorTrackSent = true;
			oTrackingIntegration.trackSudsDown();
		}
	});



	/**
	 * Adds the "Commenting settings" link when login occurs.
	 * @returns {undefined}
	 */
	function login () {
		const showSettingsDialog = function () {
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

		const showChangePseudonymDialog = function () {
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

		const showConfigDialog = executeWhenNotDestroyed(function () {
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
	 * @returns {undefined}
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
		if (eventData.comment) {
			if (eventData.comment.visibility === 2) {
				self.ui.showCommentBanned(eventData.comment.commentId);
			} else if (eventData.comment.lastVisibility === 2 || eventData.comment.deleted === true) {
				self.ui.removeCommentBanned(eventData.comment.commentId);
			}
		}
	}



	let __superDestroy = this.destroy;
	this.destroy = function () {
		destroyed = true;
		self.forceMode = null;

		if (self.lfWidget && self.lfWidget.getCollection().attributes) {
			oCommentApi.api.stream.destroy(self.lfWidget.getCollection().attributes.id, {
				callback: handleStreamEventForBannedComments
			});
		}

		self.lfWidget = null;

		globalEvents.off('auth.login', login);
		globalEvents.off('auth.logout', logout);

		__superDestroy();
		__superDestroy = null;

		self = null;
	};



	// init
	if (this.config.autoInit !== false) {
		this.init();
	}
}
oCommentUi.Widget.__extend(Widget, 'oComments', 'o-comments');

Widget.__extend = function(child, eventNamespace, classNamespace) {
	if (typeof Object.create === 'function') {
		child.prototype = Object.create(Widget.prototype);
	} else {
		const Tmp = function () {};
		Tmp.prototype = Widget.prototype;
		child.prototype = new Tmp();
		child.prototype.constructor = child;
	}

	if (eventNamespace) {
		child.prototype.eventNamespace = eventNamespace;
	}

	if (classNamespace) {
		child.prototype.classNamespace = classNamespace;
	}
};

module.exports = Widget;
