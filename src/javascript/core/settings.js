/**
 * Settings store.
 * @module Track
 * @class Settings
 */

/*global module */
"use strict";

var settings = {
	'internalCounter': 0
};

module.exports = (function () {

	function setValue(name, value) {
		settings[name] = value;
	}

	function getValue(name) {
		return settings[name];
	}

	function deleteValue(name) {
		delete settings[name];
	}

	return {
		'set': setValue,
		'get': getValue,
		'delete': deleteValue
	};

}());
