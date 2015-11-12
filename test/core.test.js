/*global require, describe, it, before, after, sinon */

const assert = require('assert');

describe('Core', function () {

	const Core = require("../src/javascript/core.js");
	const guid_re = /\w{25}/; // cifnulwv2000030ds4avpbm9f

	describe('root_id', function () {
		it('should generate a root_id', function () {
			const root_id = Core.setRootID();
			assert.ok(root_id.match(guid_re), "'" + root_id + "'.match(" + guid_re + ")");
		});

		it('should use the root_id given it', function () {
			assert.equal(Core.setRootID("myroot_id"), "myroot_id");
		});
	});

	describe('track', function () {
		let server;

		before(function () {
			require("../src/javascript/core/settings").set('version', '1.0.0');
			require("../src/javascript/core/settings").set('api_key', 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP');
			require("../src/javascript/core/settings").set('source', 'o-tracking');
			(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
			require("../src/javascript/core/settings").destroy('config');  // Empty settings.
			require("../src/javascript/core/session").init(); // Session
			require("../src/javascript/core/send").init(); // Init the sender.

			server = sinon.fakeServer.create(); // Catch AJAX requests
		});

		after(function () {
			server.restore();
		});

		it('should send a tracking request', function () {
			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

			const callback = sinon.spy();
			let sent_data;

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
			assert.deepEqual(Object.keys(sent_data.device), ["spoor_session","spoor_session_is_new","spoor_id"]);
			assert.equal(sent_data.device.spoor_session, require("../src/javascript/core/session").session().id);
			assert.equal(sent_data.device.spoor_session_is_new, require("../src/javascript/core/session").session().isNew);
		});

		it('should defer a tracking request', function () {
			server.respondWith([404, { "Content-Type": "plain/text", "Content-Length": 6 }, "NOT OK"]);

			const callback = sinon.spy();

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
