/* eslint-env mocha */
/* global proclaim */

import User from '../../src/javascript/core/user';

describe('Core.User', function () {

	let userID;

	afterEach(function () {
		User.destroy();
	});

	describe('no preset value', function () {
		it('should init', function () {
			proclaim.doesNotThrow(function () {
				userID = User.init();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			proclaim.equal(User.userID(), userID);
		});
	});

	describe('use init with an existing value', function () {
		it('should use an object', function () {
			User.init('value1');
		});

		it('should retrieve the userID ', function () {
			proclaim.equal(User.userID(), 'value1');
		});

		it('should use a string', function () {
			User.init('value2');
		});

		it('should retrieve the userID ', function () {
			proclaim.equal(User.userID(), 'value2');
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value, even if a new one is provided.', function () {
			User.init('value2');
			User.init('value3');
			proclaim.equal(User.userID(), 'value2');
		});
	});

});
