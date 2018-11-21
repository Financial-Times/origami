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
				contentId
			});
		});
	});

	describe('progress event', () => {
		it('emits a progress event when the current time reaches the progress points 10%, 25%, 50%, 75%', () => {
			const events = oTracking.start();
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });

			// trigger timeupdate event at 50%
			stubAudioEl.currentTime = 60;
			stubAudioEl.dispatchEvent(new Event('timeupdate'));

			proclaim.deepEqual(events[0], {
				category: 'audio',
				action: 'progress',
				duration: 120,
				progress: 50,
				contentId
			});
		});

		it('only emits a progress event when the current time is a known progress point', () => {
			const events = oTracking.start();
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

	it('dispatches listened event with total amount listened', () => {
		const events = oTracking.start();
		const clock = sinon.useFakeTimers();
		const stubAudioEl = initAudioElement();
		const tracking = initTracking(stubAudioEl, { contentId });

		stubAudioEl.dispatchEvent(new Event('playing'));
		clock.tick(18000); // pretend 18s have passed by
		stubAudioEl.dispatchEvent(new Event('pause'));

		tracking.dispatchListenedEvent();
		clock.restore();

		proclaim.deepEqual(events[2], {
			category: 'audio',
			action: 'listened',
			duration: 120,
			amount: 18,
			amountPercentage:15,
			contentId
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
			[ 'playerType', 'inline' ]

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