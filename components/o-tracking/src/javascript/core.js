import {addAndRun} from './core/send.js';
import { userID } from './core/user.js';
import { session } from './core/session.js';
import { get } from './core/settings.js';
import { guid, getValueFromCookie, merge, log } from './utils.js';

let rootID;

/**
 * Generate and store a new rootID, used to mark a new root event that
 * subsequent events will be linked to.
 *
 * @returns {string|*} The rootID.
 */
function setRootID() {
	rootID = guid();
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
	const currentSession = session();

	// Set up the base request object with some values which should always be sent.
	const request = {
		callback,
		context: {
			id: config.id || guid(), // Use a supplied id or generate one for this request
			root_id: getRootID(),
		},
		user: {
			ft_session: getValueFromCookie(/FTSession=([^;]+)/),
			ft_session_s: getValueFromCookie(/FTSession_s=([^;]+)/)
		},
		device: {
			spoor_session: currentSession.id,
			spoor_session_is_new: currentSession.isNew,
			spoor_id: userID(),
		},
	};

	// Override any context, user, and device values with object-wide settings
	const settingsConfig = get('config') || {};
	if (settingsConfig.context) {
		merge(request.context, settingsConfig.context);
	}
	if (settingsConfig.user) {
		merge(request.user, settingsConfig.user);
	}
	if (settingsConfig.device) {
		merge(request.device, settingsConfig.device);
	}

	// Update the base config with the parameter-supplied config
	merge(request, config);

	log('Core.Track', request);

	// Send it.
	addAndRun(request);

	return request;
}

export default {
	setRootID,
	getRootID,
	track
};
