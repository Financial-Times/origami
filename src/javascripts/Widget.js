"use strict";

var auth = require('./auth.js'),
	envConfig = require('./config.js'),
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
 *  - initExtension: object which contains key-value pairs which should be added to the init object
 *  - stringOverrides: key-value pairs which override default LF strings
 *  - authPageReload: if authentication needs a page reload. By default it's false.
 *
 * @param {object} config Configuration object. See in the description the fields that are mandatory.
 */
function Widget () {
	oCommentUi.Widget.apply(this, arguments);

	var self = this;

	this.ui = new WidgetUi(this.getWidgetEl());

	this.forceMode = false;



	this.config.stream_type = this.config.stream_type || "livecomments";
	if (!this.config.initExtension || typeof this.config.initExtension !== 'object') {
		this.config.initExtension = {};
	}
	this.config.initExtension.editorCss = 'p { margin-bottom: 10px !important; }';
	/**
	 * Avatar disabled.
	 */
	this.config.initExtension.disableAvatars = true;

	if (this.getWidgetEl().className.indexOf('o-comments') === -1) {
		this.getWidgetEl().className += ' o-comments';
	}
	if (this.getWidgetEl().className.indexOf('o-comments--lf-overrides') === -1) {
		this.getWidgetEl().className += ' o-comments--lf-overrides';
	}
	if (this.getWidgetEl().className.indexOf('o-comments--comment-type-' + self.config.stream_type) === -1) {
		this.getWidgetEl().className += ' o-comments--comment-type-' + self.config.stream_type;
	}

	/**
	 * Merge custom string overrides with FT specific string overrides.
	 * @type {Object}
	 */
	var stringOverrides = self.config.stringOverrides ? oCommentUtilities.merge({}, i18n.lfStringOverride, self.config.stringOverrides) : i18n.lfStringOverride;
	self.config.stringOverrides = stringOverrides;


	if (utils.isLivefyreActionQueuePresent()) {
		oCommentUtilities.logger.log("Force flag set.");

		this.forceMode = true;
	}

	/**
	 * Loads the necessary resources - suds data and Livefyre JS core library
	 * @param  {object} callbacks
	 */
	this.loadResources = function (callback) {
		resourceLoader.loadLivefyreCore(function (err) {
			if (err) {
				callback(err);
				return;
			}

			callback();
		});
	};

	this.init = function (callback) {
		oCommentApi.api.getLivefyreInitConfig(self.config, function (err, initData) {
			if (err) {
				callback(err);
				return;
			}

			callback(null, initData);
		});
	};

	this.render = function (initData, callback) {
		if (initData) {
			if (initData.unclassifiedArticle !== true) {
				self.trigger('widget.ready');

				// extends the init data received from SUDS with some user specified fields.
				var key;
				for (key in self.config.initExtension) {
					if (self.config.initExtension.hasOwnProperty(key)) {
						initData[key] = self.config.initExtension[key];
					}
				}

				if (self.config.authPageReload === true) {
					initData.authPageReload = true;

					auth.authPageReload = true;
				}

				var networkConfig = {
					network: envConfig.get().livefyre.network
				};
				if (self.config.stringOverrides) {
					networkConfig.strings = self.config.stringOverrides;
				}

				var documentCreateElementBackup = document.createElement;


				Livefyre.require(['fyre.conv#3', 'auth'], function (Conv, lfAuth) {
					lfAuth.delegate(auth.getAuthDelegate());

					self.ui.clearContainer();

					new Conv(networkConfig, [initData], function (widget) {
						if (widget) {
							if (envConfig.get().emailNotifications !== true) {
								self.ui.hideFollowButton();
							}

							if (document.createElement !== documentCreateElementBackup) {
								document.createElement = documentCreateElementBackup;
							}

							callback();

							self.lfWidget = widget;
							self.trigger('widget.load', {
								lfWidget: widget
							});

							widget.on('initialRenderComplete', function () {
								self.ui.addTermsAndGuidelineMessage();

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
							});

							var siteId = parseInt(initData.siteId, 10);
							widget.on('commentPosted', function (eventData) {
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
							});

							widget.on('commentLiked', function (eventData) {
								self.trigger('tracking.likeComment', {
									siteId: siteId,
									lfEventData: eventData
								});
							});

							widget.on('commentShared', function (eventData) {
								self.trigger('tracking.shareComment', {
									siteId: siteId,
									lfEventData: eventData
								});
							});

							widget.on('socialMention', function (eventData) {
								self.trigger('tracking.socialMention', {
									siteId: siteId,
									lfEventData: eventData
								});
							});
						}
					});
				});
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
							auth.logout();
							oCommentUtilities.logger.debug('new settings', newAuthData);
							auth.login();
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
							auth.logout();
							oCommentUtilities.logger.debug('new settings', newAuthData);
							auth.login();
						}
					});
				}
			});
		};

		var showConfigDialog = function () {
			if (envConfig.get().emailNotifications !== true) {
				showChangePseudonymDialog();
			} else {
				showSettingsDialog();
			}
		};

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



	var __superDestroy = this.destroy;
	this.destroy = function () {
		self.forceMode = null;

		globalEvents.off('auth.login', login);
		globalEvents.off('auth.logout', logout);

		__superDestroy();
		__superDestroy = null;

		self = null;
	};
}
oCommentUi.Widget.__extend(Widget, 'oComments');

Widget.__extend = function(child, eventNamespace) {
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
	}
};

module.exports = Widget;
