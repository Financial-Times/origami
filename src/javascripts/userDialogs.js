const oCommentUi = require('o-comment-ui');
const oCommentApi = require('o-comment-api');
const utils = require('./utils.js');
const auth = require('./auth.js');
const globalEvents = require('./globalEvents.js');

const emailSubscribeOptions = ['immediately', 'hourly', 'on'];
const emailUnsubscribeOptions = ['never', 'off'];

function inArray (array, item) {
	if (Array.prototype.indexOf) {
		return array.indexOf(item) !== -1 ? true : false;
	} else {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === item) {
				return true;
			}
		}
		return false;
	}
}

function isSubscribed (option) {
	return inArray(emailSubscribeOptions, option);
}

function isUnsubscribed (option) {
	return inArray(emailUnsubscribeOptions, option);
}


function getModifiedSubscribesUnsubscribes (currentSettings, newSettings) {
	const subscribes = [];
	const unsubscribes = [];

	if (currentSettings.emailcomments !== newSettings.emailcomments) {
		if ((isUnsubscribed(currentSettings.emailcomments) || !currentSettings.emailcomments) && isSubscribed(newSettings.emailcomments)) {
			subscribes.push('emailcomments');
		}
		if (isSubscribed(currentSettings.emailcomments) && isUnsubscribed(newSettings.emailcomments)) {
			unsubscribes.push('emailcomments');
		}
	}

	if (currentSettings.emailreplies !== newSettings.emailreplies) {
		if ((isUnsubscribed(currentSettings.emailreplies) || !currentSettings.emailreplies) && isSubscribed(newSettings.emailreplies)) {
			subscribes.push('emailreplies');
		}
		if (isSubscribed(currentSettings.emailreplies) && isUnsubscribed(newSettings.emailreplies)) {
			unsubscribes.push('emailreplies');
		}
	}

	if (currentSettings.emaillikes !== newSettings.emaillikes) {
		if ((isUnsubscribed(currentSettings.emaillikes) || !currentSettings.emaillikes) && isSubscribed(newSettings.emaillikes)) {
			subscribes.push('emaillikes');
		}
		if (isSubscribed(currentSettings.emaillikes) && isUnsubscribed(newSettings.emaillikes)) {
			unsubscribes.push('emaillikes');
		}
	}

	if (currentSettings.emailautofollow !== newSettings.emailautofollow) {
		if ((isUnsubscribed(currentSettings.emailautofollow) || !currentSettings.emailautofollow) && isSubscribed(newSettings.emailautofollow)) {
			subscribes.push('emailautofollow');
		}
		if (isSubscribed(currentSettings.emailautofollow) && isUnsubscribed(newSettings.emailautofollow)) {
			unsubscribes.push('emailautofollow');
		}
	}


	return {
		subscribes: subscribes,
		unsubscribes: unsubscribes
	};
}

function getNewSubscribes (newSettings) {
	const subscribes = [];

	if (isSubscribed(newSettings.emailcomments)) {
		subscribes.push('emailcomments');
	}
	if (isSubscribed(newSettings.emailreplies)) {
		subscribes.push('emailreplies');
	}
	if (isSubscribed(newSettings.emaillikes)) {
		subscribes.push('emaillikes');
	}
	if (isSubscribed(newSettings.emailautofollow)) {
		subscribes.push('emailautofollow');
	}


	return {
		subscribes: subscribes
	};
}


exports.showSetPseudonymDialog = function (callback) {
	callback = callback || function () {};

	oCommentUi.userDialogs.showSetPseudonymDialog({
		submit: function (formData, responseCallback) {
			if (formData && formData.pseudonym) {
				oCommentApi.api.updateUser({
					pseudonym: formData.pseudonym
				}, function (err) {
					if (err) {
						if (typeof err === 'object' && err.sudsError) {
							if (oCommentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
								responseCallback(oCommentUi.i18n.serviceMessageOverrides[err.error]);
							} else {
								responseCallback(err.error);
							}
						} else {
							responseCallback(oCommentUi.i18n.texts.changePseudonymError);
						}

						return;
					}


					oCommentApi.api.getAuth({
						force: true
					}, function (err, authData) {
						if (err) {
							responseCallback(oCommentUi.i18n.texts.changePseudonymError);
							callback(err);
							return;
						}

						callback(null, authData);
						responseCallback();
					});
				});
			} else {
				responseCallback(oCommentUi.i18n.texts.changePseudonymBlankError);
			}
		},
		close: function () {
			callback(new Error('Closed or cancelled.'));
			utils.emptyLivefyreActionQueue();
		}
	});
};


