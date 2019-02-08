/*global require, describe, it, before, after, sinon */

import assert from 'assert';

import settings from "../src/javascript/core/settings";
import Queue from "../src/javascript/core/queue";
import session from "../src/javascript/core/session";
import send from "../src/javascript/core/send";
import Core from "../src/javascript/core.js";
import { errorNextSend } from './setup';

describe('Core', function () {

	const guid_re = /\w{25}/; // cifnulwv2000030ds4avpbm9f

	describe('root_id', function () {
		let root_id;

		it('should generate a root_id', function () {
			root_id = Core.setRootID();
			assert.ok(root_id.match(guid_re), "'" + root_id + "'.match(" + guid_re + ")");
		});

		it('should use the previous root_id for subsequent calls', function () {
			assert.equal(Core.getRootID(), root_id);
			assert.equal(Core.getRootID(), root_id);
		});

		it('should change the root_id on request', function () {
			const new_root_id = Core.setRootID();
			assert.equal(Core.getRootID(), new_root_id);
			assert.notEqual(new_root_id, root_id);
		});
	});

	describe('track', function () {

		before(function () {
			settings.set('version', '1.0.0');
			settings.set('api_key', 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP');
			settings.set('source', 'o-tracking');
			session.init(); // Session
			send.init(); // Init the sender.
		});

		after(function () {
			new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
			settings.destroy('config'); // Empty settings.
		});

		it('should send a tracking request', function () {
			const callback = sinon.spy();
			let sent_data;

			const root_id = Core.setRootID();
			Core.track({
				category: 'page',
				action: 'view',
				context: { url: "http://www.ft.com/home/uk" },
				user: { "user_id": "userID" }
			}, callback);

			assert.ok(callback.called, 'Callback not called.');

			sent_data = callback.getCall(0).thisValue;
			assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
			// System
			assert.deepEqual(Object.keys(sent_data.system), ["api_key","version","source"]);
			assert.equal(sent_data.system.api_key, "qUb9maKfKbtpRsdp0p2J7uWxRPGJEP");
			assert.equal(sent_data.system.version, "1.0.0");
			assert.equal(sent_data.system.source, "o-tracking");

			// Context
			assert.deepEqual(Object.keys(sent_data.context), ["id","root_id","url"]);
			assert.ok(guid_re.test(sent_data.context.id), "Request ID is invalid. " + sent_data.context.id);
			assert.equal(sent_data.context.root_id, root_id);
			assert.equal(sent_data.context.url, "http://www.ft.com/home/uk");

			// User
			assert.deepEqual(Object.keys(sent_data.user), ["passport_id","ft_session","ft_session_s","user_id"]);
			assert.equal(sent_data.user.user_id, "userID");

			// Device
			assert.deepEqual(Object.keys(sent_data.device), ["spoor_session","spoor_session_is_new","spoor_id"]);
			assert.equal(sent_data.device.spoor_session, require("../src/javascript/core/session").session().id);
			assert.equal(sent_data.device.spoor_session_is_new, require("../src/javascript/core/session").session().isNew);

		});

		it('should defer a tracking request', function () {

			errorNextSend();
			const callback = sinon.spy();

			Core.track({
				category: 'page',
				action: 'view',
				context: { url: "http://www.google.co.uk" },
				user: { "userID": "userID" }
			}, callback);

			assert.equal(callback.called, 1, 'Callback called once.');

			// Try again
			require("../src/javascript/core/send").run();

			assert.ok(callback.calledOnce, 'Callback should only be called once as next send could be on a different page.');
		});
	});


});
