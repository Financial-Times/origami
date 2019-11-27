import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';
import * as auth from '../../../src/js/utils/auth';

const sandbox = sinon.createSandbox();

module.exports = () => {
	it("is a function", () => {
		proclaim.isFunction(new Stream().authenticateUser);
	});

	describe("comments api options", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
		});

		afterEach(() => {
			fixtures.reset();
			sandbox.restore();
		});

		it("displayName option is passed to fetchJsonWebToken", (done) => {
			const fetchJWTStub = sandbox.stub(auth, 'fetchJsonWebToken').resolves({});

			const stream = new Stream();

			stream.authenticateUser('Glynn')
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.equal(options.displayName, 'Glynn');
					done();
				});

		});

		it("staging option is passed to fetchJsonWebToken", (done) => {
			const fetchJWTStub = sandbox.stub(auth, 'fetchJsonWebToken').resolves({});

			const stream = new Stream(null, {
				useStagingEnvironment: true
			});

			stream.authenticateUser()
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.equal(options.useStagingEnvironment, true);
					done();
				});

		});

		it("source app option is passed to fetchJsonWebToken", (done) => {
			const fetchJWTStub = sandbox.stub(auth, 'fetchJsonWebToken').resolves({});

			const stream = new Stream(null, {
				sourceApp: 'next'
			});

			stream.authenticateUser()
				.then(() => {
					const options = fetchJWTStub.getCall(0).args[0];
					proclaim.equal(options.sourceApp, 'next');
					done();
				});
		});

	});

	describe("fetchJsonWebToken returns a token", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
		});

		afterEach(() => {
			fixtures.reset();
			sandbox.restore();
		});

		it("sets this.authenticationToken to the token", (done) => {
			sandbox.stub(auth, 'fetchJsonWebToken').resolves({
				token: 'fake-jwt'
			});

			const stream = new Stream();
			stream.authenticateUser()
				.then(() => {
					proclaim.equal(stream.authenticationToken, 'fake-jwt');
					done();
				});

		});

	});

	describe("fetchJsonWebToken returns a displayName", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
		});

		afterEach(() => {
			fixtures.reset();
			sandbox.restore();
		});

		it("sets this.displayName to the display name", (done) => {
			sandbox.stub(auth, 'fetchJsonWebToken').resolves({
				displayName: 'fake-display-name'
			});

			const stream = new Stream();
			stream.authenticateUser()
				.then(() => {
					proclaim.equal(stream.displayName, 'fake-display-name');
					done();
				});

		});

	});

	describe("fetchJsonWebToken returns userHasValidSession", () => {
		beforeEach(() => {
			fixtures.streamMarkup();
		});

		afterEach(() => {
			fixtures.reset();
			sandbox.restore();
		});

		describe("userHasValidSession is true", () => {
			it("sets this.userHasValidSession to true", (done) => {
				sandbox.stub(auth, 'fetchJsonWebToken').resolves({
					userHasValidSession: true
				});

				const stream = new Stream();
				stream.authenticateUser()
					.then(() => {
						proclaim.isTrue(stream.userHasValidSession);
						done();
					});

			});
		});

		describe("userHasValidSession is false", () => {
			it("sets this.userHasValidSession to false", (done) => {
				sandbox.stub(auth, 'fetchJsonWebToken').resolves({
					userHasValidSession: false
				});

				const stream = new Stream();
				stream.authenticateUser()
					.then(() => {
						proclaim.isFalse(stream.userHasValidSession);
						done();
					});

			});
		});

	});
};

