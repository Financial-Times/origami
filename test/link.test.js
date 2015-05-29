/*global require, describe, it, before, after, sinon, document */
"use strict";

var assert = require("assert");

describe('link', function () {

	var server,
		userID,
		link = require("../src/javascript/link.js");

	before(function () {
		require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
		(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
		require("../src/javascript/core/settings").delete('config');  // Empty settings.
		require("../src/javascript/core/send").init(); // Init the sender.
		require("../src/javascript/core").setPageID('pageID'); // Fix the click ID to stop it generating one.
		userID = require("../src/javascript/core/user").init(); // Init the user identifier.

		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		server.restore();
	});

	it('should track an external link', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		var callback = sinon.spy(),
			sent_data,

			aLink = document.createElement('a'),
			event = document.createEvent('HTMLEvents');

		aLink.href = "http://www.google.com";

		link.init({
			links: [aLink],
			event: 'testClick',
			callback: callback
		});

		event.initEvent('testClick', true, true);
		aLink.dispatchEvent(event, true);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "data"]);

		// Type
		assert.equal(sent_data.tag.type, "event");

		// Link
		assert.equal(sent_data.data.key, "link_id");
		assert.equal(sent_data.data.value, "a/www.google.com");
		assert.equal(sent_data.data.source_id, "pageID");
		assert.equal(sent_data.data.destination_id, undefined);
	});
});
