/* eslint-env mocha */
'use strict';

const mockery = require('mockery');
const proclaim = require('proclaim');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

const path = require('path');
const process = require('process');

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/verify';
const verifyTestPath = path.resolve(obtPath, oTestPath);

describe('verify-javascript', function() {
	let verifyJavascript;
	const originalConsole = global.console;
	let console;
	this.timeout(10 * 1000);
	beforeEach(function() {
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
		console = {
			log: sinon.stub(),
			warn: sinon.stub(),
			error: sinon.stub()
		};
		mockery.registerMock('is-ci', true);
		process.env.CI = true;
		global.console = console;
		process.chdir(verifyTestPath);
		verifyJavascript = require('../../../lib/tasks/verify-javascript');
	});

	afterEach(function () {
		global.console = originalConsole;
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
		process.chdir(obtPath);
	});

	describe('default title', () => {
		it('should be "Linting Javascript"', () => {
			process.chdir('./src/js/error');
			proclaim.equal(verifyJavascript().title, 'Linting Javascript');
		});
	});

	describe('skip', () => {
		it('should return true if the file does not exist', () => {
			// there is no js in the scss folder to verify
			process.chdir('./src/scss');
			return verifyJavascript().skip().then(skip => {
				proclaim.ok(skip);
			});
		});

		it('should return a helpful message if the file does not exist', () => {
			// there is no js in the scss folder to verify
			process.chdir('./src/scss');
			return verifyJavascript().skip().then(skip => {
				proclaim.equal(skip, 'No Javascript files found.');
			});
		});

		it('should return a falsey value if the file does exist', () => {
			process.chdir('./src/js/error');
			return verifyJavascript().skip().then(skip => {
				proclaim.notOk(skip);
			});
		});
	});

	describe('task', () => {
		it('should not error if there are no Javascript files', async () => {
			// there is no js in the scss folder to verify
			process.chdir('./src/scss');
			await verifyJavascript().task();
		});

		it('should not write to the output a github annotation if there are no JavaScript files', async () => {
			// there is no js in the scss folder to verify
			process.chdir('./src/scss');
			await verifyJavascript().task();
			proclaim.notCalled(console.log);
		});

		it('should throw error if there are linting violations', async function() {
			try {
				process.chdir('./src/js/error');
				await verifyJavascript().task();
			} catch (e) {
				proclaim.ok(e, `Unexpected error: ${e.message}`);
			}
		});

		it('should write to the output a github annotation for each linting violation', async function() {
			try {
				process.chdir('./src/js/error');
				await verifyJavascript().task();
			} catch (e) {
				proclaim.ok(e, `Unexpected error: ${e.message}`);
				proclaim.calledTwice(console.log);
				proclaim.calledWithExactly(
					console.log,
					`::error file=/invalid.js,line=1,col=6,code=undefined,severity=error::Parsing error: Unexpected token test`
				);
			}
		});

		it('should not throw error if there are linting warnings', async function() {
			process.chdir('./src/js/warning');
			await verifyJavascript().task();
		});
	});
});
