/* eslint-env mocha */
import proclaim from 'proclaim';

import Stream from '../src/js/stream';

import renderComments from './methods/stream/render-comments';
import init from './methods/stream/init';
import login from './methods/stream/login';
import getJsonWebToken from './methods/stream/get-json-web-token';
import publishEvent from './methods/stream/publish-event';

describe("Stream", () => {
	it("is defined", () => {
		proclaim.equal(typeof Stream, 'function');
	});

	describe('.init', init);
	describe('.renderComments', renderComments);
	describe('.login', login);
	describe('.getJsonWebToken', getJsonWebToken);
	describe('.publishEvent', publishEvent);
});
