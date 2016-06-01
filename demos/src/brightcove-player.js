/* global console */
const oVideo = require('../../main');
oVideo.init();

document.body.addEventListener('beacon:media', ev => {
	console.log(ev.detail);
});
