/* global Livefyre */
"use strict";

var oCommentUtilities = require('o-comment-utilities');
var userDialogs = require('./userDialogs');
var oCommentApi = require('o-comment-api');
var utils = require('./utils.js');
var globalEvents = require('./globalEvents.js');
var resourceLoader = require('./resourceLoader.js');


/**
 * See http://docs.livefyre.com/developers/identity-integration/#AuthDelegateObject
 */
var authDelegate;


var sessionStorageKey = 'o-comments-auth-last-token';


var loggedIn = false;

/**
 * Pseudonym is still missing.
 * @type {Boolean}
 */
exports.pseudonymMissing = false;

/**
 * Pseudonym was missing since the page was loaded and only 1 comment was posted.
 * @type {Boolean}
 */
exports.pseudonymWasMissing = false;


exports.authPageReload = false;


function isTokenTheSameOrNew (token) {
	if (!oCommentUtilities.storageWrapper.sessionStorage.hasItem(sessionStorageKey)) {
		return true;
	}

	if (oCommentUtilities.storageWrapper.sessionStorage.getItem(sessionStorageKey) === token) {
		return true;
	}

	return false;
}

function cacheLastToken (token) {
	oCommentUtilities.storageWrapper.sessionStorage.setItem(sessionStorageKey, token);
}

function clearLastToken () {
	oCommentUtilities.storageWrapper.sessionStorage.removeItem(sessionStorageKey);
}

/**
 * See http://docs.livefyre.com/developers/identity-integration/#AuthDelegateObject
 */
exports.getAuthDelegate = function () {
	if (!authDelegate) {
		authDelegate = {
			login: function (callback) {
				exports.loginRequired(function (err, authData) {
					if (err) {
						callback(err);
						return;
					}

					if (authData && authData.token) {
						if (!isTokenTheSameOrNew(authData.token)) {
							exports.logout(function () {
								callback(null, {
									livefyre: authData.token
								});
								cacheLastToken(authData.token);
							});
						} else {
							callback(null, {
								livefyre: authData.token
							});
						}
					} else {
						callback(err);
					}
				});
			},
			logout: function (callback) {
				oCommentUtilities.logger.debug('auth delegate logout');

				globalEvents.trigger('auth.logout');
				clearLastToken();
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
exports.login = function (callback) {
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
						if (!isTokenTheSameOrNew(authData.token)) {
							auth.logout();
						}

						auth.authenticate({
							livefyre: authData.token
						});
						cacheLastToken(authData.token);

						loggedIn = true;

						globalEvents.trigger('auth.login', authData);
						callback(true, authData);
					});
				} else if (authData.pseudonym === false) {
					// the user doesn't have pseudonym

					exports.pseudonymMissing = true;
					exports.pseudonymWasMissing = true;

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
exports.logout = function (callback) {
	resourceLoader.loadLivefyreCore(function (errResource) {
		if (errResource) {
			return;
		}

		Livefyre.require(['auth'], function (auth) {
			auth.logout();

			if (typeof callback === 'function') {
				callback();
			}
		});
	});
};


/**
 * Login required and pseudonym is missing
 * @param  {Function} callback function (err, data)
 */
exports.loginRequiredPseudonymMissing = function (callback, maintainCommentQueue) {
	if (typeof callback !== 'function') {
		callback = function () {};
	}

	oCommentUtilities.logger.log('pseudonymMissing');

	userDialogs.showSetPseudonymDialog(function (err, authData) {
		if (err) {
			utils.emptyLivefyreActionQueue();

			callback(err);
			return;
		}

		if (exports.authPageReload === true && !maintainCommentQueue) {
			utils.emptyLivefyreActionQueue();
		}

		if (authData && authData.token) {
			exports.login();
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
	if (typeof callback !== 'function') {
		callback = function () {};
	}

	oCommentApi.api.getAuth({
		force: true
	}, function (err, authData) {
		if (authData && authData.pseudonym === false) {
			exports.loginRequiredPseudonymMissing(callback);
		} else {
			callback(err || new Error("Login failed."));
		}
	});
}


exports.loginRequiredDefaultBehavior = function (evt) {
	window.location.href = 'https://registration.ft.com/registration/barrier/login?location='+ encodeURIComponent(document.location.href);
};

var loginRequiredDefaultBehaviorWrapper = function (evt) {
	exports.loginRequiredDefaultBehavior(evt.detail.callback);
};
exports.setLoginRequiredDefaultBehavior = function () {
	// add event handler as lowest priority
	globalEvents.off('auth.loginRequired', loginRequiredDefaultBehaviorWrapper);
	globalEvents.on('auth.loginRequired', loginRequiredDefaultBehaviorWrapper);
};

/**
 * Login is required.
 * If pseudonym is missing, ask for a pseudonym.
 * If there is no known method to login the user, generate a `loginRequired.authAction` event that can be handled at the integration level.
 * If successful, check if the user is logged in.
 * @param  {Function} callback function (err, data)
 */
exports.loginRequired = function (callback) {
	if (typeof callback !== 'function') {
		callback = function () {};
	}

	oCommentApi.api.getAuth(function (err, authData) {
		if (authData && authData.pseudonym === false) {
			exports.loginRequiredPseudonymMissing(callback);
		} else if (!authData || !authData.token) {
			if (!oCommentUtilities.ftUser.isLoggedIn()) {
				oCommentUtilities.logger.log('user should log in');

				exports.setLoginRequiredDefaultBehavior();

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
				oCommentUtilities.logger.log('session expired, show inactivity message');

				userDialogs.showInactivityMessage({
					submit: function () {
						window.location.href = 'https://registration.ft.com/registration/barrier/login?location='+ encodeURIComponent(document.location.href);
					},
					close: function () {
						utils.emptyLivefyreActionQueue();
						callback(new Error("Login failed."));
					}
				});
			}
		} else {
			if (!loggedIn) {
				exports.login();
			}

			callback(null, authData);
		}
	});
};
