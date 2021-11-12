/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('Verify task', function() {
	let Listr;
	let verify;
	let listrInstance;

	beforeEach(() => {
		listrInstance = {
			run: sinon.stub()
		};
		Listr = sinon.stub();
		Listr.returns(listrInstance);

		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		mockery.registerMock('listr', Listr);

		mockery.registerAllowable('../../../lib/tasks/verify');

		verify = require('../../../lib/tasks/verify');

		mockery.resetCache();
	});

	afterEach(() => {
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should export a function', function() {
		proclaim.isFunction(verify);
	});

	describe('when called', () => {
		it('should create Listr object with verify tasks', function() {
			verify();

			proclaim.calledOnce(Listr);
			proclaim.calledWithNew(Listr);
			proclaim.isArray(Listr.firstCall.args[0]);
		});
	});
});
