/* eslint-env mocha */
/* global proclaim sinon */

import '../setup.js';

import {Queue} from '../../src/javascript/core/queue.js';
import {destroy} from '../../src/javascript/core/settings.js';
import {init as initSend} from '../../src/javascript/core/send.js';
import {init as initSession} from '../../src/javascript/core/session.js';
import {event as trackEvent} from '../../src/javascript/events/custom.js';

describe('event', function () {


	before(function () {
		initSession();
		initSend(); // Init the sender.
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		destroy('config'); // Empty settings.
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

	it('should throw custom error message if the tracking event object contains circular references', function () {

		const callback = sinon.spy();

		const customTrackingData = {ohh: 'ahh'};
		customTrackingData.circular = customTrackingData;
		const errorMessage = `o-tracking does not support circular references in the analytics data.
Please remove the circular references in the data.
Here are the paths in the data which are circular:
[
    ".context.context.circular"
]`;

		const errorMessageOnIOS10 = `o-tracking does not support circular references in the analytics data.
Please remove the circular references in the data.
Here are the paths in the data which are circular:
[
    "[0].item.context.context.circular"
]`;
		try {
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
				callback
			);
			proclaim.notOk("Expected function to throw an error but it did not");
		} catch (error) {
			proclaim.isInstanceOf(error, Error);
			try {
				proclaim.equal(error.message, errorMessage);
			} catch (testError) {
				proclaim.equal(error.message, errorMessageOnIOS10);
			}
		}
	});
});
