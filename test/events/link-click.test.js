/*global require, describe, it, before, after, sinon, document */


const assert = require("assert");
const Queue = require("../../src/javascript/core/queue");
const settings = require("../../src/javascript/core/settings");
const send = require("../../src/javascript/core/send");
const core = require("../../src/javascript/core");
const link = require("../../src/javascript/events/link-click.js");

describe('click', function () {

	let server;

	before(function () {
		core.setRootID('page_id'); // Fix the click ID to stop it generating one.
		send.init(); // Init the sender.
		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		new Queue('requests').replace([]);  // Empty the queue
		settings.destroy('config');  // Empty settings.
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
		assert.equal(sent_data.context.root_id, "page_id");

		// Link
		assert.equal(sent_data.context.link.id, "a/www.google.com");
		assert.equal(sent_data.context.link.source_id, "page_id");
		assert.equal(sent_data.context.link.href, aLink.href);
		assert.equal(sent_data.context.link.title, aLink.text);
	});
});
