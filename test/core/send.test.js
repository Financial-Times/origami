/*global describe, it, after, sinon, before */

import assert from 'assert';
import Send from '../../src/javascript/core/send';
import Queue from "../../src/javascript/core/queue";

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
	async: true,
	category: 'video',
	action: 'seek',
	context: {
		key: 'pos',
		value: '10',
		parent_id: '1.990.74606760405.1432907605040.-56cf00f'
	}
};

import setup from '../setup';
import settings from '../../src/javascript/core/settings';

// PhantomJS doesn't always create a "fresh" environment...

describe('Core.Send', function () {

	after(function () {
		(new Queue('requests')).replace([]);
		settings.destroy('config'); // Empty settings.
	});

	it('should init first', function () {
		assert.doesNotThrow(function () {
			Send.init();
		});
	});

	it('should add a request', function () {
		assert.doesNotThrow(function () {
			Send.add(request);
		});
	});


	describe('fallback transports', function () {
		before(function () {
			setup.unmockTransport();
		});

		after(function () {
			setup.mockTransport();
		});

		it('use xhr by default', function (done) {
			Send.init();
			navigator.sendBeacon = navigator.sendBeacon || true;
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
			Send.addAndRun(request);
			setTimeout(() => {
				assert.equal(typeof dummyXHR.onerror, 'function');
				assert.equal(typeof dummyXHR.onload, 'function');
				// assert.equal(dummyXHR.onerror.length, 1) // it will get passed the error
				// assert.equal(dummyXHR.onload.length, 0) // it will not get passed an error
				assert.ok(dummyXHR.withCredentials);

				assert.ok(dummyXHR.open.calledWith("POST", "https://spoor-api.ft.com/px.gif?type=video:seek", true));
				assert.ok(dummyXHR.setRequestHeader.calledWith('Content-type', 'application/json'));
				assert.ok(dummyXHR.send.calledOnce);
				window.XMLHttpRequest = xhr;
				if (typeof navigator.sendBeacon === 'boolean') {
					delete navigator.sendBeacon;
				}
				done();
			}, 100);
		});

		if (navigator.sendBeacon) {
			it('use sendBeacon when configured', function (done) {
				settings.set('config', {useSendBeacon: true});
				sinon.stub(navigator, 'sendBeacon');
				Send.init();
				Send.addAndRun(request);
				setTimeout(() => {
					assert.equal(navigator.sendBeacon.args[0][0], 'https://spoor-api.ft.com/px.gif?type=video:seek');
					assert.ok(navigator.sendBeacon.called);
					navigator.sendBeacon.restore();
					settings.destroy('config');
					done();
				}, 100);
			});
		}


		it('fallback to xhr when sendBeacon not supported', function (done) {
			(new Queue('requests')).replace([]);
			settings.set('config', {useSendBeacon: true});
			Send.init();
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
			Send.addAndRun(request);
			setTimeout(() => {
				assert.equal(typeof dummyXHR.onerror, 'function');
				assert.equal(typeof dummyXHR.onload, 'function');
				// assert.equal(dummyXHR.onerror.length, 1) // it will get passed the error
				// assert.equal(dummyXHR.onload.length, 0) // it will not get passed an error
				assert.ok(dummyXHR.withCredentials, 'withCredentials');
				assert.ok(dummyXHR.open.calledWith("POST", "https://spoor-api.ft.com/px.gif?type=video:seek", true), 'is POST');
				assert.ok(dummyXHR.setRequestHeader.calledWith('Content-type', 'application/json'), 'is application/json');
				assert.ok(dummyXHR.send.calledOnce, 'calledOnce');
				window.XMLHttpRequest = xhr;
				navigator.sendBeacon = b;
				settings.destroy('config');
				done();
			}, 100);
		});

		it('fallback to image when xhr withCredentials and sendBeacon not supported', function (done) {
			(new Queue('requests')).replace([]);
			Send.init();
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
			Send.addAndRun(request);
			setTimeout(() => {
				assert.equal(dummyImage.src, 'https://spoor-api.ft.com/px.gif?type=video:seek&data=%7B%22system%22%3A%7B%22transport%22%3A%22image%22%7D%2C%22id%22%3A%221.199.83760034665465.1432907605043.-56cf00f%22%2C%22meta%22%3A%7B%22page_id%22%3A%22page_id%22%2C%22type%22%3A%22event%22%7D%2C%22user%22%3A%7B%22spoor_session%22%3A%22MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg%3D%3D%22%2C%22spoor_id%22%3A%22value3%22%7D%2C%22device%22%3A%7B%22user_agent%22%3A%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X)%20AppleWebKit%2F534.34%20(KHTML%2C%20like%20Gecko)%20PhantomJS%2F1.9.8%20Safari%2F534.34%22%7D%2C%22category%22%3A%22video%22%2C%22action%22%3A%22seek%22%2C%22context%22%3A%7B%22key%22%3A%22pos%22%2C%22value%22%3A%2210%22%2C%22parent_id%22%3A%221.990.74606760405.1432907605040.-56cf00f%22%7D%7D');
				assert.equal(dummyImage.addEventListener.args[0][0], 'error');
				assert.equal(dummyImage.addEventListener.args[0][1].length, 1);// it will get passed the error
				assert.equal(dummyImage.addEventListener.args[1][0], 'load');
				assert.equal(dummyImage.addEventListener.args[1][1].length, 0);// it will get passed the error
				window.XMLHttpRequest = xhr;
				window.Image = i;
				navigator.sendBeacon = b;
				done();
			}, 100);
		});

		it('fallback to image with attachEvent() when user is living in the past', function (done) {
			Send.init();
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
			Send.addAndRun(request);
			setTimeout(() => {
				assert.equal(dummyImage.src, 'https://spoor-api.ft.com/px.gif?type=video:seek&data=%7B%22system%22%3A%7B%22transport%22%3A%22image%22%7D%2C%22id%22%3A%221.199.83760034665465.1432907605043.-56cf00f%22%2C%22meta%22%3A%7B%22page_id%22%3A%22page_id%22%2C%22type%22%3A%22event%22%7D%2C%22user%22%3A%7B%22spoor_session%22%3A%22MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg%3D%3D%22%2C%22spoor_id%22%3A%22value3%22%7D%2C%22device%22%3A%7B%22user_agent%22%3A%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X)%20AppleWebKit%2F534.34%20(KHTML%2C%20like%20Gecko)%20PhantomJS%2F1.9.8%20Safari%2F534.34%22%7D%2C%22category%22%3A%22video%22%2C%22action%22%3A%22seek%22%2C%22context%22%3A%7B%22key%22%3A%22pos%22%2C%22value%22%3A%2210%22%2C%22parent_id%22%3A%221.990.74606760405.1432907605040.-56cf00f%22%7D%7D');
				assert.equal(dummyImage.attachEvent.args[0][0], 'onerror');
				assert.equal(dummyImage.attachEvent.args[0][1].length, 1);// it will get passed the error
				assert.equal(dummyImage.attachEvent.args[1][0], 'onload');
				assert.equal(dummyImage.attachEvent.args[1][1].length, 0);// it will get passed the error
				window.XMLHttpRequest = xhr;
				window.Image = i;
				navigator.sendBeacon = b;
				done();
			}, 100);
		});

		it('should remember offline lag if a request fails.', function (done) {
			const server = sinon.fakeServer.create(); // Catch AJAX requests

			(new Queue('requests')).replace([]);
			Send.init();
			const b = navigator.sendBeacon;
			navigator.sendBeacon = null;

			server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);

			Send.addAndRun(request);

			// console.log((new Queue('requests')).storage.storage._type);

			server.respond();
			// Respond again for Image fallback
			server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);
			server.respond();

			// Wait for localStorage
			setTimeout(() => {
				// console.log((new Queue('requests')).all());

				assert.ok((new Queue('requests')).last().queueTime);
				navigator.sendBeacon = b;
				server.restore();
				done();
			}, 100);
		});

		it('should try image transport in IE11 if XHR fails.', function (done) {
			const server = sinon.fakeServer.create(); // Catch AJAX requests

			// Fake IE11
			window.MSInputMethodContext = true;
			document.documentMode = true;

			(new Queue('requests')).replace([]);
			Send.init();
			const dummyImage = {
				attachEvent: sinon.stub()
			};
			const i = window.Image;
			window.Image = sinon.stub().returns(dummyImage);

			server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);
			Send.addAndRun(request);
			server.respond();
			// Respond OK for the image
			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);
			server.respond();

			// Wait for localStorage
			setTimeout(() => {
				// console.log((new Queue('requests')).all());
				assert.equal(dummyImage.src, 'https://spoor-api.ft.com/px.gif?type=video:seek&data=%7B%22system%22%3A%7B%22transport%22%3A%22xhr-image%22%7D%2C%22id%22%3A%221.199.83760034665465.1432907605043.-56cf00f%22%2C%22meta%22%3A%7B%22page_id%22%3A%22page_id%22%2C%22type%22%3A%22event%22%7D%2C%22user%22%3A%7B%22spoor_session%22%3A%22MS4zMTMuNTYxODY1NTk0MjM4MDQuMTQzMjkwNzYwNTAzNi4tNTZjZjAwZg%3D%3D%22%2C%22spoor_id%22%3A%22value3%22%7D%2C%22device%22%3A%7B%22user_agent%22%3A%22Mozilla%2F5.0%20(Macintosh%3B%20Intel%20Mac%20OS%20X)%20AppleWebKit%2F534.34%20(KHTML%2C%20like%20Gecko)%20PhantomJS%2F1.9.8%20Safari%2F534.34%22%7D%2C%22category%22%3A%22video%22%2C%22action%22%3A%22seek%22%2C%22context%22%3A%7B%22key%22%3A%22pos%22%2C%22value%22%3A%2210%22%2C%22parent_id%22%3A%221.990.74606760405.1432907605040.-56cf00f%22%7D%7D');

				window.Image = i;
				server.restore();
				done();
			}, 100);
		});
	});

	it('should cope with the huge queue bug', function (done) {
		const server = sinon.fakeServer.create(); // Catch AJAX requests
		let queue = new Queue('requests');

		queue.replace([]);

		for (let i=0; i<201; i++) {
			queue.add({});
		}

		queue.save();

		// console.log(queue.all().length);

		server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

		// Run the queue
		Send.init();

		server.respond();

		// Wait for localStorage
		setTimeout(() => {
			// Refresh our queue as it's kept in memory
			queue = new Queue('requests');

			// Event added for the debugging info
			assert.equal(queue.all().length, 0);

			// console.log(queue.all());
			server.restore();
			done();
		}, 200);
	});

});
