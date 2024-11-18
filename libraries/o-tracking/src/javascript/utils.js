/**
 * Shared 'internal' scope.
 */
import {get} from './core/settings.js';

/**
 * CUID Generator
 */
import {api as cuid} from '../libs/browser-cuid.js';

/**
 * Record of callbacks to call when a page is tracked.
 */
const page_callbacks = [];

/**
 * Log messages to the browser console. Requires 'log' to be set on init.
 *
 * @param {*} args items to log
 * @returns {void}
 */
function log(...args) {
	if (get('config').test && window.console) {
		for (const arg of args) {
			window.console.log(arg);
		}
	}
}

/**
 * Creates a logging function that logs messages to the console with a specified namespace.
 *
 * @function namedLog
 * @param {string} namespace - The namespace to be prefixed to each log message.
 * @returns {function} A function that logs messages to the console with the given namespace if the configuration allows.
 *
 * @example
 * const log = namedLog('MyNamespace');
 * log('This is a message'); 
 * // Output: [MyNamespace]: This is a message
 */
function namedLog(namespace) {
	return function(...args) {
		if(get('config').test && window.console) {
			window.console.log(`%c[${namespace}]:`, 'color: teal', ...args)
		}
	}
}

/**
 * Tests if variable is a certain type. Defaults to check for undefined if no type specified.
 *
 * @param {*} variable - The variable to check.
 * @param {string=} type - The type to test for. Defaults to undefined.
 *
 * @returns {boolean} - The answer for if the variable is of type.
 */
function is(variable, type = 'undefined') {
	return typeof variable === type;
}

/**
 * Merge objects together. Will remove undefined and null values.
 *
 * @param {object} target - The original object to merge in to.
 * @param {object} options - The object to merge into the target. If omitted, will merge target into a new empty Object.
 *
 * @returns {object} The merged object.
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
 *
 * @param {string} str - The string to be encoded.
 * @returns {string} The encoded string.
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
 *
 * @param {string} str - The string to be decoded.
 * @returns {string} The decoded string.
 */
function decode(str) {
	if (window.decodeURIComponent) {
		return window.decodeURIComponent(str);
	} else {
		return window.unescape(str);
	}
}

/**
 * Utility to add event listeners.
 *
 * @param {Element} element
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} listener
 * @returns {void}
 */
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else {
		element.attachEvent('on' + event, listener);
	}
}

/**
 * Utility for dispatching custom events from window
 *
 * @param {string} namespace
 * @param {string} eventType
 * @param {object} detail
 * @returns {void}
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
 * @returns {void}
 */
function onPage(cb) {
	if (is(cb, 'function') && !page_callbacks.includes(cb)) {
		page_callbacks.push(cb);
	}
}

/**
 * Trigger the 'page' listeners.
 *
 * @returns {void}
 */
function triggerPage() {
	for (let i = 0; i < page_callbacks.length; i++) {
		page_callbacks[i]();
	}
}

/**
 * Get a value from document.cookie matching the first match of the regexp you supply
 *
 * @param {RegExp} matcher - The Regex to match with
 * @returns {string} - The vale from the cookie
 */
function getValueFromCookie(matcher) {
	return document.cookie.match(matcher) && RegExp.$1 !== '' && RegExp.$1 !== 'null' ? RegExp.$1 : null;
}

/**
 * Filter an object to only have the properties which are listed in the `allowlist` parameter.
 *
 * @param {object} objectToFilter - An object whose props need to be filtered
 * @param {Array} allowedPropertyNames - The list of props to allow
 * @returns {object} An object containing only the allowed props
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
 *
 * @param {string} str - The string to trim.
 * @returns {string} The trimmed string.
 */
function sanitise (str) {
	return typeof str === 'string' ? str.trim() : str;
}

/**
 * Assign the subject value if the target properties are undefined
 *
 * @param {object} subject - assign the value
 * @param {object} target - be assigned the value
 * @returns {void}
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
 * Identify circular references in 'object', and replace them with a string representation
 * of the reference. Returns a succesfully serialised JSON string, and a list of circular
 * references which were removed.
 * 
 * Inspired by https://github.com/sindresorhus/safe-stringify and 
 * https://github.com/sindresorhus/decircular
 *
 * @param {*} object The object we want to stringify, and search within for circular references
 * @returns {Object: {jsonString: string, warnings: array}} The stringified object, and a warnings for each circular reference which was removed
 */
