/* eslint-env mocha */
/* global proclaim sinon */

import './setup';

import settings from '../src/javascript/core/settings';
import Queue from '../src/javascript/core/queue';
import oTracking from '../main.js';

describe('main', function () {
	let root_id;

	before(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		settings.destroy('config'); // Empty settings.
	});

	it('should only allow a single tracking instance to exist', function() {
		oTracking.destroy();
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
		const tracking1 = oTracking.init();
		const tracking2 = oTracking.init();
		document.head.removeChild(confEl);
		proclaim.deepStrictEqual(tracking1, oTracking);
		proclaim.deepStrictEqual(tracking1, tracking2);
		oTracking.destroy();
	});

	it('should quit without any config to init with', function() {
		oTracking.destroy();
		const tracking = oTracking.init();
		proclaim.equal(tracking, null);
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

		proclaim.deepEqual(settings.get('config'), config);
		proclaim.equal(tracking.initialised, true);

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

		oTracking.page({
			url: 'http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html'
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		root_id = sent_data.context.root_id;

		// Basics
		proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Meta
		proclaim.ok(sent_data.system.version.match(/\d+\.\d+.\d+/));
		proclaim.equal(sent_data.system.source, "o-tracking");

		// Type
		proclaim.equal(sent_data.category, "page");
		proclaim.equal(sent_data.action, "view");

		// User
		proclaim.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		proclaim.equal(sent_data.context.url, "http://www.ft.com/cms/s/0/576f5f1c-0509-11e5-9627-00144feabdc0.html");
		proclaim.equal(sent_data.context.product, "desktop");
	});

	it('should track an event', function () {

		const callback = sinon.spy();

		oTracking.event(new CustomEvent('oTracking.event', {
			detail: {
				category: 'video',
				action: 'play',
				component_id: '123456'
			}
		}), callback);

		proclaim.ok(callback.called, 'Callback not called.');


		const sent_data = callback.getCall(0).thisValue;

		// Basics
		proclaim.deepEqual(Object.keys(sent_data), ["system","context","user","device","category","action"]);

		// Type
		proclaim.equal(sent_data.category, "video");
		proclaim.equal(sent_data.action, "play");
		proclaim.equal(sent_data.context.component_id, "123456");

		// User
		proclaim.equal(sent_data.user.user_id, '023ur9jfokwenvcklwnfiwhfoi324');

		// Page
		proclaim.equal(sent_data.context.root_id, root_id);
		proclaim.equal(sent_data.context.product, "desktop");
	});

	it('should not mutate init config', function () {

		const callback1 = sinon.spy();
		const callback2 = sinon.spy();

		oTracking.page({
			my_key: "my_val"
		}, callback1);

		proclaim.ok(callback1.called, 'Callback not called.');

		const sent_data1 = callback1.getCall(0).thisValue;
		proclaim.equal(sent_data1.context.my_key, "my_val");

		// Track another page
		oTracking.page({}, callback2);
		proclaim.ok(callback2.called, 'Callback not called.');

		// Ensure vars from the first track don't leak into the second
		const sent_data2 = callback2.getCall(0).thisValue;
		proclaim.equal(sent_data2.context.my_key, undefined);
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

		oTracking.page({}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.equal(sent_data.system.environment, "prod");
		proclaim.equal(sent_data.system.is_live, true);
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

		proclaim.ok(callback.called, 'Callback not called.');

		const data_one = callback.getCall(0).thisValue;
		proclaim.equal(data_one.context.component_id, '12345');
		proclaim.equal(data_one.context.marketing.segid, '1234');
		proclaim.equal(data_one.device.orientation, 'landscape');
		proclaim.equal(data_one.device.is_offline, true);
		proclaim.equal(data_one.user.user_id, 'c2nb134j8hz2p');

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

		proclaim.ok(callback.called, 'Callback not called.');

		const data_two = callback.getCall(1).thisValue;
		proclaim.equal(data_two.context.component_id, '12346');
		proclaim.equal(data_two.context.marketing.segid, '1234');
		proclaim.equal(data_two.context.marketing.banner_closed, true);
		proclaim.equal(data_two.device.orientation, 'portrait');
		proclaim.equal(data_two.device.is_offline, true);
		proclaim.equal(data_two.user.user_id, 'cjw30zh3bxei6');
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

		proclaim.ok(callback.called, 'Callback not called.');

		const data = callback.getCall(0).thisValue;
		proclaim.equal(data.context.component_id, '12349');
		proclaim.equal(data.context.marketing.banner_closed, true);
		proclaim.equal(data.context.marketing.segid, '4321');
	});

	it('should have getRootId() as an accessible method', () => {
		proclaim.equal(typeof oTracking.getRootID, 'function');
	});
});
