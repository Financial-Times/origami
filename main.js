'use strict';

var debug;
var utils = require('./src/utils');
var viewport = require('./src/viewport.js');
var tracking = require('./src/tracking.js');

function listenTo(eventType) {
	if (eventType === 'resize') {
		viewport.listenToResize();
	} else if (eventType === 'scroll') {
		viewport.listenToScroll();
	} else if (eventType === 'orientation') {
		viewport.listenToOrientation();
	} else if (eventType === 'visibility') {
		viewport.listenToVisibility();
	}
}

function trackElements(selector){
	var elements;
	selector = typeof selector === 'string' ? selector : '[data-o-viewport-track]';
	try{
		elements = document.querySelectorAll(selector);
	} catch(err){
		if (debug) {
			/*jshint devel: true */
			console.error(err);
		}
		return;
	}

	if (elements.length) {
		[].slice.call(elements).forEach(function(element){
			tracking.track(element);
		});
		tracking.update();
		viewport.listenToAll();
		document.body.addEventListener('oViewport.orientation', tracking.updatePosition);
		document.body.addEventListener('oViewport.resize', tracking.updatePosition);
		document.body.addEventListener('oViewport.scroll', tracking.update);
		document.body.addEventListener('oViewport.visibility', tracking.update);
	}
}

function init() {
	trackElements();
	document.removeEventListener('o.DOMContentLoaded', init);
}

document.addEventListener('o.DOMContentLoaded', init);

module.exports = {
	debug: function() {
		debug = true;
	},
	listenTo: listenTo,
	listenToAll: viewport.listenToAll,
	stopListeningTo: viewport.stopListeningTo,
	stopListeningAll: viewport.stopListeningAll,
	setThrottleInterval: viewport.setThrottleInterval,
	getOrientation: viewport.getOrientation,
	getSize: utils.getSize,
	getViewportSize: utils.getViewportSize,
	getScrollPosition: utils.getScrollPosition,
	trackElements: trackElements,
	updateTracked: tracking.updatePosition,
	tracked: tracking.tracked
};
