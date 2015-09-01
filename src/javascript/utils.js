/*global module, require, window */
'use strict';

/**
 * Shared 'internal' scope.
 * @private
 */
var settings = require('./core/settings');

/**
 * Record of callbacks to call when a page is tracked.
 */
var page_callbacks = [];

/**
 * Log messages to the browser console. Requires 'log' to be set on init.
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
		type = 'undefined';
	}
	return typeof variable === type;
}

/**
 * Merge objects together. Will remove 'falsy' values.
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
		if (typeof copy !== 'undefined' && copy !== null && copy !== '') {
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
	if (window.encodeURIComponent) {
		return window.encodeURIComponent(str);
	} else {
		return window.escape(str);
	}
}

/**
 * Generate a GUID.
 * Based on http://stackoverflow.com/a/21963136
 * @return {string}
 */
function guid() {
	var unique = '';
	var randomVals;
	var i;

	// HACK:JC:20130313: The FIrefox OS simulator throws an error on trying to access the window.crypto property.
	try {
		// If available, use numbers which are more random
		if (window.crypto && window.crypto.getRandomValues) {
			randomVals = new Uint8Array(32);
			window.crypto.getRandomValues(randomVals);
		}
	} catch (e) {
		// Fall back to Math.random on error or if window.crypto not available
		randomVals = new Array(32);
		for (i = 0; i < 32; i++) {
			randomVals[i] = Math.random() * 256 | 0;
		}
	}

	// Construct a UUID based on rfc4122 version 4
	for (i = 0; i < 32; i++) {

		// The following characters are preceded by a hyphen
		if (i === 8 || i === 12 || i === 16 || i === 20) {
			unique += "-";
		}

		// 12th character must be a 4
		if (i === 12) {
			unique += "4";
		} else if (i === 16) {
			// 16th character must be an 8, 9, A or B
			unique += ((randomVals[i] / 16) & 0x3 | 0x8).toString(16);
		} else {
			// Other characters must be hexadecimal
			unique += (randomVals[i] / 16 | 0).toString(16);
		}
	}

	return unique;
}

/*
 * Utility to add event listeners.
 *
 * @param {Element} element
 * @param {string} event
 * @param {Function} listener
 */
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else {
		element.attachEvent('on' + event, listener);
	}
}

/*
 * Utility for dispatching custom events from window
 *
 * @param {string} namespace
 * @param {string} eventType
 * @param {Object} detail
 */
function broadcast(namespace, eventType, detail) {
	detail = detail || {};
	window.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
		detail: detail,
		bubbles: true
	}));
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
 * Trigger the 'page' listeners.
 */
function triggerPage() {
	for (var i = 0; i < page_callbacks.length; i++) {
		page_callbacks[i]();
	}
}

/**
 * Get a value from document.cookie matching the first match of the regexp you supply
 */
function getValueFromCookie(matcher) {
	return document.cookie.match(matcher) && RegExp.$1 !== '' && RegExp.$1 !== 'null' ? RegExp.$1 : null;
}

/**
 * Get a value from the url, used for uuid or querystring parameters
 */
function getValueFromUrl(matcher) {
	return document.location.href.match(matcher) && RegExp.$1 !== '' ? RegExp.$1 : null;
}

/**
 * Get a value from a specified JavaScript variable.
 */
function getValueFromJsVariable(str) {
	if (typeof str !== 'string') {
		return null;

	}

	var i,
		namespaces = str.split('.'),
		test = window;

	for (i = 0; i < namespaces.length; i = i + 1) {
		if (typeof test[namespaces[i]] === 'undefined') {
			return null;
		}

		test = test[namespaces[i]];
	}

	return test !== '' ? test : null;
}

module.exports = {
	log: log,
	is: is,
	isUndefined: is,
	merge: merge,
	encode: encode,
	guid: guid,
	addEvent: addEvent,
	broadcast: broadcast,
	onPage: onPage,
	triggerPage: triggerPage,
	getValueFromCookie: getValueFromCookie,
	getValueFromUrl: getValueFromUrl,
	getValueFromJsVariable: getValueFromJsVariable
};
