/*global videojs*/
const Video = require('./video');

let playerInstanceId = 0;

const ACCOUNT_ID = '47628783001';
const PLAYER_ID = '0e517ef5-7b18-4307-9244-4d7a31591a9e';

const eventListener = (video, ev) => {
	const event = document.createEvent('Event');
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

let brightcoveLibraryLoadPromise;

const ensureBrightcoveLibraryLoaded = () => {
	if (brightcoveLibraryLoadPromise) {
		return brightcoveLibraryLoadPromise;
	}
	const script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', `//players.brightcove.net/${ACCOUNT_ID}/${PLAYER_ID}_default/index.min.js`);
	script.setAttribute('async', true);
	script.setAttribute('defer', true);
	document.getElementsByTagName("head")[0].appendChild(script);
	brightcoveLibraryLoadPromise = new Promise(resolve => {
		script.addEventListener('load', () => {
			resolve();
		});
	});
	return brightcoveLibraryLoadPromise;
}

class BrightcovePlayer extends Video {
	constructor(el, opts) {
		super(el, opts);
		playerInstanceId++;
		this.instanceId = playerInstanceId;
	}

	init () {
		const videoId = this.containerEl.getAttribute('data-n-video-id');
		const brightcovePlayerInstance = this;
		this.containerEl.innerHTML = `<div class="n-video__brightcove-player"><video
				id="brightcove-player-${this.instanceId}"
				data-account="${ACCOUNT_ID}"
				data-player="${PLAYER_ID}"
				data-embed="default"
				data-video-id="${videoId}"
				class="video-js"
				controls></video></div>`;
		return ensureBrightcoveLibraryLoaded()
			.then(() => {
				videojs(`brightcove-player-${brightcovePlayerInstance.instanceId}`)
					.ready(() => {
						['play', 'pause', 'ended'].forEach(eventName => {
							this.on(eventName, eventListener.bind(this, brightcovePlayerInstance));
						}, this);
					});
			});
	}
}

module.exports = BrightcovePlayer;
