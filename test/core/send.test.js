/*global require, describe, it */

const assert = require('assert');
const Send = require("../../src/javascript/core/send");
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
(new (require("../../src/javascript/core/queue"))('requests')).replace([]);
require("../../src/javascript/core/settings").delete('config');  // Empty settings.

describe('Core.Send', function () {

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

	/*let test_request = nock('http://trace.ft.com')
	 .post('/')
	 .reply(200, 'ok');

	 it('should send the request', function () {
	 Send.run(function () {
	 assert.ok(test_request.isDone());
	 });
	 });*/
});
