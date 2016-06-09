/* global fetch, google */
const crossDomainFetch = require('o-fetch-jsonp').crossDomainFetch;
const Video = require('./video');
const getAppropriateRendition = require('../libs/get-appropriate-rendition');

let currentlyPlayingVideo = null;
let requestedVideo = null;

const pauseOtherVideos = (video) => {
	requestedVideo = video;
	if(currentlyPlayingVideo && currentlyPlayingVideo !== requestedVideo){
		currentlyPlayingVideo.pause();
	}

	currentlyPlayingVideo = video;
};

const clearCurrentlyPlaying = () => {
	if(currentlyPlayingVideo !== requestedVideo){
		currentlyPlayingVideo = null;
	}
};


const eventListener = (video, ev) => {
	const event = new CustomEvent('oTracking.event', {
		detail: {
			action: 'media',
			advertising: video.opts.advertising,
			category: 'video',
			event: ev.type,
			mediaType: 'video',
			contentId: video.id,
			progress: video.getProgress(),
		},
		bubbles: true
	});
	document.body.dispatchEvent(event);
};

const addEvents = (video, events) => {
	events.forEach(event => {
		video.el.addEventListener(event, eventListener.bind(this, video));
	});
};

// use the image resizing service, if width supplied
const updatePosterUrl = (posterImage, width) => {
	let url = `https://image.webservices.ft.com/v1/images/raw/${encodeURIComponent(posterImage)}?source=o-video`;
	if (width) {
		url += `&fit=scale-down&width=${width}`;
	}
	return url;
};

class Brightcove extends Video {
	constructor(el, opts) {
		super(el, opts);
		this.targeting = {
			site: '/5887/ft.com',
			position: 'video',
			sizes: '592x333|400x225',
			videoId: this.id
		};
	}

