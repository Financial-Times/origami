/* eslint-env mocha */
/* global proclaim */

import Store from '../../src/javascript/core/store';

describe('Core.Store', function () {

	describe('init()', function () {
		it('should use local storage by default', function () {
			proclaim.equal(new Store('test').storage._type, 'localStorage');
		});
	});

	const store = new Store('test');

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
