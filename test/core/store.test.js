/*global require, describe, it, document, navigator */
"use strict";

var assert = require('assert'),
	Store = require("../../src/javascript/core/store");

describe('Core.Store', function () {

	describe('init()', function () {

		it('should use local storage by default', function () {
			assert.equal((new Store('test')).storage._type, 'localStorage');
		});

		if (document.location.toString().match('^file://') && navigator.userAgent.indexOf('PhantomJS') < 0) {
			it('should still work if there is no storage mechanism available', function () {
				assert.equal((new Store('test', { storage: 'cookie' })).storage._type, 'none');
			});
		} else {
			it('can use cookies for storage', function () {
				assert.equal((new Store('test', { storage: 'cookie' })).storage._type, 'cookie');
			});
		}
	});

	var store = new Store('test');

	describe('write()', function () {
		it('should save a value', function () {
			assert.equal(store.write('TESTING').read(), 'TESTING');
		});
	});

	describe('read()', function () {
		it('should retrieve a value', function () {
			assert.equal(store.read(), 'TESTING');
		});
	});

});
