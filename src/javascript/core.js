/*global module, require */

const Send = require("./core/send");
const User = require("./core/user");
const Session = require("./core/session");

/**
 * Shared 'internal' scope.
 *
 * @type {Object}
 */
const settings = require("./core/settings");
const utils = require("./utils");

/**
 * Default properties for sending a tracking request.
 *
 * @type {Object}
 */
const defaultConfig = function () {
	return {
		async: true,
		callback: function () {},
		system: {},
		context: {},
		user: {
			passport_id: utils.getValueFromCookie(/USERID=([0-9]+):/) || utils.getValueFromCookie(/PID=([0-9]+)\_/),
			ft_session: utils.getValueFromCookie(/FTSession=([^;]+)/)
		}
	};
};

/**
 * Generate and store a new rootID.
 *
 * @param {string} new_id - Optional rootID, if you want to use your own. Otherwise we'll create one for you.
 *
 * @return {string|*} The rootID.
 */
function rootID(new_id) {
	settings.set('root_id', requestID(new_id));
	return settings.get('root_id');
}

/**
 * Create a requestID (unique identifier) for the page impression.
 *
 * @param {string} request_id - Optional RequestID, if you want to use your own. Otherwise will create one for you.
 *
 * @return {string|*} The RequestID.
 */
function requestID(request_id) {
	if (utils.isUndefined(request_id)) {
		request_id = utils.guid();
	}

	return request_id;
}

/**
 * Make a tracking request.
 *
 * @param {Object} config - Should be passed an object containing a format and the values for that format
 * @param {function} callback - Fired when the request has been made.
 *
 * @return {Object} request
 */
function track(config, callback) {
	if (utils.isUndefined(callback)) {
		callback = function () {};
	}

	const coreContext = settings.get('config') && settings.get('config').context || {};
	config.context = utils.merge(coreContext, config.context);

	let request = utils.merge(defaultConfig(), utils.merge(config, { callback: callback }));

	/* Values here are kinda the mandatory ones, so we want to make sure they're possible. */
	request = utils.merge({
		context: {
			id: requestID(request.id), // Keep an ID if it's been set elsewhere.
			root_id: settings.get('root_id')
		},

		user: settings.get('config') ? settings.get('config').user : {},

		device: {
			spoor_session: Session.session(),
			spoor_id: User.userID(),
			user_agent: window.navigator.userAgent
		}
	}, request);

	utils.log('Core.Track', request);

	// Send it.
	Send.addAndRun(request);

	return request;
}

module.exports = {
	setRootID: rootID,
	getRootID: function () { return settings.get('root_id'); },
	track: track
};
