/* eslint-env mocha */
/* global proclaim */

import {init, destroy, userID} from '../../src/javascript/core/user.js';

describe('Core.User', function () {

	let id;

	afterEach(function () {
		destroy();
	});

	describe('no preset value', function () {
		it('should init', function () {
			proclaim.doesNotThrow(function () {
				id = init();
			});
		});

		it('should use generate an ID if one does not exist', function () {
			proclaim.equal(userID(), id);
		});
	});

	describe('use init with an existing value', function () {
		it('should use an object', function () {
			init('value1');
		});

		it('should retrieve the userID ', function () {
			proclaim.equal(userID(), 'value1');
		});

		it('should use a string', function () {
			init('value2');
		});

		it('should retrieve the userID ', function () {
			proclaim.equal(userID(), 'value2');
		});
	});

	describe('retrieving values.', function () {
		it('should use the existing value, even if a new one is provided.', function () {
			init('value2');
			init('value3');
			proclaim.equal(userID(), 'value2');
		});
	});

});
