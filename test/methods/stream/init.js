import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';
import * as displayName from '../../../src/js/utils/display-name';

const sandbox = sinon.createSandbox();
let validationStub;

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
		validationStub = sandbox.stub(displayName, 'validation');
		validationStub.rejects();
	});

	afterEach(() => {
		fixtures.reset();
		sandbox.restore();
	});

	it("calls .renderComments", (done) => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		stream.init()
			.then(() => {
				proclaim.isTrue(renderStub.calledOnce);
				done();
			});
	});

	it("calls .authenticateUser", (done) => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
				done();
			});

	});

	it("calls .authenticateUser with display name", (done) => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl, {
			displayName: 'test-name'
		});
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		validationStub.resolves('test-name');

		stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
				proclaim.isTrue(authStub.calledWith('test-name'));

				done();
			});

	});

	it("calls .authenticateUser with display name as undefined", (done) => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
				proclaim.isTrue(authStub.calledWith(undefined));

				done();
			});

	});

	it("calls .login", (done) => {
		sandbox.stub(Stream.prototype, 'renderComments').resolves();
		sandbox.stub(Stream.prototype, 'authenticateUser').resolves();
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const loginStub = sandbox.stub();
		stream.login = loginStub;

		stream.init()
			.then(() => {
				proclaim.isTrue(loginStub.calledOnce);
				done();
			});
	});
};

