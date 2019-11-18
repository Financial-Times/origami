/* eslint-env mocha */
import proclaim from 'proclaim';

import Stream from '../src/js/stream';

import renderComments from './methods/stream/render-comments';
import init from './methods/stream/init';
import login from './methods/stream/login';
import authenticateUser from './methods/stream/authenticate-user';
import publishEvent from './methods/stream/publish-event';
import renderSignedInMessage from './methods/stream/render-signed-in-message';

describe("Stream", () => {
	it("is defined", () => {
		proclaim.equal(typeof Stream, 'function');
	});

	describe('.init', init);
	describe('.login', login);
	describe('.renderComments', renderComments);
	describe('.authenticateUser', authenticateUser);
	describe('.publishEvent', publishEvent);
	describe('.renderSignedInMessage', renderSignedInMessage);
});
