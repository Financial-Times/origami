import Send from './core/send.js';

import User from './core/user.js';
import Session from './core/session.js';
import settings from './core/settings.js';
import utils from './utils.js';

let rootID;

/**
 * Generate and store a new rootID, used to mark a new root event that
 * subsequent events will be linked to.
 *
 * @returns {string|*} The rootID.
 */
function setRootID() {
	rootID = utils.guid();
	return rootID;
}

/**
 * Get the current rootID.
 *
 * @returns {string|*} The rootID.
 */
function getRootID() {
	if (!rootID) {
		setRootID();
	}

	return rootID;
}

/**
 * Make a tracking request.
 *
 * @param {object} config - Should be passed an object containing a format and the values for that format
 * @param {Function} [callback] - Fired when the request has been made.
 *
 * @returns {object} request
 */
function track(config, callback = function(){ /* empty */}) {
	const session = Session.session();

	// Set up the base request object with some values which should always be sent.
	const request = {
		callback,
		context: {
			id: config.id || utils.guid(), // Use a supplied id or generate one for this request
			root_id: getRootID(),
		},
		user: {
			ft_session: utils.getValueFromCookie(/FTSession=([^;]+)/),
			ft_session_s: utils.getValueFromCookie(/FTSession_s=([^;]+)/)
		},
		device: {
			spoor_session: session.id,
			spoor_session_is_new: session.isNew,
			spoor_id: User.userID(),
		},
	};

	// Override any context, user, and device values with object-wide settings
	const settingsConfig = settings.get('config') || {};
	if (settingsConfig.context) {
		utils.merge(request.context, settingsConfig.context);
	}
	if (settingsConfig.user) {
		utils.merge(request.user, settingsConfig.user);
	}
	if (settingsConfig.device) {
		utils.merge(request.device, settingsConfig.device);
	}

	// Update the base config with the parameter-supplied config
	utils.merge(request, config);

	utils.log('Core.Track', request);

	// Send it.
	Send.addAndRun(request);

	return request;
}
export default {
	setRootID,
	getRootID,
	track
};
export {
	setRootID,
	getRootID,
	track
};
