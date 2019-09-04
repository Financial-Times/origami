import * as Utils from 'o-utils';

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
		height: getHeight(ignoreScrollbars),
		width: getWidth(ignoreScrollbars)
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
	const orientation = window.screen.orientation;
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

function getVisibility() {
	return document.hidden;
}

export default {
	debug: function() {
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
	throttle: Utils.throttle
};
