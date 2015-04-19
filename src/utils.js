/* jshint devel: true */

"use strict";

function broadcast(eventType, data, target) {
	target = target || document.body;

	target.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
		detail: data,
		bubbles: true
	}));
}

function getSize() {
	return {
		height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	};
}

function getViewportSize() {
	var documentElement = document.documentElement || document.body;
	var winWidth = window.innerWidth || Infinity;
	var winHeight = window.innerHeight || Infinity;
	return {
		width: Math.min(documentElement.clientWidth, winWidth),
		height: Math.min(documentElement.clientHeight, winHeight)
	};
}


function getScrollPosition() {
	// adapted from https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
	var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

	var ieX = isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
	var ieY = isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
	return {
		x: window.pageXOffset || window.scrollX || ieX,
		y: window.pageYOffset || window.scrollY || ieY
	};
}

function getOrientation() {
	var orientation = window.screen.orientation || window.screen.mozOrientation || window.screen.msOrientation || undefined;
	if (orientation) {
		return typeof orientation === 'string' ?
			orientation.split('-')[0] :
			orientation.type.split('-')[0];
	} else if (window.matchMedia) {
		return window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';
	} else {
		return window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
	}
}

function detectVisiblityAPI() {
	var hiddenName, eventType;
	if (typeof document.hidden !== "undefined") {
		hiddenName = "hidden";
		eventType = "visibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
		hiddenName = "mozHidden";
		eventType = "mozvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		hiddenName = "msHidden";
		eventType = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		hiddenName = "webkitHidden";
		eventType = "webkitvisibilitychange";
	}

	return {
		hiddenName: hiddenName,
		eventType: eventType
	};
}

function getVisibility() {
	var hiddenName = detectVisiblityAPI().hiddenName;
	return document[hiddenName];
}

module.exports = {
	broadcast: broadcast,
	getSize: getSize,
	getViewportSize: getViewportSize,
	getScrollPosition: getScrollPosition,
	getVisibility: getVisibility,
	getOrientation: getOrientation,
	detectVisiblityAPI: detectVisiblityAPI
};
