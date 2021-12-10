/* eslint-env mocha */
'use strict';

const process = require('process');
const proclaim = require('proclaim');

const fs = require('fs-extra');
const path = require('path');

const files = require('../../../lib/helpers/files');

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';
const pathSuffix = '-file';
const filesTestPath = path.resolve(obtPath, oTestPath + pathSuffix);

describe('Files helper', function () {
	beforeEach(function () {
		fs.copySync(path.resolve(obtPath, oTestPath), filesTestPath);
		process.chdir(filesTestPath);
	});

	afterEach(function () {
		process.chdir(obtPath);
		fs.removeSync(filesTestPath);
	});

	it('should return correct build folder', function () {
		proclaim.equal(files.getBuildFolderPath(), process.cwd() + '/build/');
	});

	it('should return module name', function () {
		return files.getComponentName()
			.then(name => {
				proclaim.equal(name, 'o-test');
			});
	});

	it('should not return package namespace in module name', function () {
		return files.getComponentName()
			.then(name => {
				proclaim.equal(name, 'o-test');
			})
			.then(() => {
				fs.writeFileSync('package.json', JSON.stringify({
					name: '@financial-times/o-test'
				}), 'utf8');
				return files.getComponentName()
					.then(name => {
						proclaim.equal(name, 'o-test');
						fs.unlinkSync(path.resolve(filesTestPath, 'package.json'));
					});
			});
	});

	it('should return a list of Sass files', function () {
		return files.getSassFilesList().then(function (sassFiles) {
			const testResults = [path.join(process.cwd() + '/main.scss'), path.join(process.cwd() + '/src/scss/_variables.scss')];
			proclaim.include(sassFiles, testResults[0]);
			proclaim.include(sassFiles, testResults[1]);
		});
	});

	describe('Main files', function () {
		beforeEach(function () {
			fs.writeFileSync('package.json', JSON.stringify({
				name: 'o-test'
			}), 'utf8');
		});

		afterEach(function () {
			fs.unlinkSync(path.resolve(filesTestPath, 'package.json'));
		});

		it('should get the path of main.scss', function () {
			return files.getMainSassPath()
				.then(sassPath => {
					proclaim.equal(sassPath, process.cwd() + '/main.scss');
				});
		});

		describe('when the package.json manifest file contains both main and browser properties', function () {
			it('should get the JavaScript path from the browser property', function () {
				return files.getMainJsPath()
					.then(jsPath => {
						proclaim.equal(jsPath, null);
						return files.getPackageJson()
							.then(pkgJson => {

								pkgJson.browser = 'browser.js';
								pkgJson.main = 'main.js';
								fs.writeFileSync('package.json', JSON.stringify(pkgJson), 'utf8');
								return files.getMainJsPath()
									.then(jsPath => {
										proclaim.equal(jsPath, process.cwd() + '/browser.js');
									});
							});
					});
			});
		});

		describe('when the package.json manifest file contains a browser property but no main property', function () {
			it('should get the JavaScript path from the browser property', function () {
				return files.getMainJsPath()
					.then(jsPath => {
						proclaim.equal(jsPath, null);
						return files.getPackageJson()
							.then(pkgJson => {

								pkgJson.browser = 'browser.js';
								fs.writeFileSync('package.json', JSON.stringify(pkgJson), 'utf8');
								return files.getMainJsPath()
									.then(jsPath => {
										proclaim.equal(jsPath, process.cwd() + '/browser.js');
									});
							});
					});
			});
		});

		describe('when the package.json manifest file contains a main property but no browser property', function () {
			it('should get the JavaScript path from the main property', function () {
				return files.getMainJsPath()
					.then(jsPath => {
						proclaim.equal(jsPath, null);
						return files.getPackageJson()
							.then(pkgJson => {

								pkgJson.main = 'main.js';
								fs.writeFileSync('package.json', JSON.stringify(pkgJson), 'utf8');
								return files.getMainJsPath()
									.then(jsPath => {
										proclaim.equal(jsPath, process.cwd() + '/main.js');
									});
							});
					});
			});
		});
	});

	describe('Package.json', function () {
		beforeEach(function () {
			if (fs.existsSync(path.resolve(filesTestPath, 'package.json'))) {
				fs.unlinkSync(path.resolve(filesTestPath, 'package.json'));
			}
		});

		afterEach(function () {
			fs.unlinkSync(path.resolve(filesTestPath, 'package.json'));
		});

		it('should get package.json', function () {
			return files.getPackageJson()
				.then(packageJson => {

					proclaim.equal(typeof packageJson, 'undefined');
					fs.writeFileSync('package.json', JSON.stringify({}), 'utf8');
					return files.getPackageJson()
						.then(packageJson => {

							proclaim.notEqual(typeof packageJson, 'undefined');
						});
				});
		});

		it('should check if package.json is present', function () {
			return files.packageJsonExists()
				.then(exists => {

					proclaim.equal(exists, false);
					fs.writeFileSync('package.json', JSON.stringify({}), 'utf8');
					return files.packageJsonExists()
						.then(exists => {

							proclaim.equal(exists, true);
						});
				});
		});
	});

	describe('.getMustacheFilesList(basePath)', function () {
		const mustacheTestPath = path.resolve(filesTestPath, 'demos/src');
		const flatMustacheFiles = path.resolve(mustacheTestPath, 'flat');
		const nestedMustacheFiles = path.resolve(mustacheTestPath, 'nested');

		it('is a function', () => {
			proclaim.isTypeOf(files.getMustacheFilesList, 'function');
		});

		it('returns an array', function () {
			return files.getMustacheFilesList(flatMustacheFiles)
				.then(mustacheFiles => {
					proclaim.isInstanceOf(mustacheFiles, Array);
				});
		});

		describe('when the directory structure is one level deep', function () {

			it('returns an array of all of the mustache files in the directory', function () {
				return files.getMustacheFilesList(flatMustacheFiles)
					.then(mustacheFiles => {
						proclaim.deepEqual(mustacheFiles, [
							path.join(flatMustacheFiles, 'example-1.mustache'),
							path.join(flatMustacheFiles, 'example-2.mustache')
						]);
					});
			});

		});

		describe('when the directory structure has subdirectories', () => {

			it('returns an array of all of the mustache files in the directory and all subdirectories', function () {
				return files.getMustacheFilesList(nestedMustacheFiles)
					.then(mustacheFiles => {
						proclaim.deepEqual(mustacheFiles, [
							path.join(nestedMustacheFiles, 'example-1.mustache'),
							path.join(nestedMustacheFiles, 'example-2.mustache'),
							path.join(nestedMustacheFiles, 'folder-1/example-3.mustache'),
							path.join(nestedMustacheFiles, 'folder-1/folder-2/example-4.mustache')
						]);
					});
			});

		});

	});

	describe('getComponentDemos', function () {
		it('should return the component\'s `demos` configuration from origami.json', async function () {
			const demos = await files.getComponentDemos();
			proclaim.isArray(demos, 'Expected an array of demos.');
			proclaim.ok(demos.some(d => d.name === 'pa11y'), 'Expected to find a test demo with name "pa11y"');
		});

		it('should return an empty array given no origami.json manifest', async function () {
			fs.unlinkSync(path.resolve(filesTestPath, 'origami.json'));
			const demos = await files.getComponentDemos();
			proclaim.isArray(demos);
			proclaim.lengthEquals(demos, 0, 'Expected an empty array.');
		});
	});

	describe('getComponentDefaultDemoConfig', function () {
		it('should return the component\'s `demosDefaults` configuration from origami.json', async function () {
			const demosDefaults = await files.getComponentDefaultDemoConfig();
			proclaim.isObject(demosDefaults, 'Expected an object of default demo configuration.');
			proclaim.ok(demosDefaults.sass, 'Expected to confirm demo default configuration by finding "sass" configuration, but found none.');
		});

		it('should return an empty object given no origami.json manifest', async function () {
			fs.unlinkSync(path.resolve(filesTestPath, 'origami.json'));
			const demosDefaults = await files.getComponentDefaultDemoConfig();
			proclaim.isObject(demosDefaults, {}, 'Expected an object given missing default demo configuration.');
			proclaim.lengthEquals(Object.keys(demosDefaults), 0, 'Expected an empty object given missing default demo configuration.');
		});
	});

	describe('getModuleBrands', function() {
		context('if no brands are defined', function() {
			it('should return an array containing only `core`, `internal`, `whitelabel`', async function(){
				const brands = await files.getModuleBrands();
				proclaim.deepStrictEqual(brands, ['core', 'internal', 'whitelabel']);
			});
		});

		context('if brands is defined as an array with no items', function(){
			it('should return an array containing only `core`, `internal`, `whitelabel`', async function(){
				const brands = await files.getModuleBrands();
				proclaim.deepStrictEqual(brands, ['core', 'internal', 'whitelabel']);
			});
		});

		context('if brands is defined as an array with items', function(){
			it('should return an arary with the same items as those defined', async function() {
				const origamiManifest = JSON.parse(fs.readFileSync('origami.json', 'utf8'));
				origamiManifest.brands = ['internal'];
				fs.writeFileSync('origami.json', JSON.stringify(origamiManifest), 'utf8');
				const brands = await files.getModuleBrands();
				proclaim.deepStrictEqual(brands, ['internal']);
			});
		});
	});
});
