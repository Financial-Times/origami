import * as assert from 'proclaim';
import * as fixtures from './helpers/fixtures';
import sinon from 'sinon/pkg/sinon';
import Comments from '../src/js/comments';
import Count from '../src/js/count';
import Stream from '../src/js/stream';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Comments", () => {
	it("is defined", () => {
		assert.isFunction(Comments);
		assert.throws(Comments, TypeError);
	});

	describe("new Comments(rootEl, opts)", () => {
		describe(".options", () => {
			let mockDataAttributeOptions;
			let sandbox;
			let mockRootEl;

			beforeEach(() => {
				mockDataAttributeOptions = {
					isMockDataAttributeOptions: true
				};
				sandbox = sinon.createSandbox();
				sandbox.stub(Stream.prototype, 'init');
				sandbox.stub(Comments, 'getDataAttributes').returns(mockDataAttributeOptions);
				sandbox.stub(Count.prototype, 'renderCount').callsFake(() => true);

				fixtures.countMarkup();

				mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
				new Comments(mockRootEl);
			});

			afterEach(() => {
				fixtures.reset();
				sandbox.restore();
			});

			it("fetches options set via HTML data attributes", () => {
				assert.calledOnce(Comments.getDataAttributes);
				assert.calledWithExactly(Comments.getDataAttributes, mockRootEl);
			});
		});
	});

	describe("when 'data-o-comments-count' is set to true", () => {
		let comments;
		let sandbox;

		beforeEach(() => {
			fixtures.countMarkup();
			sandbox = sinon.createSandbox();
			sandbox.stub(Count.prototype, 'renderCount');
			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sandbox.restore();
			fixtures.reset();
		});

		it("returns the new count instance", () => {
			assert.isInstanceOf(comments, Count);
		});

		it("exposes the renderCount method", () => {
			assert.isInstanceOf(comments.renderCount, Function);
		});
	});

	describe("when 'data-o-comments-count' is set to false", () => {
		let comments;
		let sandbox;

		beforeEach(() => {
			fixtures.streamMarkup();
			sandbox = sinon.createSandbox();
			sandbox.stub(Stream.prototype, 'init');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sandbox.restore();
			fixtures.reset();
		});

		it("returns the new Stream instance", () => {
			assert.isInstanceOf(comments, Stream);
		});

		['init', 'authenticateUser', 'renderComments', 'publishEvent']
			.forEach(method => it(`exposes the ${method} method`, () => {
				assert.isInstanceOf(comments[method], Function);
			}));
	});

	describe("when 'data-o-comments-use-staging-environment' is set to true", () => {
		let comments;
		let sandbox;

		beforeEach(() => {
			fixtures.useStagingEnvironmentMarkup();
			sandbox = sinon.createSandbox();
			sandbox.stub(Count.prototype, 'renderCount');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sandbox.restore();
			fixtures.reset();
		});

		it("initializes Stream with staging environment option set to true", () => {
			assert.isTrue(comments.useStagingEnvironment);
		});
	});

	describe("when 'data-o-comments-use-staging-environment' is set to false", () => {
		let comments;
		let sandbox;

		beforeEach(() => {
			fixtures.doNotUseStagingEnvironmentMarkup();
			sandbox = sinon.createSandbox();
			sandbox.stub(Count.prototype, 'renderCount');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sandbox.restore();
			fixtures.reset();
		});

		it("initializes Stream with staging environment option set to false", () => {
			assert.isFalse(comments.useStagingEnvironment);
		});
	});
});

