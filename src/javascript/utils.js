/*global module, require, window */

/**
 * Shared 'internal' scope.
 * @private
 */
const settings = require("./core/settings");

/**
 * Record of callbacks to call when a page is tracked.
 */
const page_callbacks = [];

/**
 * Log messages to the browser console. Requires 'log' to be set on init.
 *
 * @param {*} List of objects to log
 */
function log() {
	if (settings.get('developer') && window.console) {
		for (let i=0;i<arguments.length;i++) {
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

	let name;
	let src;
	let copy;

	/* jshint -W089 */
	/* eslint guard-for-in: 0 */
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
	try {
		return window.encodeURIComponent(str);
	} catch (error) {
		return window.escape(str);
	}
}

/**
 * Generate a GUID.
 * Based on http://stackoverflow.com/a/21963136
 * @return {string}
 */
const lut = []; for (let i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
function guid() {
	const d0 = Math.random()*0xffffffff|0;
	const d1 = Math.random()*0xffffffff|0;
	const d2 = Math.random()*0xffffffff|0;
	const d3 = Math.random()*0xffffffff|0;
	return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
		lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
		lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
		lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
}

/*
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
			element.attachEvent('on' + event, listener);
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
 * Trigger the 'page' listeners.
 */
function triggerPage() {
	for (let i = 0; i < page_callbacks.length; i++) {
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

	let i;
	const namespaces = str.split('.');
	let test = window;

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
	onPage: onPage,
	triggerPage: triggerPage,
	getValueFromCookie: getValueFromCookie,
	getValueFromUrl: getValueFromUrl,
	getValueFromJsVariable: getValueFromJsVariable
};
