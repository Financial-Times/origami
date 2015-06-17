'use strict';

var Video = require('./video');
var Brightcove = require('./brightcove');
var BrightcovePlayer = require('./brightcove-player');
var YouTube = require('./you-tube');

module.exports = function (el, opts) {
	var source = el.getAttribute('data-n-video-source').toLowerCase();
	var player = (el.getAttribute('data-n-video-player') || 'html5').toLowerCase();

	if (source === 'brightcove') {
		if (player === 'brightcove') {
			return new BrightcovePlayer(el, opts);
		}
		return new Brightcove(el, opts);
	} else if (source === 'youtube') {
		return new YouTube(el, opts);
	} else {
		return new Video(el, opts);
	}

};
