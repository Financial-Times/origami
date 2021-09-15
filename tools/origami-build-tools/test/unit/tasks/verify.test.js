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
	let verifyOrigamiJsonFile;
	let verifyJavaScript;
	let verifySass;
	let verify;
	let listrInstance;

	beforeEach(() => {
		listrInstance = {
			run: sinon.stub()
		};
		Listr = sinon.stub();
		Listr.returns(listrInstance);
		verifyOrigamiJsonFile = sinon.stub();
		verifyOrigamiJsonFile.returns(verifyOrigamiJsonFile);
		verifyJavaScript = sinon.stub();
		verifyJavaScript.returns(verifyJavaScript);
		verifySass = sinon.stub();
		verifySass.returns(verifySass);

		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		mockery.registerMock('listr', Listr);

		mockery.registerMock('./verify-origami-json', verifyOrigamiJsonFile);
		mockery.registerMock('./verify-javascript', verifyJavaScript);
		mockery.registerMock('./verify-sass', verifySass);

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
			proclaim.include(Listr.firstCall.args[0], verifyJavaScript);
			proclaim.include(Listr.firstCall.args[0], verifyOrigamiJsonFile);
			proclaim.include(Listr.firstCall.args[0], verifySass);
		});
	});
});
