/*global require, describe, it, before, after, sinon */
require('./setup');
const assert = require("assert");
const settings = require("../src/javascript/core/settings");
const Queue = require("../src/javascript/core/queue");
const Send = require("../src/javascript/core/send");
const oTracking = require("../main.js");

describe('main', function () {

	let root_id;

	before(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		settings.destroy('config'); // Empty settings.
	});

	after(function () {
	});

	it('should quit without any config to init with', function() {
		oTracking.destroy();
		const tracking = oTracking.init();
		assert.equal(tracking, null);
		oTracking.destroy();
	});

	it('should configure itself from the DOM if no options are present', function() {
		const confEl = document.createElement('script');
		confEl.type = 'application/json';
		confEl.dataset.oTrackingConfig = 'true';
		const config = {
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '023ur9jfokwenvcklwnfiwhfoi324'
			}
		};
		confEl.innerText = JSON.stringify(config);

		document.head.appendChild(confEl);
		const tracking = oTracking.init();

		assert.deepEqual(settings.get('config'), config);
		assert.equal(tracking.initialised, true);

		document.head.removeChild(confEl);
		oTracking.destroy();
	});

	it('should track a page', function () {
		oTracking.init({
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '023ur9jfokwenvcklwnfiwhfoi324'
			}
		});

		const callback = sinon.spy();
		let sent_data;

		oTracking.page({
			url: 'http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html'
		}, callback);

		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		root_id = sent_data.context.root_id;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Meta
		assert.equal(sent_data.system.api_key, "qUb9maKfKbtpRsdp0p2J7uWxRPGJEP");
		assert.ok(sent_data.system.version.match(/\d+\.\d+.\d+/));
		assert.equal(sent_data.system.source, "o-tracking");

		// Type
		assert.equal(sent_data.category, "page");
		assert.equal(sent_data.action, "view");

		// User
		assert.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		assert.equal(sent_data.context.url, "http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html");
		assert.equal(sent_data.context.product, "desktop");
	});

	it('should track an event', function () {

		const callback = sinon.spy();
		let sent_data;

		oTracking.event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'video',
				action: 'play',
				component_id: '123456'
			}
		}), callback);

		assert.ok(callback.called, 'Callback not called.');


		sent_data = callback.getCall(0).thisValue;

		// Basics
		assert.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Type
		assert.equal(sent_data.category, "video");
		assert.equal(sent_data.action, "play");
		assert.equal(sent_data.context.component_id, "123456");

		// User
		assert.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		assert.equal(sent_data.context.root_id, root_id);
		assert.equal(sent_data.context.product, "desktop");
	});

	it('should not mutate init config', function () {

		const callback1 = sinon.spy();
		const callback2 = sinon.spy();
		let sent_data1;
		let sent_data2;

		oTracking.page({
			my_key: "my_val"
		}, callback1);

		assert.ok(callback1.called, 'Callback not called.');

		sent_data1 = callback1.getCall(0).thisValue;
		assert.equal(sent_data1.context.my_key, "my_val");

		// Track another page
		oTracking.page({}, callback2);
		assert.ok(callback2.called, 'Callback not called.');

		// Ensure vars from the first track don't leak into the second
		sent_data2 = callback2.getCall(0).thisValue;
		assert.equal(sent_data2.context.my_key, undefined);
	});

	it('should allow system properties to be set on init', function () {
		oTracking.destroy();

		oTracking.init({
			system: {
				environment: 'prod',
				is_live: true
			}
		});


		const callback = sinon.spy();
		let sent_data;

		oTracking.page({}, callback);

		assert.ok(callback.called, 'Callback not called.');

		sent_data = callback.getCall(0).thisValue;

		assert.equal(sent_data.system.environment, "prod");
		assert.equal(sent_data.system.is_live, true);
	});

	it('should allow config to be updated after init', function () {
		oTracking.destroy();
		oTracking.init({
			device: {
				orientation: "landscape",
				is_offline: true,
			},
			context: {
				marketing: {
					segid: '1234',
				},
				region: 'europe',
			},
			user: {
				user_id: 'c2nb134j8hz2p'
			}
		});

		const callback = sinon.spy();

		oTracking.event(new CustomEvent('oTracking.event', {
			detail: { category: 'video', action: 'play', component_id: '12345' }
		}), callback);

		assert.ok(callback.called, 'Callback not called.');

		const data_one = callback.getCall(0).thisValue;
		assert.equal(data_one.context.component_id, '12345');
		assert.equal(data_one.context.marketing.segid, '1234');
		assert.equal(data_one.device.orientation, 'landscape');
		assert.equal(data_one.device.is_offline, true);
		assert.equal(data_one.user.user_id, 'c2nb134j8hz2p');
		assert.equal(Send.getDomain(), 'https://spoor-api.ft.com/px.gif');

		oTracking.updateConfig({
			server: 'somewhere over the rainbow',
			device: {
				orientation: "portrait",
			},
			context: {
				marketing: {
					banner_closed: true,
				},
			},
			user: {
				user_id: 'cjw30zh3bxei6'
			}
		});

		oTracking.event(new CustomEvent('oTracking.event', {
			detail: { category: 'video', action: 'play', component_id: '12346' }
		}), callback);

		assert.ok(callback.called, 'Callback not called.');

		const data_two = callback.getCall(1).thisValue;
		assert.equal(data_two.context.component_id, '12346');
		assert.equal(data_two.context.marketing.segid, '1234');
		assert.equal(data_two.context.marketing.banner_closed, true);
		assert.equal(data_two.device.orientation, 'portrait');
		assert.equal(data_two.device.is_offline, true);
		assert.equal(data_two.user.user_id, 'cjw30zh3bxei6');
		assert.equal(Send.getDomain(), 'somewhere over the rainbow');
	});

	it('should override core configuration with individual calls', function () {
		const callback = sinon.spy();

		oTracking.event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'video',
				action: 'play',
				component_id: '12349',
				marketing: {
					segid: '4321',
				},
			}
		}), callback);

		assert.ok(callback.called, 'Callback not called.');

		const data = callback.getCall(0).thisValue;
		assert.equal(data.context.component_id, '12349');
		assert.equal(data.context.marketing.banner_closed, true);
		assert.equal(data.context.marketing.segid, '4321');
	});

	it('should have getRootId() as an accessible method', () => {
		assert.equal(typeof oTracking.getRootID, 'function');
	});
});
