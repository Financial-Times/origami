/*global describe, it, before, beforeEach, after, sinon */
import '../setup';
import assert from 'assert';
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
		let sent_data;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);
		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;
		// Basics
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);
		assert.deepEqual(Object.keys(sent_data.context), ["id","root_id","url","referrer"]);

		// Type
		assert.equal(sent_data.category, "page");
		assert.equal(sent_data.action, "view");

		// Page
		assert.equal(sent_data.context.url, "http://www.ft.com/home/uk");
		/*eslint-disable*/
		assert.ok((sent_data.context.referrer != null), "referrer is invalid. " + sent_data.context.referrer);
		/*eslint-enable*/
	});

	it('should assign a unique root_id for each page', function () {
		const callback = sinon.spy();
		const callback2 = sinon.spy();
		const callback3 = sinon.spy();
		let page1_root_id;
		let page2_root_id;
		let page3_root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback);
		assert.ok(callback.called, 'Callback not called.');

		page1_root_id = callback.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback2);
		assert.ok(callback2.called, 'Callback not called.');

		page2_root_id = callback2.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback3);
		assert.ok(callback3.called, 'Callback not called.');

		page3_root_id = callback3.getCall(0).thisValue.context.root_id;

		assert.notEqual(page1_root_id, page2_root_id, 'root_id is not unique');
		assert.notEqual(page2_root_id, page3_root_id, 'root_id is not unique');
		assert.notEqual(page1_root_id, page3_root_id, 'root_id is not unique');
	});

	it('should have an event sent before a PV attached to the next PV sent', function () {
		const callback = sinon.spy();
		const callback2 = sinon.spy();
		let event_root_id;
		let page_root_id;

		event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'link',
				action: 'click'
			}
		}), callback);
		assert.ok(callback.called, 'Callback not called.');

		event_root_id = callback.getCall(0).thisValue.context.root_id;

		page({
			url: "http://www.ft.com/home/uk"
		}, callback2);
		assert.ok(callback2.called, 'Callback not called.');

		page_root_id = callback2.getCall(0).thisValue.context.root_id;
		assert.equal(event_root_id, page_root_id, 'root_id should match: ' + event_root_id + '===' + page_root_id);
	});
});
