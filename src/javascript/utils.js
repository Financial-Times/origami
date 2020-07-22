/**
 * Shared 'internal' scope.
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
 * @param {*} args items to log
 * @return {void}
 */
function log(...args) {
	if (settings.get('developer') && window.console) {
		for (const arg of args) {
			window.console.log(arg);
		}
	}
}

/**
 * Tests if variable is a certain type. Defaults to check for undefined if no type specified.
 *
 * @param {*} variable - The variable to check.
 * @param {string=} type - The type to test for. Defaults to undefined.
 *
 * @return {boolean} - The answer for if the variable is of type.
 */
function is(variable, type = 'undefined') {
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
	} catch (error) {
		// empty
	}
}

/**
 * Listen for page tracking requests.
 *
 * @param {Function} cb - The callback to be called whenever a page is tracked.
 * @return {void}
 */
function onPage(cb) {
	if (is(cb, 'function')) {
		page_callbacks.push(cb);
	}
}

/**
 * Trigger the 'page' listeners.
 * @return {void}
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
 * Filter an object to only have the properties which are listed in the `allowlist` parameter.
 * @param {Object} objectToFilter - An object whose props need to be filtered
 * @param {Array} allowedPropertyNames - The list of props to allow
 * @return {Object} An object containing only the allowed props
 */
function filterProperties (objectToFilter, allowedPropertyNames) {
	const filteredObject = {};
	for (const allowedName of allowedPropertyNames) {
		if (objectToFilter[allowedName]) {
			filteredObject[allowedName] = objectToFilter[allowedName];
		}
	}
	return filteredObject;
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
 * @return {void}
 */
function assignIfUndefined (subject, target) {
	for (const prop in subject) {
		if (!target[prop]) {
			target[prop] = subject[prop];
		} else {
			// eslint-disable-next-line no-console
			console.warn(`You can't set a custom property called ${prop}`);
		}
	}
}

/**
 * Used to find out all the paths which contain a circular reference.
 * @param {*} rootObject The object we want to search within for circular references
 * @returns {string[]} Returns an array of strings, the strings are the full paths to the circular references within the rootObject
 */
function findCircularPathsIn(rootObject) {
	const traversedValues = new WeakSet();
	const circularPaths = [];

	function _findCircularPathsIn(currentObject, path) {
		// If we already saw this object
		// the rootObject contains a circular reference
		// and we can stop looking any further into this currentObj
		if (traversedValues.has(currentObject)) {
			circularPaths.push(path);
			return;
		}

		// Only Objects and things which inherit from Objects can contain circular references
		// I.E. string/number/boolean/template literals can not contain circular references
		if (currentObject instanceof Object) {
			traversedValues.add(currentObject);

			// Loop through all the values of the current object and search those for circular references
			for (const [key, value] of Object.entries(currentObject)) {
				// No need to recurse on every value because only things which inherit
				// from Objects can contain circular references
				if (value instanceof Object) {
					const parentObjectIsAnArray = Array.isArray(currentObject);
					if (parentObjectIsAnArray) {
					// Store path in bracket notation when value is an array
						_findCircularPathsIn(value, `${path}[${key}]`);
					} else {
					// Store path in dot-notation when value is an object
						_findCircularPathsIn(value, `${path}.${key}`);
					}
				}
			}
		}
	}

	_findCircularPathsIn(rootObject, "");
	return circularPaths;
}

/**
 * Used to find out whether an object contains a circular reference.
 * @param {*} rootObject The object we want to search within for circular references
 * @returns {bool} Returns true if a circular reference was found, otherwise returns false
 */
function containsCircularPaths(rootObject) {
	// Used to keep track of all the values the rootObject contains
	const traversedValues = new WeakSet();

	/**
	 *
	 * @param {*} currentObject The current object we want to search within for circular references
	 * @returns {true|undefined} Returns true if a circular reference was found, otherwise returns undefined
	 */
	function _containsCircularPaths(currentObject) {
		// If we already saw this object
		// the rootObject contains a circular reference
		// and we can stop looking any further
		if (traversedValues.has(currentObject)) {
			return true;
		}

		// Only Objects and things which inherit from Objects can contain circular references
		// I.E. string/number/boolean/template literals can not contain circular references
		if (currentObject instanceof Object) {
			traversedValues.add(currentObject);
			// Loop through all the values of the current object and search those for circular references
			for (const value of Object.values(currentObject)) {
				// No need to recurse on every value because only things which inherit
				// from Objects can contain circular references
				if (value instanceof Object) {
					if (_containsCircularPaths(value)) {
						return true;
					}
				}
			}
		}
	}

	// _containsCircularPaths returns true or undefined.
	// By using Boolean we convert the undefined into false.
	return Boolean(
		_containsCircularPaths(
			rootObject
		)
	);
}

/**
 * Utilities.
 * @alias utils
 */
export default {
	log,
	is,
	isUndefined: is,
	merge,
	encode,
	decode,
	guid: cuid,
	addEvent,
	broadcast,
	onPage,
	triggerPage,
	getValueFromCookie,
	sanitise,
	assignIfUndefined,
	filterProperties,
	findCircularPathsIn,
	containsCircularPaths
};
export {
	log,
	is,
	is as isUndefined,
	merge,
	encode,
	decode,
	cuid as guid,
	addEvent,
	broadcast,
	onPage,
	triggerPage,
	getValueFromCookie,
	sanitise,
	assignIfUndefined,
	filterProperties,
	findCircularPathsIn,
	containsCircularPaths
};
