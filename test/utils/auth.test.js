import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fetchMock from 'fetch-mock';
import * as auth from '../../src/js/utils/auth';

const sandbox = sinon.createSandbox();

describe('Fetch JSON web token', () => {
	afterEach(() => {
		sandbox.restore();
	});

	it("is a function", () => {
		proclaim.isFunction(auth.fetchJsonWebToken);
	});

	describe("when the displayName option is passed in", () => {
		let commentsApiMock;

		before(() => {
			commentsApiMock = fetchMock.mock('https://comments-api.ft.com/user/auth/?displayName=Glynn', {
				token: '12345'
			});
		});

		after(() => {
			fetchMock.reset();
		});

		it("appends the displayName query parameter to the comments api url", () => {
			auth.fetchJsonWebToken({
				displayName: 'Glynn'
			});

			proclaim.isTrue(commentsApiMock.called());
		});
	});


	describe("when the useStagingEnvironment option is passed in", () => {
		let commentsApiMock;

		before(() => {
			commentsApiMock = fetchMock.mock('https://comments-api.ft.com/user/auth/?staging=1', {
				token: '12345'
			});
		});

		after(() => {
			fetchMock.reset();
		});

		it("appends the staging query parameter to the comments api url", () => {
			auth.fetchJsonWebToken({
				useStagingEnvironment: true
			});

			proclaim.isTrue(commentsApiMock.called());
		});
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
			const returnValue = auth.fetchJsonWebToken();
			proclaim.isInstanceOf(returnValue, Promise);
		});

		it("returns a promise which contains a JSON Web Token as a string", () => {
			return auth.fetchJsonWebToken()
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
			return auth.fetchJsonWebToken()
				.then(result => proclaim.isObject(result));
		});

		it("resolves with undefined token", () => {
			return auth.fetchJsonWebToken()
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
			return auth.fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});
	});

	describe("when the comments api responds with 409", () => {
		before(() => {
			fetchMock.mock('https://comments-api.ft.com/user/auth/', 409);
		});

		after(() => {
			fetchMock.reset();
		});

		it('resolves with an object', () => {
			return auth.fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn true", () => {
			return auth.fetchJsonWebToken()
				.then((result) => proclaim.isTrue(result.userHasValidSession));
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
			return auth.fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn false", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.isFalse(result.userHasValidSession));
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
			return auth.fetchJsonWebToken()
				.then(result => proclaim.isObject(result));
		});

		it("resolves with undefined token", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn false", () => {
			return auth.fetchJsonWebToken()
				.then(result => proclaim.isFalse(result.userHasValidSession));
		});
	});
});
