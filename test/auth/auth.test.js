/* eslint-env mocha */
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fetchMock from 'fetch-mock';

import {getJsonWebToken} from '../..//src/js/utils/auth';

chai.use(chaiAsPromised);

const expect = chai.expect;

describe("Auth", () => {
	describe("getJsonWebToken", () => {
		it("is a function", () => {
			return expect(getJsonWebToken).to.be.an.instanceof(Function);
		});

		describe("when comments auth service returns a valid response", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', {
					token: '12345'
				});
			});

			after(() => {
				fetchMock.reset();
			});

			it("returns a promise", () => {
				return expect(getJsonWebToken()).to.be.an.instanceof(Promise);
			});

			it("returns a promise which contains a JSON Web Token as a string", () => {
				return expect(getJsonWebToken()).to.eventually.have.string('12345');
			});
		});
		describe("when the comments auth service response is missing the token", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', {});
			});

			after(() => {
				fetchMock.reset();
			});

			it("throws an error", () => {
				return expect(getJsonWebToken()).to.be.rejectedWith("Authentication token doesn't exist");
			});
		});

		describe("when the comments auth service responds with a bad response", () => {
			before(() => {
				fetchMock.mock('https://comments-auth.ft.com/v1/jwt/', 404);
			});

			after(() => {
				fetchMock.reset();
			});

			it("throws an error", () => {
				return expect(getJsonWebToken()).to.be.rejectedWith("Bad response from the authentication service");
			});
		});
	});
});
