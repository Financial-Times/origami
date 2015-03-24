/* jshint devel: true */

"use strict";

function broadcast(eventType, data) {
	document.body.dispatchEvent(new CustomEvent('oViewport.' + eventType, {
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

module.exports = {
	broadcast: broadcast,
	getSize: getSize,
	getViewportSize: getViewportSize,
	getScrollPosition: getScrollPosition
};
