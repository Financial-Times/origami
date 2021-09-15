/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('Install task', function() {
	let Listr;
	let npmInstall;
	let install;
	let listrInstance;

	beforeEach(() => {
		listrInstance = {
			run: sinon.stub()
		};
		Listr = sinon.stub();
		Listr.returns(listrInstance);
		npmInstall = sinon.stub();
		npmInstall.returns(npmInstall);

		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		mockery.registerMock('listr', Listr);

		mockery.registerMock('./install-npm', npmInstall);

		mockery.registerAllowable('../../../lib/tasks/install');

		install = require('../../../lib/tasks/install');

		mockery.resetCache();
	});

	after(() => {
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('should export a function', function() {
		proclaim.isFunction(install);
	});

	describe('when called', () => {
		it('should create Listr object with install tasks', function() {
			install();

			proclaim.calledOnce(Listr);
			proclaim.calledWithNew(Listr);
			proclaim.isArray(Listr.firstCall.args[0]);
			proclaim.include(Listr.firstCall.args[0], npmInstall);
		});
	});
});
