/*global module, require, window */
/*eslint-disable*/
'use strict';

/*eslint-enable*/

/**
 * Shared 'internal' scope.
 * @private
 */
import settings from './core/settings';

/**
 * CUID Generator
 */
import cuid from '../libs/browser-cuid';

/**
 * Record of callbacks to call when a page is tracked.
 */
const page_callbacks = [];

/**
 * Log messages to the browser console. Requires 'log' to be set on init.
 *
 * @param {*} List of objects to log
 * @return {undefined}
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
 * @return {boolean} - The answer for if the variable is of type.
 */
function is(variable, type) {
	if (!type) {
		type = 'undefined';
	}
	return typeof variable === type;
}

/**
 * Merge objects together. Will remove undefined and null values.
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
		if (typeof copy !== 'undefined' && copy !== null) {
			target[name] = src === Object(src) && !is(src, 'function') ? merge(src, copy) : copy;
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
 * URL decode a string.
 * @param {string} str - The string to be decoded.
 *
 * @return {string} The decoded string.
 */
function decode(str) {
	if (window.decodeURIComponent) {
		return window.decodeURIComponent(str);
	} else {
		return window.unescape(str);
	}
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
	try {
		window.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
			detail: detail,
			bubbles: true
		}));
	} catch (error) {}
}

/**
 * Listen for page tracking requests.
 *
 * @param {Function} cb - The callback to be called whenever a page is tracked.
 * @return {undefined}
 */
function onPage(cb) {
	if (is(cb, 'function')) {
		page_callbacks.push(cb);
	}
}

/**
 * Trigger the 'page' listeners.
 * @return {undefined}
 */
function triggerPage() {
	for (let i = 0; i < page_callbacks.length; i++) {
		page_callbacks[i]();
	}
}

/**
 * Get a value from document.cookie matching the first match of the regexp you supply
 * @param {RegExp} matcher - The Regex to match with
 * @return {String} - The vale from the cookie
 */
function getValueFromCookie(matcher) {
	return document.cookie.match(matcher) && RegExp.$1 !== '' && RegExp.$1 !== 'null' ? RegExp.$1 : null;
}

/**
 * Get a value from the url, used for uuid or querystring parameters
 * @param {RegExp} matcher - The Regex to match with
 * @return {String} - The value from the URL
 */
function getValueFromUrl(matcher) {
	return document.location.href.match(matcher) && RegExp.$1 !== '' ? RegExp.$1 : null;
}

/**
 * Get a value from a specified JavaScript variable.
 * @param {String} str - The name of variable, in dot syntax.
 * @return {String} The value from the JS variable.
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

/**
 * Trim strings
 * @param {String} str - The string to trim.
 * @return {String} The trimmed string.
 */
function sanitise (str) {
	return typeof str === 'string' ? str.trim() : str;
}

/**
 * Assign the subject value if the target properties are undefined
 * @param {Object} subject - assign the value
 * @param {Object} target - be assigned the value
 * @return
 */
function assignIfUndefined (subject, target) {
	for (const prop in subject) {
		if (!target[prop]) {
			target[prop] = subject[prop];
		} else {
			console.warn(`You can't set a custom property called ${prop}`);
		}
	}
}

/**
 * Whitelist props
 * @param {Object} props - An object whose props need to be whitelisted
 * @param {Array} list - A list for whitelisting
 * @return
 */
function whitelistProps (props, list) {
	return list.reduce(
		(acc, propName) => Object.assign(
			{},
			acc,
			props[propName] ? { [propName]: props[propName] } : undefined
		),
		{}
	);
}

/**
 * Utilities.
 * @alias utils
 */
export default {
	log: log,
	is: is,
	isUndefined: is,
	merge: merge,
	encode: encode,
	decode: decode,
	guid: cuid,
	addEvent: addEvent,
	broadcast: broadcast,
	onPage: onPage,
	triggerPage: triggerPage,
	getValueFromCookie: getValueFromCookie,
	getValueFromUrl: getValueFromUrl,
	getValueFromJsVariable: getValueFromJsVariable,
	sanitise: sanitise,
	assignIfUndefined: assignIfUndefined,
	whitelistProps: whitelistProps,
};
export {
	log: log,
	is: is,
	isUndefined: is,
	merge: merge,
	encode: encode,
	decode: decode,
	guid: cuid,
	addEvent: addEvent,
	broadcast: broadcast,
	onPage: onPage,
	triggerPage: triggerPage,
	getValueFromCookie: getValueFromCookie,
	getValueFromUrl: getValueFromUrl,
	getValueFromJsVariable: getValueFromJsVariable
};
