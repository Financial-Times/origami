/*global require, describe, it, before, after, sinon, document */

const assert = require("assert");

describe('link', function () {

	let server;
	const link = require("../src/javascript/link.js");

	before(function () {
		(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
		require("../src/javascript/core/settings").destroy('config');  // Empty settings.
		require("../src/javascript/core/send").init(); // Init the sender.
		require("../src/javascript/core").setRootID('page_id'); // Fix the click ID to stop it generating one.

		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		server.restore();
	});

	it('should track an external link', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		const callback = sinon.spy();
		let sent_data;

		const aLink = document.createElement('a');
		const event = document.createEvent('HTMLEvents');

		aLink.href = "http://www.google.com";
		aLink.text = "A link to Google's website";

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
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Type
		assert.equal(sent_data.category, "link");
		assert.equal(sent_data.action, "click");

		// Link
		assert.equal(sent_data.context.link.id, "a/www.google.com");
		assert.equal(sent_data.context.link.source_id, "page_id");
		assert.equal(sent_data.context.link.href, aLink.href);
		assert.equal(sent_data.context.link.title, aLink.text);
	});
});
