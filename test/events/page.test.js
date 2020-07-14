/* eslint-env mocha */
/* global proclaim sinon */

import '../setup';

import settings from '../../src/javascript/core/settings';
import send from '../../src/javascript/core/send';
import session from '../../src/javascript/core/session';
import Queue from '../../src/javascript/core/queue';
import page from '../../src/javascript/events/page-view.js';
import event from '../../src/javascript/events/custom.js';


describe('page', function () {

	beforeEach(function () {
		settings.destroy('page_viewed'); // Empty settings.
	});

	before(function () {
		session.init();
		send.init(); // Init the sender.
		// server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		settings.destroy('config'); // Empty settings.
	});

	it('should track a page', function () {
		const callback = sinon.spy();

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);
		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;
		// Basics
		proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
		proclaim.deepEqual(Object.keys(sent_data.context), ["id","root_id","url","referrer"]);

		// Type
		proclaim.equal(sent_data.category, "page");
		proclaim.equal(sent_data.action, "view");

		// Page
		proclaim.equal(sent_data.context.url, "http://www.ft.com/home/uk");
		/*eslint-disable*/
		proclaim.ok((sent_data.context.referrer != null), "referrer is invalid. " + sent_data.context.referrer);
		/*eslint-enable*/
	});

	it('should assign a unique root_id for each page', function () {
		const callback = sinon.spy();
		const callback2 = sinon.spy();
		const callback3 = sinon.spy();

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);
		proclaim.ok(callback.called, 'Callback not called.');

		const page1_root_id = callback.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback2);
		proclaim.ok(callback2.called, 'Callback not called.');

		const page2_root_id = callback2.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback3);
		proclaim.ok(callback3.called, 'Callback not called.');

		const page3_root_id = callback3.getCall(0).thisValue.context.root_id;

		proclaim.notEqual(page1_root_id, page2_root_id, 'root_id is not unique');
		proclaim.notEqual(page2_root_id, page3_root_id, 'root_id is not unique');
		proclaim.notEqual(page1_root_id, page3_root_id, 'root_id is not unique');
	});

	it('should have an event sent before a PV attached to the next PV sent', function () {
		const callback = sinon.spy();
		const callback2 = sinon.spy();

		event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'link',
				action: 'click'
			}
		}), callback);
		proclaim.ok(callback.called, 'Callback not called.');

		const event_root_id = callback.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback2);
		proclaim.ok(callback2.called, 'Callback not called.');

		const page_root_id = callback2.getCall(0).thisValue.context.root_id;
		proclaim.equal(event_root_id, page_root_id, 'root_id should match: ' + event_root_id + '===' + page_root_id);
	});
});
