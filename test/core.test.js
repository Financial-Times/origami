/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require('assert');

describe('Core', function () {

	var Core = require("../src/javascript/core.js"),
		guid_re = /\w{8}-\w{4}-4\w{3}-\w{4}-\w{8}/; // 7d26a201-cbdf-434f-880d-f658b424e9df

	describe('page_id', function () {
		it('should generate a page_id', function () {
			var page_id = Core.setPageID();
			assert.ok(page_id.match(guid_re), "'" + page_id + "'.match(" + guid_re + ")");
		});

		it('should use the page_id given it', function () {
			assert.equal(Core.setPageID("myPageID"), "myPageID");
		});
	});

	describe('track', function () {
		var server;

		before(function () {
			require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
			require("../src/javascript/core/settings").set('version', 'v1'); // Fix the internal counter incase other tests have just run.
			require("../src/javascript/core/settings").set('api_key', 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP'); // Fix the internal counter incase other tests have just run.
			require("../src/javascript/core/settings").set('source', 'o-tracking'); // Fix the internal counter incase other tests have just run.
			(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
			require("../src/javascript/core/settings").delete('config');  // Empty settings.
			require("../src/javascript/core/session").init(); // Session
			require("../src/javascript/core/send").init("v1"); // Init the sender.

			server = sinon.fakeServer.create(); // Catch AJAX requests
		});

		after(function () {
			server.restore();
		});

		it('should send a tracking request', function () {
			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

			var callback = sinon.spy(),
				sent_data,
				ua = window.navigator.userAgent;

			Core.setPageID('page_id');
			Core.track({
				meta: { type: 'page'  },
				data: { url: "http://www.ft.com/home/uk" },
				user: { "user_id": "userID" }
			}, callback);

			server.respond();

			assert.ok(callback.called, 'Callback not called.');

			sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["meta", "id", "user", "device", "data"]);
			// Event
			assert.deepEqual(Object.keys(sent_data.meta), ["api_key","version","source","id","counter","offset","page_id","type"]);
			assert.equal(sent_data.meta.api_key, "qUb9maKfKbtpRsdp0p2J7uWxRPGJEP");
			assert.equal(sent_data.meta.version, "v1");
			assert.equal(sent_data.meta.source, "o-tracking");
			assert.ok(guid_re.test(sent_data.meta.id), "Request ID is invalid. " + sent_data.meta.id);
			assert.equal(sent_data.meta.counter, 1);
			assert.ok(/\d+/.test(sent_data.meta.offset), "offset is invalid. " + sent_data.meta.offset);
			assert.equal(sent_data.meta.page_id, "page_id");
			assert.equal(sent_data.meta.type, "page");

			// User
			assert.deepEqual(Object.keys(sent_data.user), ["spoor_session","spoor_id","user_id"]);
			assert.equal(sent_data.user.user_id, "userID");
			assert.equal(sent_data.user.spoor_session, require("../src/javascript/core/session").session());

			// Device
			assert.equal(sent_data.device.user_agent, ua);
		});

		it('should defer a tracking request', function () {
			server.respondWith([404, { "Content-Type": "plain/text", "Content-Length": 6 }, "NOT OK"]);

			var callback = sinon.spy();

			Core.track({
				tag: { type: 'page'  },
				data: { url: "http://www.google.co.uk" },
				user: { "userID": "userID" }
			}, callback);

			server.respond();

			assert.equal(callback.called, 1, 'Callback not called.');

			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

			// Try again
			require("../src/javascript/core/send").run();

			server.respond();

			assert.ok(callback.calledTwice, 'Callback not called.');
		});
	});


});
