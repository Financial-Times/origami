/* eslint-env mocha */
'use strict';

const process = require('process');
const fs = require('fs-extra');
const path = require('path');
const sinon = require('sinon');
const proclaim = require('proclaim');
const mockery = require('mockery');
const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';
const oNoManifestPath = path.resolve(obtPath, 'test/unit/fixtures/o-no-manifest');
const pathSuffix = '-demo';
const demoTestPath = path.resolve(obtPath, oTestPath + pathSuffix);
const demo = require('../../../lib/tasks/demo-build');
const denodeify = require('util').promisify;
const rimraf = denodeify(require('rimraf'));

describe('Demo task', function () {

	beforeEach(async function () {
		await rimraf(demoTestPath);
		fs.copySync(path.resolve(obtPath, oTestPath), demoTestPath);
		process.chdir(demoTestPath);
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});
	});

	afterEach(async function () {
		process.chdir(obtPath);
		await rimraf(demoTestPath);
		sinon.restore();
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	describe('Build demos', function () {
		it('should error if no demos are found', function () {
			process.chdir(oNoManifestPath);
			fs.writeFileSync('package.json', '{"name":"o-test"}', 'utf8');
			return demo()
				.then(() => {
					throw new Error('promise resolved when it should have rejected');
				}, function (err) {
					proclaim.equal(
						err.message,
						'No demos exist in the origami.json file. Reference ' +
						'https://origami.ft.com/docs/manifests/origami-json/ ' +
						'to configure demos in the component\'s origami.json ' +
						'manifest file.'
					);
					fs.unlinkSync(path.resolve(oNoManifestPath, 'package.json'));
					process.chdir(demoTestPath);
				});
		});

		it('should not fail using origami.json', function () {
			return demo();
		});

		it('should fail if there are demos with the same name', function () {
			const demoConfig = JSON.parse(fs.readFileSync('origami.json', 'utf8'));
			demoConfig.demos[1] = demoConfig.demos[0];
			fs.writeFileSync('origami.json', JSON.stringify(demoConfig));
			return demo()
				.then(() => {
					throw new Error('promise resolved when it should have rejected');
				}, function errorHandler(err) {
					proclaim.equal(err.message, 'Demos with the same name were found. Give them unique names and try again.');
				});
		});

		it('should build demo html', function () {
			addDemoToOrigamiConfig([{
				"name": "test1",
				"template": "demos/src/test1.mustache",
				"path": "/demos/test1.html",
				"description": "First test"
			}, {
				"name": "test2",
				"template": "demos/src/test2.mustache",
				"path": "/demos/test2.html",
				"hidden": true,
				"description": "Second test"
			}]);
			fs.writeFileSync('demos/src/test1.mustache', '<div>test1</div>', 'utf8');
			fs.writeFileSync('demos/src/test2.mustache', '<div>test2</div>', 'utf8');
			return demo().then(function () {
				const test1 = fs.readFileSync('demos/local/test1.html', 'utf8');
				proclaim.include(test1, '<div>test1</div>');
				proclaim.match(test1, /\/v3\/polyfill\.min\.js\?features=.*promises/);
				const test2 = fs.readFileSync('demos/local/test2.html', 'utf8');
				proclaim.include(test2, '<div>test2</div>');
				proclaim.match(test2, /\/v3\/polyfill\.min\.js\?features=.*promises/);
			});
		});

		it('should build local demos', function () {
			addDemoToOrigamiConfig([{
				"name": "test1",
				"template": "demos/src/test1.mustache",
				"path": "/demos/test1.html",
				"description": "First test"
			}, {
				"name": "test2",
				"template": "demos/src/test2.mustache",
				"path": "/demos/test2.html",
				"hidden": true,
				"description": "Second test"
			}]);
			fs.writeFileSync('demos/src/test1.mustache', '<div>test1</div>', 'utf8');
			fs.writeFileSync('demos/src/test2.mustache', '<div>test2</div>', 'utf8');
			return demo()
				.then(function () {
					proclaim.include(fs.readFileSync('demos/local/test1.html', 'utf8'), '<div>test1</div>');
					proclaim.include(fs.readFileSync('demos/local/test2.html', 'utf8'), '<div>test2</div>');
					proclaim.include(fs.readFileSync('demos/local/demo.js', 'utf8'), `var name = "test";`);
					proclaim.include(fs.readFileSync('demos/local/demo.css', 'utf8'), 'div {\n  color: blue;\n}');
					fs.removeSync('demos/local');
				});
		});

		it('should build Sass once when shared by multiple local demos', function () {
			const testDemoConfig = [];
			for (let i = 0; i < 5; i++) {
				testDemoConfig.push({
					"name": `test${i}`,
					"template": "demos/src/test1.mustache",
					"path": `/demos/test${i}.html`,
					"description": `Test number ${i}`
				});
			}
			addDemoToOrigamiConfig(testDemoConfig);
			fs.writeFileSync('demos/src/test1.mustache', '<div>test1</div>', 'utf8');
			// Sass should be built only once, as all the test demos
			// share one Sass file
			const sassStub = sinon.stub().returns('');
			mockery.registerMock('../tasks/build-sass', sassStub);
			const demoWithSassMock = require('../../../lib/tasks/demo-build');

			// Build the test demos.
			// Confirm assets built once.
			return demoWithSassMock()
				.then(function () {
					proclaim.equal(
						sassStub.callCount,
						1,
						`Attempted to build demo Sass ${sassStub.callCount} times. ` +
						'Expected to build Sass only once.'
					);
				});
		});

		it('should build local demos for brand', function () {
			addDemoToOrigamiConfig([{
				"name": "test1",
				"template": "demos/src/test1.mustache",
				"path": "/demos/test1.html",
				"description": "First test"
			}]);
			fs.writeFileSync('demos/src/test1.mustache', '<div>test1</div>', 'utf8');
			return demo({
				brand: 'internal'
			})
				.then(function () {
					proclaim.include(fs.readFileSync('demos/local/demo.css', 'utf8'), 'div {\n  content: Brand is set to internal;\n  color: blue;\n}');
					fs.removeSync('demos/local');
				});
		});

		it('should throw an error if local demo data cannot be found', function () {
			fs.writeFileSync('demos/src/local-data.mustache', '<div>{{{label}}}</div>', 'utf8');
			const demoDataUri = 'demos/src/does-not-exist-data.mustache';
			// Create demo config.
			addDemoToOrigamiConfig({
				"name": "local-data",
				"template": "demos/src/local-data.mustache",
				"path": "/demos/local-data.html",
				"description": "local data missing.",
				"data": demoDataUri
			});

			// Test for a "no local demo data" error.
			return demo().then(function () {
				throw new Error('promise resolved when it should have rejected');
			}).catch(function (err) {
				proclaim.equal(err.message, `Demo data not found: ${demoTestPath}/${demoDataUri}`);
			});
		});

		it('should load local partials', function () {
			addDemoToOrigamiConfig([
				{
					"name": "test1",
					"template": "demos/src/test1.mustache",
					"path": "/demos/test1.html",
					"description": "First test"
				}, {
					"name": "test2",
					"template": "demos/src/test2.mustache",
					"path": "/demos/test2.html",
					"hidden": true,
					"description": "Second test"
				}
			]);
			fs.writeFileSync('demos/src/test1.mustache', '<div>test1</div>{{>partial1}}', 'utf8');
			fs.writeFileSync('demos/src/test2.mustache', '<div>test1</div>{{>partials/partial2}}', 'utf8');
			return demo()
				.then(function () {
					const test1 = fs.readFileSync('demos/local/test1.html', 'utf8');
					const test2 = fs.readFileSync('demos/local/test2.html', 'utf8');
					proclaim.include(test1, '<div>partial1</div>');
					proclaim.include(test2, '<div>partial2</div>');
				});
		});

		function addDemoToOrigamiConfig (demosConfig) {
			if (!Array.isArray(demosConfig)) {
				demosConfig = [demosConfig];
			}
			const origamiConfig = JSON.parse(fs.readFileSync('origami.json', 'utf8'));
			demosConfig.forEach((demoConfig) => origamiConfig.demos.push(demoConfig));
			fs.writeFileSync('origami.json', JSON.stringify(origamiConfig));
		}
	});
});
