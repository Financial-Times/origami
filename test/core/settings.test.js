/* eslint-env mocha */
/* global proclaim */

import Settings from '../../src/javascript/core/settings.js';

describe('Core.Settings', function () {

	it('should set a value', function () {
		proclaim.doesNotThrow(function () {
			Settings.set('key', 'value');
			Settings.set('key2', 'value2');
		});
	});

	it('should get a value', function () {
		proclaim.equal(Settings.get('key'), 'value');
	});

	it('should delete a value', function () {
		proclaim.doesNotThrow(function () {
			Settings.destroy('key');
		});
		proclaim.ok(typeof Settings.get('key') === "undefined");
	});

	it("should work between different require'd files.", function () {
		proclaim.equal(Settings.get('key2'), "value2");
	});

	it("should return a copy of an object to prevent mutating the store.", function () {
		const obj = {
			key: 'value1'
		};

		Settings.set('obj', obj);
		obj.key = 'value2';
		proclaim.equal(Settings.get('obj').key, 'value1');
	});

	it("should return a copy of an array to prevent mutating the store.", function () {
		const arr = ['value1'];

		Settings.set('arr', arr);
		arr[0] = 'value2';
		proclaim.equal(Settings.get('arr')[0], 'value1');
		proclaim.equal(Object.prototype.toString.call(Settings.get('arr')), '[object Array]');
	});

});
