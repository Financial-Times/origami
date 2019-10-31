/*global require, describe, it */

const assert = require('assert');
const Settings = require('../../src/javascript/core/settings');

describe('Core.Settings', function () {

	it('should set a value', function () {
		assert.doesNotThrow(function () {
			Settings.set('key', 'value');
			Settings.set('key2', 'value2');
		});
	});

	it('should get a value', function () {
		assert.equal(Settings.get('key'), 'value');
	});

	it('should delete a value', function () {
		assert.doesNotThrow(function () {
			Settings.destroy('key');
		});
		assert.ok(typeof Settings.get('key') === "undefined");
	});

	it("should work between different require'd files.", function () {
		assert.equal(require("../../src/javascript/core/settings").get('key2'), "value2");
	});

	it("should return a copy of an object to prevent mutating the store.", function () {
		const obj = {
			key: 'value1'
		};

		Settings.set('obj', obj);
		obj.key = 'value2';
		assert.equal(Settings.get('obj').key, 'value1');
	});

	it("should return a copy of an array to prevent mutating the store.", function () {
		const arr = ['value1'];

		Settings.set('arr', arr);
		arr[0] = 'value2';
		assert.equal(Settings.get('arr')[0], 'value1');
		assert.equal(Object.prototype.toString.call(Settings.get('arr')), '[object Array]');
	});

});
