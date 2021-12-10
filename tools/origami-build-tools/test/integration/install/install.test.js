/* eslint-env mocha */
'use strict';

const execa = require('execa');
const path = require('path');
const process = require('process');
const proclaim = require('proclaim');
const obtBinPath = require('../helpers/obtpath');
const fileExists = require('../helpers/fileExists');
const rimraf = require('../helpers/delete');

describe('obt install', function () {

	this.timeout(10 * 1000);

	describe('npm installs', function () {
		describe('component with no dependencies', function () {

			beforeEach(function () {
				process.chdir(path.join(__dirname, '/fixtures/no-npm-dependencies'));
			});

			afterEach(function () {
				return rimraf(path.join(process.cwd(), '/node_modules'))
					.then(() => rimraf(path.join(process.cwd(), '/npm-debug.log')))
					.then(() => process.chdir(process.cwd()));
			});

			it('should not error', function () {
				return obtBinPath()
					.then(obt => {
						return execa(obt, ['install']);
					});
			});
		});

		describe('component with non-existent npm dependencies', function () {

			beforeEach(function () {
				process.chdir(path.join(__dirname, '/fixtures/non-existent-npm-dependency'));
			});

			afterEach(function () {
				return rimraf(path.join(process.cwd(), '/node_modules'))
					.then(() => rimraf(path.join(process.cwd(), '/npm-debug.log')))
					.then(() => process.chdir(process.cwd()));
			});

			it('should error', function () {
				return obtBinPath()
					.then(obt => {
						return execa(obt, ['install']);
					})
					.then(() => {
						throw new Error('obt install should error when trying to install a dependency which does not exist.');
					}, () => {
						// obt install exited with a non-zero exit code, which is what we expected.
					});
			});
		});

		describe('component with npm dependencies', function () {

			beforeEach(function () {
				process.chdir(path.join(__dirname, '/fixtures/with-npm-dependencies'));
			});

			afterEach(function () {
				return rimraf(path.join(process.cwd(), '/node_modules'))
					.then(() => rimraf(path.join(process.cwd(), '/npm-debug.log')))
					.then(() => process.chdir(process.cwd()));
			});

			it('should install dependency correctly', function () {
				return obtBinPath()
					.then(obt => {
						return execa(obt, ['install']);
					})
					.then(() => {
						return fileExists('node_modules/lodash/package.json');
					})
					.then(exists => {
						proclaim.ok(exists);
					});
			});
		});
	});
});
