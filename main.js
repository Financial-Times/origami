'use strict';

var videoFactory = require('./src/models/video-factory');

function init (opts) {
	var options = opts || {};
	var defaultOpts = {
		context: document.body,
		selector: '*'
	};
	for (var defaultOpt in defaultOpts) {
		if (defaultOpts.hasOwnProperty(defaultOpt) && !options.hasOwnProperty(defaultOpt)) {
			options[defaultOpt] = defaultOpts[defaultOpt];
		}
	}
	var context = options.context instanceof HTMLElement ? options.context : document.querySelector(opts.context);
	var videoPromises = [].map.call(context.querySelectorAll(options.selector + ':not([data-n-video-js])[data-n-component~="n-video"]'), function (videoEl) {
		return videoFactory(videoEl, options).init()
			// don't fail all if a video errors
			.catch(function () { });
	});
	return Promise.all(videoPromises);
}

module.exports = {
	init: init,
	factory: videoFactory
};
