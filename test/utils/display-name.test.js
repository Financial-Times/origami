/* eslint-env mocha */
/* global proclaim sinon */
import fetchMock from 'fetch-mock';
import * as displayName from '../../src/js/utils/display-name';

describe('Display name', () => {
	describe('Validation', () => {

		afterEach(() => {
			sinon.restore();
			fetchMock.reset();
		});

		it("rejects if the display name doesn't exist", (done) => {
			displayName.validation()
				.catch(error => {
					proclaim.isInstanceOf(error, Error);
					proclaim.equal(error.message, 'Empty display name');
					done();
				});
		});

		it("rejects if the display name contains invalid characters", (done) => {
			displayName.validation('test~')
				.catch(error => {
					proclaim.isInstanceOf(error, Error);
					proclaim.equal(error.message, 'The display name contains the following invalid characters: ~');
					done();
				});
		});

		it("rejects if the display name isn't unique", (done) => {
			fetchMock.mock('begin:https://comments-api.ft.com/displayname/isavailable', {
				available: false
			});
			displayName.validation('test')
				.catch(error => {
					proclaim.isInstanceOf(error, Error);
					proclaim.equal(error.message, 'Unfortunately that display name is already taken');
					done();
				});
		});

		it("rejects if the comments-api errors", (done) => {
			fetchMock.mock('begin:https://comments-api.ft.com/displayname/isavailable', 500);

			displayName.validation('test')
				.catch(error => {
					proclaim.isInstanceOf(error, Error);
					proclaim.equal(error.message, 'Sorry, we are unable to update display names. Please try again later.');
					done();
				});
		});

		it("resolves if everything passes", (done) => {
			fetchMock.mock('begin:https://comments-api.ft.com/displayname/isavailable', {
				available: true
			});

			displayName.validation('test')
				.then(displayName => {
					proclaim.equal(displayName, 'test');
					done();
				});
		});
	});
});
