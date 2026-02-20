/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import {
	init,
	addAndRun
} from '../../src/javascript/core/send.js';
import {Queue} from "../../src/javascript/core/queue.js";
import {unmockTransport, mockTransport, sendSpy, errorNextSend} from '../setup.js';
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
		let queue;

		beforeEach(function () {
			set('config', {queue: true});
			queue = init();
		});

		afterEach(function () {
			queue.storage.destroy();
		});

		it('should summarise large numbers of offline events to avoid the huge queue bug', function () {
			// queue up 200 'offline' events
			for (let i = 0; i < 200; i++) {
				errorNextSend();
				addAndRun({
					category: 'page',
					action: 'view',
				});
			}

			// Go online, and send the events with a clean sinon.spy history
			sendSpy.resetHistory();
			addAndRun({
				category: 'button',
				action: 'click',
			});

			// Only one event should be sent
			proclaim.equal(sendSpy.callCount, 1);

			const payload = JSON.parse(sendSpy.firstCall.args[1]);
			proclaim.equal(payload.category, 'o-tracking');
			proclaim.equal(payload.action, 'queue-bug');
			proclaim.equal(payload.context.queue_length, 201);
			proclaim.deepEqual(payload.context.counts, {
				'page:view': 200,
				'button:click': 1,
			});

			proclaim.equal(queue.all().length, 0);
		});

		it('should summarise all offline events rather than discard previous summaries', function () {
			// queue up 200 'offline' events
			for (let i = 0; i < 200; i++) {
				errorNextSend();
				addAndRun({
					category: 'page',
					action: 'view',
				});
			}

			// this failure will generate a queue-bug event which fails to be sent
			errorNextSend();
			addAndRun({
				category: 'button',
				action: 'click',
			});

			// queue up 200 more 'offline' events
			for (let i = 0; i < 200; i++) {
				errorNextSend();
				addAndRun({
					category: 'page',
					action: 'view',
				});
			}

			// Go online, and send the events with a clean sinon.spy history
			sendSpy.resetHistory();
			addAndRun({
				category: 'button',
				action: 'click',
			});

			// Two send events should have been attempted
			proclaim.equal(sendSpy.callCount, 2);

			// NB: our mockTransport completes synchronously, so the last click event is
			// sent before the queue-bug event. It'll be the other way around with
			// a real HTTP call, but harder to observe the test framework.
			const firstEvent = JSON.parse(sendSpy.firstCall.args[1]);
			proclaim.equal(firstEvent.category, 'button');
			proclaim.equal(firstEvent.action, 'click');

			const secondEvent = JSON.parse(sendSpy.secondCall.args[1]);
			proclaim.equal(secondEvent.category, 'o-tracking');
			proclaim.equal(secondEvent.action, 'queue-bug');
			proclaim.equal(secondEvent.context.queue_length, 401);
			proclaim.deepEqual(secondEvent.context.counts, {
				'page:view': 400,
				'button:click': 1,
			});

			proclaim.equal(queue.all().length, 0);
		});

		it('should summarise offline status and queue time', async function () {
			const clock = sinon.useFakeTimers({
				now: new Date(0),
				toFake: ['Date'],
			});

			// queue up 100 'online' events which fail to send
			for (let i = 0; i < 100; i++) {
				errorNextSend();
				addAndRun({
					category: 'page',
					action: 'view',
				});
				clock.tick(1);
			}

			// queue up 301 'offline' events with a queue lag
			for (let i = 0; i < 301; i++) {
				errorNextSend();
				addAndRun({
					category: 'page',
					action: 'view',
					device: {
						is_offline: true,
					},
				});
				clock.tick(1);
			}

			// Go online, and send the events with a clean sinon.spy history
			sendSpy.resetHistory();
			addAndRun({
				category: 'button',
				action: 'click',
			});

			// Two send events should have been attempted
			proclaim.equal(sendSpy.callCount, 2);

			// NB: our mockTransport completes synchronously, so the last click event is
			// sent before the queue-bug event. It'll be the other way around with
			// a real HTTP call, but harder to observe the test framework.
			const firstEvent = JSON.parse(sendSpy.firstCall.args[1]);
			proclaim.equal(firstEvent.category, 'button');
			proclaim.equal(firstEvent.action, 'click');

			const secondEvent = JSON.parse(sendSpy.secondCall.args[1]);
			proclaim.equal(secondEvent.category, 'o-tracking');
			proclaim.equal(secondEvent.action, 'queue-bug');
			proclaim.equal(secondEvent.context.maxOfflineLag, 200);
			proclaim.equal(secondEvent.context.averageOfflineLag, 100);
			proclaim.equal(secondEvent.context.totalOfflineLag, 40000);
			proclaim.deepEqual(secondEvent.context.isOfflineCounts, {
				true: 301,
				false: 100,
			});

			clock.restore();
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
