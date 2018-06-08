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

		// only when these three conditions are met will the video play
		this.adsLoaded = false;
		this.videoLoaded = false;
		this.loadingStateDisplayed = false;

		// record when the advert has completed
		this.adsCompleted = false;
	}

	static loadAdsLibrary() {
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

			if (sdkScriptLoaded || (window.google && window.google.ima)) {
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
		if (!this.video.videoData || !this.video.videoData.brand || !this.video.videoData.brand.name) {
			return false;
		} else {
			return this.video.videoData.brand.name;
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
		this.getAdProgress = this.getAdProgress.bind(this);

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
		if (this.video.opts.placeholder) {
			this.playAdEventHandler();
		} else {
			this.overlayEl = createVideoOverlayElement();
			this.video.containerEl.appendChild(this.overlayEl);
			this.overlayEl.addEventListener('click', this.playAdEventHandler);
		}
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

		// Temporary fix to verify DFP behaviour
		const options = {
			detail: {
				category: 'video',
				action: 'adRequested',
				contentId: this.video.opts.id
			},
			bubbles: true
		};
		const requestedEvent = new CustomEvent('oTracking.event', options);
		document.body.dispatchEvent(requestedEvent);

		this.adsLoader.requestAds(adsRequest);
	}

	adsManagerLoadedHandler(adsManagerLoadedEvent) {
		// Get the ads manager.
		const adsRenderingSettings = new google.ima.AdsRenderingSettings();
		adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
		this.adsManager = adsManagerLoadedEvent.getAdsManager(this.video.videoEl, adsRenderingSettings);

		// Add listeners to the required events.
		this.adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, this.adErrorHandler);

		// "Fired when content should be paused. This usually happens right before an ad is about to cover the content"
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, this.contentPauseRequestHandler);

		// "Fired when content should be resumed. This usually happens when an ad finishes or collapses"
		this.adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, this.contentResumeRequestHandler);

		// "Fired when the ads manager is done playing all the ads"
		this.adsManager.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED, this.adEventHandler);

		// Listen to any additional events, if necessary.
		this.adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, this.adEventHandler);
		this.adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED, this.adEventHandler);

		this.adsLoaded = true;
		this.startAds();
	}

	startAds() {

		// For ads to play correctly both the video and the advert video need to be ready to
		// play; this function needs to be called after the two flags in adsManagerLoadedHandler()
		// and playAdEventHandler() have been set.
		// So if the video hasn't loaded yet, wait until it has.
		if (!this.videoLoaded) {
			return;
		}

		// We want to display an ad loading notice for a time on screen, we don't want it to flicker
		// and leave the user wondering if they missed something/think we're testing subliminal ads!
		if (!this.loadingStateDisplayed) {
			return;
		}

		// If ads have failed to load, which resets the advertising support flag, play the video
		// instead; otherwise, wait until the ads have loaded.
		if (!this.video.opts.advertising) {
			this.playUserVideo();
		} else if (!this.adsLoaded) {
			return;
		}

		// Remove the preloading spinner
		if (this.loadingStateEl) {
			this.loadingStateEl.parentNode.removeChild(this.loadingStateEl);
			this.loadingStateEl = null;
		}

		try {
			// Initialize the ads manager. Ad rules playlist will start at this time.
			this.adsManager.init(this.video.videoEl.clientWidth, this.video.videoEl.clientHeight, google.ima.ViewMode.NORMAL);
			// Call play to start showing the ad. Single video and overlay ads will
			// start at this time; the call will be ignored for ad rules.
			this.adsManager.start();
		} catch (adError) {
			// An error may be thrown if there was a problem with the VAST response.
			this.reportError(adError);
			this.playUserVideo();
		}
	}

	playAdEventHandler() {
		// Sets the styling now so the ad occupies the space of the video
		this.adContainerEl.classList.add('o-video__ad');

		// "Call this method as a direct result of a user action before starting the ad playback..."
		// <https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdDisplayContainer.initialize>
		this.adDisplayContainer.initialize();

		// We want to display a loading state - otherwise it can look
		// like we're not responding to their action when we're actually fetching an ad
		this.loadingStateEl = document.createElement('span');
		this.loadingStateEl.setAttribute('role', 'progressbar');
		this.loadingStateEl.setAttribute('aria-valuetext', 'Loading');
		this.loadingStateEl.className = 'o-video__loading-state';
		this.adContainerEl.appendChild(this.loadingStateEl);

		// display the loading state for a minimum of 2 seconds to avoid flickering
		setTimeout(() => {
			this.loadingStateDisplayed = true;
			this.startAds();
		}, 1000 * 2);

		const loadedmetadataHandler = () => {
			this.videoLoaded = true;
			this.startAds();
			this.video.videoEl.removeEventListener('loadedmetadata', loadedmetadataHandler);
		};

		this.video.videoEl.addEventListener('loadedmetadata', loadedmetadataHandler);

		// Initialize the video. Must be done via a user action on mobile devices.
		this.video.videoEl.load();

		if (this.overlayEl) {
			this.overlayEl.removeEventListener('click', this.playAdEventHandler);
			this.video.containerEl.removeChild(this.overlayEl);
		}
		delete this.overlayEl;
	}

	adEventHandler(adEvent) {
		// Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
		// don't have ad object associated.
		const ad = adEvent.getAd();

		const options = {
			detail: {
				advertising: true,
				category: 'video',
				contentId: this.video.opts.id,
				progress: 0,
				adDuration: ad.getDuration(),
				adMinDuration: ad.getMinSuggestedDuration(),
				adTitle: ad.getTitle(),
				adProgress: this.getAdProgress()
			},
			bubbles: true
		};

		switch (adEvent.type) {
			case google.ima.AdEvent.Type.LOADED: {
				// This is the first event sent for an ad - it is possible to
				// determine whether the ad is a video ad or an overlay.
				if (!ad.isLinear()) {
					// Position AdDisplayContainer correctly for overlay.
					// Use ad.width and ad.height.
					this.playUserVideo();
				}
				break;
			}
			case google.ima.AdEvent.Type.STARTED: {
				// This event indicates the ad has started - the video player
				// can adjust the UI, for example display a pause button and
				// remaining time.
				options.detail.action = 'adStart';
				const startEvent = new CustomEvent('oTracking.event', options);
				document.body.dispatchEvent(startEvent);

				if (ad.isLinear()) {
					// For a linear ad, a timer can be started to poll for
					// the remaining time.
					// TODO: We could use this to add a skip ad button
					// Currently not used, could be used in an interval
					// const remainingTime = this.adsManager.getRemainingTime();
				}

				// Users with screen readers will lose control of video while advert is playing,
				// so we explain why and encourage them to wait with this message.
				this.video.liveRegionEl.innerHTML=`Video will play after ad in ${options.detail.adDuration} seconds`;

				break;
			}
			case google.ima.AdEvent.Type.COMPLETE: {

				options.detail.action = 'adComplete';
				const endEvent = new CustomEvent('oTracking.event', options);
				document.body.dispatchEvent(endEvent);

				if (ad.isLinear()) {
					// Would be used to clear the interval
				}

				this.video.liveRegionEl.innerHTML='';
				break;
			}

			// Add tracking for when an advert becomes skippable, and whether it's skipped
			case google.ima.AdEvent.Type.SKIPPABLE_STATE_CHANGED: {
				options.detail.action = 'adSkippable';
				const skippableEvent = new CustomEvent('oTracking.event', options);
				document.body.dispatchEvent(skippableEvent);
				break;
			}
			case google.ima.AdEvent.Type.SKIPPED: {
				options.detail.action = 'adSkip';
				const skipEvent = new CustomEvent('oTracking.event', options);
				document.body.dispatchEvent(skipEvent);
				break;
			}
			case google.ima.AdEvent.Type.ALL_ADS_COMPLETED: {
				options.detail.action = 'allAdsCompleted';
				const allAdsCompletedEvent = new CustomEvent('oTracking.event', options);
				document.body.dispatchEvent(allAdsCompletedEvent);
				break;
			}
			default: {
				throw new Error('adEvent has type ' + adEvent.type + ', which is not handled by adEventHandler');
			}
		}
	}

	reportError(error) { // eslint-disable-line class-methods-use-this
		document.body.dispatchEvent(new CustomEvent('oErrors.log', { bubbles: true, detail: { error: error } }));
	}

	adErrorHandler(adError) {
		// NOTE: has the API changed? now need to call `getError` method to get the ad error
		const actualError = ('getError' in adError && typeof adError.getError === 'function') ? adError.getError() : adError;

		// convert the Google Ad error to a JS one
		const message = `${actualError.getErrorCode()}, ${actualError.getType()}, ${actualError.getMessage()}, ${actualError.getVastErrorCode()}`;
		this.reportError(new Error(message));

		if (this.adsManager) {
			this.adsManager.destroy();
		}
		this.video.containerEl.removeChild(this.adContainerEl);
		if (this.overlayEl) {
			this.overlayEl.removeEventListener('click', this.playAdEventHandler);
			this.video.containerEl.removeChild(this.overlayEl);
			delete this.overlayEl;
		}
		if (this.video.placeholderEl) {
			this.video.placeholderEl.removeEventListener('click', this.playAdEventHandler);
		}
		this.video.opts.advertising = false;
		this.startAds();
	}

	contentPauseRequestHandler() {
		this.adsCompleted = false;
		this.video.videoEl.pause();
	}

	contentResumeRequestHandler() {
		this.video.containerEl.removeChild(this.adContainerEl);
		this.adsCompleted = true;
		this.playUserVideo();
	}

	playUserVideo() {
		// Since Firefox 52, the captions need re-adding after the
		// ad video layer has finished its thing.
		this.video.addCaptions();

		this.video.videoEl.play();
	}

	getAdProgress() {
		if (!this.adsManager || !this.adsManager.getCurrentAd()) {
			return 0;
		}
		const duration = this.adsManager.getCurrentAd().getDuration();
		const remainingTime = this.adsManager.getRemainingTime();
		return parseInt(100 * (duration - remainingTime) / duration, 10);
	}
}

export default VideoAds;
