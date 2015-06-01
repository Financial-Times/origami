'use strict';

var videoFactory = require('./src/models/video-factory');

var init = function(opts) {
	var options = opts || {};
	var defaultOpts = {
		context: document.body
	};
	for (var defaultOpt in defaultOpts) {
		if (defaultOpts.hasOwnProperty(defaultOpt) && !options.hasOwnProperty(defaultOpt)) {
			options[defaultOpt] = defaultOpts[defaultOpt];
		}
	}
	var context = options.context instanceof HTMLElement ? options.context : document.querySelector(opts.context);
	var videoPromises = [].map.call(context.querySelectorAll('*:not([data-n-video-js])[data-n-component~="n-video"]'), function (videoEl) {
		return videoFactory(videoEl, options).init()
			// don't fail all if a video errors
			.catch(function (err) { });
	});
	return Promise.all(videoPromises);
};

module.exports = {
	init: init
};
