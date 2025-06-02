/* eslint-env mocha */

import proclaim from 'proclaim';
import {Store} from '../../src/javascript/core/store.js';
import {init as initSession, session as getSession} from '../../src/javascript/core/session.js';

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
				initSession();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			const session = initSession();
			proclaim.notEqual(session.id, null);
			proclaim.equal(session.isNew, true);
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value until it expires.', function () {
			const session = initSession();
			const newSession = getSession();
			proclaim.equal(newSession.id, session.id);
			proclaim.equal(newSession.isNew, false);
			proclaim.equal(newSession.timestamp, session.timestamp)
		});
	});

	describe('getSession()', function() {
		it('should generate new session if current has expired', function(done) {
			const session = initSession({expires: 1});
			// force a session write
			getSession();
			setTimeout(function() {
				const newSession = getSession();
				proclaim.notEqual(session.id, newSession.id);
				done();
			}, 2)
		});

		it('should mark session as new when generating new session due to expiration', function(done) {
			initSession({expires: 1});
			// force a session write
			getSession();
			setTimeout(function() {
				const newSession = getSession();
				proclaim.isTrue(newSession.isNew);
				done();
			}, 2)
		});

		it('should generate timestamp for session', () => {
			const currentTimestamp = new Date().getTime();
			const timestamp = getSession().timestamp;
			proclaim.isNumber(timestamp);
			proclaim.isTrue(timestamp >= currentTimestamp);
			proclaim.isTrue(timestamp <= currentTimestamp + 1000); // within 1 second
		})

		it('should generate a new timestamp if session has expired', (done) => {
			const prevSession = initSession({expires: 1});
			setTimeout(function() {
				const newSession = getSession();
				proclaim.notEqual(prevSession.timestamp, newSession.timestamp);
				done()
			}, 2)
		})
	})
});
