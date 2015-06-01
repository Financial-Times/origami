'use strict';

module.exports = function (renditions, options) {
	// allow mocking of supported formats module
	var opts = options || {};
	var width = opts.width;
	var supportedFormats = opts.supportedFormats || require('../libs/supported-formats');
	var appropriateRendition;
	// order smallest to largest
	var orderedRenditions = renditions
		.filter(function (rendition) {
			return supportedFormats.indexOf(rendition.videoCodec.toLowerCase()) > -1;
		})
		.sort(function (renditionOne, renditionTwo) {
			return renditionOne.frameWidth - renditionTwo.frameWidth;
		});

	// if no width supplied, get largest
	if (!width) {
		return orderedRenditions.pop();
	}
	// NOTE: rather use find...
	orderedRenditions.some(function (rendition) {
		if (rendition.frameWidth >= width) {
			appropriateRendition = rendition;
			return true;
		}
		return false;
	});

	return appropriateRendition || orderedRenditions.shift();
};
