'use strict';
var throttle = require('lodash/function/throttle');
var debounce = require('lodash/function/debounce');
var utils = require('./utils');

var listeners = {};
var intervals = {
	resize: 100,
	orientation: 100,
	visibility: 100,
	scroll: 100
};


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

function setThrottleInterval(eventType, interval) {
	if (typeof arguments[0] === 'number') {
		setThrottleInterval('scroll', arguments[0]);
		setThrottleInterval('resize', arguments[1]);
		setThrottleInterval('orientation', arguments[2]);
		setThrottleInterval('visibility', arguments[3]);
	} else if (interval) {
		intervals[eventType] = interval;
	}
}

function listenToResize() {

	if (listeners.resize) {
		return;
	}
	var eventType = 'resize';
	var handler = debounce(function(ev) {
		utils.broadcast('resize', {
			viewport: utils.getSize(),
			originalEvent: ev
		});
	}, intervals.resize);


	window.addEventListener(eventType, handler);
	listeners.resize = {
		eventType: eventType,
		handler: handler
	};
}

function listenToOrientation() {

	if (listeners.orientation) {
		return;
	}

	var eventType = 'orientationchange';
	var handler = debounce(function(ev) {
		utils.broadcast('orientation', {
			viewport: utils.getSize(),
			orientation: getOrientation(),
			originalEvent: ev
		});
	}, intervals.orientation);

	window.addEventListener(eventType, handler);
	listeners.orientation = {
		eventType: eventType,
		handler: handler
	};
}

function listenToVisibility() {

	if (listeners.visibility) {
		return;
	}

	var eventType = detectVisiblityAPI().eventType;
	var handler = debounce(function(ev) {
		utils.broadcast('visibility', {
			visible: getVisibility(),
			originalEvent: ev
		});
	}, intervals.visibility);

	window.addEventListener(eventType, handler);

	listeners.visibility = {
		eventType: eventType,
		handler: handler
	};
}

function listenToScroll() {

	if (listeners.scroll) {
		return;
	}
	var eventType = 'scroll';
	var handler = throttle(function(ev) {
		var scroll = utils.getScrollPosition();
		utils.broadcast('scroll', {
			viewport: utils.getSize(),
			scrollHeight: document.body.scrollHeight,
			scrollLeft: scroll.y,
			scrollTop: scroll.x,
			scrollWidth: document.body.scrollWidth,
			originalEvent: ev
		});
	}, intervals.scroll);

	window.addEventListener(eventType, handler);
	listeners.scroll = {
		eventType: eventType,
		handler: handler
	};
}

function listenToAll() {
	listenToResize();
	listenToOrientation();
	listenToVisibility();
	listenToScroll();
}

function stopListeningTo(eventType) {
	window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
	delete listeners[eventType];
}

function stopListeningAll(eventType) {
	Object.keys(listeners).forEach(stopListeningTo);
}

module.exports = {
	listenToAll: listenToAll,
	listenToResize: listenToResize,
	listenToOrientation: listenToOrientation,
	listenToVisibility: listenToVisibility,
	listenToScroll: listenToScroll,
	setThrottleInterval: setThrottleInterval,
	getOrientation: getOrientation,
	stopListeningTo: stopListeningTo,
	stopListeningAll: stopListeningAll
};
