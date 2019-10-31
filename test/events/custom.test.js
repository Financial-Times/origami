/*global require, describe, it, before, after, sinon */
require('../setup');
const assert = require("assert");
const Queue = require("../../src/javascript/core/queue");
const settings = require("../../src/javascript/core/settings");
const send = require("../../src/javascript/core/send");
const session = require("../../src/javascript/core/session");

describe('event', function () {

	const track_event = require("../../src/javascript/events/custom.js");

	before(function () {
		session.init();
		send.init(); // Init the sender.
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		settings.destroy('config'); // Empty settings.
	});

	it('should track an event, adds custom component_id', function () {

		const callback = sinon.spy();
		let sent_data;

		track_event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'slideshow',
				action: 'slide_viewed',
				slide_number: 5,
				component_id: '123456',
				component_name: 'custom-o-tracking'
			}
		}), callback);

		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Event
		assert.equal(sent_data.category, "slideshow");
		assert.equal(sent_data.action, "slide_viewed");
		assert.equal(sent_data.context.slide_number, 5);
		assert.equal(sent_data.context.component_id, "123456");
		assert.equal(sent_data.context.component_name, 'custom-o-tracking');
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

			track_event(e, callback);
			assert.ok(callback.called, 'Callback not called.');

			const sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

			// Event
			assert.equal(sent_data.category, "video");
			assert.equal(sent_data.action, "play");
			assert.equal(sent_data.context.key, 'id');
			assert.equal(sent_data.context.value, 51234);
			assert.equal(typeof sent_data.context.component_id, "number");
			assert.equal(sent_data.context.component_name, "o-tracking");

		});

		document.body.dispatchEvent(event);
	});
});
