/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require('assert');

describe('Core', function () {

	var Core = require("../src/javascript/core.js"),
		guid_re = /\w{8}-\w{4}-4\w{3}-\w{4}-\w{8}/; // 7d26a201-cbdf-434f-880d-f658b424e9df

	describe('root_id', function () {
		it('should generate a root_id', function () {
			var root_id = Core.setRootID();
			assert.ok(root_id.match(guid_re), "'" + root_id + "'.match(" + guid_re + ")");
		});

		it('should use the root_id given it', function () {
			assert.equal(Core.setRootID("myroot_id"), "myroot_id");
		});
	});

	describe('track', function () {
		var server;

		before(function () {
			require("../src/javascript/core/settings").set('version', '1.0.0');
			require("../src/javascript/core/settings").set('api_key', 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP');
			require("../src/javascript/core/settings").set('source', 'o-tracking');
			(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
			require("../src/javascript/core/settings").delete('config');  // Empty settings.
			require("../src/javascript/core/session").init(); // Session
			require("../src/javascript/core/send").init(); // Init the sender.

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

			Core.setRootID('root_id');
			Core.track({
				category: 'page',
				action: 'view',
				context: { url: "http://www.ft.com/home/uk" },
				user: { "user_id": "userID" }
			}, callback);

			server.respond();

			assert.ok(callback.called, 'Callback not called.');

			sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
			// System
			assert.deepEqual(Object.keys(sent_data.system), ["api_key","version","source"]);
			assert.equal(sent_data.system.api_key, "qUb9maKfKbtpRsdp0p2J7uWxRPGJEP");
			assert.equal(sent_data.system.version, "1.0.0");
			assert.equal(sent_data.system.source, "o-tracking");

			// Context
			assert.deepEqual(Object.keys(sent_data.context), ["id","offset","root_id","url"]);
			assert.ok(guid_re.test(sent_data.context.id), "Request ID is invalid. " + sent_data.context.id);
			//assert.ok(/\d+/.test(sent_data.time.offset), "offset is invalid. " + sent_data.time.offset);
			assert.equal(sent_data.context.root_id, "root_id");
			assert.equal(sent_data.context.url, "http://www.ft.com/home/uk");

			// User
			assert.deepEqual(Object.keys(sent_data.user), ["user_id"]);
			assert.equal(sent_data.user.user_id, "userID");

			// Device
			assert.deepEqual(Object.keys(sent_data.device), ["spoor_session","spoor_session_is_new","spoor_id","user_agent"]);
			assert.equal(sent_data.device.spoor_session, require("../src/javascript/core/session").session().id);
			assert.equal(sent_data.device.spoor_session_is_new, require("../src/javascript/core/session").session().isNew);
			assert.equal(sent_data.device.user_agent, ua);
		});

		it('should defer a tracking request', function () {
			server.respondWith([404, { "Content-Type": "plain/text", "Content-Length": 6 }, "NOT OK"]);

			var callback = sinon.spy();

			Core.track({
				category: 'page',
				action: 'view',
				context: { url: "http://www.google.co.uk" },
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
