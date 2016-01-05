/*global require, describe, it, before, after, sinon */

const assert = require('assert');
const Send = require('../../src/javascript/core/send');
const Queue = require("../../src/javascript/core/queue");
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
	data: {
		category: 'video',
		action: 'seek',
		key: 'pos',
		value: '10',
		parent_id: '1.990.74606760405.1432907605040.-56cf00f'
	}
};

// PhantomJS doesn't always create a "fresh" environment...

describe('Core.Send', function () {

	let server;

	before(function () {
		server = sinon.fakeServer.create(); // Catch AJAX requests
	});

	after(function () {
		(new Queue('requests')).replace([]);
		require("../../src/javascript/core/settings").destroy('config');  // Empty settings.
		server.restore();
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

	it('should remember offline lag if a request fails.', function () {
		(new Queue('requests')).replace([]);
		Send.init();

		server.respondWith([500, { "Content-Type": "plain/text", "Content-Length": 5 }, "NOT OK"]);

		Send.addAndRun(request);
		server.respond();

		assert.ok((new Queue('requests')).last().queueTime);
	});

});
