/*global module, require, window */
"use strict";

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
	addEvent: addEvent,
	onPage: onPage,
	triggerPage: triggerPage
};
