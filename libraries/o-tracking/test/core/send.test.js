/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import {
	init,
	add,
	addAndRun
} from '../../src/javascript/core/send.js';
import {Queue} from "../../src/javascript/core/queue.js";
import {unmockTransport, mockTransport, sendSpy} from '../setup.js';
import {set, destroy} from '../../src/javascript/core/settings.js';

const request = {
	id: '1.199.83760034665465.1432907605043.-56cf00f',
	meta: {
		page_id: 'page_id',
		type: 'event'
	},
	user: {
		spoor_session: 'MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg==',
		spoor_id: 'value3'
	},
	device: {
		user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34'
	},
	category: 'video',
	action: 'seek',
	context: {
		key: 'pos',
		value: '10',
		parent_id: '1.990.74606760405.1432907605040.-56cf00f'
	}
};

// PhantomJS doesn't always create a "fresh" environment...

describe('Core.Send', function () {
	beforeEach(function() {
		set('config', {});
		sendSpy.resetHistory();
	});

	after(function () {
		new Queue('requests').replace([]);
		destroy('config'); // Empty settings.
	});

	it('should init first', function () {
		proclaim.doesNotThrow(function () {
			init();
		});
	});

	it('should add a request', function () {
		proclaim.doesNotThrow(function () {
			add(request);
		});
	});


	describe('fallback transports', function () {
		before(function () {
			unmockTransport();
		});

		after(function () {
			mockTransport();
		});

		it('use sendBeacon by default', function (done) {
			if (!navigator.sendBeacon) {
				// The browser being tested does not have sendBeacon support and sinon will throw an error if trying to stub a property which does not exist.
				done();
				return;
			}
			sinon.stub(navigator, 'sendBeacon');
			init();
			addAndRun(request);
			setTimeout(() => {
				try {
					proclaim.equal(navigator.sendBeacon.args[0][0], 'https://spoor-api.ft.com/ingest?type=video:seek');
					proclaim.ok(navigator.sendBeacon.called);
					navigator.sendBeacon.restore();
					destroy('config');
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('fallback to xhr when config.queue is set to true', function (done) {
			set('config', {queue:true});
			new Queue('requests').replace([]);
			init();

			const xhr = window.XMLHttpRequest;
			const dummyXHR = {
				withCredentials: false,
				open: sinon.stub(),
				setRequestHeader: sinon.stub(),
				send: sinon.stub()
			};
			window.XMLHttpRequest = function () {
				return dummyXHR;
			};
			addAndRun(request);
			setTimeout(() => {
				try {
					proclaim.ok(dummyXHR.withCredentials, 'withCredentials');
					proclaim.ok(dummyXHR.open.calledWith("POST", "https://spoor-api.ft.com/ingest?type=video:seek", true), 'is POST');
					proclaim.ok(dummyXHR.setRequestHeader.calledWith('Content-type', 'application/json'), 'is application/json');
					proclaim.ok(dummyXHR.send.calledOnce, 'calledOnce');
					window.XMLHttpRequest = xhr;
					destroy('config');
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('fallback to xhr when sendBeacon not supported', function (done) {
			new Queue('requests').replace([]);
			init();
			const b = navigator.sendBeacon;
			navigator.sendBeacon = null;
			const xhr = window.XMLHttpRequest;
			const dummyXHR = {
				withCredentials: false,
				open: sinon.stub(),
				setRequestHeader: sinon.stub(),
				send: sinon.stub()
			};
			window.XMLHttpRequest = function () {
				return dummyXHR;
			};
			addAndRun(request);
			setTimeout(() => {
				try {
					proclaim.ok(dummyXHR.withCredentials, 'withCredentials');
					proclaim.ok(dummyXHR.open.calledWith("POST", "https://spoor-api.ft.com/ingest?type=video:seek", true), 'is POST');
					proclaim.ok(dummyXHR.setRequestHeader.calledWith('Content-type', 'application/json'), 'is application/json');
					proclaim.ok(dummyXHR.send.calledOnce, 'calledOnce');
					window.XMLHttpRequest = xhr;
					navigator.sendBeacon = b;
					destroy('config');
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('fallback to image when xhr withCredentials and sendBeacon not supported', function (done) {
			new Queue('requests').replace([]);
			init();
			const b = navigator.sendBeacon;
			navigator.sendBeacon = null;
			const xhr = window.XMLHttpRequest;
			window.XMLHttpRequest = function () {
				return {};
			};
			const dummyImage = {
				addEventListener: sinon.stub()
			};
			const i = window.Image;
			window.Image = sinon.stub().returns(dummyImage);
			addAndRun(request);
			setTimeout(() => {
				try {
					const [domain, payload] = dummyImage.src.split('?');
					proclaim.equal(domain, "https://spoor-api.ft.com/px.gif");
					proclaim.equal(decodeURIComponent(payload), 'type=video:seek&data={"system":{"transport":"image","is_live":true},"id":"1.199.83760034665465.1432907605043.-56cf00f","meta":{"page_id":"page_id","type":"event"},"user":{"spoor_session":"MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg==","spoor_id":"value3"},"device":{"user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34"},"category":"video","action":"seek","context":{"key":"pos","value":"10","parent_id":"1.990.74606760405.1432907605040.-56cf00f"}}');
					proclaim.equal(dummyImage.addEventListener.args[0][0], 'error');
					proclaim.equal(dummyImage.addEventListener.args[0][1].length, 1);// it will get passed the error
					proclaim.equal(dummyImage.addEventListener.args[1][0], 'load');
					proclaim.equal(dummyImage.addEventListener.args[1][1].length, 0);// it will get passed the error
					window.XMLHttpRequest = xhr;
					window.Image = i;
					navigator.sendBeacon = b;
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('fallback to image with attachEvent() when user is living in the past', function (done) {
			init();
			const b = navigator.sendBeacon;
			navigator.sendBeacon = null;
			const xhr = window.XMLHttpRequest;
			window.XMLHttpRequest = function () {
				return {};
			};
			const dummyImage = {
				attachEvent: sinon.stub()
			};
			const i = window.Image;
			window.Image = sinon.stub().returns(dummyImage);
			addAndRun(request);
			setTimeout(() => {
				try {
					const payload = dummyImage.src.split('?')[1];
					proclaim.equal(decodeURIComponent(payload), 'type=video:seek&data={"system":{"transport":"image","is_live":true},"id":"1.199.83760034665465.1432907605043.-56cf00f","meta":{"page_id":"page_id","type":"event"},"user":{"spoor_session":"MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg==","spoor_id":"value3"},"device":{"user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34"},"category":"video","action":"seek","context":{"key":"pos","value":"10","parent_id":"1.990.74606760405.1432907605040.-56cf00f"}}');
					proclaim.equal(dummyImage.attachEvent.args[0][0], 'onerror');
					proclaim.equal(dummyImage.attachEvent.args[0][1].length, 1);// it will get passed the error
					proclaim.equal(dummyImage.attachEvent.args[1][0], 'onload');
					proclaim.equal(dummyImage.attachEvent.args[1][1].length, 0);// it will get passed the error
					window.XMLHttpRequest = xhr;
					window.Image = i;
					navigator.sendBeacon = b;
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('should remember offline lag if a request fails.', function (done) {
			const server = sinon.fakeServer.create(); // Catch AJAX requests

			new Queue('requests').replace([]);
			init();
			const b = navigator.sendBeacon;
			navigator.sendBeacon = null;

			server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);

			addAndRun(request);

			server.respond();
			// Respond again for Image fallback
			server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);
			server.respond();

			// Wait for localStorage
			setTimeout(() => {
				// console.log((new Queue('requests')).all());

				try {
					proclaim.ok(new Queue('requests').last().queueTime);
					navigator.sendBeacon = b;
					server.restore();
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});
	});

	describe('queue bug', function () {
		let transport;

		beforeEach(function () {
			transport = {
				send: sinon.spy(),
				complete: function (callback) {
					callback();
				},
			};

			mock.transport = function () {
				return transport;
			};
		});

		it('should cope with the huge queue bug', function (done) {
			let queue = new Queue('requests');

			queue.replace([]);

			for (let i = 0; i < 200; i++) {
				queue.add({
					category: 'page',
					action: 'view',
				});
			}

			queue.add({
				category: 'button',
				action: 'click',
			});

			queue.save();

			// Run the queue
			init();

			// Only one event should be sent
			proclaim.equal(transport.send.callCount, 1);

			const payload = JSON.parse(transport.send.firstCall.args[1]);
			proclaim.equal(payload.category, 'o-tracking');
			proclaim.equal(payload.action, 'queue-bug');
			proclaim.equal(payload.context.queue_length, 201);
			proclaim.deepEqual(payload.context.counts, {
				'page:view': 200,
				'button:click': 1,
			});
		});
	});

	it('should replace circular references with warning strings', function (done) {
		const onerror = window.onerror;
		window.onerror = sinon.spy();

		init();

		const customTrackingData = {ohh: 'ahh'};
		customTrackingData.circular = customTrackingData;

		const request = {
			context: {
				customTrackingData,
			},
		};

		addAndRun(request);
		setTimeout(() => {
			try {
				proclaim.ok(sendSpy.called);
				const payload = JSON.parse(sendSpy.args[0][1]);
				proclaim.deepEqual(payload.context.customTrackingData, {
					ohh: 'ahh',
					circular:
						'Circular reference between `$.context.customTrackingData` AND `$.context.customTrackingData.circular`',
				});

				proclaim.ok(window.onerror.called);
				proclaim.include(
					window.onerror.firstCall.firstArg,
					'o-tracking does not support circular references in the analytics data'
				);

				destroy('config');
				window.onerror = onerror;
				done();
			} catch (error) {
				done(error);
			}
		}, 100);
	});
});
