/*global module */
"use strict";

var settings = {};

/**
 * Saves a value
 *
 * @param {string} Key
 * @param {*} value
 */
function setValue(key, value) {
	settings[key] = value;
}

/**
 * Retrieves a value from the settings object
 *
 * @param {string} key
 *
 * @return {*}
 */
function getValue(key) {
	return settings[key];
}

/**
 * Deletes a value
 *
 * @param  {string} key [description]
 */
function deleteValue(key) {
	delete settings[key];
}

module.exports = {
	'set': setValue,
	'get': getValue,
	'delete': deleteValue
};
