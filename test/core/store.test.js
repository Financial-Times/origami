/* eslint-env mocha */
/* global proclaim */

import {Store} from '../../src/javascript/core/store.js';

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
				new Store(function(){ /* empty */ });
			});
		});

		it('throws an error if name for the store is an empty string', function() {
			proclaim.throws(function() {
				new Store('');
			});
		});

		it('constructs a store if given a name which is a string', function() {
			const store = new Store('test');
			proclaim.equal(store.storageKey, 'o-tracking_test');
		});

		it('can override the internal storageKey', function() {
			const store = new Store('test', {nameOverride: '13.7'});
			proclaim.equal(store.storageKey, '13.7');
		});
	});

	describe('write()', function () {
		it('should save a value', function () {
			const store = new Store('test');
			proclaim.equal(store.write('TESTING').read(), 'TESTING');
		});
	});

	describe('read()', function () {
		it('should retrieve a value', function () {
			const store = new Store('test');
			proclaim.equal(store.read(), 'TESTING');
		});
	});

	describe('destroy()', function () {
		it('should destroy the store', function () {
			const store = new Store('test');
			proclaim.equal(store.read(), 'TESTING');
			store.destroy();
			proclaim.equal(store.read(), null);
		});
	});

	describe('importing from cookies', function() {
		function cookieSave(name, value) {
			const yearInMilliseconds = 10 * 365 * 24 * 60 * 60 * 1000;
			const d = new Date();
			d.setTime(d.getTime() + yearInMilliseconds);
			const expires = 'expires=' + d.toUTCString() + ';';
			const domain = location.hostname.match(/^(?:.+\.)?ft\.com$/) ? 'ft.com' : null;

			const cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';' + expires + 'path=/;' + (domain ? 'domain=.' + domain + ';' : '');
			window.document.cookie = cookie;
		}
		it('should load data from the old cookie storage system if the cookie exists', function() {
			cookieSave('origami', JSON.stringify({
				number: 13.7
			}));
			const store = new Store('test', {
				nameOverride: 'origami'
			});

			proclaim.deepStrictEqual(store.read(), {
				number: 13.7
			});
		});
	});
});
