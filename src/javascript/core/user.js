/*global module, require */
/*eslint-disable*/
'use strict';
/*eslint-enable*/

let userID;
let store;

import utils from '../utils';
import Store from './store';

/**
 * Init
 *
 * @param {String} value The value of a userID to use if one is not stored
 * @param {String} cookieDomain The domain that should be used to cookie te user
 * @return {String} - The user ID if present, or a generated UID if not
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
 * @param {String} id The userID to set.
 * @return {String} - The user ID if present, or a generated UID if not
 */
function setUser(id) {
	userID = id;

	if (!userID) {
		userID = utils.guid();
	}

	store.write(userID); // Refreshes the cookie...

	return userID;
}

/**
 * Delete the current user data.
 * @return {void}
 */
function destroy() {
	store.destroy();
}
const userID = function () { return userID; }
export default {
	init,
	setUser,
	userID,
	destroy
};
export {
	init,
	setUser,
	userID,
	destroy
};
