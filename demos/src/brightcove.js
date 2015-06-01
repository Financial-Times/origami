/* global console */

'use strict';

var nVideo = require('../../main');
nVideo.init();

document.body.addEventListener('beacon:media', function (ev) {
	console.log(ev.detail);
});
