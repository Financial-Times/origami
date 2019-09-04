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
		stream.renderComments = renderStub;

		stream.init();

		proclaim.isTrue(renderStub.calledOnce);
	});

	it("calls .getJsonWebToken", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sandbox.stub();
		const tokenStub = sandbox.stub();
		stream.getJsonWebToken = tokenStub;
		stream.renderComments = renderStub;

		stream.init();

		proclaim.isTrue(tokenStub.calledOnce);
	});

	describe(".getJsonWebToken returns no JSON Web Token", () => {
		it(".login is not called", () => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);

			const renderStub = sandbox.stub();
			const tokenStub = sandbox.stub();
			const loginStub = sandbox.stub();

			stream.getJsonWebToken = tokenStub.resolves();
			stream.renderComments = renderStub.resolves({});
			stream.login = loginStub;

			stream.init();

			proclaim.isTrue(loginStub.notCalled);
		});
	});

	describe(".renderComments returns empty", () => {
		it(".login is not called", () => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);

			const renderStub = sandbox.stub();
			const tokenStub = sandbox.stub();
			const loginStub = sandbox.stub();

			stream.getJsonWebToken = tokenStub.resolves({
				token: 'fake-token'
			});
			stream.renderComments = renderStub.resolves();
			stream.login = loginStub;

			stream.init();

			proclaim.isTrue(loginStub.notCalled);
		});
	});

	describe(".renderComments and .getJsonWebToken are successful", () => {
		it("calls .login", (done) => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const stream = new Stream(mockStreamEl);

			const renderStub = sandbox.stub();
			const tokenStub = sandbox.stub();
			const loginStub = sandbox.stub();

			stream.getJsonWebToken = tokenStub.resolves();
			stream.renderComments = renderStub.resolves();
			stream.login = loginStub;
			stream.token = 'fake-token';
			stream.embed = {};

			stream.init().
				then(() => {
					proclaim.isTrue(loginStub.calledOnce);
					done();
				});
		});
	});
};

