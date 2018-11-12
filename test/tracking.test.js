/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';

import Tracking from './../src/js/tracking';

describe('  Tracking' , () => {
	it('is defined', () => {
		proclaim.equal(typeof Tracking, 'function');
    });

    describe('Standard audio events', () => {
        [ 'playing', 'pause', 'ended', 'error', 'stalled' ].map(eventName => {
            it(`emits the ${eventName} event`, () => {
                const events = collectOTrackingEvents(events);
                const stubAudioEl = initAudioElement();
                initTracking(stubAudioEl);
    
                stubAudioEl.dispatchEvent(new Event(eventName));
            
                proclaim.deepEqual(events[0], { category: 'audio', action: eventName, duration: 120, progress: 0 });
            });
        });
    
        it('includes an updated progress metric (as a %) on each event', () => {
            const events = collectOTrackingEvents(events);
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl);
    
            stubAudioEl.currentTime = 18;
            stubAudioEl.dispatchEvent(new Event('playing'));
    
            proclaim.deepEqual(events[0], { category: 'audio', action: 'playing', duration: 120, progress: 15 });
        });
    })

    describe('progress event', () => {
        it('emits a progress event when the current time reaches the progress points 10%, 25%, 50%, 75%', () => {
            const events = collectOTrackingEvents(events);
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl);

            // trigger timeupdate event at 50%
            stubAudioEl.currentTime = 60;
            stubAudioEl.dispatchEvent(new Event('timeupdate'));

            proclaim.deepEqual(events[0], { category: 'audio', action: 'progress', duration: 120, progress: 50 });
        });

        it('only emits a progress event when the current time is a known progress point', () => {
            const events = collectOTrackingEvents(events);
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl);

            // trigger timeupdate event at 15%
            stubAudioEl.currentTime = 18;
            stubAudioEl.dispatchEvent(new Event('timeupdate'));

            proclaim.lengthEquals(events, 0);
        });

        it('only emits a progress event for a given progress point once', () => {
            const events = collectOTrackingEvents(events);
            const stubAudioEl = initAudioElement();
            initTracking(stubAudioEl);

            // trigger first timeupdate event at 50%
            stubAudioEl.currentTime = 60;
            stubAudioEl.dispatchEvent(new Event('timeupdate'));

            // trigger first timeupdate event at ~51%
            stubAudioEl.currentTime = 62;
            stubAudioEl.dispatchEvent(new Event('timeupdate'));

            proclaim.lengthEquals(events, 1);
            proclaim.deepEqual(events[0], { category: 'audio', action: 'progress', duration: 120, progress: 50 });
        })
    });

    describe('listened event', () => {
        it('emits a listened event before the o-audio element is destroyed', () => {
            const clock = sinon.useFakeTimers();
            const events = collectOTrackingEvents(events);
            const stubAudioEl = initAudioElement();
            const tracking = initTracking(stubAudioEl);

            stubAudioEl.dispatchEvent(new Event('playing'));
            clock.tick(18000); // pretend 18s have passed by
            stubAudioEl.dispatchEvent(new Event('pause'));

            tracking.destroy();
            
            proclaim.deepEqual(events[2], { category: 'audio', action: 'listened', duration: 120, amount: 18, amountPercentage:15 });
            clock.restore();
        });
    })
    
});

function initAudioElement() {
    const stubAudioEl = new EventTarget();
    stubAudioEl.duration = 120;
    return stubAudioEl
}

function initTracking (stubAudioEl) {
    const tracking = new Tracking(stubAudioEl);
    stubAudioEl.dispatchEvent(new Event('loadedmetadata'));
    return tracking;
}

function collectOTrackingEvents() {
    const events = [];
    document.body.addEventListener('oTracking.event', ({ detail }) => events.push(detail));
    return events;
}