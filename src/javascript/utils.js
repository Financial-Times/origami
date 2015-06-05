/*global module, require, window */
"use strict";

/**
 * An array of characters used by the base-64 encoding methods.
 * @private
 */
var TRANS_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

/**
 * Shared "internal" scope.
 * @private
 */
var settings = require("./core/settings");

/**
 * Record of callbacks to call when a page is tracked.
 */
var page_callbacks = [];

/**
 * Log messages to the browser console. Requires "log" to be set on init.
 *
 * @param {*} List of objects to log
 */
function log() {
	if (settings.get('developer') && window.console) {
		for (var i=0;i<arguments.length;i++) {
			window.console.log(arguments[i]);
		}
	}
}

/**
 * Tests if variable is a certain type. Defaults to check for undefined if no type specified.
 *
 * @param {*} variable - The variable to check.
 * @param {string} type - The type to test for. Defaults to undefined.
 *
 * @return {boolean}
 */
function is(variable, type) {
	if (!type) {
		type = "undefined";
	}
	return typeof variable === type;
}

/**
 * Merge objects together. Will remove "falsy" values.
 *
 * @param {Object} target - The original object to merge in to.
 * @param {Object} options - The object to merge into the target. If omitted, will merge target into a new empty Object.
 *
 * @return {Object} The merged object.
 */
function merge(target, options) {
	if (!options) {
		options = target;
		target = {};
	}

	var name, src, copy;

	/* jshint -W089 */
	/* jslint forin:false */
	for (name in options) {
		src = target[name];
		copy = options[name];

		// Prevent never-ending loop
		if (target === copy) {
			continue;
		}

		// Gets rid of missing values too
		if (typeof copy !== "undefined" && copy !== null && copy !== '') {
			target[name] = (src === Object(src) && !is(src, 'function') ? merge(src, copy) : copy);
		}
	}
	/* jshint +W089 */
	/* jslint forin:true */

	return target;
}

/**
 * URL encode a string.
 * @param {string} str - The string to be encoded.
 *
 * @return {string} The encoded string.
 */
function encode(str) {
	try {
		return window.encodeURIComponent(str);
	} catch (error) {
		return window.escape(str);
	}
}

/**
 * URL unencode a string.
 *
 * @param {string} str - The string to be unencoded.
 *
 * @return {string} The unencoded string.
 */
function unencode(str) {
	try {
		return window.decodeURIComponent(str);
	} catch (error) {
		return window.unescape(str);
	}
}

/**
 * Encodes a given input string in base64.
 *
 * @param {string} input - the string to encode
 *
 * @return {string} The base64-encoded value of the input string.
 */
function b64encode(input) {
	if (!input) {
		return '';
	}

	input = encode(input);

	if (window.btoa) {
		return window.btoa(input);
	}

	var i, numBytesLeft, value, output = '';

	for (i = 0; i < input.length; i += 3) {
		numBytesLeft = input.length - i;
		value = 0;
		/* jshint -W016 */
		/* jslint bitwise:false */
		value = (input.charCodeAt(i) << 16) & 0x00ff0000;
		value |= (numBytesLeft > 1) ? (input.charCodeAt(i + 1) << 8) & 0x0000ff00 : 0;
		value |= (numBytesLeft > 2) ? input.charCodeAt(i + 2) & 0x000000ff : 0;
		output += TRANS_CHARS.charAt((value & 0x00fC0000) >> 18);
		output += TRANS_CHARS.charAt((value & 0x0003f000) >> 12);
		output += ((numBytesLeft > 1) ? TRANS_CHARS.charAt((value & 0x00000fc0) >> 6) : '_');
		output += ((numBytesLeft > 2) ? TRANS_CHARS.charAt((value & 0x0000003f)) : '_');
		/* jshint +W016 */
		/* jslint bitwise:true */
	}
	return output;
}

/**
 * Function to create a unique-ish hash of a string.
 *
 * @param {string} txt
 *
 * @return {string}
 */
