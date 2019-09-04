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

	describe("token exists", () => {
		it("calls this.embed.login", () => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const embedLoginStub = sandbox.stub();

			const stream = new Stream(mockStreamEl);

			stream.token = '12345';
			stream.embed = {
				login: embedLoginStub
			}

			stream.login();

			proclaim.isTrue(embedLoginStub.calledOnce);
		});
	});

	describe("token doesn't exists", () => {
		it("this.embed.login isn't called", () => {
			const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
			const embedLoginStub = sandbox.stub();

			const stream = new Stream(mockStreamEl);

			stream.embed = {
				login: embedLoginStub
			}

			stream.login();

			proclaim.isFalse(embedLoginStub.called);
		});
	});
};
