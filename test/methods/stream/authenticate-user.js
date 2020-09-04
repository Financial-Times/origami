/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';
import * as auth from '../../../src/js/utils/auth.js';

let fetchJWTStub;

export default function authenticateUser () {
	it("is a function", () => {
		proclaim.isFunction(new Stream().authenticateUser);
	});

	describe("comments api options", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
			/*
			 * origami-build-tools version 10 compiles exports to getters for
			 * compatibility with as many browsers as possible in addition to the
			 * ecmascript specification. A slight divergence from the
			 * specification is that these getters are configurable, so we can
			 * override it here and stub the validation function.
			 *
			 * This should be removed if a future version of origami-build-tools
			 * includes a bundler that behaves differently.
			 */
			fetchJWTStub = sinon.stub();
			sinon.stub(auth, 'fetchJsonWebToken').get(() => fetchJWTStub);
			fetchJWTStub.rejects();
		});

		afterEach(() => {
			fixtures.reset();
			sinon.restore();
		});

		it("displayName option is passed to fetchJsonWebToken", () => {
			fetchJWTStub.resolves({});

			const stream = new Stream();

			return stream.authenticateUser('Glynn')
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.equal(options.displayName, 'Glynn');
				});

		});

		it("displayName option is not used if undefined", () => {
			fetchJWTStub.resolves({});

			const stream = new Stream();

			return stream.authenticateUser(undefined)
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.isNotString(options.displayName);
				});

		});

		it("staging option is passed to fetchJsonWebToken", () => {
			fetchJWTStub.resolves({});

			const stream = new Stream(null, {
				useStagingEnvironment: true
			});

			return stream.authenticateUser()
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.equal(options.useStagingEnvironment, true);
				});

		});

	});

	describe("fetchJsonWebToken returns a token", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
			fetchJWTStub = sinon.stub();
			sinon.stub(auth, 'fetchJsonWebToken').get(() => fetchJWTStub);
		});

		afterEach(() => {
			fixtures.reset();
			sinon.restore();
		});

		it("sets this.authenticationToken to the token", () => {
			fetchJWTStub.resolves({
				token: 'fake-jwt'
			});

			const stream = new Stream();

			return stream.authenticateUser()
				.then(() => {
					proclaim.equal(stream.authenticationToken, 'fake-jwt');
				});

		});

	});

	describe("fetchJsonWebToken returns a displayName", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
			fetchJWTStub = sinon.stub();
			sinon.stub(auth, 'fetchJsonWebToken').get(() => fetchJWTStub);
		});

		afterEach(() => {
			fixtures.reset();
			sinon.restore();
		});

		it("sets this.displayName to the display name", () => {
			fetchJWTStub.resolves({
				displayName: 'fake-display-name'
			});

			const stream = new Stream();

			return stream.authenticateUser()
				.then(() => {
					proclaim.equal(stream.displayName, 'fake-display-name');
				});

		});

	});

	describe("fetchJsonWebToken returns userHasValidSession", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
			fetchJWTStub = sinon.stub();
			sinon.stub(auth, 'fetchJsonWebToken').get(() => fetchJWTStub);
		});

		afterEach(() => {
			fixtures.reset();
			sinon.restore();
		});

		describe("userHasValidSession is true", () => {
			it("sets this.userHasValidSession to true", () => {
				fetchJWTStub.resolves({
					userHasValidSession: true
				});

				const stream = new Stream();
				return stream.authenticateUser()
					.then(() => {
						proclaim.isTrue(stream.userHasValidSession);
					});

			});
		});

		describe("userHasValidSession is false", () => {
			it("sets this.userHasValidSession to false", () => {
				fetchJWTStub.resolves({
					userHasValidSession: false
				});

				const stream = new Stream();
				return stream.authenticateUser()
					.then(() => {
						proclaim.isFalse(stream.userHasValidSession);
					});
			});
		});

	});
}
