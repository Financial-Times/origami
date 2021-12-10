/* eslint-env mocha */
'use strict';

const proclaim = require('proclaim');
const mockery = require('mockery');
const sinon = require('sinon');
const path = require('path');

describe('construct-polyfill-url', function() {


	let globby;
	let constructPolyfillUrl;
	let fs;
	beforeEach(function() {
		fs = {
			readFile: sinon.stub()
		};
		globby = sinon.stub();
		mockery.enable({
			useCleanCache: true,
			warnOnReplace: false,
			warnOnUnregistered: false
		});

		mockery.registerMock('fs/promises', fs);

		mockery.registerMock('globby', globby);

		mockery.registerAllowable('../../../lib/helpers/construct-polyfill-url');

		constructPolyfillUrl = require('../../../lib/helpers/construct-polyfill-url');
	});

	afterEach(() => {
		mockery.resetCache();
		mockery.deregisterAll();
		mockery.disable();
	});

	it('exports a function', function() {
		proclaim.equal(typeof constructPolyfillUrl, 'function');
	});

	it('returns a rejected promise if globby returns a rejected promise', () => {
		globby.rejects();

		return constructPolyfillUrl()
			.then(() => {
				// should not resolve
				proclaim.notOk(true);
			}, () => {
				// we expect this to reject
				proclaim.ok(true);
			});
	});

	describe('when globby finds no files', () => {
		it('returns a polyfill url with only the default polyfill set', () => {
			globby.resolves([]);
			return constructPolyfillUrl()
				.then(polyfillUrl => {
					proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent&flags=gated&unknown=polyfill');
				});
		});
	});

	describe('when globby finds files', () => {
		describe('files do not contain a browserFeatures field', () => {
			it('returns a polyfill url with only the default polyfill set', () => {
				globby.resolves(['origami.json']);
				fs.readFile.resolves('{}');

				return constructPolyfillUrl()
					.then(polyfillUrl => {
						proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent&flags=gated&unknown=polyfill');
					});
			});
		});

		describe('files do not contain a required field in the browserFeatures object', () => {
			it('returns a polyfill url with only the default polyfill set', () => {
				fs.readFile.resolves('{"browserFeatures": {}}');
				globby.resolves(['/origami.json']);

				return constructPolyfillUrl()
					.then(polyfillUrl => {
						proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent&flags=gated&unknown=polyfill');
					});
			});
		});

		describe('files do contain a required array in the browserFeatures object', () => {
			it('returns a polyfill url with the default polyfill set and the features in the required array', () => {
				fs.readFile.resolves('{"browserFeatures": {"required": ["Array.prototype.every"]}}');
				globby.resolves(['/origami.json']);

				return constructPolyfillUrl()
					.then(polyfillUrl => {
						proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.every,CustomEvent&flags=gated&unknown=polyfill');
					});
			});

			it('does not duplicate features in the polyfill url', () => {
				fs.readFile.withArgs(path.join(__dirname, '../../../', '/origami.json'), 'utf-8').resolves('{"browserFeatures": {"required": ["Array.prototype.every"]}}');
				fs.readFile.withArgs(path.join(__dirname, '../../../', '/node_modules/example/origami.json'), 'utf-8').resolves('{"browserFeatures": {"required": ["Array.prototype.every","Array.prototype.some"]}}');
				globby.resolves(['/origami.json', '/node_modules/example/origami.json']);

				return constructPolyfillUrl()
					.then(polyfillUrl => {
						proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=Array.prototype.every,Array.prototype.some,CustomEvent&flags=gated&unknown=polyfill');
					});
			});

			describe('required array is empty', () => {
				it('returns a polyfill url with only the default polyfill set', () => {
					fs.readFile.resolves('{"browserFeatures": {"required": []}}');
					globby.resolves(['/origami.json']);

					return constructPolyfillUrl()
						.then(polyfillUrl => {
							proclaim.equal(polyfillUrl, 'https://polyfill.io/v3/polyfill.min.js?features=CustomEvent&flags=gated&unknown=polyfill');
						});
				});
			});
		});
	});
});
