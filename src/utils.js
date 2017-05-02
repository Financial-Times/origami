/* jshint devel: true */
const oUtils = require('o-utils');

let debug;

function broadcast(eventType, data, target) {
	target = target || document.body;

	if (debug) {
		console.log('o-viewport', eventType, data);
	}

	target.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
		detail: data,
		bubbles: true
	}));
}

function getHeight(ignoreScrollbars) {
	return ignoreScrollbars ? document.documentElement.clientHeight : Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

function getWidth(ignoreScrollbars) {
	return ignoreScrollbars ? document.documentElement.clientWidth : Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

function getSize(ignoreScrollbars) {
	return {
		height: module.exports.getHeight(ignoreScrollbars),
		width: module.exports.getWidth(ignoreScrollbars)
	};
}

function getScrollPosition() {
	const de = document.documentElement;
	const db = document.body;

	// adapted from https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
	const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

	const ieX = isCSS1Compat ? de.scrollLeft : db.scrollLeft;
	const ieY = isCSS1Compat ? de.scrollTop : db.scrollTop;
	return {
		height: db.scrollHeight,
		width: db.scrollWidth,
		left: window.pageXOffset || window.scrollX || ieX,
		top: window.pageYOffset || window.scrollY || ieY
	};
}

function getOrientation() {
	const orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation || undefined;
	if (orientation) {
		return typeof orientation === 'string' ?
			orientation.split('-')[0] :
			orientation.type.split('-')[0];
	} else if (window.matchMedia) {
		return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
	} else {
		return getHeight() >= getWidth() ? 'portrait' : 'landscape';
	}
}

function detectVisiblityAPI() {
	let hiddenName;
	let eventType;
	if (typeof document.hidden !== 'undefined') {
		hiddenName = 'hidden';
		eventType = 'visibilitychange';
	} else if (typeof document.mozHidden !== 'undefined') {
		hiddenName = 'mozHidden';
		eventType = 'mozvisibilitychange';
	} else if (typeof document.msHidden !== 'undefined') {
		hiddenName = 'msHidden';
		eventType = 'msvisibilitychange';
	} else if (typeof document.webkitHidden !== 'undefined') {
		hiddenName = 'webkitHidden';
		eventType = 'webkitvisibilitychange';
	}

	return {
		hiddenName: hiddenName,
		eventType: eventType
	};
}

function getVisibility() {
	const hiddenName = detectVisiblityAPI().hiddenName;
	return document[hiddenName];
}

module.exports = {
	debug: function() {
		debug = true;
	},
	broadcast: broadcast,
	getWidth: getWidth,
	getHeight: getHeight,
	getSize: getSize,
	getScrollPosition: getScrollPosition,
	getVisibility: getVisibility,
	getOrientation: getOrientation,
	detectVisiblityAPI: detectVisiblityAPI,
	debounce: oUtils.debounce,
	throttle: oUtils.throttle
};
