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
			hidden: utils.getVisibility(),
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
		var scrollPos = utils.getScrollPosition();
		utils.broadcast('scroll', {
			viewport: utils.getSize(),
			scrollHeight: scrollPos.height,
			scrollLeft: scrollPos.left,
			scrollTop: scrollPos.top,
			scrollWidth: scrollPos.width,
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
	if (eventType === 'resize' || eventType === 'all') {
		listenToResize();
	}

	if (eventType === 'scroll' || eventType === 'all') {
		listenToScroll();
	}

	if (eventType === 'orientation' || eventType === 'all') {
		listenToOrientation();
	}

	if (eventType === 'visibility' || eventType === 'all') {
		listenToVisibility();
	}
}

function stopListeningTo(eventType) {
	if (eventType === 'all') {
		Object.keys(listeners).forEach(stopListeningTo);
	} else if (listeners[eventType]) {
		window.removeEventListener(listeners[eventType].eventType, listeners[eventType].handler);
		delete listeners[eventType];
	}
}

module.exports = {
	debug: function() {
		debug = true;
		utils.debug();
	},
	listenTo: listenTo,
	stopListeningTo: stopListeningTo,
	setThrottleInterval: setThrottleInterval,
	getOrientation: utils.getOrientation,
	getSize: utils.getSize,
	getScrollPosition: utils.getScrollPosition
};
