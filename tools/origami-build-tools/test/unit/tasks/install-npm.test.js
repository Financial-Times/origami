/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const process = require('process');
const denodeify = require('util').promisify;
const rimraf = denodeify(require('rimraf'));
const fs = require('fs-extra');
const path = require('path');
const mockery = require('mockery');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';
const pathSuffix = '-verify';
const verifyTestPath = path.resolve(obtPath, oTestPath + pathSuffix);

describe('npm-install', function () {
	let npmInstall;
	let Listr;
	let listrInstance;

	beforeEach(function () {
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

		mockery.registerAllowable('../../../lib/tasks/install-npm');

		npmInstall = require('../../../lib/tasks/install-npm');

		mockery.resetCache();

		fs.copySync(path.resolve(obtPath, oTestPath), verifyTestPath);
		process.chdir(verifyTestPath);
	});

	afterEach(function () {
		process.chdir(obtPath);
		fs.removeSync(path.resolve(obtPath, verifyTestPath));
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('has a default title', function () {
		proclaim.equal(npmInstall().title, 'Installing NPM components');
	});

	describe('skip', function () {
		context('package.json does exist', function () {
			it('should return a falsey value if package.json does exist', function () {
				return npmInstall()
					.skip()
					.then(skipped => {
						proclaim.notOk(skipped);
					});
			});
		});

		context('package.json does not exist', function () {
			beforeEach(function () {
				return rimraf(path.resolve(verifyTestPath, 'package.json'));
			});

			it('should return true if package.json does not exist', function () {
				return npmInstall()
					.skip()
					.then(skipped => {
						proclaim.ok(skipped);
					});
			});

			it('should return a helpful message if package.json does not exist', function () {
				return npmInstall()
					.skip()
					.then(skipped => {
						proclaim.equal(skipped, 'No package.json found.');
					});
			});
		});
	});

	describe('task', function () {
		it('should create Listr object with npm install function', function () {
			npmInstall().task();

			proclaim.calledOnce(Listr);
			proclaim.calledWithNew(Listr);
			proclaim.isArray(Listr.firstCall.args[0]);
		});
		// TODO: Should assert that npm install function is passed outputStreams or should this be done via integration tests?
	});
});
