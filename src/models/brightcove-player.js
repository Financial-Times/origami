/*global brightcove*/
'use strict';

var brightcoveLibraryLoadPromise;

function BrightcovePlayer(el, opts) {
	this.el = el;
}

BrightcovePlayer.prototype.init = function() {
	var videoId = this.el.getAttribute('data-n-video-id');
	var output = `
		<iframe class="n-video__brightcove" src='//players.brightcove.net/47628783001/fb14d319-ef92-49ac-92f7-3b565a32cdd7_default/index.html?videoId=${videoId}' allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
	`;
	this.el.innerHTML = output;
	return ensureBrightcoveLibraryLoaded()
		.then(function() {
			brightcove.createExperiences();
		});
};

module.exports = BrightcovePlayer;
