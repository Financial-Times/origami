/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const fs = require('fs-extra');
const path = require('path');
const process = require('process');

const build = require('../../../lib/tasks/build-js');

const obtPath = process.cwd();
const oTestPath = 'test/unit/fixtures/o-test';

describe('build-js', function () {
	const pathSuffix = '-build-js';
	const buildTestPath = path.resolve(obtPath, oTestPath + pathSuffix);

	beforeEach(function () {
		fs.copySync(path.resolve(obtPath, oTestPath), buildTestPath);
		process.chdir(buildTestPath);
		fs.writeFileSync('package.json', JSON.stringify({
			name: 'o-test',
			main: 'main.js'
		}), 'utf8');
	});

	afterEach(function () {
		process.chdir(obtPath);
		fs.removeSync(buildTestPath);
		return fs.emptydirSync('build', function () {
			fs.removeSync('build');
		});
	});

	it('should work with default options', function () {
		return build()
			.then(function (result) {
				proclaim.include(result, 'sourceMappingURL');
				proclaim.include(result, `var name = "test";`);
			});
	});

	it('should build from custom source', function () {
		return build({
			js: path.join(process.cwd(), './src/js/test.js')
		})
			.then(function (builtJs) {
				proclaim.include(builtJs, 'sourceMappingURL');
				proclaim.include(builtJs, `var name = "test";`);
			});
	});

	it('should build to a custom directory', function () {
		return build({
			buildFolder: 'test-build'
		})
			.then(function (builtJs) {
				proclaim.include(builtJs, 'sourceMappingURL');
				proclaim.include(builtJs, `var name = "test";`);
			});
	});

	it('should build to a custom file', function () {
		return build({
			buildJs: 'bundle.js'
		})
			.then(function (builtJs) {
				proclaim.include(builtJs, 'sourceMappingURL');
				proclaim.include(builtJs, `var name = "test";`);
			});
	});

	it('should fail on syntax error', function () {
		return build({
			js: './src/js/syntax-error.js'
		})
			.then(() => {
				proclaim.ok(false);
			}, function (e) {
				proclaim.isInstanceOf(e, Error);
			});
	});

	it('should fail when a dependency is not found', function () {
		return build({
			js: './src/js/missing-dep.js'
		})
			.then(() => {
				proclaim.ok(false);
			}, function (e) {
				proclaim.isInstanceOf(e, Error);
			});
	});
});
