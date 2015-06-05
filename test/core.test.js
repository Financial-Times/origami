/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require('assert');
var uuid_re = /\w{8}-\w{4}-\w{4}-\w{4}-\w{8}/;

describe('Core', function () {

	var Core = require("../src/javascript/core.js");

	describe('page_id', function () {
		it('should generate a page_id', function () {
			var page_id = Core.setPageID();
			assert.ok(page_id.match(uuid_re), "'" + page_id + "'.match(" + uuid_re + ")");
		});

		it('should use the page_id given it', function () {
			assert.equal(Core.setPageID("myPageID"), "myPageID");
		});
	});

	describe('track', function () {
		var server;

		before(function () {
			require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
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
				tag: { type: 'page'  },
				data: { url: "http://www.ft.com/home/uk" },
				user: { "user_id": "userID" }
			}, callback);

			server.respond();

			assert.ok(callback.called, 'Callback not called.');

			sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "data"]);
			// Tag
			assert.deepEqual(Object.keys(sent_data.tag), ["apiKey","version","id","counter","offset","page_id","type"]);
			assert.equal(sent_data.tag.apiKey, "");
			assert.equal(sent_data.tag.version, "v1");
			assert.ok(uuid_re.test(sent_data.tag.id), "Request ID is invalid. " + sent_data.tag.id);
			assert.equal(sent_data.tag.counter, 1);
			assert.ok(/\d+/.test(sent_data.tag.offset), "offset is invalid. " + sent_data.tag.offset);
			assert.equal(sent_data.tag.page_id, "page_id");
			assert.equal(sent_data.tag.type, "page");

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
