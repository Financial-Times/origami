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

	describe('.renderSignedInMessage', () => {
		it("creates a div tag for the 'Signed in as' message", () => {
			sandbox.stub(Stream.prototype, 'renderComments').resolves();
			sandbox.stub(Stream.prototype, 'authenticateUser').resolves();
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);

			return stream.init()
				.then(() => {
					const divTag = document.querySelector('.o-comments__signed-in-container');
					proclaim.isTrue(!!divTag);
				});
		});

		it("renders the correct display name within the 'Signed in as' message", () => {
			sandbox.stub(Stream.prototype, 'renderComments').resolves();
			sandbox.stub(Stream.prototype, 'authenticateUser').resolves();
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);
			stream.displayName = 'fake-display-name';

			return stream.init()
				.then(() => {
					const divTag = document.querySelector('.o-comments__signed-in-text--inner');
					proclaim.equal(divTag.innerHTML, 'fake-display-name');
				});
		});
	});
};

