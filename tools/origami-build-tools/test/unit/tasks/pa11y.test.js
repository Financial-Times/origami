/* eslint-env mocha */
'use strict';

const mockery = require('mockery');
const proclaim = require('proclaim');
const sinon = require('sinon');
sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

const process = require('process');
const fs = require('fs-extra');
const path = require('path');

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';

describe('Test task', function() {
	describe('Pa11y', function() {
		const pathSuffix = '-test-pa11y';
		const testTestPath = path.resolve(obtPath, oTestPath + pathSuffix);

		let console;
		const originalConsole = global.console;
		let demo;
		let pa11y;
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
			fs.copySync(path.resolve(obtPath, oTestPath), testTestPath);
			process.chdir(testTestPath);
			demo = require('../../../lib/tasks/demo-build');
			pa11y = require('../../../lib/tasks/pa11y');
			return demo({
				demoFilter: ['pa11y']
			});
		});

		afterEach(() => {
			global.console = originalConsole;
			mockery.resetCache();
			mockery.deregisterAll();
			mockery.disable();
			process.chdir(obtPath);
			fs.removeSync(testTestPath);
		});

		describe('default title', () => {
			it('should be "Executing Pa11y"', () => {
				proclaim.equal(pa11y().title, 'Executing Pa11y');
			});
		});

		describe('skip', () => {
			it('should return a truthy value if origami.json has no demo with name "pa11y"', function() {
				const origamiJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'origami.json'), 'utf-8'));
				origamiJSON.demos = [];
				fs.writeFileSync('origami.json', JSON.stringify(origamiJSON), 'utf8');
				return pa11y().skip().then(result => proclaim.isTrue(Boolean(result)));
			});

			it('should return a helpful message if origami.json has no demo with name "pa11y"', function() {
				const origamiJSON = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'origami.json'), 'utf-8'));
				origamiJSON.demos = [];
				fs.writeFileSync('origami.json', JSON.stringify(origamiJSON), 'utf8');
				return pa11y().skip().then(result => proclaim.equal(
					result,
					'No Pa11y demo found. Create a demo with name "pa11y" to run Pa11y against this project.'
				));
			});

			it('should return a falsey value if the file does exist', function() {
				return pa11y().skip().then(result => proclaim.isFalse(Boolean(result)));
			});
		});

		describe('task', () => {
			it('should run pa11y correctly', function () {
				this.timeout(30000);
				return pa11y().task()
					.catch(function (results) {
						proclaim.isInstanceOf(results, Error);
					});
			});

			it('should write to the output a github annotation for each test failure', function () {
				this.timeout(30000);
				return pa11y().task()
					.catch(function (results) {
						proclaim.isInstanceOf(results, Error);
						proclaim.calledThrice(console.log);
						proclaim.calledWithExactly(
							console.log,
							`::error file=demos/src/pa11y.mustache,line=1,col=1::%0A • Error: All page content must be contained by landmarks (https://dequeuniversity.com/rules/axe/3.5/region?application=axeAPI)%0A   ├── region%0A   ├── html > body > button:nth-child(1)%0A   └── <button style="background-color:blue; color:blue">No contrast</button>`
						);
					});
			});
		});
	});
});
