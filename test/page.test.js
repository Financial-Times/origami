/*global require, describe, it, before, after, sinon */

const assert = require("assert");

describe('page', function () {

	let server;
	const page = require("../src/javascript/page.js");

	before(function () {
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

		const callback = sinon.spy();
		let sent_data;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
		assert.deepEqual(Object.keys(sent_data.context), ["id","offset","root_id","url","referrer"]);

		// Type
		assert.equal(sent_data.category, "page");
		assert.equal(sent_data.action, "view");

		// Page
		assert.equal(sent_data.context.url, "http://www.ft.com/home/uk");
		assert.ok(!!sent_data.context.referrer, "referrer is invalid. " + sent_data.context.referrer);
	});

	it('should assign a unique root_id for each page', function () {
		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		const callback = sinon.spy();
		const callback2 = sinon.spy();
		let page1_root_id;
		let page2_root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);

		server.respond();
		assert.ok(callback.called, 'Callback not called.');

		page1_root_id = callback.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback2);

		server.respond();
		assert.ok(callback2.called, 'Callback not called.');

		page2_root_id = callback2.getCall(0).thisValue.context.root_id;
		assert.notEqual(page1_root_id, page2_root_id, 'root_id is not unique');
	});
});
