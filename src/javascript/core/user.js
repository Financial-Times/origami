/**
 * Class for user.
 * Handling the user identifier.
 * @module _Core
 * @submodule Store
 * @class Track._Core.User
 * @static
 */

/*global module, require */
"use strict";

var userID;
var defaultUserConfig = {
	storage: 'best',
	name: 'userID',
	value: null
};

var utils = require("../utils");
var Store = require("./store");

/**
 * Init
 * @method init
 * @param config {String|Object} The value of a userID to use or configuration object.
 */
function init(config) {
	if (utils.is(config, 'string')) {
		config = { value: config };
	}

	var c = utils.merge(defaultUserConfig, config),
		store;

	// config.name is important here, means the user has specifically asked for a cookie name.
	if (c.storage === 'cookie' && config.name) {
		c.nameOverride = c.name;
	}

	store = new Store(c.name, c);

	userID = store.read();

	if (!userID) {
		userID = c.value;
	}

	if (!userID) {
		userID = utils.b64encode(utils.createUniqueID());
	}

	store.write(userID); // Refreshes the cookie...

	return userID;
}

module.exports = {
	init: init,
	userID: function () { return userID; }
};
