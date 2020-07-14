/* eslint-env mocha */
/* global proclaim */

import Store from '../../src/javascript/core/store';
import Session from '../../src/javascript/core/session';

describe('Core.Session', function () {

	beforeEach(function () {
		// clean up previous tests' pollution
		new Store('session').destroy();
	});

	afterEach(function () {
		new Store('session').destroy();
	});

	describe('no preset value', function () {
		it('should init', function () {
			proclaim.doesNotThrow(function () {
				Session.init();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			const session = Session.init();
			proclaim.notEqual(session.id, null);
			proclaim.equal(session.isNew, true);
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value until it expires.', function () {
			const session = Session.init();
			const newSession = Session.session();
			proclaim.equal(newSession.id, session.id);
			proclaim.equal(newSession.isNew, false);
		});
	});

});
