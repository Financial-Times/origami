/*global require, describe, it, beforeEach, afterEach */
"use strict";

var assert = require('assert'),
	Store = require("../../src/javascript/core/store"),
	Session = require("../../src/javascript/core/session");

describe('Core.Session', function () {

	var session;

	beforeEach(function () {
		(new Store('session')).destroy();
	});
	afterEach(function () {
		(new Store('session')).destroy();
	});

	describe('no preset value', function () {
		it('should init', function () {
			assert.doesNotThrow(function () {
				session = Session.init();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			assert.equal(Session.session(), session);
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value until it expires.', function () {
			Session.session(); // Bug in karma, I think it's concurrent running tests - this seems to fix it.
			Session.init();
			assert.equal(Session.session(), session);
		});
	});

});
