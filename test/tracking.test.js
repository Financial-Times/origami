/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import Tracking from './../src/js/tracking';

const contentId = 'abc-123';
describe('Tracking' , () => {
	let events = [];
	const oTrackingListener = ({ detail }) => events.push(detail)

	before(() => {
		document.body.addEventListener('oTracking.event', oTrackingListener);
	});

	after(() => {
		document.body.removeEventListener('oTracking.event', oTrackingListener);
	});

	beforeEach(() => {
		events = [];
	});

	it('is defined', () => {
		proclaim.equal(typeof Tracking, 'function');
	});

    describe('Standard audio events', () => {
        [ 'playing', 'pause', 'ended', 'error', 'stalled' ].map(eventName => {
            it(`emits the ${eventName} event`, () => {
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
            });
		});
		
		it('emits the seeked event once every second', () => {
			const stubAudioEl = initAudioElement();
			initTracking(stubAudioEl, { contentId });
			stubAudioEl.dispatchEvent(new Event('seeked'));
			stubAudioEl.dispatchEvent(new Event('seeked'));
			return waitFor(1000).then(() => {
				proclaim.lengthEquals(events, 1);
				proclaim.deepEqual(events[0], {
					category: 'audio',
					action: 'seeked',
					duration: 120,
					progress: 0,
					contentId
				});
			});
		})
    
        it('includes an updated progress metric (as a %) on each event', () => {
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
    })

    describe('progress event', () => {
        it('emits a progress event when the current time reaches the progress points 10%, 25%, 50%, 75%', () => {
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
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl, { contentId });

            // trigger timeupdate event at 15%
            stubAudioEl.currentTime = 18;
            stubAudioEl.dispatchEvent(new Event('timeupdate'));

            proclaim.lengthEquals(events, 0);
        });

        it('only emits a progress event for a given progress point once', () => {
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
        })
    });

    it('emits a listened event with total amount listened', () => {
        const clock = sinon.useFakeTimers();
        const stubAudioEl = initAudioElement();
        const tracking = initTracking(stubAudioEl, { contentId });

        stubAudioEl.dispatchEvent(new Event('playing'));
        clock.tick(18000); // pretend 18s have passed by
        stubAudioEl.dispatchEvent(new Event('pause'));

        tracking.trackListeningTime();
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
        const stubAudioEl = initAudioElement();
        const tracking = initTracking(stubAudioEl, { contentId });

        tracking.destroy();
        stubAudioEl.dispatchEvent(new Event('playing'));

        proclaim.lengthEquals(events, 0);
    });
    
    describe('tracking attributes', () => {
        it('tracks the content id', () => {
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl, { contentId: 'abc-123' });
            stubAudioEl.dispatchEvent(new Event('playing'));
            proclaim.deepEqual(events[0], {
                category: "audio",
                action: "playing",
                duration: 120,
                contentId: "abc-123",
                progress: 0
            });
        });

        it('tracks the audio subtype', () => {
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl, { audioSubtype: 'podcast' });
            stubAudioEl.dispatchEvent(new Event('playing'));
            proclaim.deepEqual(events[0], {
                category: "audio",
                action: "playing",
                duration: 120,
                audioSubtype: 'podcast',
                progress: 0
            });
        });

        it('doesnt allow unknown attributes', () => {
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl, { foo: 'bar' });
            stubAudioEl.dispatchEvent(new Event('playing'));
            proclaim.deepEqual(events[0], {
                category: "audio",
                action: "playing",
                duration: 120,
                progress: 0
            });
        });
    })
});

function initAudioElement() {
    const stubAudioEl = new EventTarget();
    stubAudioEl.duration = 120;
    return stubAudioEl
}

function initTracking (stubAudioEl, trackingOpts) {
    const tracking = new Tracking(stubAudioEl, trackingOpts);
    stubAudioEl.dispatchEvent(new Event('loadedmetadata'));
    return tracking;
}

function waitFor (ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}