function hash(txt) {
	if (!txt) {
		return "";
	}

	var seed = 0x811c9dc5;
	var i;

	/* jshint -W016 */
	/* jslint bitwise:false */
	for (i = 0; i < txt.length; i++) {
		seed += (seed << 1) + (seed << 4) + (seed << 7) + (seed << 8) + (seed << 24);
		seed ^= txt.charCodeAt(i);
	}

	return Number(seed & 0x00000000ffffffff).toString(16);
	/* jshint -W016 */
	/* jslint bitwise:true */
}

/**
 * For the chosen keys, turns an object into a query string.
 *
 * @param {Object} object - The object containing the values.
 * @param {array} keys - The keys you want to use in the query string.
 *
 * @return {string} The query string.
 */
function serialize(object, keys) {
	var i,
		qs = [];

	if (is(keys)) {
		keys = [];
	}

	if (keys.length === 0) {
		keys = Object.keys(object);
	}

	for (i = 0; i < keys.length; i = i + 1) {
		if (object.hasOwnProperty(keys[i])) {
			qs.push(keys[i] + '=' + encode(object[keys[i]]));
		}
	}

	return qs.join('&');
}

/**
 * Unserialize a query string into an object. Opposite of serialize.
 *
 * @param {string} qs - The query string to turn into an Object.
 *
 * @return {Object}
 */
function unserialize(qs) {
	var qs_index,
		kv,
		params = {};

	qs = qs.split('&');

	for (qs_index = 0; qs_index < qs.length; qs_index = qs_index + 1) {
		kv = qs[qs_index].split('=');
		params[kv[0]] = kv.slice(1).join('=');
	}

	return params;
}

/**
 * Pad a number below 10.
 *
 * @param {number} number
 *
 * @return {string}
 */
function pad(number) {
	var r = String(number);
	if (r.length === 1) {
		r = '0' + r;
	}
	return r;
}

/**
 * IE friendly Date toISOString
 *
 * @param date {Date}
 *
 * @return {string}
 */
function toISOString(date) {
	if (Date.prototype.hasOwnProperty("toISOString")) {
		return date.toISOString();
	}

	return [
		date.getUTCFullYear(), '-', pad(date.getUTCMonth() + 1), '-', pad(date.getUTCDate()),
		'T',
		pad(date.getUTCHours()), ':', pad(date.getUTCMinutes()), ':', pad(date.getUTCSeconds()),
		'.',
		String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5),
		'Z'
	].join('');
}

/**
 * Generate a unique ID.
 *
 * @return {string}
 */
function createUniqueID() {
	return window.history.length + "." + (Math.random() * 1000) + "." + (new Date()).getTime() + "." + hash(window.document.location.href + window.document.referrer);
}

/**
 * Utility to add event listeners.
 *
 * @param {Element} element
 * @param {string} event
 * @param {Function} listener
 */
function addEvent(element, event, listener) {
	try {
		element.addEventListener(event, listener, false);
	} catch (error) {
		try {
			element.attachEvent("on" + event, listener);
		} catch (err) {}
	}
}

/**
 * Listen for page tracking requests.
 *
 * @param {Function} cb
 */
function onPage(cb) {
	if (is(cb, 'function')) {
		page_callbacks.push(cb);
	}
}

/**
 * Trigger the "page" listeners.
 */
function triggerPage() {
	for (var i = 0; i < page_callbacks.length; i++) {
		page_callbacks[i]();
	}
}

module.exports = {
	log: log,
	is: is,
	isUndefined: is,
	merge: merge,
	encode: encode,
	unencode: unencode,
	hash: hash,
	serialize: serialize,
	unserialize: unserialize,
	b64encode: b64encode,
	toISOString: toISOString,
	createUniqueID: createUniqueID,
	addEvent: addEvent,
	onPage: onPage,
	triggerPage: triggerPage
};
