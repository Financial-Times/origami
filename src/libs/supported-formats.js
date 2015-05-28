'use strict';

var testEl = document.createElement('video');
var formats = {
	mpeg4: [
		'video/mp4; codecs="mp4v.20.8"'
	],
	h264: [
		'video/mp4; codecs="avc1.42E01E"',
		'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
	],
	ogg: [
		'video/ogg; codecs="theora"'
	],
	webm: [
		'video/webm; codecs="vp8, vorbis"'
	]
};
var supportedFormats = [];
function testType(typeString) {
	if (testEl.canPlayType(typeString))	{
		supportedFormats.push(format);
		return true;
	} else {
		return false;
	}
}

if (testEl.canPlayType) {
	for (var format in formats) {
		formats[format].some(testType);
	}
}

module.exports = supportedFormats;
