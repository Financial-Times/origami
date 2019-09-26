import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../../helpers/fixtures';
import Stream from '../../../src/js/stream';

const sandbox = sinon.createSandbox();

module.exports = () => {
	beforeEach(() => {
		fixtures.streamMarkup();
	});

	afterEach(() => {
		fixtures.reset();
		sandbox.restore();
	});

	it("calls .renderComments", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		stream.init();

		proclaim.isTrue(renderStub.calledOnce);
	});

	it("calls .authenticateUser", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const authStub = sandbox.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		stream.init();

		proclaim.isTrue(authStub.calledOnce);
	});
};

