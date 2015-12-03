/* global console */
const nVideo = require('../../main');
nVideo.init();

document.body.addEventListener('beacon:media', ev => {
	console.log(ev.detail);
});
