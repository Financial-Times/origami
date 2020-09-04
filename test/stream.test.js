/* eslint-env mocha */
/* global proclaim */
import Stream from '../src/js/stream.js';

import renderComments from './methods/stream/render-comments.js';
import init from './methods/stream/init.js';
import login from './methods/stream/login.js';
import authenticateUser from './methods/stream/authenticate-user.js';
import publishEvent from './methods/stream/publish-event.js';
import renderSignedInMessage from './methods/stream/render-signed-in-message.js';
import displayNamePrompt from './methods/stream/display-name-prompt.js';

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
	describe('.displayNamePrompt', displayNamePrompt);
});
