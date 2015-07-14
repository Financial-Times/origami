/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require("assert");

describe('event', function () {

	var server,
		userID,
		track_event = require("../src/javascript/event.js");

	before(function () {
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

	it('should track an event', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		track_event({
			category: 'slideshow',
			action: 'slide_viewed',
			slide_number: 5
		}, callback);

		server.respond();

		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Event
		assert.equal(sent_data.category, "slideshow");
		assert.equal(sent_data.action, "slide_viewed");
		assert.equal(sent_data.context.slide_number, 5);
	});

	/* TODO PhantomJS doesn't like CustomEvent
	it('should listen to a dom event', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		var event = new CustomEvent('oTracking.event', { category: 'video', action: 'play', key: 'id', value: '512346789', callback: callback });
		window.dispatchEvent(event);

		server.respond();

		assert.ok(callback.called, 'Callback not called.');

		console.log(callback.getCall(0));

		sent_data = callback.getCall(0).thisValue;

		console.log(sent_data);
	});
	*/

	/* TODO Use grouping ID instead.

	it('should track a child/sub event', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data,
			parent_id;

		// parent request
		track_event({
			category: 'video',
			action: 'play',
			player_id: '23456789'
			video_id: '12345678'
		}, callback);
		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		assert.equal(callback.getCall(0).thisValue.id, callback.getCall(0).thisValue.meta.id);

		parent_id = callback.getCall(0).thisValue.id;

		// child request
		track_event({
			parent_id: parent_id,
			category: 'video',
			action: 'seek',
			key: 'pos',
			value: '10'
		}, callback);
		server.respond();
		assert.ok(callback.calledTwice, 'Callback not called.');

		sent_data = callback.getCall(1).thisValue;

		// Event
		assert.equal(sent_data.data.parent_id, parent_id);
		assert.equal(sent_data.data.category, "video");
		assert.equal(sent_data.data.action, "seek");
		assert.equal(sent_data.data.key, "pos");
		assert.equal(sent_data.data.value, "10");
	});   */

});
