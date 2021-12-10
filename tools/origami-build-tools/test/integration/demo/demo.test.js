/* eslint-env mocha */
'use strict';

const execa = require('execa');
const path = require('path');
const process = require('process');
const obtBinPath = require('../helpers/obtpath');
const proclaim = require('proclaim');
const fileExists = require('../helpers/fileExists');
const tmpdir = require('../helpers/tmpdir');
const fs = require('fs-extra');
const rimraf = require("../helpers/delete");

describe('obt demo', function () {

	this.timeout(60 * 1000);

	describe('component with no demos', function () {

		beforeEach(function () {
			// Change the current working directory to the folder which contains the project we are testing against.
			// We are doing this to replicate how obt is used when executed inside a terminal.
			process.chdir(path.join(__dirname, '/fixtures/no-demos'));
		});

		afterEach(function () {
			// Change the current working directory back to the directory where you started running these tests from.
			process.chdir(process.cwd());
		});

		it('should error', function () {
			return obtBinPath()
				.then(obt => {
					return execa(obt, ['demo']);
				})
				.then(() => {
					throw new Error('obt demo should error when trying to create demos for a component which has no demos.');
				}, () => {
					// obt demo exited with a non-zero exit code, which is what we expected.
				});
		});
	});


	describe('component with multiple demos with the same name', function () {
		let testDirectory;
		let fixturesDirectory;

		before(async function () {
			// copy fixture (example component with multiple demos)
			// to a temporary test directory
			testDirectory = await tmpdir('obt-demo-task-');
			fixturesDirectory = path.resolve(__dirname, 'fixtures/multiple-demos');
			fs.copySync(fixturesDirectory, testDirectory);
			process.chdir(testDirectory);
			// update the demo configuration in origami.json so multiple demos
			// have the same name
			const testManifestPath = path.resolve(testDirectory, 'origami.json');
			const testManifestContent = fs.readFileSync(testManifestPath);
			const testManifest = JSON.parse(testManifestContent);
			testManifest.demos.push(Object.assign({}, testManifest.demos[0]));
			fs.writeFileSync(testManifestPath, JSON.stringify(testManifest));
		});

		after(function () {
			// remove temporary test directory
			process.chdir(process.cwd());
			return rimraf(testDirectory);
		});

		it('should error', function (done) {
			// Run obt demo
			obtBinPath()
				.then(obt => {
					return execa(obt, ['demo']);
				}).then(() => {
					done(new Error('No error was thrown.'));
				}).catch(e => {
					try {
						proclaim.include(
							e.message,
							'Demos with the same name were found'
						);
					} catch(e) {
						done(e);
					}
					done();
				});
		});
	});

	describe('demo with bad json', function () {
		let testDirectory;
		let fixturesDirectory;

		before(async function () {
			// copy fixture (example component with multiple demos)
			// to a temporary test directory
			testDirectory = await tmpdir('obt-demo-task-');
			fixturesDirectory = path.resolve(__dirname, 'fixtures/multiple-demos');
			fs.copySync(fixturesDirectory, testDirectory);
			process.chdir(testDirectory);
			// update the demo configuration in origami.json so multiple demos
			// have the same name
			const testManifestPath = path.resolve(testDirectory, 'origami.json');
			const testManifestContent = fs.readFileSync(testManifestPath);
			const testManifest = JSON.parse(testManifestContent);
			testManifest.demos.push({
				"title": "Data broken",
				"name": "data-broken",
				"template": "demos/src/demo-1.mustache",
				"description": "This demo has broken data",
				"data": "demos/src/data-broken.json"
			});
			fs.writeFileSync(testManifestPath, JSON.stringify(testManifest));
		});

		after(function () {
			// remove temporary test directory
			process.chdir(process.cwd());
			return rimraf(testDirectory);
		});

		it('should error', function (done) {
			// Run obt demo
			obtBinPath()
				.then(obt => {
					return execa(obt, ['demo']);
				}).then(() => {
					done(new Error('No error was thrown.'));
				}).catch(e => {
					try {
						proclaim.include(
							e.message,
							`is not valid JSON.`
						);
					} catch(e) {
						done(e);
					}
					done();
				});
		});
	});

	describe('component with multiple valid demos', function () {
		let testDirectory;
		let fixturesDirectory;
		let expectedBuiltDemoPath1;
		let expectedBuiltDemoPath2;
		let builtDemoHtml1 = '';
		let builtDemoHtml2 = '';

		before(async function () {
			// copy fixture (example component with multiple demos)
			// to a temporary test directory
			testDirectory = await tmpdir('obt-demo-task-');
			fixturesDirectory = path.resolve(__dirname, 'fixtures/multiple-demos');
			expectedBuiltDemoPath1 = path.resolve(testDirectory, 'demos/local/demo-1.html');
			expectedBuiltDemoPath2 = path.resolve(testDirectory, 'demos/local/demo-2.html');
			fs.copySync(fixturesDirectory, testDirectory);
			process.chdir(testDirectory);
			return obtBinPath()
				.then(obt => {
					// Run obt demo
					return execa(obt, ['demo']);
				}).then(() => {
					// Get the built demo html content we expect
					// If the file is not found move on, later test
					// assertions will cover that
					try {
						builtDemoHtml1 = fs.readFileSync(expectedBuiltDemoPath1, 'utf8');
						builtDemoHtml2 = fs.readFileSync(expectedBuiltDemoPath2, 'utf8');
					} catch(e) {
						// assume no files found
					}
				});
		});

		after(function () {
			// remove temporary test directory
			process.chdir(process.cwd());
			return rimraf(testDirectory);
		});

		it('should have created a html file for each demo', function () {
			proclaim.ok(
				fileExists(expectedBuiltDemoPath1),
				'Could not find the built demo html file for demo-1.'
			);
			proclaim.ok(
				fileExists(expectedBuiltDemoPath2),
				'Could not find the built demo html file for demo-2.'
			);
		});

		it('should have rendered demo html in the body of the demo template', function () {
			proclaim.include(builtDemoHtml1, 'demo 1');
			proclaim.include(builtDemoHtml2, 'demo 2');
		});

		it('should have included demo css in the demo html', function () {
			proclaim.include(builtDemoHtml1, '<link rel="stylesheet" href="demo.css" />');
			proclaim.include(builtDemoHtml2, '<link rel="stylesheet" href="demo-2.css" />');
		});

		it('should have included demo javascript in the demo html', function () {
			proclaim.include(builtDemoHtml1, 'demo.js');
			proclaim.include(builtDemoHtml2, 'demo-2.js');
		});

		it('should have included required polyfills registered in origami.json', function () {
			const expectedPolyfill = 'Array.from';
			const regex = new RegExp(`<script [^>]+polyfill.io[^>]+${expectedPolyfill}`);
			proclaim.match(
				builtDemoHtml1,
				regex,
				`Demo 1 did not find the expected ${expectedPolyfill} polyfill.`
			);
			proclaim.match(
				builtDemoHtml2,
				regex,
				`Demo 2 did not find the expected ${expectedPolyfill} polyfill.`
			);
		});

		it('should not include the `default` polyfill in demo html if not specified', function () {
			const unexpectedPolyfill = 'default';
			const regex = new RegExp(`<script [^>]+polyfill.io[^>]+${unexpectedPolyfill}`);
			proclaim.notMatch(
				builtDemoHtml1,
				regex,
				`Demo 1 had the ${unexpectedPolyfill} polyfill unexpectedly.`
			);
			proclaim.notMatch(
				builtDemoHtml2,
				regex,
				`Demo 2 had the ${unexpectedPolyfill} polyfill unexpectedly.`
			);
		});

		it('should add demo document classes', function () {
			proclaim.match(builtDemoHtml1, /<html[^>]+class="(?:[^"]+)?demo-1/, 'Did not find a `demo-1` class on the html element.');
			proclaim.match(builtDemoHtml2, /<html[^>]+class="(?:[^"]+)?demo-2/, 'Did not find a `demo-2` class on the html element.');
		});

		it('should include a request to the Origami Build Service in demo markup for demo dependencies', function () {
			// demo dependency css
			proclaim.include(builtDemoHtml1, '<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?system_code=origami-registry-ui&components=@financial-times/o-fonts@5.0.0-1" />');
			proclaim.include(builtDemoHtml2, '<link rel="stylesheet" href="https://www.ft.com/__origami/service/build/v3/bundles/css?system_code=origami-registry-ui&components=@financial-times/o-fonts@5.0.0-1" />');
			// demo dependency js
			proclaim.include(builtDemoHtml1, 'https://www.ft.com/__origami/service/build/v3/bundles/js?system_code=origami-registry-ui&components=@financial-times/o-fonts@5.0.0-1');
			proclaim.include(builtDemoHtml2, 'https://www.ft.com/__origami/service/build/v3/bundles/js?system_code=origami-registry-ui&components=@financial-times/o-fonts@5.0.0-1');
		});

		it('should build demo css', function () {
			const expectedBuiltCssPath1 = path.resolve(testDirectory, 'demos/local/demo.css');
			const expectedBuiltCssPath2 = path.resolve(testDirectory, 'demos/local/demo-2.css');
			let builtDemoCss1 = '';
			let builtDemoCss2 = '';
			// Get built css.
			try {
				builtDemoCss1 = fs.readFileSync(expectedBuiltCssPath1, 'utf8');
				builtDemoCss2 = fs.readFileSync(expectedBuiltCssPath2, 'utf8');
			} catch(e) {
				// assume files not found
			}
			// Confirm the css is as expected.
			proclaim.include(
				builtDemoCss1,
				'.o-multiple-demos', 'Expected demo 1 css to include the class ".o-multiple-demos".'
			);
			proclaim.notInclude(
				builtDemoCss1,
				'.demo-two', 'Did not expected demo 1 css to include the demo 2 specific class ".demo-two".'
			);
			proclaim.include(
				builtDemoCss2,
				'.demo-two', 'Expected demo 2 css to include the demo specific class ".demo-2".'
			);
		});

		it('should build demo javascript', function () {
			const expectedBuiltJsPath1 = path.resolve(testDirectory, 'demos/local/demo.js');
			const expectedBuiltJsPath2 = path.resolve(testDirectory, 'demos/local/demo-2.js');
			const expectedJsInDemo1 = 'oMultipleDemos';
			const expectedJsInDemo2 = 'console.log(demoTwo)';
			let builtDemoJs1 = '';
			let builtDemoJs2 = '';
			// Get built js.
			try {
				builtDemoJs1 = fs.readFileSync(expectedBuiltJsPath1, 'utf8');
				builtDemoJs2 = fs.readFileSync(expectedBuiltJsPath2, 'utf8');
			} catch(e) {
				// assume files not found
			}
			// Confirm the js is as expected.
			proclaim.include(
				builtDemoJs1,
				expectedJsInDemo1,
				`Expected demo 1 js to include the javascript "${expectedJsInDemo1}".`
			);
			proclaim.notInclude(
				builtDemoJs1,
				expectedJsInDemo2,
				'Did not expected demo 1 javascript to include the demo 2 specific javascript.'
			);
			proclaim.include(
				builtDemoJs2,
				expectedJsInDemo2,
				'Expected demo 2 javascript to include demo specific javascript.'
			);
		});
	});
});
