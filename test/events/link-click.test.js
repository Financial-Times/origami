/*global require, describe, it, before, after, sinon, document */
'use strict';

const assert = require("assert");
const Queue = require("../../src/javascript/core/queue");
const settings = require("../../src/javascript/core/settings");
const send = require("../../src/javascript/core/send");
const core = require("../../src/javascript/core");
const link = require("../../src/javascript/events/link-click");
const session = require("../../src/javascript/core/session");

describe('click', function () {

	before(function () {
		core.setRootID('page_id'); // Fix the click ID to stop it generating one.
		session.init();
		send.init(); // Init the sender.
	});

	after(function () {
		new Queue('requests').replace([]);  // Empty the queue
		settings.destroy('config');  // Empty settings.
	});

	it('should track an external link', function (done) {

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
		setTimeout(() => {
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
			done();
		}, 10);

	});
	describe('internal links', function () {
		let aLink;

		before(function () {
			aLink = document.createElement('a');
			aLink.href = location.origin + '/url';
			aLink.text = "A link to Google's website";
		});

		it('should store an event for an internal link', function (done) {
			const event = document.createEvent('HTMLEvents');
			const callback = sinon.spy();
			link.init({
				links: [aLink],
				event: 'testClick',
				callback: callback
			});

			event.initEvent('testClick', true, true);
			aLink.dispatchEvent(event, true);
			setTimeout(() => {
				assert.ok(!callback.called, 'Callback called.');
				const storedEvent = JSON.parse(localStorage.getItem('o-tracking_links'))[0];

				assert.equal(typeof storedEvent.created_at, 'number');
				assert.equal(storedEvent.item.category, "link");
				assert.equal(storedEvent.item.action, "click");

				// Link
				assert.equal(storedEvent.item.context.link.id, "a/url");
				assert.equal(storedEvent.item.context.link.source_id, "page_id");
				assert.equal(storedEvent.item.context.link.href, aLink.href);
				assert.equal(storedEvent.item.context.link.title, aLink.text);
				done();
			}, 10);

		});

		it('should send event for an internal link on new page load', function (done) {

			sinon.stub(core, 'track');
			// simulates loading of a new page
			link.init({});

			setTimeout(() => {
				assert.equal(localStorage.getItem('o-tracking_links'), '[]');
				assert.ok(core.track.called, 'Callback not called.');

				const sent_data = core.track.getCall(0).args[0];

				// Type
				assert.equal(sent_data.category, "link");
				assert.equal(sent_data.action, "click");

				// Link
				assert.equal(sent_data.context.link.id, "a/url");
				assert.equal(sent_data.context.link.source_id, "page_id");
				assert.equal(sent_data.context.link.href, aLink.href);
				assert.equal(sent_data.context.link.title, aLink.text);
				core.track.restore();
				done();
			}, 10);

		});
	});

});
