/*global module */
"use strict";

var settings = {
	'internalCounter': 0
};

/**
 * Very basic implementation of deep clone, and only supports simple POJO objects and
 * native arrays.
 * @param  {*} value Any value
 * @return {*}       Copy of value
 */
function clone(value) {
	switch (Object.prototype.toString.call(value)) {
		case '[object Object]':
			return JSON.parse(JSON.stringify(value));
		case '[object Array]':
			return [].slice.call(value);
		default:
			return value;
	}
}

/**
 * Saves a value. Stores a copy rather than a reference, to avoid mutations leaking.
 *
 * @param {string} Key
 * @param {*} value
 */
function setValue(key, value) {
	settings[key] = clone(value);
}

/**
 * Retrieves a value from the settings object. Returns a copy rather than reference, to
 * avoid mutations leaking.
 *
 * @param {string} key
 *
 * @return {*}
 */
function getValue(key) {
	return clone(settings[key]);
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
