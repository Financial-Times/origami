/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require("assert");

describe('event', function () {

	var server,
		userID,
		track_event = require("../src/javascript/event.js");

	before(function () {
		require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
		(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
		require("../src/javascript/core/settings").delete('config');  // Empty settings.
		require("../src/javascript/core/send").init(); // Init the sender.
		//require("../src/javascript/core").setRootID('rootID'); // Fix the click ID to stop it generating one.
		userID = require("../src/javascript/core/user").init(); // Init the user identifier.

		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		server.restore();
	});

	it('should track an event, adds custom component_id', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		track_event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'slideshow',
				action: 'slide_viewed',
				slide_number: 5,
				component_id: '123456'
			}
		}), callback);

		server.respond();

		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action","component_id"]);

		// Event
		assert.equal(sent_data.category, "slideshow");
		assert.equal(sent_data.action, "slide_viewed");
		assert.equal(sent_data.context.slide_number, 5);
		assert.equal(sent_data.component_id, "123456");
	});

	it('should listen to a dom event and generate a component_id', function (done) {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);
		server.respondImmediately = true;

		var event = new CustomEvent('oTracking.event', {
			detail: {
				category: 'video',
				action: 'play',
				key: 'id',
				value: 51234
			}
		});

		document.body.setAttribute('data-o-component', 'o-tracking');
		document.body.addEventListener('oTracking.event', function(e) {

			var callback = sinon.spy();

			track_event(e, callback);

			assert.ok(callback.called, 'Callback not called.');

			var sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action","component_id"]);

			// Event
			assert.equal(sent_data.category, "video");
			assert.equal(sent_data.action, "play");
			assert.equal(sent_data.context.key, 'id');
			assert.equal(sent_data.context.value, 51234);
			assert.equal(typeof sent_data.component_id, "number");

			done();
		});

		document.body.dispatchEvent(event);
	});
});
