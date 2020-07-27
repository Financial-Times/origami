/* eslint-env mocha */
/* global proclaim sinon */

import settings from '../src/javascript/core/settings';
import Queue from '../src/javascript/core/queue';
import session from '../src/javascript/core/session';
import send from '../src/javascript/core/send';
import Core from '../src/javascript/core.js';
import { errorNextSend } from './setup';

describe('Core', function () {

	const guid_re = /\w{25}/; // cifnulwv2000030ds4avpbm9f

	describe('root_id', function () {
		let root_id;

		it('should generate a root_id', function () {
			root_id = Core.setRootID();
			proclaim.ok(root_id.match(guid_re), "'" + root_id + "'.match(" + guid_re + ")");
		});

		it('should use the previous root_id for subsequent calls', function () {
			proclaim.equal(Core.getRootID(), root_id);
			proclaim.equal(Core.getRootID(), root_id);
		});

		it('should change the root_id on request', function () {
			const new_root_id = Core.setRootID();
			proclaim.equal(Core.getRootID(), new_root_id);
			proclaim.notEqual(new_root_id, root_id);
		});
	});

	describe('track', function () {

		before(function () {
			settings.set('version', '1.0.0');
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

			const root_id = Core.setRootID();
			Core.track({
				category: 'page',
				action: 'view',
				context: { url: "http://www.ft.com/home/uk" },
				user: { "user_id": "userID" }
			}, callback);

			proclaim.ok(callback.called, 'Callback not called.');

			const sent_data = callback.getCall(0).thisValue;
			proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
			// System
			proclaim.deepEqual(Object.keys(sent_data.system), ["version","source", "is_live"]);
			proclaim.equal(sent_data.system.version, "1.0.0");
			proclaim.equal(sent_data.system.source, "o-tracking");

			// Context
			proclaim.deepEqual(Object.keys(sent_data.context), ["id","root_id","url"]);
			proclaim.ok(guid_re.test(sent_data.context.id), "Request ID is invalid. " + sent_data.context.id);
			proclaim.equal(sent_data.context.root_id, root_id);
			proclaim.equal(sent_data.context.url, "http://www.ft.com/home/uk");

			// User
			proclaim.deepEqual(Object.keys(sent_data.user), ["ft_session","ft_session_s","user_id"]);
			proclaim.equal(sent_data.user.user_id, "userID");

			// Device
			proclaim.deepEqual(Object.keys(sent_data.device), ["spoor_session","spoor_session_is_new","spoor_id"]);
			proclaim.equal(sent_data.device.spoor_session, session.session().id);
			proclaim.equal(sent_data.device.spoor_session_is_new, session.session().isNew);

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

			proclaim.equal(callback.called, 1, 'Callback called once.');

			// Try again
			send.run();

			proclaim.ok(callback.calledOnce, 'Callback should only be called once as next send could be on a different page.');
		});
	});


});
