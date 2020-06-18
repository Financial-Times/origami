/* eslint-env mocha */
/* global proclaim */
// autoinit is executed upon being imported
// so we must import a test helper before to
// count the times o-autoinit events are fired
import getEventCount from './helpers/event-count';
import './../main';

describe("o-autoinit", () => {
	it('fires o.DOMContentLoaded only once by the time the page is loaded', (done) => {
		const testInterval = setInterval(() => {
			if (document.readyState === 'complete') {
				clearInterval(testInterval);
				try {
					const eventCount = getEventCount();
					proclaim.equal(eventCount, 1, `o.DOMContentLoaded was fired ${eventCount} times.`);
				} catch (error) {
					done(error);
				}
				done();
			}
		}, 100);
	});
});
