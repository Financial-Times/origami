/* eslint-env mocha */
/* global proclaim */

import Store from '../../src/javascript/core/store';

describe('Core.Store', function () {

	describe('constructor', function () {

		it('throws an error if not given a name for the store', function() {
			proclaim.throws(function() {
				new Store;
			});
		});

		it('throws an error if name for the store is not a string', function() {
			proclaim.throws(function() {
				new Store(137);
			});
			proclaim.throws(function() {
				new Store({});
			});
			proclaim.throws(function() {
				new Store(true);
			});
			proclaim.throws(function() {
				new Store([]);
			});
			proclaim.throws(function() {
				new Store(undefined);
			});
			proclaim.throws(function() {
				new Store(null);
			});
			proclaim.throws(function() {
				new Store(function(){});
			});
		});

		it('throws an error if name for the store is an empty string', function() {
			proclaim.throws(function() {
				new Store('');
			});
		});

		it('constructs a store if given a name which is a string', function() {
			proclaim.doesNotThrow(function() {
				new Store('test');
			});
		});

		it('should use local storage by default', function () {
			proclaim.equal(new Store('test').storage._type, 'localStorage');
		});
	});
	describe('write()', function () {
		it('should save a value', function () {
			proclaim.equal(store.write('TESTING').read(), 'TESTING');
		});
	});

	describe('read()', function () {
		it('should retrieve a value', function () {
			proclaim.equal(store.read(), 'TESTING');
		});
	});
});
