/* global google */

let sdkScriptLoaded = false;

function createVideoOverlayElement() {
	const overlayEl = document.createElement('div');
	overlayEl.classList.add('o-video__overlay');
	return overlayEl;
}

class VideoAds {
	constructor(video) {
		this.video = video;
		this.adsLoaded = false;
		this.videoLoad = false;

		if (!this.video.placeholderEl) {
			this.overlayEl = createVideoOverlayElement();
			this.video.containerEl.appendChild(this.overlayEl);
		}
	}

	loadAdsLibrary() {
		return new Promise((resolve, reject) => {
			let googleSdkScript = document.querySelector('[src="//imasdk.googleapis.com/js/sdkloader/ima3.js"]');

			if (!googleSdkScript) {
				googleSdkScript = document.createElement('script');
				googleSdkScript.setAttribute('type', 'text/javascript');
				googleSdkScript.setAttribute('src', `//imasdk.googleapis.com/js/sdkloader/ima3.js`);
				googleSdkScript.setAttribute('async', true);
				googleSdkScript.setAttribute('defer', true);
				document.getElementsByTagName("head")[0].appendChild(googleSdkScript);
			}

			if (sdkScriptLoaded) {
				resolve();
			} else {

				googleSdkScript.addEventListener('load', () => {
					sdkScriptLoaded = true;
					resolve();
				});

				googleSdkScript.addEventListener('error', (e) => {
					reject(e);
				});
			}
		});
	}

	getVideoBrand() {
		if (!this.video.videoData || !this.video.videoData.tags || this.video.videoData.tags.length === 0) {
			return false;
		} else {
			let filtered = this.video.videoData.tags.filter(val => val.toLowerCase().indexOf('brand:') !== -1);
			if (filtered.length > 0) {
				try {
					 // when we target the value in the ad server, we only want to target actual brand name, so we strip out "brand:" part of the string
					 return filtered.pop().substring(6);
				}
				catch (e) {
					 return false;
				}
			} else {
				return false;
			}
		}
	}

	setUpAds() {
		this.adContainerEl = document.createElement('div');
		this.video.containerEl.appendChild(this.adContainerEl);
		this.adDisplayContainer = new google.ima.AdDisplayContainer(this.adContainerEl, this.video.videoEl);

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

		this.requestAds();

		this.playAdEventHandler = this.playAdEventHandler.bind(this);
		this.overlayEl && this.overlayEl.addEventListener('click', this.playAdEventHandler);
		this.video.placeholderEl && this.video.placeholderEl.addEventListener('click', this.playAdEventHandler);
	}

	requestAds() {
		// Request video ads.
		const adsRequest = new google.ima.AdsRequest();

		let targeting = `pos=${this.video.targeting.position}&ttid=${this.video.targeting.videoId}`;
		const brand = this.getVideoBrand();
		if (brand) {
			targeting += `&brand=${brand}`;
		}

		let advertisingUrl = `http://pubads.g.doubleclick.net/gampad/ads?env=vp&gdfp_req=1&impl=s&output=xml_vast2&iu=${this.video.targeting.site}&sz=${this.video.targeting.sizes}&unviewed_position_start=1&scp=${encodeURIComponent(targeting)}`;

		adsRequest.adTagUrl = advertisingUrl;

		// Specify the linear and nonlinear slot sizes. This helps the SDK
		// select the correct creative if multiple are returned.
		adsRequest.linearAdSlotWidth = 592;
		adsRequest.linearAdSlotHeight = 333;

		adsRequest.nonLinearAdSlotWidth = 592;
		adsRequest.nonLinearAdSlotHeight = 150;

		this.adsLoader.requestAds(adsRequest);
	}

	adsManagerLoadedHandler(adsManagerLoadedEvent) {
		// Get the ads manager.
		const adsRenderingSettings = new google.ima.AdsRenderingSettings();
		adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
		this.adsManager = adsManagerLoadedEvent.getAdsManager(this.video.videoEl, adsRenderingSettings);

		// Add listeners to the required events.
		this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.adErrorHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.contentPauseRequestHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.contentResumeRequestHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.adEventHandler);

		// Listen to any additional events, if necessary.
		this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.adEventHandler);

		this.adsLoaded = true;
		if (this.videoLoaded) {
			this.startAds();
		}
	}

	startAds() {
		try {
			// Initialize the ads manager. Ad rules playlist will start at this time.
			this.adsManager.init(this.video.videoEl.clientWidth, this.video.videoEl.clientHeight, google.ima.ViewMode.NORMAL);
			// Call play to start showing the ad. Single video and overlay ads will
			// start at this time; the call will be ignored for ad rules.
			this.adsManager.start();
		} catch (adError) {
			// An error may be thrown if there was a problem with the VAST response.
			this.video.videoEl.play();
		}
	}

	playAdEventHandler() {
		// Sets the styling now so the ad occupies the space of the video
		this.adContainerEl.classList.add('o-video__ad');

		this.adDisplayContainer.initialize();
		this.video.videoEl.addEventListener('loadedmetadata', () => {
			this.videoLoaded = true;
			if (this.adsLoaded) {
				this.startAds();
			}
		});

		// Initialize the video. Must be done via a user action on mobile devices.
		this.video.videoEl.load();

		this.overlayEl && this.overlayEl.removeEventListener('click', this.playAdEventHandler);
		this.overlayEl && this.video.containerEl.removeChild(this.overlayEl);
		this.video.placeholderEl && this.video.placeholderEl.removeEventListener('click', this.playAdEventHandler);
	}

	adEventHandler(adEvent) {
		// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
		// don't have ad object associated.
		const ad = adEvent.getAd();
		switch (adEvent.type) {
			case google.ima.AdEvent.Type.LOADED:
				// This is the first event sent for an ad - it is possible to
				// determine whether the ad is a video ad or an overlay.
				if (!ad.isLinear()) {
					// Position AdDisplayContainer correctly for overlay.
					// Use ad.width and ad.height.
					this.video.videoEl.play();
				}
				break;
			case google.ima.AdEvent.Type.STARTED:
				// This event indicates the ad has started - the video player
				// can adjust the UI, for example display a pause button and
				// remaining time.
				if (ad.isLinear()) {
					// For a linear ad, a timer can be started to poll for
					// the remaining time.
					// TODO: We could use this to add a skip ad button
					// Currently not used, could be used in an interval
					// const remainingTime = this.adsManager.getRemainingTime();
				}
				break;
			case google.ima.AdEvent.Type.COMPLETE:
				this.adContainerEl.style.display = 'none';
				if (ad.isLinear()) {
					// Would be used to clear the interval
				}
				break;
		}
	}

	adErrorHandler() {
		this.adsManager && this.adsManager.destroy();
		this.video.containerEl.removeChild(this.adContainerEl);
		this.video.placeholderEl && this.video.placeholderEl.removeEventListener('click', this.playAdEventHandler);
		this.video.opts.advertising = false;
	}

	contentPauseRequestHandler() {
		this.video.videoEl.pause();
	}

	contentResumeRequestHandler() {
		this.video.containerEl.removeChild(this.adContainerEl);
		this.video.videoEl.play();
	}
}

export default VideoAds;
