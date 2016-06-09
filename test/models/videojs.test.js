/* global describe, it, beforeEach, afterEach, sinon, expect */
let VideoJS = require('../../src/models/videojs');
const oVideo = require('../../main');
const brightcoveResponse = require('../fixtures/brightcove.json');

const checkGoogleVideoSdkLoaded = function() {
	return [].slice.call(document.getElementsByTagName('script'))
		.some(function(s) {
			if(s.src.indexOf('//imasdk.googleapis.com/js/sdkloader/ima3.js') > -1) {
				return true;
			} else {
				return false;
			}
		});
};

describe('VideoJS', () => {

	let containerEl;
	let fetchStub;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-o-video-id', '4084879507001');
		document.body.appendChild(containerEl);
		fetchStub = sinon.stub(window, 'fetch');
		const res = new window.Response(JSON.stringify(brightcoveResponse), {
			status: 200,
			headers: {
				'Content-type': 'application/json'
			}
		});
		fetchStub.returns(Promise.resolve(res));
		VideoJS = require('../../src/models/videojs');
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
		fetchStub.restore();
		VideoJS = null;
	});

	it('should exist', () => {
		VideoJS.should.exist;
	});

	it('should be able to instantiate', () => {
		const videojsPlayer = new VideoJS(containerEl);
		videojsPlayer.should.exist;
	});

	it('should return a Promise on `init`', () => {
		const videojsPlayer = new VideoJS(containerEl);
		videojsPlayer.init().should.be.an.instanceOf(Promise);
	});

	it('should return the VideoJS instance on `init`', () => {
		const videojsPlayer = new VideoJS(containerEl);
		videojsPlayer.init().should.eventually.equal(videojsPlayer);
	});

	it('should create a video element on `init`', () => {
		const videojsPlayer = new VideoJS(containerEl);
		return videojsPlayer
			.init()
			.then(() => {
				const videoEl = containerEl.querySelector('video');
				videoEl.getAttribute('poster').should.equal(
					'https://image.webservices.ft.com/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=o-video'
				);
				videoEl.getAttribute('src').should.equal(
					'http://brightcove.vo.llnwd.net/v1/uds/pd/47628783001/201502/3842/47628783001_4085577922001_A-hated-rally.mp4'
				);
				const checkSdkIsLoaded = checkGoogleVideoSdkLoaded();
				checkSdkIsLoaded.should.equal(false);
			});
	});

	it('should throw error if can\'t init', () => {
		// bad response instead
		const badRes = new window.Response(null, {
			status: 404,
			statusText: 'Not Found'
		});
		fetchStub.returns(Promise.resolve(badRes));
		const videojsPlayer = new VideoJS(containerEl);
		return videojsPlayer.init().should.be.rejectedWith('Brightcove responded with a 404 (Not Found) for id 4084879507001');
	});

	it('should be able to create as a placeholder', () => {
		const videojsPlayer = new VideoJS(containerEl, { placeholder: true });
		return videojsPlayer
			.init()
			.then(() => {
				const placholderEl = containerEl.querySelector('img');
				placholderEl.getAttribute('src').should.equal(
					'https://image.webservices.ft.com/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=o-video'
				);
				containerEl.querySelector('.o-video__play-button').should.exist;
			});
	});

	it('should be able to create a placeholder with a title', () => {
		const videojsPlayer = new VideoJS(containerEl, { placeholder: true, placeholderTitle: true });
		return videojsPlayer
			.init()
			.then(() => {
				const placholderEl = containerEl.querySelector('img');
				placholderEl.getAttribute('src').should.equal(
					'https://image.webservices.ft.com/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=o-video'
				);
				containerEl.querySelector('.o-video__play-button').should.exist;
				containerEl.querySelector('.o-video__title').textContent.should.equal('A hated rally');
			});
	});

	it('should be able to suppress placeholder play button', () => {
		const videojsPlayer = new VideoJS(containerEl, { placeholder: true, playButton:false });
		return videojsPlayer
			.init()
			.then(() => {
				expect(containerEl.querySelector('.o-video__play-button')).to.be.null;
			});
	});

	it('should send poster through image service if optimumWidth defined', () => {
		const videojsPlayer = new VideoJS(containerEl, { optimumWidth: 300 });
		return videojsPlayer
			.init()
			.then(() => {
				containerEl.querySelector('video').getAttribute('poster').should.equal(
					'https://image.webservices.ft.com/v1/images/raw/' +
					'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201502%2F2470%2F47628783001_4085962850001_MAS-VIDEO-AuthersNote-stock-market.jpg%3FpubId%3D47628783001' +
					'?source=o-video&fit=scale-down&width=300'
				);
			});
	});

	it('should add supplied classes to video tag', () => {
		const videojsPlayer = new VideoJS(containerEl, { classes: ['class-one', 'class-two'] });
		return videojsPlayer
			.init()
			.then(() => {
				const videoElement = containerEl.querySelector('video');
				videoElement.className.should.contain('class-one');
				videoElement.className.should.contain('class-two');
			});
	});

	it('should not fetch from brightcove if full data provided in opts', () => {
		const videojsPlayer = new VideoJS(containerEl, { data: {
			prop: 'val',
			videoStillURL: 'abc',
			renditions: []
		}});
		return videojsPlayer
			.getData()
			.then(() => {
				videojsPlayer.brightcoveData.prop.should.equal('val');
			});
	});

	it('should add the video advertising script if the configuration parameter is passed', (done) => {
		const videojsPlayer = new VideoJS(containerEl, {advertising: true});
		return oVideo._loadAdsLibrary().then(() => {
			videojsPlayer
				.init()
				.then(() => {
					const checkSdkIsLoaded = checkGoogleVideoSdkLoaded();
					checkSdkIsLoaded.should.equal(true);
					videojsPlayer.targeting.brand.should.equal('Authers Note');
					done();
				});
		});
	});

});
