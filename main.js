'use strict';

var debug;
var utils = require('./src/utils');
var throttle = require('lodash/function/throttle');
var debounce = require('lodash/function/debounce');

var listeners = {};
var intervals = {
	resize: 100,
	orientation: 100,
	visibility: 100,
	scroll: 100
};

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
			orientation: utils.getOrientation(),
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

	var eventType = utils.detectVisiblityAPI().eventType;
	var handler = debounce(function(ev) {
		utils.broadcast('visibility', {
			visible: utils.getVisibility(),
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


function listenTo(eventType) {
	if (eventType === 'resize') {
		listenToResize();
	} else if (eventType === 'scroll') {
		listenToScroll();
	} else if (eventType === 'orientation') {
		listenToOrientation();
	} else if (eventType === 'visibility') {
		listenToVisibility();
	}
}

function listenToAll() {
	listenToResize();
	listenToOrientation();
	listenToVisibility();
	listenToScroll();
}

function stopListeningTo(eventType) {
	if (listeners[eventType]){
		window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
		delete listeners[eventType];
	}
}

function stopListeningAll(eventType) {
	Object.keys(listeners).forEach(stopListeningTo);
}

module.exports = {
	debug: function() {
		debug = true;
	},
	listenTo: listenTo,
	listenToAll: listenToAll,
	stopListeningTo: stopListeningTo,
	stopListeningAll: stopListeningAll,
	setThrottleInterval: setThrottleInterval,
	getOrientation: utils.getOrientation,
	getSize: utils.getSize,
	getViewportSize: utils.getViewportSize,
	getScrollPosition: utils.getScrollPosition
};
