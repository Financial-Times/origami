/*global videojs*/
'use strict';

var Video = require('./video');

var playerInstanceId = 0;

function eventListener(video, ev) {
	var event = document.createEvent('Event');
	event.initEvent('beacon:media', true, true);
	event.detail = {
		mediaType: 'video',
		contentId: video.id,
		domPath: video.domPath,
		domPathTokens: video.domPathTokens,
		event: ev.type,
		progress: video.getProgress()
	};
	document.body.dispatchEvent(event);
}

function BrightcovePlayer() {
	Video.apply(this, arguments);
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
	playerInstanceId++;
	var videoId = this.containerEl.getAttribute('data-n-video-id');
	var brightcovePlayerInstance = this;
	this.containerEl.innerHTML = `<div class="n-video__brightcove-player"><video
			id="brightcove-player-${playerInstanceId}"
			data-account="47628783001"
			data-player="fb14d319-ef92-49ac-92f7-3b565a32cdd7"
			data-embed="default"
			data-video-id="${videoId}"
			class="video-js"
			controls></video></div>`;
	return ensureBrightcoveLibraryLoaded()
		.then(function() {
			videojs(`brightcove-player-${playerInstanceId}`)
				.ready(function() {
					['play', 'pause', 'ended'].forEach(function(eventName) {
						this.on(eventName, eventListener.bind(this, brightcovePlayerInstance));
					}, this);
				});
		});
};

module.exports = BrightcovePlayer;
