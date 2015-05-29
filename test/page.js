/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require("assert");

describe('page', function () {

	var server,
		page = require("../src/javascript/page.js");

	before(function () {
		require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
		(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
		require("../src/javascript/core/settings").delete('config');  // Empty settings.
		require("../src/javascript/core/send").init(); // Init the sender.

		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		server.restore();
	});

	it('should track a page', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data;

		page({
			url: "http://www.ft.com/home/uk",
			product: 'mobile'
		}, callback);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "data"]);
		assert.deepEqual(Object.keys(sent_data.data), ["url", "referrer", "product"]);

		// Type
		assert.equal(sent_data.tag.type, "page");

		// Page
		assert.equal(sent_data.data.url, "http://www.ft.com/home/uk");
		assert.equal(sent_data.data.product, "mobile");
		assert.ok(!!sent_data.data.referrer, "referrer is invalid. " + sent_data.data.referrer);
	});
});
