import * as Utils from '@financial-times/o-utils';

let debug;

/**
 *
 * @param {string} eventType the name of the event
 * @param {object} data the payload of the event
 * @param {EventTarget} target the target of the event
 */
function broadcast(eventType, data, target) {
	target = target || document.body;

	if (debug) {
		// eslint-disable-next-line no-console
		console.log('o-viewport', eventType, data);
	}

	target.dispatchEvent(
		new CustomEvent('oViewport.' + eventType, {
			detail: data,
			bubbles: true,
		})
	);
}

/**
 * Get the viewport height.
 *
 * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar height.
 * @returns {number} viewport height
 */
function getHeight(ignoreScrollbars) {
	return ignoreScrollbars
		? document.documentElement.clientHeight
		: Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

/**
 * Get the viewport width.
 *
 * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar width
 * @returns {number} viewport width
 */
function getWidth(ignoreScrollbars) {
	return ignoreScrollbars
		? document.documentElement.clientWidth
		: Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

/**
 * Viewport size.
 *
 * @typedef {object} Size
 * @property {number} height viewport height
 * @property {number} width viewport width
 */

/**
 * Get the viewport width and height.
 *
 * @param {boolean} ignoreScrollbars [false] - set to true to discount scrollbar width/height.
 * @returns {Size} viewport width and height object
 */
function getSize(ignoreScrollbars) {
	return {
		height: getHeight(ignoreScrollbars),
		width: getWidth(ignoreScrollbars),
	};
}

/**
 * Scroll position.
 *
 * @typedef {object} ScrollPosition
 * @property {number} height - `document.body.scrollHeight`
 * @property {number} width - `document.body.scrollWidth`
 * @property {number} left - `window.pageXOffset || window.scrollX`
 * @property {number} top - `window.pageYOffset || window.scrollY`
 */

/**
 * @returns {ScrollPosition} current scroll info
 */
function getScrollPosition() {
	return {
		height: document.body.scrollHeight,
		width: document.body.scrollWidth,
		left: window.pageXOffset || window.scrollX,
		top: window.pageYOffset || window.scrollY,
	};
}

/**
 * @returns {string} - 'portrait' or 'landscape'
 */
function getOrientation() {
	const orientation = window.screen.orientation;
	if (orientation) {
		return typeof orientation === 'string'
			? orientation.split('-')[0]
			: orientation.type.split('-')[0];
	} else if (window.matchMedia) {
		return window.matchMedia('(orientation: portrait)').matches
			? 'portrait'
			: 'landscape';
	} else {
		return getHeight() >= getWidth() ? 'portrait' : 'landscape';
	}
}

/**
 * @returns {boolean} - true if the viewport is visible
 */
function getVisibility() {
	return document.hidden;
}

export default {
	debug: function () {
		debug = true;
	},
	broadcast,
	getWidth,
	getHeight,
	getSize,
	getScrollPosition,
	getVisibility,
	getOrientation,
	debounce: Utils.debounce,
	throttle: Utils.throttle,
};
