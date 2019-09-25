import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';
import * as utils from '../../../src/js/utils';

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
			const fetchJWTStub = sandbox.stub(utils, 'fetchJsonWebToken').resolves({});

			const stream = new Stream();

			stream.authenticateUser('Glynn')
				.then(() => {
					proclaim.isTrue(fetchJWTStub.calledWith({displayName: 'Glynn', useStagingEnvironment: undefined, sourceApp: undefined}));
					done();
				});

		});

		it("staging option is passed to fetchJsonWebToken", (done) => {
			const fetchJWTStub = sandbox.stub(utils, 'fetchJsonWebToken').resolves({});


			const stream = new Stream(null, {
				useStagingEnvironment: true
			});

			stream.authenticateUser()
				.then(() => {
					proclaim.isTrue(fetchJWTStub.calledWith({useStagingEnvironment: true, sourceApp: undefined}));
					done();
				});

		});

		it("source app option is passed to fetchJsonWebToken", (done) => {
			const fetchJWTStub = sandbox.stub(utils, 'fetchJsonWebToken').resolves({});


			const stream = new Stream(null, {
				sourceApp: 'next'
			});

			stream.authenticateUser()
				.then(() => {
					proclaim.isTrue(fetchJWTStub.calledWith({sourceApp: 'next', useStagingEnvironment: false}));
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

		it("calls embed.login with the new token", (done) => {
			sandbox.stub(utils, 'fetchJsonWebToken').resolves({
				token: 'fake-jwt'
			});

			const loginStub = sandbox.stub();
			const stream = new Stream();

			stream.embed = {
				login: loginStub
			};

			stream.authenticateUser()
				.then(() => {
					proclaim.isTrue(loginStub.calledWith('fake-jwt'));
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
				sandbox.stub(utils, 'fetchJsonWebToken').resolves({
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
				sandbox.stub(utils, 'fetchJsonWebToken').resolves({
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

