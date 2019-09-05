/* global fetch */
import oViewport from 'o-viewport';

import getRendition from './helpers/get-rendition';
import VideoAds from './ads';
import VideoInfo from './info';
import Playlist from './playlist';
import Guidance from './guidance';

function listenOnce(el, eventName, fn) {
	const wrappedFn = function(...args) {
		el.removeEventListener(eventName, wrappedFn);
		fn(...args);
	};
	el.addEventListener(eventName, wrappedFn);
}

function eventListener(video, ev) {

	// On some platforms (eg iOS), the Google advert library will use the main <video> element
	// used by o-video to also play a pre-roll advert; as the advert plays, this will trigger
	// the normal <video> event listeners.  Discard events that we can identify as coming
	// from the pre-roll rather than the main content.
	// To do this, check whether advertising is still enabled (it'll be disabled on any error),
	// and for the video ads load and completed flags.
	if (video.opts.advertising && video.videoAds && video.videoAds.adsLoaded && !video.videoAds.adsCompleted) {
		return;
	}

	// Dispatch progress event at around 25%, 50%, 75% and 100%
	if (ev.type === 'progress' && !shouldDispatch(video)) {
		return;
	}

	fireEvent(ev.type, video, {
		progress: video.getProgress(),
		duration: video.getDuration(),
		textTrackMode: video.getTrackMode()
	});
}

function fireEvent(action, video, extraDetail = {}) {
	const event = new CustomEvent('oTracking.event', {
		detail: Object.assign({
			category: 'video',
			action,
			advertising: video.opts.advertising,
			contentId: video.opts.id,
		}, extraDetail),
		bubbles: true
	});
	document.body.dispatchEvent(event);
}

const dispatchedProgress = {};
function shouldDispatch(video) {
	const progress = video.getProgress();
	const id = video.opts.id;
	const relevantProgressPoints = [
		8, 9, 10, 11, 12,
		23, 24, 25, 26, 27,
		48, 49, 50, 51, 52,
		73, 74, 75, 76, 77,
		100
	];

	// Initialise dispatched progress store
	if (!dispatchedProgress[id]) {
		dispatchedProgress[id] = [];
	}

	// Progress is not relevant
	if (!relevantProgressPoints.includes(progress)) {
		return false;
	}

	// Progress has already been dispatched
	if (dispatchedProgress[id].includes(progress)) {
		return false;
	}

	dispatchedProgress[id].push(progress);
	return true;
}

function addEvents(video, events) {
	events.forEach(event => {
		video.videoEl.addEventListener(event, eventListener.bind(this, video));
	});
}

// use the image resizing service, if width supplied
function updatePosterUrl(posterImage, width, systemcode) {
	let url = `https://www.ft.com/__origami/service/image/v2/images/raw/${encodeURIComponent(posterImage)}?source=${systemcode}&quality=low`;
	if (width) {
		url += `&fit=scale-down&width=${width}`;
	}

	return url;
}

