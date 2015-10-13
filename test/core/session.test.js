/*global require, describe, it, beforeEach, afterEach */

const assert = require('assert');
const Store = require('../../src/javascript/core/store');
const Session = require('../../src/javascript/core/session');

describe('Core.Session', function () {

	beforeEach(function () {
		// clean up previous tests' pollution
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
			const session = Session.init();
			assert.notEqual(session.id, null);
			assert.equal(session.isNew, true);
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value until it expires.', function () {
			const session = Session.init();
			const newSession = Session.session();
			assert.equal(newSession.id, session.id);
			assert.equal(newSession.isNew, false);
		});
	});

});
