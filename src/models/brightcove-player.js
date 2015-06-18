'use strict';

function BrightcovePlayer(el, opts) {
	this.el = el;
}

var brightcoveLibraryLoadPromise;

function ensureBrightcoveLibraryLoaded() {
	if (brightcoveLibraryLoadPromise) {
		return brightcoveLibraryLoadPromise;
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', '//players.brightcove.net/47628783001/fb14d319-ef92-49ac-92f7-3b565a32cdd7_default/index.min.js');
	script.setAttribute('async', true);
	script.setAttribute('defer', true);
	document.getElementsByTagName("head")[0].appendChild(script);
	brightcoveLibraryLoadPromise = new Promise(function(resolve, reject) {
		script.addEventListener('load', function() {
			resolve();
		});
	});
	return brightcoveLibraryLoadPromise;
}


BrightcovePlayer.prototype.init = function() {
	var videoId = this.el.getAttribute('data-n-video-id');
	this.el.innerHTML = `
		<video
			data-account="47628783001"
			data-player="fb14d319-ef92-49ac-92f7-3b565a32cdd7"
			data-embed="default"
			data-video-id="${videoId}"
			class="video-js"
			controls></video>`;
	return ensureBrightcoveLibraryLoaded();
};

module.exports = BrightcovePlayer;
