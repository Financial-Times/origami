/*global require, describe, it, before, afterEach */
"use strict";

var assert = require('assert'),
	Store = require("../../src/javascript/core/store"),
	Session = require("../../src/javascript/core/session");

describe('Core.Session', function () {

	before(function () {
		// clean up previous any tests
		(new Store('session')).destroy();
	});

	afterEach(function () {
		(new Store('session')).destroy();
	});

	describe('no preset value', function () {
		it('should init', function () {
			assert.doesNotThrow(function () {
				Session.init();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			var session = Session.init();
			assert.notEqual(session.id, null);
			assert.equal(session.isNew, true);
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value until it expires.', function () {
			var session = Session.init();
			var newSession = Session.session();
			assert.equal(newSession.id, session.id);
			assert.equal(newSession.isNew, false);
		});
	});

});
