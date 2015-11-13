/*global videojs*/
'use strict';

var Video = require('./video');

var playerInstanceId = 0;

var ACCOUNT_ID = '47628783001';
var PLAYER_ID = '0e517ef5-7b18-4307-9244-4d7a31591a9e';

function eventListener(video, ev) {
	var event = document.createEvent('Event');
	event.initEvent('beacon:media', true, true);
	event.detail = {
		mediaType: 'video',
		contentId: video.id,
		domPath: video.domPath,
		domPathTokens: video.domPathTokens,
		event: ev.type
	};
	document.body.dispatchEvent(event);
}

function BrightcovePlayer() {
	Video.apply(this, arguments);
	playerInstanceId++;
	this.instanceId = playerInstanceId;
}

var brightcoveLibraryLoadPromise;

function ensureBrightcoveLibraryLoaded() {
	if (brightcoveLibraryLoadPromise) {
		return brightcoveLibraryLoadPromise;
	}
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', `//players.brightcove.net/${ACCOUNT_ID}/${PLAYER_ID}_default/index.min.js`);
	script.setAttribute('async', true);
	script.setAttribute('defer', true);
	document.getElementsByTagName("head")[0].appendChild(script);
	brightcoveLibraryLoadPromise = new Promise(function(resolve) {
		script.addEventListener('load', function() {
			resolve();
		});
	});
	return brightcoveLibraryLoadPromise;
}


BrightcovePlayer.prototype.init = function() {
	var videoId = this.containerEl.getAttribute('data-n-video-id');
	var brightcovePlayerInstance = this;
	this.containerEl.innerHTML = `<div class="n-video__brightcove-player"><video
			id="brightcove-player-${this.instanceId}"
			data-account="${ACCOUNT_ID}"
			data-player="${PLAYER_ID}"
			data-embed="default"
			data-video-id="${videoId}"
			class="video-js"
			controls></video></div>`;
	return ensureBrightcoveLibraryLoaded()
		.then(function() {
			videojs(`brightcove-player-${brightcovePlayerInstance.instanceId}`)
				.ready(function() {
					['play', 'pause', 'ended'].forEach(function(eventName) {
						this.on(eventName, eventListener.bind(this, brightcovePlayerInstance));
					}, this);
				});
		});
};

module.exports = BrightcovePlayer;
