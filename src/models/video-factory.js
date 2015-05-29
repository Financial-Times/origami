'use strict';

var Video = require('./video');
var Brightcove = require('./brightcove');
var YouTube = require('./you-tube');

module.exports = function (el, opts) {
	var source = el.getAttribute('data-n-video-source').toLowerCase();

	if (source === 'brightcove') {
		return new Brightcove(el, opts);
	} else if (source === 'youtube') {
		return new YouTube(el, opts);
	} else {
		return new Video(el, opts);
	}

};
