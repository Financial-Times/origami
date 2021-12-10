/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('Init task', function() {
	let Listr;
	let init;
	let buildBoilerplate;
	let listrInstance;

	beforeEach(() => {
		listrInstance = {
			run: sinon.stub()
		};
		Listr = sinon.stub();
		Listr.returns(listrInstance);
		buildBoilerplate = sinon.stub();

		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		mockery.registerMock('listr', Listr);

		mockery.registerMock('./boilerplate', buildBoilerplate);

		mockery.registerAllowable('../../../lib/tasks/init');

		init = require('../../../lib/tasks/init');

		mockery.resetCache();
	});

	after(() => {
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should export a function', function() {
		proclaim.isFunction(init);
	});
});
