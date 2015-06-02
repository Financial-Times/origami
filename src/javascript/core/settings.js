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

function setValue(name, value) {
	settings[name] = value;
}

function getValue(name) {
	return settings[name];
}

function deleteValue(name) {
	delete settings[name];
}

module.exports = {
	'set': setValue,
	'get': getValue,
	'delete': deleteValue
};