	getData() {
		const dataPromise = this.opts.data ? Promise.resolve(this.opts.data) : crossDomainFetch(`//next-video.ft.com/api/${this.id}`)
			.then(response => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error('Brightcove responded with a ' + response.status + ' (' + response.statusText + ') for id ' + this.id);
				}
			});

		return dataPromise.then(data => {
			this.brightcoveData = data;
			this.posterImage = updatePosterUrl(data.videoStillURL, this.opts.optimumWidth);
			this.rendition = getAppropriateRendition(data.renditions);
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
		return this;
	}

	init() {
		return this.getData().then(() => this.renderVideo());
	}

	info() {
		const date = new Date(+this.brightcoveData.publishedDate);
		return {
			posterImage: this.posterImage,
			id: this.brightcoveData.id,
			length: this.brightcoveData.length,
			longDescription: this.brightcoveData.longDescription,
			name: this.brightcoveData.name,
			publishedDate: date.toISOString(),
			publishedDateReadable: date.toUTCString(),
			shortDescription: this.brightcoveData.shortDescription,
			tags: this.brightcoveData.tags,
		};
	}

	setUpAds() {
		this.adContainerEl = document.createElement('div');
		this.containerEl.appendChild(this.adContainerEl);
		this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerEl, this.el);

		// Create ads loader.
		this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);

		// Sets up bindings for all Ad related handlers
		this.adsManagerLoadedHandler = this.adsManagerLoadedHandler.bind(this);
		this.adErrorHandler = this.adErrorHandler.bind(this);
		this.adEventHandler = this.adEventHandler.bind(this);
		this.contentPauseRequestHandler = this.contentPauseRequestHandler.bind(this);
		this.contentResumeRequestHandler = this.contentResumeRequestHandler.bind(this);

		// Listen and respond to ads loaded and error events.
		this.adsLoader.addEventListener(
			google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
			this.adsManagerLoadedHandler,
			false);
		this.adsLoader.addEventListener(
			google.ima.AdErrorEvent.Type.AD_ERROR,
			this.adErrorHandler,
			false);

		// Request video ads.
		const adsRequest = new google.ima.AdsRequest();
		let advertisingUrl = `http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=${this.targeting.site}&sz=${this.targeting.sizes}&unviewed_position_start=1&scp=pos%3D${this.targeting.position}&ttid=${this.targeting.videoId}`;
		if(this.targeting.brand) {
			advertisingUrl += `&brand=${encodeURIComponent(this.targeting.brand)}`;
		}

		adsRequest.adTagUrl = advertisingUrl;

		// Specify the linear and nonlinear slot sizes. This helps the SDK to
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = 592;
		adsRequest.linearAdSlotHeight = 333;

		adsRequest.nonLinearAdSlotWidth = 592;
		adsRequest.nonLinearAdSlotHeight = 150;

		this.adsLoader.requestAds(adsRequest);
	}

	addVideo() {
		this.el = document.createElement('video');
		this.el.setAttribute('controls', true);
		this.el.setAttribute('poster', this.posterImage);
		this.el.setAttribute('src', this.rendition.url);
		this.el.className = Array.isArray(this.classes) ? this.classes.join(' ') : this.classes;
		this.containerEl.classList.add('o-video--player');
		this.containerEl.appendChild(this.el);
		addEvents(this, ['play', 'pause', 'ended']);
		this.el.addEventListener('playing', () => pauseOtherVideos(this.el));
		this.el.addEventListener('suspend', clearCurrentlyPlaying);
		this.el.addEventListener('ended', clearCurrentlyPlaying);

		if (this.opts.advertising) {
			this.setUpAds();
		}
	}

	addPlaceholder() {
		this.placeholderEl = document.createElement('img');
		this.placeholderEl.setAttribute('src', this.posterImage);
		this.placeholderEl.classList.add('o-video__placeholder');
		this.containerEl.appendChild(this.placeholderEl);

		let titleEl;
		if (this.opts.placeholderTitle) {
			titleEl = document.createElement('div');
			titleEl.className = 'o-video__title';
			titleEl.textContent = this.brightcoveData.name;
			this.containerEl.appendChild(titleEl);
		}

		if (this.opts.playButton) {
			const playButtonEl = document.createElement('button');
			playButtonEl.className = 'o-video__play-button';

			const playButtonTextEl = document.createElement('dd');
			playButtonTextEl.className = 'o-video__play-button-text';
			playButtonTextEl.textContent = 'Play video';
			playButtonEl.appendChild(playButtonTextEl);

			const playIconEl = document.createElement('i');
			playIconEl.className = 'o-video__play-button-icon';
			playButtonEl.appendChild(playIconEl);

			this.containerEl.appendChild(playButtonEl);

			playButtonEl.addEventListener('click', () => {
				this.containerEl.removeChild(playButtonEl);
				if (titleEl) {
					this.containerEl.removeChild(titleEl);
				}
				this.containerEl.removeChild(this.placeholderEl);

				this.el.style.display = 'block';
				this.el.play();
				this.el.focus();
			});
		}

		// Adds video soon so ads can start loading
		this.addVideo();
		// Hide it so it doesn't flash until the placeholder image loads
		this.el.style.display = 'none';
	}

	getProgress() {
		return this.el.duration ? parseInt(100 * this.el.currentTime / this.el.duration, 10) : 0;
	}

	playAdEventHandler() {
		// Sets the styling now so the ad occupies the space of the video
		this.adContainerEl.classList.add('o-video__ad');
		// Initialize the video. Must be done via a user action on mobile devices.
		this.el.load();
		this.adDisplayContainer.initialize();

		try {
			// Initialize the ads manager. Ad rules playlist will start at this time.
			this.adsManager.init(this.el.clientWidth, this.el.clientHeight, google.ima.ViewMode.NORMAL);
			// Call play to start showing the ad. Single video and overlay ads will
			// start at this time; the call will be ignored for ad rules.
			this.adsManager.start();
		} catch (adError) {
			// An error may be thrown if there was a problem with the VAST response.
			this.el.play();
		}

		this.el.removeEventListener('play', this.playAdEventHandler);
	}

	adsManagerLoadedHandler(adsManagerLoadedEvent) {
		// If the video has started before the ad loaded, don't load the ad
		if (this.el.played.length > 0) {
			return;
		}
		// Get the ads manager.
		const adsRenderingSettings = new google.ima.AdsRenderingSettings();
		adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
		this.adsManager = adsManagerLoadedEvent.getAdsManager(this.el, adsRenderingSettings);

		// Add listeners to the required events.
		this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.adErrorHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.contentPauseRequestHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.contentResumeRequestHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.adEventHandler);

		// Listen to any additional events, if necessary.
		this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.adEventHandler);

		this.playAdEventHandler = this.playAdEventHandler.bind(this);
		this.el.addEventListener('play', this.playAdEventHandler);
	}

	adEventHandler(adEvent) {
		// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
		// don't have ad object associated.
		const ad = adEvent.getAd();
		let intervalTimer;
		switch (adEvent.type) {
			case google.ima.AdEvent.Type.LOADED:
				// This is the first event sent for an ad - it is possible to
				// determine whether the ad is a video ad or an overlay.
				if (!ad.isLinear()) {
					// Position AdDisplayContainer correctly for overlay.
					// Use ad.width and ad.height.
					this.el.play();
				}
				break;
			case google.ima.AdEvent.Type.STARTED:
				// This event indicates the ad has started - the video player
				// can adjust the UI, for example display a pause button and
				// remaining time.
				if (ad.isLinear()) {
					// For a linear ad, a timer can be started to poll for
					// the remaining time.
					intervalTimer = setInterval(() => {
						// Currently not used
						// const remainingTime = this.adsManager.getRemainingTime();
					}, 300); // every 300ms
				}
				break;
			case google.ima.AdEvent.Type.COMPLETE:
				this.adContainerEl.style.display = 'none';
				if (ad.isLinear()) {
					clearInterval(intervalTimer);
				}
				break;
		}
	}

	adErrorHandler() {
		// Handle the error logging.
		this.adsManager.destroy();
	}

	contentPauseRequestHandler() {
		this.el.pause();
	}

	contentResumeRequestHandler() {
		this.containerEl.removeChild(this.adContainerEl);
		this.el.play();
	}
}

module.exports = Brightcove;
