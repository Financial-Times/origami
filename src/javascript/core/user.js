/*global module, require */
/*eslint-disable*/
'use strict';
/*eslint-enable*/

let userID;
let store;
const defaultUserConfig = {
	storage: 'cookie',
	name: 'spoor-id',
	nameOverride: 'spoor-id',
	value: null,
	domain: (document.URL.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)[1].indexOf('ft.com') > -1 ? 'ft.com' : null)
};

const utils = require('../utils');
const Store = require('./store');

/**
 * migrate_across_domains
 * Clean up after forgetting to write cookies to the 'root' ft.com domain.
 * - Check local storage for the 'proper' value.
 * - If it exists, use it.
 * - If not, set current user id as the 'proper' value.
 * - If this value and the cookie match, then we've already fixed it.
 * - If not, drop the cookie and it will be reset it on the root domain.
 *
 * @param {Store} store - The storage instance used for storing the ID.
 * @param {String} user_id - The user ID to check against storage.
 * @return {String} - The real user ID.
 */
function migrate_across_domains(store, user_id) {
	const ls_name = 'o-tracking-proper-id';
	let proper_id;

	try {
		// This isn't consistent in at least Firefox, maybe more, localstorage seems secured at subdomian level.
		proper_id = utils.getValueFromCookie(ls_name+'=([^;]+)');

		if (!proper_id) {
			const d = new Date();
			d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
			const expires = 'expires=' + d.toGMTString() + ';';

			window.document.cookie = ls_name + '=' + utils.encode(user_id) + ';' + expires + 'path=/;domain=.' + defaultUserConfig.domain + ';';
			proper_id = user_id;
		}
	} catch (error) {
		utils.broadcast('oErrors', 'log', {
			error: error.message,
			info: { module: 'o-tracking' }
		});
		proper_id = user_id;
	}

	// Expire the cookie on the (sub)domain
	window.document.cookie = 'spoor-id=0;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
	// Re-set the cookie on the  root domain
	store.write(proper_id);

	return proper_id;
}

/**
 * Init
 *
 * @param {String} value The value of a userID to use if one is not stored
 * @return {String} - The user ID if present, or a generated UID if not
 */
function init(value) {
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

	userID = migrate_across_domains(store, userID);

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

module.exports = {
	init: init,
	setUser: setUser,
	userID: function () { return userID; },
	destroy: destroy
};
