/*global module, require, window */
'use strict';

var Core = require('./core');
var utils = require('./utils');

/**
 * Default properties for events.
 *
 * @type {Object}
 */
var defaultEventConfig = function () {
	return {
		category: 'event',
		action: 'generic',
		context: {}
	};
};

/**
 * Track an event.
 *
 * @param {Event} event - The event, which could the following propeties in its 'detail' key:
 *   [category] - The category, for example: video
 *   [action] - The action performed, for example: play
 *   [component_id] - Optional. The ID for the component instance.
 *
 * @param {Function} callback - Optional, Callback function. Called when request completed.
 */
function event(event, callback) {
	if (utils.is(event.detail.category) || utils.is(event.detail.action)) {
		throw 'Missing category or action values';
	}

	var config = utils.merge(defaultEventConfig(), {
		category: event.detail.category,
		action: event.detail.action,
		component_id: event.detail.component_id || getComponentId(event),
		context: event.detail
	});

	delete config.context.category;
	delete config.context.action;

	Core.track(config, callback);
}

/**
 * Helper function that generates a component id based on its xpath
 *
 * @param {Event} event
 *
 * @return {string} hash
 */
function getComponentId(event) {
	// Get the path from the event source to the event listener
	var path = _getEventPath(event);

	if (typeof path === 'undefined') {
		return;
	}

	// Select the source element (first item in the ordered sequence `path`)
	var srcElement = path[0];

	// Because, you could have two identical elements in the DOM as siblings,
	// we need to determine the 'sibling index': the order they're sitting within a DOM node.
	// Although in reality this is unlikely to always be the same, it's just a
	// best guess - unless child elements are always appended to an element rather than added as the first child.
	var siblingIndex = (function getSiblingIndex(element) {
		var srcParent = element.parentElement;
		if (srcParent) {
			for (var i = 0; i < srcParent.childNodes.length; i++) {
				if (srcParent.childNodes[i] === srcElement) {
					return i;
				}
			}
			return -1;
		} else {
			return 0;
		}
	}(srcElement));

	// Generate a normalised string (normalising browser quirks) from the sequence of elements
	var normalisedStringPath = path.reduceRight(function(builder, el) {
		var nodeName = el.nodeName.toLowerCase();

		// In some browsers, document is prepended with a '#'
		if (nodeName.indexOf('#') === 0) {
			return builder + '<' + nodeName + '>';
		}

		// Replace this stuff with stuff that makes each node unique - without including styling detail (as this may change depending on animation state etc, position)
		return builder + '<' + nodeName +' id="' + (el.id || '') + '">';
	}, '');


	// Append a sibling index to the string and use some simple, off the shelf string hashing algorithm.
	return _generateHash(normalisedStringPath + '_siblingIndex=' + siblingIndex);
}

/**
 * Gets the xpath for an event
 *
 * @param  {Event} event
 *
 * @private
 *
 * @return {array} The xpath
 */
function _getEventPath(event) {
	// IE backwards compatibility (get the actual target). If not IE, uses
	// `event.target`
	var element = event.target || event.srcElement;

	if (!element || !element.getAttribute('data-o-component')) {
		return;
	}

	// event.path is available in some browsers, most notable Chrome
	if (event.path) {
		// Array.prototype.slice.call coerces a NodeList to an array. Could
		// use Array.from but it is not in the Polyfill service default set.
		return Array.prototype.slice.call(event.path);
	}

	var path = [];

	while (element) {
		path.push(element);
		element = element.parentElement;
	}

	return path;
}

/**
 * JS Implementation of MurmurHash2
 *
 * @author <a href="mailto:gary.court@gmail.com">Gary Court</a>
 * @see http://github.com/garycourt/murmurhash-js
 * @author <a href="mailto:aappleby@gmail.com">Austin Appleby</a>
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} key ASCII only
 * @param {number} seed Positive integer only
 *
 * @return {number} 32-bit positive integer hash
 *
 * @private
 */
function _generateHash(str) {
	var l = str.length;
	var h = 1 ^ l;
	var i = 0;
	var k;

	while (l >= 4) {
		k = ((str.charCodeAt(i) & 0xff)) |
			((str.charCodeAt(++i) & 0xff) << 8) |
			((str.charCodeAt(++i) & 0xff) << 16) |
			((str.charCodeAt(++i) & 0xff) << 24);

		k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
		k ^= k >>> 24;
		k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));

		h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;

		l -= 4;
		++i;
	}

	switch (l) {
		case 3: h ^= (str.charCodeAt(i + 2) & 0xff) << 16;
		case 2: h ^= (str.charCodeAt(i + 1) & 0xff) << 8;
		case 1: h ^= (str.charCodeAt(i) & 0xff);
				h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	}

	h ^= h >>> 13;
	h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
	h ^= h >>> 15;

	return h >>> 0;
}

utils.addEvent(document.body, 'oTracking.event', event);

module.exports = event;
