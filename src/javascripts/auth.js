/* global Livefyre */
"use strict";

var oCommentUtilities = require('o-comment-utilities');
var userDialogs = require('./userDialogs');
var oCommentApi = require('o-comment-api');
var utils = require('./utils.js');
var globalEvents = require('./globalEvents.js');
var resourceLoader = require('./resourceLoader.js');

/**
 * Auth creates Livefyre RemoteAuthDelegate, also provides login and logout into Livefyre.
 */
function Auth () {
	var self = this;

	/**
	 * See http://docs.livefyre.com/developers/identity-integration/#AuthDelegateObject
	 */
	var authDelegate;

	var loggedIn = false;

	/**
	 * Pseudonym is still missing.
	 * @type {Boolean}
	 */
	this.pseudonymMissing = false;

	/**
	 * Pseudonym was missing since the page was loaded and only 1 comment was posted.
	 * @type {Boolean}
	 */
	this.pseudonymWasMissing = false;


	this.authPageReload = false;

	/**
	 * See http://docs.livefyre.com/developers/identity-integration/#AuthDelegateObject
	 */
	this.getAuthDelegate = function () {
		if (!authDelegate) {
			authDelegate = {
				login: function (callback) {
					self.loginRequired(function (err, authData) {
						if (err) {
							callback(err);
							return;
						}

						if (authData && authData.token) {
							callback(null, {
								livefyre: authData.token
							});
						} else {
							callback(err);
						}
					});
				},
				logout: function (callback) {
					oCommentUtilities.logger.debug('auth delegate logout');

					loggedIn = false;
					globalEvents.trigger('auth.logout');
					oCommentApi.cache.clearAuth();
					callback();
				},
				viewProfile: function (user) {
					// not implemented
				},
				editProfile: function (user) {
					// not implemented
				}
			};
		}

		return authDelegate;
	};

	/**
	 * Tries to obtain the user's login data. Calls a callback with the resulted status,
	 * and also fires an event if the user can be logged in.
	 * @param  {Function} callback Called with two parameters: loginStatus, authData.
	 */
	this.login = function (callback) {
		if (typeof callback !== 'function') {
			callback = function () {};
		}

		resourceLoader.loadLivefyreCore(function (errResource) {
			if (errResource) {
				callback(false);
				return;
			}

			oCommentApi.api.getAuth(function (err, authData) {
				if (err) {
					callback(false);
					return;
				}

				if (authData) {
					if (authData.token) {
						Livefyre.require(['auth'], function (auth) {
							auth.authenticate({
								livefyre: authData.token
							});
							globalEvents.trigger('auth.login', authData);
							loggedIn = true;
							callback(true, authData);
						});
					} else if (authData.pseudonym === false) {
						// the user doesn't have pseudonym

						self.pseudonymMissing = true;
						self.pseudonymWasMissing = true;

						callback(false, authData);
					} else {
						callback(false, authData);
					}
				} else {
					callback(false);
				}
			});
		});
	};

	/**
	 * Logs out the user in the Livefyre system, and also clears the token from the local cache.
	 */
	this.logout = function () {
		resourceLoader.loadLivefyreCore(function (errResource) {
			if (errResource) {
				return;
			}

			Livefyre.require(['auth'], function (auth) {
				auth.logout();
			});
		});
	};


	/**
	 * Login required and pseudonym is missing
	 * @param  {Function} callback function (err, data)
	 */
	this.loginRequiredPseudonymMissing = function (callback, maintainCommentQueue) {
		oCommentUtilities.logger.log('pseudonymMissing');

		userDialogs.showSetPseudonymDialog(function (err, authData) {
			if (err) {
				utils.emptyLivefyreActionQueue();

				callback(err);
				return;
			}

			if (self.authPageReload === true && !maintainCommentQueue) {
				utils.emptyLivefyreActionQueue();
			}

			if (authData && authData.token) {
				self.login();
			}

			callback(null, authData);
		});
	};

	/**
	 * Login required, first attempt of the login process is successful.
	 * If the user is still not logged in, then fail.
	 * If the user has no pseudonym, ask for a pseudonym.
	 * @param  {Function} callback function (err, data)
	 */
	function loginRequiredAfterASuccess (callback) {
		oCommentApi.api.getAuth({
			force: true
		}, function (err, authData) {
			if (authData && authData.pseudonym === false) {
				self.loginRequiredPseudonymMissing(callback);
			} else {
				callback(err || new Error("Login failed."));
			}
		});
	}

	/**
	 * Login is required.
	 * If pseudonym is missing, ask for a pseudonym.
	 * If there is no known method to login the user, generate a `loginRequired.authAction` event that can be handled at the integration level.
	 * If successful, check if the user is logged in.
	 * @param  {Function} callback function (err, data)
	 */
	this.loginRequired = function (callback) {
		oCommentApi.api.getAuth(function (err, authData) {
			if (authData && authData.pseudonym === false) {
				self.loginRequiredPseudonymMissing(callback);
			} else if (!authData || !authData.token) {
				globalEvents.trigger('auth.loginRequired', {
					callback: function (errExt) {
						if (errExt) {
							utils.emptyLivefyreActionQueue();

							callback(errExt || new Error("Login failed."));
							return;
						}

						loginRequiredAfterASuccess(callback);
					}
				});
			} else {
				if (!loggedIn) {
					self.login();
				}

				callback(null, authData);
			}
		});
	};
}

module.exports = new Auth();