function removeCircularReferences(object) {

	// WeakMaps release memory when all references are garbage-collected
	const circularReferences = new WeakMap();
	const paths = new WeakMap();

	const warnings = [];

	function getPathFragment(parent, key) {
		if (!key) {
			return '$';
		}

		if (Array.isArray(parent)) {
			return `[${key}]`;
		}

		return `.${key}`;
	}

	function formatCircularReferencesWarning(references) {
		const paths = references.map(path => '`' + path.join('') + '`');
		return 'Circular reference between ' + paths.join(' AND ');
	}

	function replacer(key, value) {
		// Scalars don't need to be inspected as they can't contain circular references
		if (!(value !== null && typeof value === 'object')) {
			return value
		}

		// Record the path from the root ($) to the current object (value)
		// in order to print helpful circular reference warnings.
		const path = [...paths.get(this) || [], getPathFragment(this, key)];
		paths.set(value, path);

		// If a reference to the current value is already in the list, we have
		// a circular reference. Add the current value to the list along with its path,
		// and return a useful error string rather than the unserialisable value.
		if (circularReferences.has(value)) {
			const references = [...circularReferences.get(value), path];
			circularReferences.set(value, references);
			const warning = formatCircularReferencesWarning(references);
			warnings.push(warning);
			return warning;
		}

		// This is the first time we've seen the current value in this branch 
		// of the object. Record its path from the object root.
		circularReferences.set(value, [path]);

		// Recurse into the value to proactively find circular references
		// before encountering a loop.
		const newValue = Array.isArray(value) ? [] : {};
		for (const [k, v] of Object.entries(value)) {
			newValue[k] = replacer.call(value, k, v);
		}

		// All circular references to this object will have been identified,
		// so remove it from the list.
		circularReferences.delete(value);

		// This branch of the object can now be safely serialised to a JSON string
		return newValue;
	}

	const jsonString = JSON.stringify(object, replacer);
	return {jsonString, warnings};
}


/**
 * Stringify an object to JSON, removing any circular references. When circular references
 * are found, an error is thrown in a new event loop so that global error handlers can report it.
 *
 * @param {*} object The object we want to stringify, and search within for circular references
 * @returns {string} The safely stringified JSON string
 */
function safelyStringifyJson(object) {

	// JSON.stringify throws on two cases:
	// - value contains a circular reference
	// - A BigInt value is encountered
	// Circular references are a real possibility in the way o-tracking is called (and saves a queue of 
	// messages in a store), so we need to handle those gracefully.
	// 
	// However, for performance reasons, we always attempt to do a basic JSON.stringify() first. The 
	// recursion involved in removeCircularReferences() makes it about 20x slower to stringify a basic payload. 
	// This performance hit will be exacerbated on slow devices (e.g. old Android phones) with lots of queued offline events.
	try {
		return JSON.stringify(object);

	// NB: error is discarded - we have more work to do in order to throw a useful message
	} catch (error) {
	
		const {jsonString, warnings} = removeCircularReferences(object);
	
		if (warnings.length) {
			// Throw in a new event loop, as we always want to return JSON so the tracking payload is sent
			setTimeout(() => {
				const errorMessage = "AssertionError: o-tracking does not support circular references in the analytics data.\n" +
				"Please remove the circular references in the data.\n" +
				"Here are the paths in the data which are circular:\n" +
				warnings.join('\n');
				throw new Error(errorMessage);
			});
		}
	
		return jsonString;
	}


};

/**
 * Find out whether two objects are deeply equal to each other.
 *
 * @param {*} a
 * @param {*} b
 * @returns {boolean} - true if the two arguments are deeply equal
 */
function isDeepEqual(a, b) {
	if (a === b) {
		return true;
	}

	if (
		a &&
		b &&
		typeof a === "object" &&
		typeof b === "object"
	) {
		if (a.constructor !== b.constructor) {
			return false;
		}

		if (Array.isArray(a)) {
			const length = a.length;
			if (length !== b.length) {
				return false;
			}
			for (let i = length; i-- !== 0; ) {
				if (!isDeepEqual(a[i], b[i])) {
					return false;
				}
			}
			return true;
		}

		if (a.constructor === RegExp) {
			return (
				a.source === b.source && a.flags === b.flags
			);
		}
		if (a.valueOf !== Object.prototype.valueOf) {
			return a.valueOf() === b.valueOf();
		}
		if (a.toString !== Object.prototype.toString) {
			return a.toString() === b.toString();
		}

		const keys = Object.keys(a);
		const length = keys.length;
		if (length !== Object.keys(b).length) {
			return false;
		}

		for (let i = length; i-- !== 0; ) {
			if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
				return false;
			}
		}

		for (let i = length; i-- !== 0; ) {
			const key = keys[i];

			if (!isDeepEqual(a[key], b[key])) {
				return false;
			}
		}

		return true;
	}
}

export {
	log,
	namedLog,
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
	removeCircularReferences,
	safelyStringifyJson,
	isDeepEqual
};
