'use strict';

var videoFactory = require('./src/models/video-factory');

var init = function(el, opts) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	var videoPromises = [].map.call(el.querySelectorAll('*:not([data-n-video-js])[data-n-component~="n-video"]'), function (el) {
		return videoFactory(el, opts).init();
	});
	return Promise.all(videoPromises);
};

module.exports = {
	init: init
};
