/* eslint-env mocha */
import proclaim from 'proclaim';
import fetchMock from 'fetch-mock';

import {getJsonWebToken} from '../../src/js/utils/auth';

describe("Auth", () => {
	describe("getJsonWebToken", () => {
		it("is a function", () => {
			proclaim.isFunction(getJsonWebToken);
		});

		describe("when comments api returns a valid response", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', {
					token: '12345'
				});
			});

			after(() => {
				fetchMock.reset();
			});

			it("returns a promise", () => {
				const returnValue = getJsonWebToken();
				proclaim.isInstanceOf(returnValue, Promise);
			});

			it("returns a promise which contains a JSON Web Token as a string", () => {
				return getJsonWebToken()
					.then(result => proclaim.isString(result.token));
			});
		});

		describe("when the comments api response is missing the token", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', {});
			});

			after(() => {
				fetchMock.reset();
			});

			it('resolves with an object', () => {
				return getJsonWebToken()
					.then(result => proclaim.isObject(result));
			});

			it("resolves with undefined token", () => {
				return getJsonWebToken()
					.then(result => proclaim.equal(result.token, undefined));
			});
		});

		describe("when the comments api response is missing the token", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', {token: undefined});
			});

			after(() => {
				fetchMock.reset();
			});

			it('resolves with an object', () => {
				return getJsonWebToken()
					.then(proclaim.isObject);
			});

			it("resolves with undefined token", () => {
				return getJsonWebToken()
					.then(result => proclaim.equal(result.token, undefined));
			});
		});

		describe("when the comments api responds with 205", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', 205);
			});

			after(() => {
				fetchMock.reset();
			});

			it('resolves with an object', () => {
				return getJsonWebToken()
					.then(proclaim.isObject);
			});

			it("resolves with undefined token", () => {
				return getJsonWebToken()
					.then(result => proclaim.equal(result.token, undefined));
			});

			it("resolves with userIsSignedIn true", () => {
				return getJsonWebToken()
					.then((result) => proclaim.isTrue(result.userIsSignedIn));
			});
		});

		describe("when the comments api responds with 404", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', 404);
			});

			after(() => {
				fetchMock.reset();
			});

			it('resolves with an object', () => {
				return getJsonWebToken()
					.then(proclaim.isObject);
			});

			it("resolves with undefined token", () => {
				return getJsonWebToken()
					.then(result => proclaim.equal(result.token, undefined));
			});

			it("resolves with userIsSignedIn false", () => {
				return getJsonWebToken()
					.then(result => proclaim.isFalse(result.userIsSignedIn));
			});
		});

		describe("when the comments api responds with a bad response other than 404", () => {
			before(() => {
				fetchMock.mock('https://comments-api.ft.com/user/auth/', 500);
			});

			after(() => {
				fetchMock.reset();
			});

			it('resolves with an object', () => {
				return getJsonWebToken()
					.then(proclaim.isObject);
			});

			it("resolves with undefined token", () => {
				return getJsonWebToken()
					.then(result => proclaim.equal(result.token, undefined));
			});

			it("resolves with userIsSignedIn false", () => {
				return getJsonWebToken()
					.then(result => proclaim.isFalse(result.userIsSignedIn));
			});
		});
	});
});