// converts data-o-video attributes to an options object
function getOptionsFromDataAttributes(attributes) {
	const opts = {};
	// Try to get config set declaratively on the element
	Array.prototype.forEach.call(attributes, (attr) => {
		if (attr.name.indexOf('data-o-video') === 0) {
			// Remove the prefix part of the data attribute name and hyphen-case to camelCase
			const key = attr.name.replace('data-o-video-', '').replace(/-([a-z])/g, (m, w) => {
				return w.toUpperCase();
			});

			try {
				// If it's a JSON, a boolean or a number, we want it stored like that, and not as a string

				// For legacy o-video embeds, we'll need to check for placeHolderInfo attributes
				// as they typically pass data in with single quotes, which won't parse:
				// data-o-video-placeholder-info="['title', 'description']"
				if (key === 'placeholderInfo') {
					opts[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
				} else {
					opts[key] = JSON.parse(attr.value);
				}
			} catch (e) {
				opts[key] = attr.value;
			}
		}
	});
	return opts;
}

function unloadListener() {
	this.updateAmountWatched();
	fireEvent('watched', this, {
		amount: this.getAmountWatched(0),
		amountPercentage: this.getAmountWatchedPercentage(0)
	});
}

function visibilityListener(ev) {
	if (ev.detail.hidden) {
		this.updateAmountWatched();
	} else if (!this.videoEl.paused) {
		this.markPlayStart();
	}
}

const unloadEventName = ('onbeforeunload' in window) ? 'beforeunload' : 'unload';

const defaultOpts = {
	advertising: false,
	allProgress: false,
	autorender: true,
	classes: [],
	optimumwidth: null,
	placeholder: false,
	placeholderInfo: ['title'],
	placeholderHint: '',
	playsinline: false,
	showCaptions: true,
	showGuidance: true,
	data: null
};

class Video {
	constructor(el, opts) {
		this.containerEl = el;
		// amount of the video, in milliseconds, that has actually been 'watched'
		this.amountWatched = 0;
		this.fireWatchedEvent = unloadListener.bind(this);
		this.visibilityListener = visibilityListener.bind(this);
		this.didUserPressPlay = false;

		this.opts = Object.assign({}, defaultOpts, opts, getOptionsFromDataAttributes(this.containerEl.attributes));

		if(typeof this.opts.systemcode !== 'string') {
			throw new Error('o-video requires "systemcode" is configured using the "data-o-video-systemcode" data attribute, or configured with the `opts` constructor argument. It must be set to a valid [Bizops system code](https://biz-ops.in.ft.com/list/Systems).');
		}

		if (typeof this.opts.classes === 'string') {
			this.opts.classes = this.opts.classes.split(' ');
		}

		if (this.opts.classes.indexOf('o-video__video') === -1) {
			this.opts.classes.push('o-video__video');
		}

		this.targeting = {
			site: '/5887/ft.com',
			position: 'video',
			sizes: '592x333|400x225',
			videoId: this.opts.id
		};

		if (this.opts.advertising) {
			this.videoAds = new VideoAds(this);
		}

		this.containerEl.setAttribute('data-o-video-js', '');

		if (this.opts.autorender === true) {
			this.init();
		}

		if (this.opts.showGuidance) {
			this.guidance = new Guidance();
		}
	}

	getData() {
		const dataPromise = this.opts.data ?
			Promise.resolve(this.opts.data) :
			fetch(`https://next-media-api.ft.com/v1/${this.opts.id}`)
				.then(response => {
					if (response.ok) {
						return response.json();
					} else {
						throw Error('Next Media API responded with a ' + response.status + ' (' + response.statusText + ') for id ' + this.opts.id);
					}
				});

		return dataPromise.then(data => {
			this.videoData = data;
			this.posterImage = data.mainImageUrl && updatePosterUrl(data.mainImageUrl, this.opts.optimumwidth, this.opts.systemcode);
			this.rendition = getRendition(data.renditions, this.opts);
		});
	}

	renderVideo() {
		if (this.rendition) {
			if (this.opts.placeholder) {
				this.addPlaceholder();
			} else {
				this.addVideo();
			}
		}
	}

	init() {
		return (this.opts.advertising ? VideoAds.loadAdsLibrary() : Promise.resolve())
			.catch(() => {
				// If ad doesn't load for some reason, load video as normal
				this.opts.advertising = false;
			})
			.then(() => this.getData())
			.then(() => this.renderVideo());
	}

	addVideo() {
		this.liveRegionEl = document.createElement('div');
		this.liveRegionEl.setAttribute('aria-live','assertive');
		this.liveRegionEl.classList.add('o-video__live-region');
		this.videoEl = document.createElement('video');
		this.videoEl.controls = true;
		this.videoEl.className = Array.isArray(this.opts.classes) ? this.opts.classes.join(' ') : this.opts.classes;
		this.containerEl.classList.add('o-video--player');

		if (this.opts.playsinline) {
			this.videoEl.setAttribute('playsinline', 'true');
			this.videoEl.setAttribute('webkit-playsinline', 'true');
		}

		// disable download button in Chrome 58+
		if (this.videoEl.controlsList) {
			this.videoEl.controlsList.add('nodownload');
		}

		this.updateVideo();

		if (this.placeholderEl && !this.opts.advertising) {
			this.videoEl.autoplay = this.videoEl.autostart = true;
		}

		this.containerEl.appendChild(this.liveRegionEl);
		this.containerEl.appendChild(this.videoEl);

		addEvents(this, ['playing', 'pause', 'ended', 'progress', 'seeked', 'error', 'stalled']);
		this.videoEl.addEventListener('playing', this.pauseOtherVideos.bind(this));
		this.videoEl.addEventListener('playing', this.markPlayStart.bind(this));
		this.videoEl.addEventListener('pause', this.updateAmountWatched.bind(this));
		this.videoEl.addEventListener('suspend', this.clearCurrentlyPlaying.bind(this));
		this.videoEl.addEventListener('ended', this.clearCurrentlyPlaying.bind(this));

		if (this.opts.advertising) {
			this.videoAds.setUpAds();
		}

		// send 'watched' event on page unload,
		window.addEventListener(unloadEventName, this.fireWatchedEvent);
		oViewport.listenTo('visibility');
		// pause 'watching' the video if the tab is hidden
		window.addEventListener('oViewport.visibility', this.visibilityListener);
	}

	addCaptions() {
		if (this.opts.showCaptions === false) {
			return;
		}

		if (typeof this.videoData === 'undefined') {
			throw new Error('Please call `getData()` before calling `addCaptions()` directly.');
		}

		const existingTrackEl = this.videoEl.querySelector('track');
		if (existingTrackEl) {
			this.videoEl.removeChild(existingTrackEl);
		}

		if (this.videoData.captionsUrl) {
			// FIXME this is all hardcoded as English captions at the moment
			const trackEl = document.createElement('track');
			trackEl.setAttribute('label', 'English');
			trackEl.setAttribute('kind', 'captions');
			trackEl.setAttribute('srclang', 'en');
			trackEl.setAttribute('src', this.videoData.captionsUrl);
			trackEl.setAttribute('crossorigin', 'true');
			this.videoEl.setAttribute('crossorigin', 'true');
			this.videoEl.appendChild(trackEl);
		}
	}

	updateVideo() {
		if (this.posterImage) {
			this.videoEl.poster = this.posterImage;
		} else {
			this.videoEl.removeAttribute('poster');
		}

		this.videoEl.src = this.rendition && this.rendition.url;
		if (this.guidance) {
			this.guidance.removeBanner();
		}
		listenOnce(this.videoEl, 'playing', this.showGuidanceBanner.bind(this));

		this.addCaptions();
	}

	addPlaceholder() {
		this.placeholderEl = document.createElement('div');
		this.placeholderEl.className = 'o-video__placeholder';

		this.placeholderImageEl = document.createElement('img');
		this.placeholderImageEl.className = 'o-video__placeholder-image';
		this.placeholderImageEl.setAttribute('role', 'presentation');
		this.placeholderImageEl.setAttribute('alt', '');

		this.placeholderEl.appendChild(this.placeholderImageEl);

		// info panel
		if (this.opts.placeholderInfo.length) {
			this.infoPanel = new VideoInfo(this);
		}

		// play button
		const playCTA = document.createElement('div');
		playCTA.className = `o-video__play-cta ${this.opts.placeholderHint ? 'o-video__play-cta--with-hint' : 'o-video__play-cta--without-hint'}`;

		const playButtonEl = document.createElement('button');
		playButtonEl.className = 'o-video__play-button';

		this.playButtonIconEl = document.createElement('span');
		this.playButtonIconEl.className = 'o-video__play-button-icon';
		this.playButtonIconEl.textContent = this.opts.placeholderHint;


		playCTA.appendChild(this.playButtonIconEl);

		const { captionsUrl } = this.videoData || {};
		if (!captionsUrl && this.guidance) {
			playCTA.appendChild(this.guidance.createPlaceholder());
		}
		playButtonEl.appendChild(playCTA);

		this.placeholderEl.appendChild(playButtonEl);

		this.placeholderEl.addEventListener('click', () => {
			this.didUserPressPlay = true;
			this.play();
		});

		this.updatePlaceholder();

		this.containerEl.appendChild(this.placeholderEl);
	}

	play() {
		if (this.placeholderEl) {

			// Adds video soon so ads can start loading
			this.addVideo();
			this.videoEl.focus();

			this.containerEl.removeChild(this.placeholderEl);
			if (this.infoPanel) {
				this.infoPanel.teardown();
			}

			delete this.placeholderEl;
			delete this.placeholderImageEl;
		} else {
			this.videoEl.play();
		}
	}

	updatePlaceholder() {
		if (this.posterImage) {
			this.placeholderImageEl.src = this.posterImage;
		}

		if (this.infoPanel) {
			this.infoPanel.update();
		}

		if (this.playButtonIconEl) {
			this.playButtonIconEl.setAttribute('aria-label', `Play video ${this.videoData.title}`);
		}
	}

	update(newOpts) {
		if (this.videoEl) {
			this.videoEl.pause();
		}
		this.clearCurrentlyPlaying();

		this.didUserPressPlay = false;

		this.opts = Object.assign(this.opts, { data: null }, newOpts);

		if (!this.videoEl && !this.placeholderEl) {
			return this.init();
		}

		return this.getData().then(() => {
			if (this.placeholderEl) {
				this.updatePlaceholder();
			} else {
				this.updateVideo();
			}
		});
	}

	getProgress() {
		return this.videoEl.duration ? parseInt(100 * this.videoEl.currentTime / this.videoEl.duration, 10) : 0;
	}

	getDuration() {
		return this.videoEl.duration ? parseInt(this.videoEl.duration, 10) : 0;
	}

	getTrackMode() {
		return this.videoEl.textTracks && this.videoEl.textTracks[0] ? this.videoEl.textTracks[0].mode : undefined;
	}

	getAmountWatched(decimalPoints) {
		const secondsWatched = this.amountWatched / 1000;
		return decimalPoints !== undefined ? +(secondsWatched).toFixed(decimalPoints) : secondsWatched;
	}

	getAmountWatchedPercentage(decimalPoints) {
		const percentageWatched = this.videoEl && this.videoEl.duration ? (100 / this.videoEl.duration) * this.getAmountWatched() : 0;
		return decimalPoints !== undefined ? +(percentageWatched).toFixed(decimalPoints) : percentageWatched;
	}

	pauseOtherVideos() {
		if (this.currentlyPlayingVideo && this.currentlyPlayingVideo !== this.videoEl) {
			this.currentlyPlayingVideo.pause();
		}

		this.currentlyPlayingVideo = this.videoEl;
	}

	clearCurrentlyPlaying() {
		if (this.currentlyPlayingVideo !== this.videoEl) {
			this.currentlyPlayingVideo = null;
		}
	}

	markPlayStart () {
		this.playStart = Date.now();
	}

	updateAmountWatched () {
		if (this.playStart !== undefined) {
			this.amountWatched += Date.now() - this.playStart;
			this.playStart = undefined;
		}
	}

	resetAmountWatched () {
		this.amountWatched = 0;
	}

	showGuidanceBanner () {
		const { captionsUrl } = this.videoData || {};
		if (!this.didUserPressPlay && !captionsUrl && this.guidance) {
			this.containerEl.appendChild(this.guidance.createBanner());
		}
	}

	destroy () {
		// remove listeners
		window.removeEventListener(unloadEventName, this.fireWatchedEvent);
		window.removeEventListener('oViewport.visibility', this.visibilityListener);
	}

	static init(rootEl, config) {
		const videos = [];
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const videoEls = rootEl.querySelectorAll(':not([data-o-video-js])[data-o-component~="o-video"]');

		for (let i = 0; i < videoEls.length; i++) {
			videos.push(new Video(videoEls[i], config));
		}

		return videos;
	}
}

Video.Playlist = Playlist;

export default Video;
