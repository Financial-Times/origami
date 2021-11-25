/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import fixtures from '../../helpers/fixtures.js';
import Stream from '../../../src/js/stream.js';
import displayName from '../../../src/js/utils/display-name.js';

export default function init () {
	let validationStub;

	beforeEach(() => {
		fixtures.streamMarkup();
		validationStub = sinon.stub();
		sinon.stub(displayName, 'validation').get(() => validationStub);
		validationStub.rejects();
	});

	afterEach(() => {
		fixtures.reset();
		sinon.restore();
	});

	it("calls .renderComments", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sinon.stub();
		const authStub = sinon.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		return stream.init()
			.then(() => {
				proclaim.isTrue(renderStub.calledOnce);
			});
	});

	it("calls .authenticateUser", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sinon.stub();
		const authStub = sinon.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		return stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
			});

	});

	it("calls .authenticateUser with display name", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl, {
			displayName: 'test-name'
		});
		const renderStub = sinon.stub();
		const authStub = sinon.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		validationStub.resolves('test-name');

		return stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
				proclaim.equal('test-name', authStub.args[0][0]);
			});

	});

	it("calls .authenticateUser with display name as undefined", () => {
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const renderStub = sinon.stub();
		const authStub = sinon.stub();
		stream.authenticateUser = authStub;
		stream.renderComments = renderStub;

		return stream.init()
			.then(() => {
				proclaim.isTrue(authStub.calledOnce);
				proclaim.isTrue(authStub.calledWith(undefined));
			});

	});

	it("calls .login", () => {
		sinon.stub(Stream.prototype, 'renderComments').resolves();
		sinon.stub(Stream.prototype, 'authenticateUser').resolves();
		const mockStreamEl = document.querySelector('[data-o-comments-article-id="id"]');
		const stream = new Stream(mockStreamEl);
		const loginStub = sinon.stub();
		stream.login = loginStub;

		return stream.init()
			.then(() => {
				proclaim.isTrue(loginStub.calledOnce);
			});
	});
}
