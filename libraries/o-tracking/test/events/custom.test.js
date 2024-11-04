/* eslint-env mocha */

import '../setup.js';
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import {Queue} from '../../src/javascript/core/queue.js';
import {destroy} from '../../src/javascript/core/settings.js';
import {init as initSend} from '../../src/javascript/core/send.js';
import {init as initSession} from '../../src/javascript/core/session.js';
import {event as trackEvent} from '../../src/javascript/events/custom.js';

describe('event', function () {
	let onerror;
	let errorMessage;

	before(function () {
		initSession();
		initSend(); // Init the sender.

		// Set a custom error handler
		onerror = window.onerror;
		window.onerror = function errorHandler(message) {
			errorMessage = message;
		}
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		destroy('config'); // Empty settings.
		window.onerror = onerror; // Restore the default error handler
	});

	beforeEach(function () {
		errorMessage = undefined;
	});

	it('should track an event, adds custom component_id', function () {

		const callback = sinon.spy();

		trackEvent(new CustomEvent('oTracking.event', {
			detail: {
				category: 'slideshow',
				action: 'slide_viewed',
				slide_number: 5,
				component_id: '123456',
				component_name: 'custom-o-tracking'
			}
		}), callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Event
		proclaim.equal(sent_data.category, "slideshow");
		proclaim.equal(sent_data.action, "slide_viewed");
		proclaim.equal(sent_data.context.slide_number, 5);
		proclaim.equal(sent_data.context.component_id, "123456");
		proclaim.equal(sent_data.context.component_name, 'custom-o-tracking');
	});

	it('should listen to a dom event and generate a component_id', function () {

		const event = new CustomEvent('oTracking.event', {
			detail: {
				category: 'video',
				action: 'play',
				key: 'id',
				value: 51234
			}
		});

		document.body.setAttribute('data-o-component', 'o-tracking');
		document.body.addEventListener('oTracking.event', function(e) {

			const callback = sinon.spy();

			trackEvent(e, callback);
			proclaim.ok(callback.called, 'Callback not called.');

			const sent_data = callback.getCall(0).thisValue;

			proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

			// Event
			proclaim.equal(sent_data.category, "video");
			proclaim.equal(sent_data.action, "play");
			proclaim.equal(sent_data.context.key, 'id');
			proclaim.equal(sent_data.context.value, 51234);
			proclaim.equal(typeof sent_data.context.component_id, "number");
			proclaim.equal(sent_data.context.component_name, "o-tracking");

		});

		document.body.dispatchEvent(event);
	});

	it('should throw custom error message if the tracking event object contains circular references', function (done) {
		const customTrackingData = {ohh: 'ahh'};
		customTrackingData.circular = customTrackingData;

		trackEvent(
			new CustomEvent("oTracking.event", {
				detail: {
					category: "slideshow",
					action: "slide_viewed",
					slide_number: 5,
					component_id: "123456",
					component_name: "custom-o-tracking",
					context: customTrackingData,
				},
			}),
		);

		setTimeout(() => {
			proclaim.include(errorMessage, 'AssertionError');
			proclaim.include(errorMessage, '.context.context.circular');
			done();
		});
	});

	it('should not report a circular reference when multiple references are made to the same object', function (done) {
		const contextPartOne = {key: 'part one'};
		const contextPartTwo = {key: 'part two'};

		const sharedReference = {shared: 'shared'};
		contextPartOne.sharedReference = sharedReference;
		contextPartTwo.sharedReference = sharedReference;

		trackEvent(
			new CustomEvent('oTracking.event', {
				detail: {
					category: 'slideshow',
					action: 'slide_viewed',
					slide_number: 5,
					component_id: '123456',
					component_name: 'custom-o-tracking',
					contextPartOne,
					contextPartTwo,
				},
			}),
		);

		setTimeout(() => {
			proclaim.isUndefined(errorMessage, 'Expected function not to throw an error');
			done();
		});
	});
});
