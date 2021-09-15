import {guid} from '../utils.js';
import {Store} from './store.js';

let userID;
let store;

/**
 * Init
 *
 * @param {string} value The value of a userID to use if one is not stored
 * @param {string} cookieDomain The domain that should be used to cookie te user
 * @returns {string} - The user ID if present, or a generated UID if not
 */
function init(value, cookieDomain) {
	const defaultUserConfig = {
		storage: 'cookie',
		name: 'spoor-id',
		nameOverride: 'spoor-id',
		value: null,

		// Set the store cookie domain to .ft.com for ft.com and all its subdomains
		domain: location.hostname.match(/^(?:.+\.)?ft\.com$/) ? 'ft.com' : null,
	};
	if ( cookieDomain ) {
		defaultUserConfig.domain = cookieDomain;
	}

	store = new Store(defaultUserConfig.name, defaultUserConfig);
	let id = store.read();

	if (!id) {
		id = value;
	}

	return setUser(id); // Refresh cookies and update state
}

/**
 * setUser
 *
 * @param {string} id The userID to set.
 * @returns {string} - The user ID if present, or a generated UID if not
 */
function setUser(id) {
	userID = id;

	if (!userID) {
		userID = guid();
	}

	store.write(userID); // Refreshes the cookie...

	return userID;
}

/**
 * Delete the current user data.
 *
 * @returns {void}
 */
function destroy() {
	store.destroy();
}

/**
 * Get the user ID
 *
 * @returns {string} - The user ID
 */
function id() {
	return userID;
}

export {
	init,
	setUser,
	id as userID,
	destroy
};
