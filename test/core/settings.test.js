/* eslint-env mocha */
/* global proclaim */

import {set, get, destroy} from '../../src/javascript/core/settings.js';

describe('Core.Settings', function () {

	it('should set a value', function () {
		proclaim.doesNotThrow(function () {
			set('key', 'value');
			set('key2', 'value2');
		});
	});

	it('should get a value', function () {
		proclaim.equal(get('key'), 'value');
	});

	it('should delete a value', function () {
		proclaim.doesNotThrow(function () {
			destroy('key');
		});
		proclaim.ok(typeof get('key') === "undefined");
	});

	it("should work between different require'd files.", function () {
		proclaim.equal(get('key2'), "value2");
	});

	it("should return a copy of an object to prevent mutating the store.", function () {
		const obj = {
			key: 'value1'
		};

		set('obj', obj);
		obj.key = 'value2';
		proclaim.equal(get('obj').key, 'value1');
	});

	it("should return a copy of an array to prevent mutating the store.", function () {
		const arr = ['value1'];

		set('arr', arr);
		arr[0] = 'value2';
		proclaim.equal(get('arr')[0], 'value1');
		proclaim.equal(Object.prototype.toString.call(get('arr')), '[object Array]');
	});

});
