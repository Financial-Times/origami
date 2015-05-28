'use strict';

var video = require('../../main');
video.init();

document.body.addEventListener('beacon:media', function (ev) {
	console.log(ev.detail);
});
