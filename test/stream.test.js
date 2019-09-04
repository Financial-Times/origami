/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import Stream from '../src/js/stream';
import * as auth from '../src/js/utils/auth';
import * as fixtures from './helpers/fixtures';

import renderComments from './methods/stream/render-comments';
import init from './methods/stream/init';
import login from './methods/stream/login';
import on from './methods/stream/on';

const sandbox = sinon.createSandbox();

describe("Stream", () => {
	it("is defined", () => {
		proclaim.equal(typeof Stream, 'function');
	});

	describe('.init', init);
	describe('.renderComments', renderComments);
	describe('.login', login);
	describe('.on', on);
});
