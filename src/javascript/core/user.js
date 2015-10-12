/*global module, require */

let userID;
let store;
const defaultUserConfig = {
	storage: 'cookie',
	name: 'spoor-id',
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
 */
function migrate_across_domains(store, user_id) {
	const ls_name = 'o-tracking-proper-id';
	let proper_id;

	try {
		proper_id = window.localStorage.getItem(ls_name);

		if (!proper_id) {
			window.localStorage.setItem(ls_name, user_id);
			proper_id = user_id;
		}
	} catch (error) {
		utils.broadcast('oErrors', 'log', {
			error: error,
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
 * @param config {String|Object} The value of a userID to use or configuration object.
 */
function init(value) {
	const config = utils.merge(defaultUserConfig, { value: value });

	// config.name is important here, means the user has specifically asked for a cookie name.
	if (config.storage === 'cookie' && config.name) {
		config.nameOverride = config.name;
	}

	store = new Store(config.name, config);

	userID = store.read();

	if (userID) {
		userID = migrate_across_domains(store, userID);
	}

	if (!userID) {
		userID = config.value;
	}

	if (!userID) {
		userID = utils.guid();
	}

	store.write(userID); // Refreshes the cookie...

	return userID;
}

function destroy() {
	store.destroy();
}

module.exports = {
	init: init,
	userID: function () { return userID; },
	destroy: destroy
};
