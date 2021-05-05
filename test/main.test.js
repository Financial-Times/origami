/* eslint-env mocha */
/* global proclaim sinon */

import './setup.js';
import {destroy, get} from '../src/javascript/core/settings.js';
import { Queue } from '../src/javascript/core/queue.js';
import oTracking from '../main.js';
import { sendSpy } from './setup.js';

const clickEvent = new MouseEvent('click', {
	'view': window,
	'bubbles': true,
	'cancelable': true
});


describe('main', function () {
	let root_id;

	before(function () {
		new Queue('requests').replace([]); // Empty the queue as PhantomJS doesn't always start fresh.
		destroy('config'); // Empty settings.
	});

	it('should only allow a single tracking instance to exist per context', function() {
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

	describe.skip('a second instance of o-tracking exists in a separate browser context (e.g. new tab)', function () {
		let iframe;
		let iframeSrc;
		let parentLink;
		const config = {
			context: {
				product: 'desktop'
			},
			user: {
				user_id: '023ur9jfokwenvcklwnfiwhfoi324'
			}
		};

		beforeEach(function () {
			// Create iframe (new context to mimic a new tab)
			// and a local link click to track.
			document.documentElement.innerHTML = `
				<a href="#mock">A local link to click.</a>
				<iframe></iframe>
			`;

			iframe = document.querySelector('iframe');
			parentLink = document.querySelector('a');

			// Initialise o-tracking on the parent context.
			const parentTracking = oTracking.init(config);
			parentTracking.click.init();

			// Generate iframe content.
			const karmaFile = '/base/test/o-tracking-test.js';
			const bundleUrl =
				window.__karma__ &&
				window.__karma__.files &&
				window.__karma__.files[karmaFile] ? karmaFile : null;

			proclaim.ok(
				bundleUrl,
				'Could not find the o-tracking bundle served from a url, to ' +
				'test instances across different browser contexts. Unfortunately ' +
				'this depends on the Karma test runner. Has the test setup changed?'
			);

			const iframeContent = new Blob([`
				<html>
				<head>
					<!-- load o-tracking fixture -->
					<script src="${window.location.origin}${bundleUrl}"></script>
				</head>
				<body>
				</body>
				</html>
			`], { type: 'text/html' });

			iframeSrc = URL.createObjectURL(iframeContent);
		});

		it('should not send the same click event multiple times from the parent page', function(done) {
			// First click, e.g. like a cmd-click on macOS which opens a new tab
			// (the iframe is used to mimic this)
			parentLink.dispatchEvent(clickEvent, true);

			iframe.onload = () => {
				// init second instance of o-tracking in the iframe
				// fire a page event, as if navigated to a new page
				// in a new tab e.g. with cmd-click on macOS
				iframe.contentWindow.oTracking.init(config);
				iframe.contentWindow.oTracking.click.init();
				iframe.contentWindow.oTracking.page(config);
				// another click in the parent context, after a second instance
				// of o-tracking has loaded in the iframe (e.g. a new tab)
				sendSpy.resetHistory();
				parentLink.dispatchEvent(clickEvent, true);
				try {
					proclaim.equal(sendSpy.callCount, 1, 'Expected 1 event to be sent, the latest click event, no more.');
				} catch (error) {
					done(error);
				}
				done();
			};
			iframe.src = iframeSrc;
		});
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

		proclaim.deepEqual(get('config'), config);
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
		oTracking.page({
			url: "http://www.ft.com/home/uk"
		}, callback2);
		proclaim.ok(callback2.called, 'Callback not called.');

		// Ensure vars from the first track don't leak into the second
		const sent_data2 = callback2.getCall(0).thisValue;
		proclaim.equal(sent_data2.context.my_key, undefined);
	});

	it('should allow system properties to be set on init', function () {
		oTracking.destroy();

		oTracking.init({
			system: {
				environment: 'prod'
			}
		});


		const callback = sinon.spy();

		oTracking.page({
			url: "http://www.ft.com/home/uk?1"
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.equal(sent_data.system.environment, "prod");
	});

	it('should not allow system.is_live to be set on init', function () {
		oTracking.destroy();

		oTracking.init({
			system: {
				is_live: "carrot"
			}
		});


		const callback = sinon.spy();

		oTracking.page({
			url: "http://www.ft.com/home/uk?2"
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.equal(sent_data.system.is_live, true);
	});

	it('should set system.is_live to be false if `test` is set to true', function () {
		oTracking.destroy();

		oTracking.init({
			test: true
		});


		const callback = sinon.spy();

		oTracking.page({
			url: "http://www.ft.com/home/uk?3"
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.equal(sent_data.system.is_live, false);
	});

	it('should set system.is_live to be true if `test` is set to false', function () {
		oTracking.destroy();

		oTracking.init({
			test: false
		});


		const callback = sinon.spy();

		oTracking.page({
			url: "http://www.ft.com/home/uk?4"
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

		proclaim.equal(sent_data.system.is_live, true);
	});

	it('should set system.is_live to be true if `test` is not set', function () {
		const callback = sinon.spy();

		oTracking.page({
			url: "http://www.ft.com/home/uk?5"
		}, callback);

		proclaim.ok(callback.called, 'Callback not called.');

		const sent_data = callback.getCall(0).thisValue;

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
