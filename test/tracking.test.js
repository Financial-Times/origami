/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import Tracking from './../src/js/tracking';
import OTrackingCollector from './helpers/o-tracking-collector';


const contentId = 'abc-123';
describe('Tracking' , () => {
	const oTracking = new OTrackingCollector();

	after(() => {
		oTracking.stop();
	});

	it('is defined', () => {
		proclaim.equal(typeof Tracking, 'function');
	});

	describe('Standard audio events', () => {
		[ 'playing', 'pause', 'ended', 'error', 'stalled' ].map(eventName =>
			it(`emits the ${eventName} event`, () => {
				const events = oTracking.start();
				const stubAudioEl = initAudioElement();
				initTracking(stubAudioEl, { contentId });

				stubAudioEl.dispatchEvent(new Event(eventName));
				proclaim.deepEqual(events[0], {
					category: 'audio',
					action: eventName,
					duration: 120,
					progress: 0,
					error: undefined,
					contentId
				});
			})
		);

		it('prevents the `seeked` event from spamming (when the seek bar is used)', () => {
			const clock = sinon.useFakeTimers();
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });
			stubAudioEl.dispatchEvent(new Event('seeked'));
			stubAudioEl.dispatchEvent(new Event('seeked'));

			clock.tick(1000);

			try {
				proclaim.lengthEquals(events, 1);
				proclaim.deepEqual(events[0], {
					category: 'audio',
					action: 'seeked',
					duration: 120,
					progress: 0,
					error: undefined,
					contentId
				});
			} catch(err) {
				clock.restore();
				throw err;
			}
		});

		it('includes an updated progress metric (as a %) on each event', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });

			stubAudioEl.currentTime = 18;
			stubAudioEl.dispatchEvent(new Event('playing'));

			proclaim.deepEqual(events[0], {
				category: 'audio',
				action: 'playing',
				duration: 120,
				progress: 15,
				error: undefined,
				contentId
			});
		});

		it('handles metadata being loaded asynchronously', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElementWithMetadata();
			initTracking(stubAudioEl, { contentId });

			mockMetadata(stubAudioEl);

			stubAudioEl.currentTime = 18;
			stubAudioEl.dispatchEvent(new Event('playing'));

			proclaim.deepEqual(events[0], {
				category: 'audio',
				action: 'playing',
				duration: 120,
				progress: 15,
				error: undefined,
				contentId
			});
		});

		it('sets error property on events if audio element has an error prorperty', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElementWithMetadata();
			const error = {
				code: 4,
				message: 'MEDIA_ELEMENT_ERROR: Empty src attribute',
			};

			initTracking(stubAudioEl, { contentId });
			mockMetadata(stubAudioEl);


			stubAudioEl.currentTime = 18;
			stubAudioEl.error = error;
			stubAudioEl.dispatchEvent(new Event('error'));

			proclaim.deepEqual(events[0], {
				category: 'audio',
				action: 'error',
				duration: 120,
				progress: 15,
				error: {
					code: error.code,
					message: error.message,
					currentTime: 18,
					src: undefined
				},
				contentId
			});
		});
	});

	describe('progress event', () => {
		[
			{ currentTime: 0, progressPoint: 0 },
			{ currentTime: 10, progressPoint: 10 },
			{ currentTime: 30, progressPoint: 25 },
			{ currentTime: 61, progressPoint: 50 },
			{ currentTime: 91, progressPoint: 75 },
			{ currentTime: 120, progressPoint: 100 }
		].forEach(({ currentTime, progressPoint }) => {
			it(`emits a progress event at ${progressPoint}%`, () => {
				const events = oTracking.start();
				const stubAudioEl = initAudioElement();
				initTracking(stubAudioEl, { contentId });

				stubAudioEl.currentTime = currentTime;
				stubAudioEl.dispatchEvent(new Event('timeupdate'));
				proclaim.deepEqual(events[0], {
					category: 'audio',
					action: 'progress',
					duration: 120,
					progress:  progressPoint,
					error: undefined,
					contentId
				});
			});
		});


		it('only emits a progress event when the current time is a known progress point', () => {
			// eslint-disable-next-line no-unused-vars
			const [progressAt0, ...events] = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });

			// trigger timeupdate event at 15%
			stubAudioEl.currentTime = 18;
			stubAudioEl.dispatchEvent(new Event('timeupdate'));
			proclaim.lengthEquals(events, 0);
		});

		it('only emits a progress event for a given progress point once', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });

			// trigger first timeupdate event at 50%
			stubAudioEl.currentTime = 60;
			stubAudioEl.dispatchEvent(new Event('timeupdate'));

			// trigger first timeupdate event at ~51%
			stubAudioEl.currentTime = 62;
			stubAudioEl.dispatchEvent(new Event('timeupdate'));

			proclaim.lengthEquals(events, 1);
			proclaim.deepEqual(events[0], {
				category: 'audio',
				action: 'progress',
				duration: 120,
				progress: 50,
				error: undefined,
				contentId
			});
		});

		it('only emits a progress event when the audio is playing', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });

			stubAudioEl.currentTime = 60;
			stubAudioEl.paused = true;
			stubAudioEl.dispatchEvent(new Event('timeupdate'));

			proclaim.lengthEquals(events, 0);
		});
	});

	it('removes event listeners when o-audio element is destroyed', () => {
		const events = oTracking.start();
		const stubAudioEl = initAudioElement();
		const tracking = initTracking(stubAudioEl, { contentId });

		tracking.destroy();
		stubAudioEl.dispatchEvent(new Event('playing'));

		proclaim.lengthEquals(events, 0);
	});

	describe('optional tracking properties', () => {

		[
			[ 'contentId', 'abc-123' ],
			[ 'audioSubtype', 'podcast' ],
			[ 'playerType', 'inline' ],
			[ 'rootContentId', 'def-456' ]

		].map(([ propName, propValue ]) =>
			it(`includes ${propName} in the event detail`, () => {
				const events = oTracking.start();
				const stubAudioEl = initAudioElement();
				initTracking(stubAudioEl, { [propName]: propValue });
				stubAudioEl.dispatchEvent(new Event('playing'));
				proclaim.equal(events[0][propName], propValue);
			})
		);

		it('doesnt allow unknown attributes', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { foo: 'bar' });
			stubAudioEl.dispatchEvent(new Event('playing'));
			proclaim.notOk(events[0].foo);
		});
	});
});

function initAudioElement() {
	const stubAudioEl = new EventTarget();
	stubAudioEl.duration = 120;
	return stubAudioEl;
}

function initAudioElementWithMetadata() {
	const stubAudioEl = new EventTarget();
	return stubAudioEl;
}

function mockMetadata(stubAudioEl) {
	stubAudioEl.duration = 120;
	stubAudioEl.dispatchEvent(new Event('loadedmetadata'));
}

function initTracking (stubAudioEl, trackingOpts) {
	const tracking = new Tracking(stubAudioEl, trackingOpts);
	return tracking;
}
