/*global module, require */

let userID;
let store;
const defaultUserConfig = {
	storage: 'cookie',
	name: 'spoor-id',
	value: null
};

const utils = require("../utils");
const Store = require("./store");

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
