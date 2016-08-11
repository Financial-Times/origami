/* global describe, it, beforeEach, afterEach, google */
const Ads = require('./../src/js/ads');
const sinon = require('sinon/pkg/sinon');

describe('Ads', () => {

	let ads;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		const videoEl = document.createElement('video');
		containerEl.appendChild(videoEl);
		document.body.appendChild(containerEl);
		const video = {
			containerEl,
			videoEl,
			opts: {},
			targeting: {}
		};
		ads = new Ads(video);
	});

	afterEach(() => {
		ads = null;
		document.body.removeChild(containerEl);
	});

	it('should have all ad event handlers', () => {
		Ads.prototype.adsManagerLoadedHandler.should.be.a('function');
		Ads.prototype.adErrorHandler.should.be.a('function');
		Ads.prototype.adEventHandler.should.be.a('function');
		Ads.prototype.contentPauseRequestHandler.should.be.a('function');
		Ads.prototype.contentResumeRequestHandler.should.be.a('function');
	});

	it('should add the video advertising script if the configuration parameter is passed', () => {
		return ads.loadAdsLibrary()
			.then(() => {
				document.querySelector('[src="//imasdk.googleapis.com/js/sdkloader/ima3.js"]').should.exist;
			});
	});

	describe('#setUpAds', () => {
		it('should set up ads', () => {
			ads.setUpAds();

			ads.adContainerEl.should.be.an('htmldivelement');
			ads.adDisplayContainer.should.be.an('object');
			ads.adsLoader.should.be.an('object');
		});

		it('should set up event handlers', () => {
			const realAddEventListener = google.ima.AdsLoader.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			google.ima.AdsLoader.prototype.addEventListener = addEventListenerSpy;

			ads.setUpAds();

			google.ima.AdsLoader.prototype.addEventListener.calledWith(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, ads.adsManagerLoadedHandler).should.equal(true);
			google.ima.AdsLoader.prototype.addEventListener.calledWith(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, ads.adsManagerLoadedHandler).should.equal(true);

			google.ima.AdsLoader.prototype.addEventListener = realAddEventListener;
		});
	});

	describe('#adsManagerLoadedHandler', () => {
		it('should set up adsManager', () => {
			const adsManagerLoadedEvent = {
				getAdsManager: sinon.stub().returns({
					addEventListener: () => {}
				})
			};

			ads.video.videoEl = {
				played: 0,
				addEventListener: () => {}
			};

			ads.adsManagerLoadedHandler(adsManagerLoadedEvent);
			ads.adsManager.should.be.an('object');
			adsManagerLoadedEvent.getAdsManager.called.should.equal(true);
		});
	});

	describe('#playAdEventHandler', () => {

		const realAdsManagerLoadedHandler = Ads.prototype.adsManagerLoadedHandler;
		const adsManagerLoadedHandlerStub = sinon.stub();
		const adsManagerStub = sinon.stub();

		beforeEach(() => {
			Ads.prototype.adsManagerLoadedHandler = adsManagerLoadedHandlerStub;
			ads.setUpAds();
			ads.adsManager = adsManagerStub;
		});

		afterEach(() => {
			ads.adsManager = undefined;
			Ads.prototype.adsManagerLoadedHandler = realAdsManagerLoadedHandler;
		});

		it('should play ad', () => {
			ads.playAdEventHandler();
			ads.adContainerEl.classList.toString().should.contain('o-video__ad');
		});
	});

	describe('#getVideoBrand', () => {
		it('should get the brand for targeting', () => {
			ads.video.videoData = {
				tags: ['brand:Authers Note']
			};
			ads.getVideoBrand().should.equal('Authers Note');
		});
	});
});
