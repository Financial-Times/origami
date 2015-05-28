'use strict';

var Video = require('./video');
var Brightcove = require('./brightcove');

module.exports = function (el, opts) {
	var source = el.getAttribute('data-next-video-source').toLowerCase();

	if (source === 'brightcove') {
		return new Brightcove(el, opts);
	} else {
		return new Video(el, opts);
	}

};
