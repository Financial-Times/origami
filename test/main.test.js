/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require("assert");
var settings = require("../src/javascript/core/settings");

describe('main', function () {

	var server;
	var oTracking = require("../main.js");
	var page_id;

	before(function () {
		(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
		settings.delete('config');  // Empty settings.
		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		server.restore();
	});

	it('should configure itself from the DOM if no options are present', function() {
		var confEl = document.createElement('script');
		confEl.type = 'application/json';
		confEl.dataset.oTrackingConfig = 'true';
		var config = {
			page: {
				product: 'desktop'
			},
			user: {
				user_id: '023ur9jfokwenvcklwnfiwhfoi324'
			}
		};
		confEl.innerText = JSON.stringify(config);

		document.head.appendChild(confEl);
		var tracking = oTracking.init();

		assert.deepEqual(settings.get('config'), config);
		assert.equal(tracking.initialised, true);

		document.head.removeChild(confEl);
		oTracking.destroy();
	});

	it('should track a page', function () {
		oTracking.init({
			page: {
				product: 'desktop'
			},
			user: {
				user_id: '023ur9jfokwenvcklwnfiwhfoi324'
			}
		});

		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		oTracking.page({
			url: 'http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html'
		}, callback);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		page_id = sent_data.tag.id;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "data"]);

		// Type
		assert.equal(sent_data.tag.type, "page");

		// User
		assert.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		assert.equal(sent_data.data.url, "http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html");
		assert.equal(sent_data.data.product, "desktop");
	});

	it('should track an event', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		oTracking.event({
			'category': 'video',
			'action': 'play'
		}, callback);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "data"]);

		// Type
		assert.equal(sent_data.tag.type, "event");

		// User
		assert.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		assert.equal(sent_data.tag.page_id, page_id);

		// Event
		assert.equal(sent_data.data.category, "video");
		assert.equal(sent_data.data.action, "play");
	});
});
