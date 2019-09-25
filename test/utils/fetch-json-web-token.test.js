import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fetchMock from 'fetch-mock';
import fetchJsonWebToken from '../../src/js/utils/fetch-json-web-token';

const sandbox = sinon.createSandbox();

describe('Fetch JSON web token', () => {
	afterEach(() => {
		sandbox.restore();
	});

	it("is a function", () => {
		proclaim.isFunction(fetchJsonWebToken);
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
			fetchJsonWebToken({
				useStagingEnvironment: true
			});

			proclaim.isTrue(commentsApiMock.called());
		});
	});

	describe("when the source app option is passed in", () => {
		let commentsApiMock;

		before(() => {
			commentsApiMock = fetchMock.mock('https://comments-api.ft.com/user/auth/?sourceApp=next', {
				token: '12345'
			});
		});

		after(() => {
			fetchMock.reset();
		});

		it("appends the source app query parameter to the comments api url", () => {
			fetchJsonWebToken({
				sourceApp: 'next'
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
			const returnValue = fetchJsonWebToken();
			proclaim.isInstanceOf(returnValue, Promise);
		});

		it("returns a promise which contains a JSON Web Token as a string", () => {
			return fetchJsonWebToken()
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
			return fetchJsonWebToken()
				.then(result => proclaim.isObject(result));
		});

		it("resolves with undefined token", () => {
			return fetchJsonWebToken()
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
			return fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return fetchJsonWebToken()
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
			return fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn true", () => {
			return fetchJsonWebToken()
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
			return fetchJsonWebToken()
				.then(proclaim.isObject);
		});

		it("resolves with undefined token", () => {
			return fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn false", () => {
			return fetchJsonWebToken()
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
			return fetchJsonWebToken()
				.then(result => proclaim.isObject(result));
		});

		it("resolves with undefined token", () => {
			return fetchJsonWebToken()
				.then(result => proclaim.equal(result.token, undefined));
		});

		it("resolves with userIsSignedIn false", () => {
			return fetchJsonWebToken()
				.then(result => proclaim.isFalse(result.userIsSignedIn));
		});
	});
});
