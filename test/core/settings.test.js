/*global require, describe, it */
"use strict";

var assert = require('assert'),
	Settings = require("../../src/javascript/core/settings");

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
			Settings.delete('key');
		});
		assert.ok(typeof Settings.get('key') === "undefined");
	});

	it("should work between different require'd files.", function () {
		assert.equal(require("../../src/javascript/core/settings").get('key2'), "value2");
	});

});
