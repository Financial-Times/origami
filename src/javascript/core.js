import Send from './core/send';

import User from './core/user';
import Session from './core/session';
import settings from './core/settings';
import utils from './utils';

let rootID;

/**
 * Generate and store a new rootID, used to mark a new root event that
 * subsequent events will be linked to.
 * @return {string|*} The rootID.
 */
function setRootID() {
	rootID = utils.guid();
	return rootID;
}

/**
 * Get the current rootID.
 * @return {string|*} The rootID.
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
 * @param {Object} config - Should be passed an object containing a format and the values for that format
 * @param {function=} callback - Fired when the request has been made.
 *
 * @return {Object} request
 */
function track(config, callback = function(){ /* empty */}) {
	const session = Session.session();

	// Set up the base request object with some values which should always be sent.
	const request = {
		async: true,
		callback,
		context: {
			id: config.id || utils.guid(), // Use a supplied id or generate one for this request
			root_id: getRootID(),
		},
		user: {
			passport_id: utils.getValueFromCookie(/USERID=([0-9]+):/) || utils.getValueFromCookie(/PID=([0-9]+)\_/),
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