/**
 * Settings dialog where the user can change its pseudonym or email preferences.
 * @param  {Object} currentPseudonym Required. Current pseudonym of the user.
 * @param  {Function} callback Optional. function (err, data), where data is the new authentication data.
 * @returns {undefined}
 */
exports.showChangePseudonymDialog = function (currentPseudonym, callback) {
	callback = callback || function () {};

	oCommentUi.userDialogs.showChangePseudonymDialog(currentPseudonym, {
		submit: function (formData, responseCallback) {
			if (formData) {
				oCommentApi.api.updateUser(formData, function (err) {
					if (err) {
						if (typeof err === 'object' && err.sudsError) {
							if (oCommentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
								responseCallback(oCommentUi.i18n.serviceMessageOverrides[err.error]);
							} else {
								responseCallback(err.error);
							}
						} else {
							responseCallback(oCommentUi.i18n.texts.genericError);
						}

						return;
					}

					auth.logout();

					oCommentApi.api.getAuth({
						force: true
					}, function (err, authData) {
						if (err) {
							callback(err);
							responseCallback(oCommentUi.i18n.texts.genericError);
							return;
						}

						auth.login();

						callback(null, authData);
						responseCallback();
					});
				});
			} else {
				responseCallback(oCommentUi.i18n.texts.genericError);
			}
		},
		close: function () {
			callback(new Error('Closed or cancelled.'));
		}
	});
};

exports.showEmailAlertDialog = function () {
	oCommentUi.userDialogs.showEmailAlertDialog({
		submit: function (formData, responseCallback) {
			if (formData) {
				oCommentApi.api.updateUser(formData, function (err) {
					if (err) {
						if (typeof err === 'object' && err.sudsError) {
							if (oCommentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
								responseCallback(oCommentUi.i18n.serviceMessageOverrides[err.error]);
							} else {
								responseCallback(err.error);
							}
						} else {
							responseCallback(oCommentUi.i18n.texts.genericError);
						}

						return;
					}

					auth.logout();

					oCommentApi.api.getAuth({
						force: true
					}, function (err, newUserDetails) {
						if (err) {
							responseCallback(oCommentUi.i18n.texts.genericError);
							return;
						}

						auth.login();

						// success
						responseCallback();

						// get new subscribes
						// as this is the initial setup, there cannot be considered any unsubscribe
						let result;
						result = getNewSubscribes(newUserDetails.settings);

						if (result.subscribes.length) {
							globalEvents.trigger('tracking.subscribe', result.subscribes);
						}
					});
				});
			} else {
				responseCallback(oCommentUi.i18n.texts.genericError);
			}
		}
	});
};

exports.showSettingsDialog = function (currentUserDetails, callback) {
	callback = callback || function () {};

	oCommentUi.userDialogs.showSettingsDialog(currentUserDetails, {
		submit: function (formData, responseCallback) {
			if (formData) {
				oCommentApi.api.updateUser(formData, function (err) {
					if (err) {
						if (typeof err === 'object' && err.sudsError) {
							if (oCommentUi.i18n.serviceMessageOverrides.hasOwnProperty(err.error)) {
								responseCallback(oCommentUi.i18n.serviceMessageOverrides[err.error]);
							} else {
								responseCallback(err.error);
							}
						} else {
							responseCallback(oCommentUi.i18n.texts.genericError);
						}

						return;
					}

					auth.logout();

					oCommentApi.api.getAuth({
						force: true
					}, function (err, newUserDetails) {
						if (err) {
							callback(err);
							responseCallback(oCommentUi.i18n.texts.genericError);
							return;
						}

						auth.login();

						callback(null, newUserDetails);
						responseCallback();

						// get subscribes and unsubscribes
						let result;
						if (currentUserDetails.settings) {
							result = getModifiedSubscribesUnsubscribes(currentUserDetails.settings, newUserDetails.settings);
						} else {
							result = getNewSubscribes(newUserDetails.settings);
							result.unsubscribes = [];
						}


						if (result.subscribes.length) {
							globalEvents.trigger('tracking.subscribe', result.subscribes);
						}

						if (result.unsubscribes.length) {
							globalEvents.trigger('tracking.unsubscribe', result.unsubscribes);
						}
					});
				});
			} else {
				responseCallback(oCommentUi.i18n.texts.genericError);
			}
		},
		close: function () {
			callback(new Error('Closed or cancelled.'));
		}
	});
};


exports.showInactivityMessage = oCommentUi.userDialogs.showInactivityMessage;
