/* eslint-env mocha */
/* eslint-disable no-unused-expressions */

import Video from './../src/js/video';
import mediaApiResponse1 from './fixtures/media-api-1.json';
import mediaApiResponse2 from './fixtures/media-api-2.json';
import sinon from 'sinon/pkg/sinon';
import proclaim from 'proclaim';

describe('Video', () => {

	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.setAttribute('data-o-component', 'o-video');
		containerEl.setAttribute('data-o-video-id', 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');
		containerEl.setAttribute('data-o-video-autorender', 'false');
		containerEl.setAttribute('data-o-video-show-captions', 'false');
		containerEl.setAttribute('data-o-video-systemcode', 'origami-build-tools');
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		document.body.removeChild(containerEl);
	});

	describe('constructor', () => {
		it('should be able to instantiate', () => {
			const video = new Video(containerEl);
			proclaim.isInstanceOf(video, Video);

			proclaim.ok(video.opts);
			proclaim.equal(video.opts.id, 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');

			proclaim.ok(video.targeting);
			proclaim.equal(video.targeting.site, '/5887/ft.com');
			proclaim.equal(video.targeting.position, 'video');
			proclaim.equal(video.targeting.sizes, '592x333|400x225');
			proclaim.equal(video.targeting.videoId, 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');

			proclaim.equal(video.containerEl, containerEl);
			proclaim.isTrue(video.containerEl.hasAttribute('data-o-video-js'));
		});

		it('should set default options', () => {
			const video = new Video(containerEl);

			proclaim.equal(video.opts.advertising, false);
			proclaim.isInstanceOf(video.opts.classes, Array);
			proclaim.include(video.opts.classes, 'o-video__video');
			proclaim.equal(video.opts.optimumwidth, null);
			proclaim.equal(video.opts.placeholder, false);
			proclaim.equal(video.opts.playsinline, false);
			proclaim.equal(video.opts.data, null);
		});

		it('should allow setting options through attribute', () => {
			containerEl.setAttribute('data-o-video-optimumwidth', 300);
			containerEl.setAttribute('data-o-video-placeholder', true);
			containerEl.setAttribute('data-o-video-placeholder-info', '[\'title\', \'description\']');
			containerEl.setAttribute('data-o-video-classes', 'a-class another-class');
			containerEl.setAttribute('data-o-video-show-captions', true);
			containerEl.setAttribute('data-o-video-systemcode', 'test');

			const video = new Video(containerEl);
			proclaim.equal(video.opts.optimumwidth, 300);
			proclaim.equal(video.opts.placeholder, true);
			proclaim.deepEqual(video.opts.placeholderInfo, ['title', 'description']);
			proclaim.include(video.opts.classes, 'a-class');
			proclaim.include(video.opts.classes, 'another-class');
			proclaim.equal(video.opts.showCaptions, true);
			proclaim.equal(video.opts.systemcode, 'test');
		});

		it('should error if a system code is not given', (done) => {
			const testEl = containerEl.cloneNode(true);
			testEl.removeAttribute('data-o-video-systemcode');

			try {
				new Video(testEl);
			} catch (error) {
				done();
			}

			throw new Error('o-video was created without a system code');
		});
	});

	describe('#init', () => {
		it('should return an array of video instances', () => {
			const videos = Video.init();
			proclaim.equal(videos.length, 1);
			proclaim.isInstanceOf(videos[0], Video);
		});

		it('should create Video objects only once', () => {
			const videos = Video.init();
			proclaim.equal(videos.length, 1);
			const videos2 = Video.init();
			proclaim.equal(videos2.length, 0);
		});
	});

	describe('Working with different videoId formats', () => {
		let fetchStub;

		beforeEach(() => {
			const res1 = new window.Response(JSON.stringify(mediaApiResponse1), {
				status: 200,
				headers: { 'Content-type': 'application/json' }
			});

			fetchStub = sinon.stub(window, 'fetch');
			fetchStub.resolves(res1);
		});

		afterEach(() => {
			fetchStub.restore();
		});

		it('can work with a brightcoveId', () => {
			containerEl.setAttribute('data-o-video-id', '4084879507001');
			const video = new Video(containerEl);

			return video.getData().then(() => {
				proclaim.equal(fetchStub.calledWithMatch('4084879507001'), true);
				proclaim.equal(video.videoData.id, 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');
			});
		});

		it('can work with a uuid', () => {
			containerEl.setAttribute('data-o-video-id', 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');
			const video = new Video(containerEl);

			return video.getData().then(() => {
				proclaim.equal(fetchStub.calledWithMatch('eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526'), true);
				proclaim.equal(video.videoData.id, 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526');
			});
		});
	});

	describe('#addVideo', () => {
		it('should add a video element', () => {
			const video = new Video(containerEl);
			video.rendition = {
				url: 'http://url.mock'
			};
			video.posterImage = 'mockimage';
			video.addVideo();

			proclaim.isInstanceOf(video.videoEl, HTMLElement);
			proclaim.deepEqual(video.videoEl.parentElement, containerEl);
			proclaim.include(video.videoEl.poster, 'mockimage');
			proclaim.deepEqual(video.videoEl.src, 'http://url.mock/');
			proclaim.deepEqual(video.videoEl.controls, true);
			proclaim.isFalse(video.videoEl.hasAttribute('playsinline'));

		});

		it('should add supplied classes to element', () => {
			const video = new Video(containerEl, {
				classes: ['class-one', 'class-two'],
				autorender: false
			});

			video.addVideo();
			proclaim.deepEqual(video.videoEl.className, 'class-one class-two o-video__video');
		});

		it('should support the playsinline option set to true', () => {
			const video = new Video(containerEl, {
				playsinline: true,
				autorender: false
			});

			video.addVideo();
			proclaim.isTrue(video.videoEl.hasAttribute('playsinline'));
			proclaim.isTrue(video.videoEl.hasAttribute('webkit-playsinline'));
		});

		it('should support the playsinline option set to false', () => {
			const video = new Video(containerEl, {
				playsinline: false,
				autorender: false
			});

			video.addVideo();
			proclaim.isFalse(video.videoEl.hasAttribute('playsinline'));
			proclaim.isFalse(video.videoEl.hasAttribute('webkit-playsinline'));
		});

		it('should set event handlers', () => {
			const video = new Video(containerEl);
			const realAddEventListener = Element.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			Element.prototype.addEventListener = addEventListenerSpy;

			video.addVideo();
			proclaim.deepEqual(addEventListenerSpy.alwaysCalledOn(video.videoEl), true);
			addEventListenerSpy.calledWith('playing', video.pauseOtherVideos);
			addEventListenerSpy.calledWith('playing', video.markPlayStart);
			addEventListenerSpy.calledWith('pause', video.updateAmountWatched);
			addEventListenerSpy.calledWith('suspend', video.clearCurrentlyPlaying);
			addEventListenerSpy.calledWith('ended', video.clearCurrentlyPlaying);
			addEventListenerSpy.calledWith('play');
			addEventListenerSpy.calledWith('playing');
			addEventListenerSpy.calledWith('pause');
			addEventListenerSpy.calledWith('ended');
			addEventListenerSpy.calledWith('progress');
			addEventListenerSpy.calledWith('error');
			addEventListenerSpy.calledWith('stalled');

			Element.prototype.addEventListener = realAddEventListener;
		});

		describe('progress eventListener', () => {
			let video;
			let realVideoEl;
			let realDispatchEvent;
			let dispatchEventSpy;

			beforeEach(() => {
				video = new Video(containerEl);
				video.addVideo();
				realVideoEl = video.videoEl;
				dispatchEventSpy = sinon.spy();
				realDispatchEvent = document.body.dispatchEvent;
				document.body.dispatchEvent = dispatchEventSpy;
			});

			afterEach(() => {
				document.body.dispatchEvent = realDispatchEvent;
			});

			it('should dispatch progress events at relevant percentages', () => {
				// Duration on the video element is read only so we have to replace
				video.videoEl = {
					duration: 100,
					currentTime: 50
				};

				// Call dispatch on the original
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));

				proclaim.equal(dispatchEventSpy.called, true);
			});

			it('should not dispatch progress events at other percentages', () => {
				// Duration on the video element is read only so we have to replace
				video.videoEl = {
					duration: 100,
					currentTime: 80
				};

				// Call dispatch on the original
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));

				proclaim.equal(dispatchEventSpy.called, false);
			});

			it('should dispatch progress events only once per percentage', () => {
				// Duration on the video element is read only so we have to replace
				video.videoEl = {
					duration: 100,
					currentTime: 10
				};

				// Call dispatch multiple times on the original
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));
				realVideoEl.dispatchEvent(new ProgressEvent('progress'));

				proclaim.equal(dispatchEventSpy.calledOnce, true);
			});
		});

		describe('captions', () => {
			let fetchStub;

			beforeEach(() => {
				const res1 = new window.Response(JSON.stringify(mediaApiResponse1), {
					status: 200,
					headers: { 'Content-type': 'application/json' }
				});

				fetchStub = sinon.stub(window, 'fetch');
				fetchStub.resolves(res1);

				// FF on Linux doesn't always support H264 so to avoid going 💥 on CI, stub
				sinon.stub(HTMLVideoElement.prototype, 'canPlayType').returns('maybe');
			});

			afterEach(() => {
				fetchStub.restore();
				HTMLVideoElement.prototype.canPlayType.restore();
			});

			it('should add a track element by default', () => {
				containerEl.setAttribute('data-o-component-data', mediaApiResponse1);
				containerEl.setAttribute('data-o-video-show-captions', 'true');
				const video = new Video(containerEl);

				return video.init().then(() => {
					video.addVideo();
					proclaim.deepEqual(containerEl.querySelector('video > track').getAttribute('kind'), 'captions');
					proclaim.deepEqual(containerEl.querySelector('video > track').getAttribute('src'), 'https://next-media-api.ft.com/v1/5393611350001.vtt');
				});
			});

			it('should throw if captions are added by calling addVideo() directly', () => {
				containerEl.setAttribute('data-o-component-data', mediaApiResponse1);
				containerEl.setAttribute('data-o-video-show-captions', 'true');
				const video = new Video(containerEl);

				proclaim.throws(video.addVideo);
			});

			it('shouldn‘t add a track element if specified', () => {
				containerEl.setAttribute('data-o-component-data', mediaApiResponse1);
				containerEl.setAttribute('data-o-video-show-captions', 'false');
				const video = new Video(containerEl);

				video.addVideo();
				proclaim.equal(containerEl.querySelector('video > track'), null);
			});

			it('should use the captionsUrl from the API if not passed in directly', () => {
				containerEl.setAttribute('data-o-video-show-captions', 'true');
				const video = new Video(containerEl);

				return video.init().then(() => {
					proclaim.deepEqual(containerEl.querySelector('video > track').getAttribute('kind'), 'captions');
					proclaim.deepEqual(containerEl.querySelector('video > track').getAttribute('src'), 'https://next-media-api.ft.com/v1/5393611350001.vtt');
				});
			});

			it('should get the captionsUrl from the API, but not use if specified', () => {
				containerEl.setAttribute('data-o-video-show-captions', 'false');
				const video = new Video(containerEl);

				return video.init().then(() => {
					proclaim.equal(containerEl.querySelector('video > track'), null);
				});
			});
		});

		describe('`watched` Event', () => {

			let mochaOnbeforeunloadHandler;
			let trackingSpy;

			const createVisibilityEvent = isHidden => {
				const visibiltyEvent = new Event('oViewport.visibility');
				visibiltyEvent.detail = {
					hidden: isHidden
				};
				return visibiltyEvent;
			};

			const unloadEventName = ('onbeforeunload' in window) ? 'beforeunload' : 'unload';

			const preventPageReload = ev => ev.preventDefault();

			beforeEach(() => {
				// mocha has a 'safety' valve to not allow reloading of pages; remove its handler for now
				// https://github.com/karma-runner/karma/commit/15d80f47a227839e9b0d54aeddf49b9aa9afe8aa
				mochaOnbeforeunloadHandler = window.onbeforeunload;
				window.onbeforeunload = undefined;
				// cancel reloading of the page
				window.addEventListener(unloadEventName, preventPageReload);
				trackingSpy = sinon.spy();
				document.body.addEventListener('oTracking.event', trackingSpy);
			});

			afterEach(() => {
				window.onbeforeunload = mochaOnbeforeunloadHandler;
				window.removeEventListener(unloadEventName, preventPageReload);
				document.body.removeEventListener('oTracking.event', trackingSpy);
			});

			it('should send `watched` event on unload', () => {
				const video = new Video(containerEl);
				video.addVideo();
				video.amountWatched = 1234567;
				// allows us to set the duration (otherwise it's read only)
				video.videoEl = {
					duration: 7654.321
				};
				window.dispatchEvent(new Event(unloadEventName, { cancelable: true }));

				const eventDetail = trackingSpy.lastCall.args[0].detail;
				proclaim.deepEqual(eventDetail.amount, 1235);
				proclaim.deepEqual(eventDetail.amountPercentage, 16);
			});

			it('should not include time watched if tab isn’t visible (while video playing)', () => {
				const clock = sinon.useFakeTimers();
				const video = new Video(containerEl);
				video.addVideo();
				video.videoEl.dispatchEvent(new Event('playing'));
				// allows us to set read only properties
				video.videoEl = {
					duration: 200
				};
				clock.tick(7000);
				// hide tab
				window.dispatchEvent(createVisibilityEvent(true));
				// view tab
				window.dispatchEvent(createVisibilityEvent(false));
				clock.tick(3000);
				window.dispatchEvent(new Event(unloadEventName, { cancelable: true }));

				const eventDetail = trackingSpy.lastCall.args[0].detail;
				proclaim.deepEqual(eventDetail.amount, 10);
				proclaim.deepEqual(eventDetail.amountPercentage, 5);

				clock.restore();
			});

			it('should not include time watched if tab isn’t visible (while video paused)', () => {
				const clock = sinon.useFakeTimers();
				const video = new Video(containerEl);
				video.addVideo();
				video.videoEl.dispatchEvent(new Event('playing'));
				clock.tick(10000);
				video.videoEl.dispatchEvent(new Event('paused'));
				// // allows us to set read only properties
				video.videoEl = {
					paused: true,
					duration: 200
				};
				// hide tab
				window.dispatchEvent(createVisibilityEvent(true));
				// view tab
				window.dispatchEvent(createVisibilityEvent(false));
				// as the video is paused, this shouldn't be included in the watched total
				clock.tick(3000);
				window.dispatchEvent(new Event(unloadEventName, { cancelable: true }));

				const eventDetail = trackingSpy.lastCall.args[0].detail;
				proclaim.deepEqual(eventDetail.amount, 10);
				proclaim.deepEqual(eventDetail.amountPercentage, 5);

				clock.restore();
			});

		});
	});

	describe('#addPlaceholder', () => {

		const realAddVideo = Video.prototype.addVideo;
		let addVideoSpy = sinon.spy();

		beforeEach(() => {
			Video.prototype.addVideo = addVideoSpy;
		});

		afterEach(() => {
			Video.prototype.addVideo = realAddVideo;
		});

		it('should be able to create a placeholder', () => {
			const video = new Video(containerEl, {
				autorender: false,
				placeholder: true
			});

			video.videoData = {};
			video.posterImage = 'mockimage';
			video.addPlaceholder();

			proclaim.isInstanceOf(video.placeholderEl, HTMLElement);
			proclaim.deepEqual(video.placeholderEl.parentElement, containerEl);
			proclaim.deepEqual(video.placeholderEl.classList.contains('o-video__placeholder'), true);

			proclaim.isInstanceOf(video.placeholderImageEl, HTMLImageElement);
			proclaim.deepEqual(video.placeholderImageEl.parentElement, video.placeholderEl);
			proclaim.include(video.placeholderImageEl.src, 'mockimage');
			proclaim.deepEqual(video.placeholderImageEl.classList.contains('o-video__placeholder-image'), true);
		});

		it('should be able to create a placeholder with an info panel', () => {
			const video = new Video(containerEl, {
				autorender: false,
				placeholder: true,
				placeholderInfo: ['title', 'description', 'duration', 'brand']
			});

			video.videoData = mediaApiResponse1;
			video.addPlaceholder();

			proclaim.ok(video.infoPanel);

			proclaim.deepEqual(video.infoPanel.infoEl.parentElement, video.placeholderEl);

			proclaim.deepEqual(video.infoPanel.titleEl.textContent, 'Markets cautious, oil eases');
			proclaim.deepEqual(video.infoPanel.titleEl.parentElement, video.infoPanel.infoEl);

			proclaim.include(video.infoPanel.descriptionEl.textContent, 'Top stories in the markets');
			proclaim.deepEqual(video.infoPanel.descriptionEl.parentElement, video.infoPanel.infoEl);

			proclaim.deepEqual(video.infoPanel.brandEl.textContent, 'Market Minute');
			proclaim.deepEqual(video.infoPanel.brandEl.parentElement, video.infoPanel.infoEl);
		});

		it('should be able to create an info panel when there is no brand name', () => {
			const video = new Video(containerEl, {
				autorender: false,
				placeholder: true,
				placeholderInfo: ['brand']
			});

			video.videoData = Object.assign({}, mediaApiResponse1, { brand: null });
			video.addPlaceholder();

			proclaim.deepEqual(video.infoPanel.brandEl.textContent, '');
		});

		it('should be able to create a placeholder with a play button', () => {
			const realAddEventListener = Element.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			Element.prototype.addEventListener = addEventListenerSpy;

			const video = new Video(containerEl, {
				autorender: false,
				placeholder: true,
				placeholdertitle: true,
			});

			video.videoData = {};
			video.addPlaceholder();

			const playButtonEl = video.placeholderEl.querySelector('.o-video__play-button');
			const playIconEl = playButtonEl.querySelector('.o-video__play-button-icon');

			proclaim.ok(playButtonEl);
			proclaim.ok(playIconEl);
			proclaim.deepEqual(addEventListenerSpy.called, true);
			proclaim.deepEqual(addEventListenerSpy.calledWith('click'), true);
			addEventListenerSpy.calledOn(playButtonEl);

			Element.prototype.addEventListener = realAddEventListener;
		});

		it('should include the title of the video in the aria-label of the play button', () => {
			const video = new Video(containerEl, {
				autorender: false,
				placeholder: true,
				placeholdertitle: true,
			});

			video.videoData = mediaApiResponse1;
			video.addPlaceholder();

			proclaim.strictEqual(video.playButtonEl.attributes['aria-label'].value, 'Play video Markets cautious, oil eases');
		});
	});

	describe('#update', () => {
		let fetchStub;

		beforeEach(() => {
			const res1 = new window.Response(JSON.stringify(mediaApiResponse1), {
				status: 200,
				headers: { 'Content-type': 'application/json' }
			});

			const res2 = new window.Response(JSON.stringify(mediaApiResponse2), {
				status: 200,
				headers: { 'Content-type': 'application/json' }
			});

			fetchStub = sinon.stub(window, 'fetch');

			fetchStub.onFirstCall().returns(Promise.resolve(res1));
			fetchStub.onSecondCall().returns(Promise.resolve(res2));

			// FF on Linux doesn't always support H264 so to avoid going 💥 on CI, stub
			sinon.stub(HTMLVideoElement.prototype, 'canPlayType').returns('maybe');
		});

		afterEach(() => {
			fetchStub.restore();
			HTMLVideoElement.prototype.canPlayType.restore();
		});

		context('when placeholder is present', () => {
			let video;

			beforeEach(() => {
				video = new Video(containerEl, {
					prop: 'old prop',
					id: 'eebe9cb5-8d4c-3bd7-8dd9-50e869e2f526',
					autorender: false,
					placeholder: true,
					placeholderInfo: ['title', 'brand']
				});

				return video.init();
			});

			it('replaces old options with the new', () => {
				const newOpts = { prop: 'new prop', id: mediaApiResponse2.id };

				return video.update(newOpts).then(() => {
					proclaim.deepEqual(video.opts.prop, newOpts.prop);
					proclaim.deepEqual(video.opts.id, newOpts.id);
				});
			});

			it('updates the placeholder image and title', () => {
				const newOpts = { id: mediaApiResponse2.id };

				proclaim.include(video.placeholderImageEl.src, '5393611350001');
				proclaim.deepEqual(video.infoPanel.titleEl.textContent, mediaApiResponse1.title);

				return video.update(newOpts).then(() => {
					proclaim.include(video.placeholderImageEl.src, '5394885102001');
					proclaim.deepEqual(video.infoPanel.titleEl.textContent, mediaApiResponse2.title);
				});
			});

			it('updates the aria-label of the play button', () => {
				const newOpts = { id: mediaApiResponse2.id };

				return video.update(newOpts).then(() => {
					proclaim.strictEqual(video.playButtonEl.attributes['aria-label'].value, 'Play video The Bank of England and the bond market');
				});
			});

			it('removes previous brand tag', () => {
				const mediaApiNoBrand = Object.assign({}, mediaApiResponse2, { brand: null });
				const resNoBrand = new window.Response(JSON.stringify(mediaApiNoBrand), {
					status: 200,
					headers: { 'Content-type': 'application/json' }
				});

				fetchStub.resetBehavior();
				fetchStub.returns(Promise.resolve(resNoBrand));

				const newOpts = { id: mediaApiResponse2.id };

				proclaim.deepEqual(video.infoPanel.brandEl.textContent, 'Market Minute');

				return video.update(newOpts).then(() => {
					proclaim.deepEqual(video.infoPanel.brandEl.textContent, '');
				});
			});
		});

		context('when video is present', () => {
			let video;

			beforeEach(() => {
				containerEl.setAttribute('data-o-video-show-captions', 'true');
				video = new Video(containerEl, {
					id: mediaApiResponse1.id,
					autorender: false,
					placeholder: false
				});

				return video.init();
			});

			it('updates the video source and poster', () => {
				const newOpts = { id: mediaApiResponse2.id };
				proclaim.include(video.videoEl.poster, '5393611350001');
				proclaim.include(video.videoEl.src, '/34/47628783001/201704/970/47628783001_5393625770001_5393611350001.mp4?pubId=47628783001&videoId=5393611350001');

				return video.update(newOpts).then(() => {
					proclaim.include(video.videoEl.poster, '5394885102001');
					proclaim.include(video.videoEl.src, '/34/47628783001/201704/873/47628783001_5394886872001_5394885102001.mp4?pubId=47628783001&videoId=5394885102001');
				});
			});

			it('removes the poster if not supplied in data', () => {
				const mediaApiNoPoster = Object.assign({}, mediaApiResponse2, { mainImageUrl: null });
				const resNoPoster = new window.Response(JSON.stringify(mediaApiNoPoster), {
					status: 200,
					headers: { 'Content-type': 'application/json' }
				});

				fetchStub.resetBehavior();
				fetchStub.returns(Promise.resolve(resNoPoster));

				proclaim.include(video.videoEl.poster, '5393611350001');

				const newOpts = { id: mediaApiResponse2.id };
				return video.update(newOpts).then(() => {
					proclaim.deepEqual(video.videoEl.poster, '');
				});
			});

			it('replaces the previous captions with the new ones', () => {
				const resWithCaptions = new window.Response(JSON.stringify(mediaApiResponse2), {
					status: 200,
					headers: { 'Content-type': 'application/json' }
				});

				fetchStub.resetBehavior();
				fetchStub.returns(Promise.resolve(resWithCaptions));

				const newOpts = { id: mediaApiResponse2.id };
				return video.update(newOpts).then(() => {
					const tracks = document.querySelectorAll('track');
					proclaim.deepEqual(tracks.length, 1);
					proclaim.deepEqual(tracks[0].src, 'https://next-media-api.ft.com/v1/5394885102001.vtt');
				});
			});

			it('removes captions if the replacement video doesn`t have any', () => {
				const mediaApiNoCaptions = Object.assign({}, mediaApiResponse2, { captionsUrl: null });
				const resNoCaptions = new window.Response(JSON.stringify(mediaApiNoCaptions), {
					status: 200,
					headers: { 'Content-type': 'application/json' }
				});

				fetchStub.resetBehavior();
				fetchStub.returns(Promise.resolve(resNoCaptions));

				const newOpts = { id: mediaApiResponse2.id };
				return video.update(newOpts).then(() => {
					const tracks = document.querySelectorAll('track');
					proclaim.deepEqual(tracks.length, 0);
				});
			});
		});

		context('forces initialisation', () => {
			let video;

			beforeEach(() => {
				video = new Video(containerEl, {
					autorender: false
				});
			});

			it('will initialise if it hasn\'t done so already', () => {
				const newOpts = { id: mediaApiResponse1.id };

				sinon.spy(video, 'init');

				return video.update(newOpts).then(() => {
					sinon.assert.calledOnce(video.init);
				});
			});
		});
	});

	describe('#getProgress', () => {
		let video;

		beforeEach(() => {
			video = new Video(containerEl);
			video.videoEl = {};
		});

		afterEach(() => {
			video = undefined;
		});

		it('should return 0 if duration is not set', () => {
			proclaim.deepEqual(video.getProgress(), 0);
		});

		it('should return the progress of the video as a percentage', () => {
			video.videoEl.duration = 200;
			video.videoEl.currentTime = 50;
			proclaim.deepEqual(video.getProgress(), 25);
		});

	});

	describe('#getTrackMode', () => {
		let fetchStub;

		beforeEach(() => {
			const res1 = new window.Response(JSON.stringify(mediaApiResponse1), {
				status: 200,
				headers: { 'Content-type': 'application/json' }
			});

			fetchStub = sinon.stub(window, 'fetch');
			fetchStub.resolves(res1);

			// FF on Linux doesn't always support H264 so to avoid going 💥 on CI, stub
			sinon.stub(HTMLVideoElement.prototype, 'canPlayType').returns('maybe');
		});

		afterEach(() => {
			fetchStub.restore();
			HTMLVideoElement.prototype.canPlayType.restore();
		});

		it('should return the state of the video text track', () => {
			containerEl.setAttribute('data-o-video-show-captions', 'true');
			const video = new Video(containerEl);

			video.getData().then(() => {
				video.addVideo();
				video.getTrackMode().then(mode => proclaim.equal(mode, 'disabled'));
			});
		});

		it('should return undefined if the video has no captions', () => {
			containerEl.setAttribute('data-o-video-show-captions', 'false');
			const video = new Video(containerEl);

			video.getData().then(() => {
				video.addVideo();
				video.getTrackMode().then(mode => proclaim.isUndefined(mode));
			});
		});

	});

	describe('#getDuration', () => {
		let video;

		beforeEach(() => {
			video = new Video(containerEl);
			video.videoEl = {};
		});

		afterEach(() => {
			video = undefined;
		});

		it('should return 0 if duration is not set', () => {
			proclaim.deepEqual(video.getDuration(), 0);
		});

		it('should return the duration of the video as a integer', () => {
			video.videoEl.duration = 22.46324646;
			proclaim.deepEqual(video.getDuration(), 22);
		});

	});

	describe('#getData', () => {

		let fetchStub;

		beforeEach(() => {
			fetchStub = sinon.stub(window, 'fetch');
			const res = new window.Response(JSON.stringify(mediaApiResponse1), {
				status: 200,
				headers: {
					'Content-type': 'application/json'
				}
			});
			fetchStub.returns(Promise.resolve(res));

			// FF on Linux doesn't always support H264 so to avoid going 💥 on CI, stub
			sinon.stub(HTMLVideoElement.prototype, 'canPlayType').returns('maybe');
		});

		afterEach(() => {
			fetchStub.restore();
			HTMLVideoElement.prototype.canPlayType.restore();
		});

		it('should send poster through image service if optimumwidth defined', () => {
			containerEl.setAttribute('data-o-video-optimumwidth', '300');
			const video = new Video(containerEl);
			return video.getData()
				.then(() => {
					proclaim.deepEqual(video.posterImage,
						'https://www.ft.com/__origami/service/image/v2/images/raw/' +
						'https%3A%2F%2Fbcsecure01-a.akamaihd.net%2F13%2F47628783001%2F201704%2F970%2F47628783001_5393625566001_5393611350001-vs.jpg%3FpubId%3D47628783001%26videoId%3D5393611350001' +
						'?source=origami-build-tools&quality=low&fit=scale-down&width=300'
					);
				});
		});

		it('should request an optimised rendition if optimumvideowidth defined', () => {
			containerEl.setAttribute('data-o-video-optimumvideowidth', '300');
			const video = new Video(containerEl);
			return video.getData()
				.then(() => {
					proclaim.deepEqual(video.rendition.pixelWidth, 480);
				});
		});

		it('should not fetch from video if full data provided in opts', () => {
			const video = new Video(containerEl, {
				data: {
					prop: 'val',
					videoStillUrl: 'abc',
					renditions: []
				},
				autorender: false
			});

			return video
				.getData()
				.then(() => {
					proclaim.deepEqual(video.videoData.prop, 'val');
					proclaim.deepEqual(video.videoData.videoStillUrl, 'abc');
					proclaim.deepEqual(video.videoData.renditions.length, 0);
				});
		});

		context('dealing with quotes', () => {
			const quoteyData = {
				title: 'Macron - What next?',
				standfirst: 'President-elect\'s "pro-EU" and trade agenda',
				description: "Another 'great' \"quote here\"",
				renditions: []
			};

			const videoDataShouldMatch = video => {
				proclaim.deepEqual(video.videoData.title, 'Macron - What next?');
				proclaim.deepEqual(video.videoData.standfirst, 'President-elect\'s "pro-EU" and trade agenda');
				proclaim.deepEqual(video.videoData.description, 'Another \'great\' "quote here"');
				proclaim.deepEqual(video.videoData.renditions.length, 0);
			};

			it('can deal with quotes when data passed via constructor', () => {
				const video = new Video(containerEl, {
					data: quoteyData
				});

				return video
					.getData()
					.then(() => videoDataShouldMatch(video));
			});

			it('can deal with quotes when data passed via attribute', () => {
				containerEl.setAttribute('data-o-video-data', JSON.stringify(quoteyData));
				const video = new Video(containerEl);

				return video
					.getData()
					.then(() => videoDataShouldMatch(video));
			});
		});
	});

	context('Videos without subtitles', () => {
		let fetchStub;

		beforeEach(() => {
			const mediaApiResponseWithoutCaptions = Object.assign({}, mediaApiResponse1, { captionsUrl: null });
			const res1 = new window.Response(JSON.stringify(mediaApiResponseWithoutCaptions), {
				status: 200,
				headers: { 'Content-type': 'application/json' }
			});

			fetchStub = sinon.stub(window, 'fetch');
			fetchStub.resolves(res1);
		});

		afterEach(() => {
			fetchStub.restore();
		});

		context('on the placeholder, a guidance message', () => {
			it('is displayed by default', () => {
				const video = new Video(containerEl, { placeholder: true });

				return video.init().then(() => {
					proclaim.ok(containerEl.querySelector('.o-video__guidance'));
				});
			});


			it('is not displayed if showGuidance option is set false', () => {
				containerEl.setAttribute('data-o-video-show-guidance', false);
				const video = new Video(containerEl, { placeholder: true });

				return video.init().then(() => {
					proclaim.notOk(containerEl.querySelector('.o-video__guidance'));
					containerEl.setAttribute('data-o-video-show-guidance', true);
				});
			});
		});

		context('guidance banner', () => {
			it('is displayed for autoplaying videos', () => {
				const video = new Video(containerEl);
				return video.init().then(() => {
					video.videoEl.dispatchEvent(new Event('playing'));
					proclaim.ok(containerEl.querySelector('.o-video__guidance--banner'));
				});
			});

			it('is not displayed for autoplaying videos if option is set to false', () => {
				containerEl.setAttribute('data-o-video-show-guidance', false);
				const video = new Video(containerEl);
				return video.init().then(() => {
					video.videoEl.dispatchEvent(new Event('playing'));
					proclaim.notOk(containerEl.querySelector('.o-video__guidance--banner'));
					containerEl.setAttribute('data-o-video-show-guidance', true);
				});
			});

			it('can be closed', () => {
				const video = new Video(containerEl);
				return video.init().then(() => {
					video.videoEl.dispatchEvent(new Event('playing'));
					containerEl.querySelector('.o-video__guidance__close').dispatchEvent(new Event('click'));
					proclaim.notOk(containerEl.querySelector('.o-video__guidance--banner'));
				});
			});

			it('is removed when the next video in the playlist is played', () => {
				const video = new Video(containerEl);
				return video.init()
					.then(() => {
						const resWithCaptions = new window.Response(JSON.stringify(mediaApiResponse2), {
							status: 200,
							headers: { 'Content-type': 'application/json' }
						});

						fetchStub.resetBehavior();
						fetchStub.returns(Promise.resolve(resWithCaptions));
						const newOpts = { id: mediaApiResponse2.id };
						return video.update(newOpts);
					}).then(() => {
						proclaim.notOk(containerEl.querySelector('.o-video__guidance--banner'));
					});
			});
		});
	});
});

/* eslint-enable no-unused-expressions */
