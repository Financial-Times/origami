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
			let comments;

			beforeEach(() => {
				mockDataAttributeOptions = {
					isMockDataAttributeOptions: true
				};
				sandbox = sinon.createSandbox();
				sandbox.stub(Comments, 'getDataAttributes').returns(mockDataAttributeOptions);
				sandbox.stub(Count.prototype, 'renderCount').callsFake(() => true);

				fixtures.countMarkup();

				mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
				comments = new Comments(mockRootEl);
			});

			afterEach(() => {
				fixtures.reset();
				sandbox.restore();
			});

			it("fetches options set via HTML data attributes", () => {
				assert.calledOnce(Comments.getDataAttributes);
				assert.calledWithExactly(Comments.getDataAttributes, mockRootEl);
			});

			it("is a defaulted options object", () => {
				assert.isObject(comments.options);
				assert.deepEqual(comments.options, {
					isMockDataAttributeOptions: true
				});
				assert.notStrictEqual(comments.options, mockDataAttributeOptions);
			});
		});
	});

	describe("when 'data-o-comments-count' is set to true", () => {
		let count;

		beforeEach(() => {
			count = sinon.stub(Count.prototype, 'renderCount').callsFake(() => true);
			fixtures.countMarkup();
			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			new Comments(mockRootEl);
		});

		afterEach(() => {
			fixtures.reset();
			count.restore();
		});

		it("calls new Count", () => {
			assert.called(count);
		});
	});

	describe("when 'data-o-comments-count' is set to false", () => {
		let stream;

		beforeEach(() => {
			stream = sinon.stub(Stream.prototype, '_renderComments').callsFake(() => true);
			fixtures.streamMarkup();
			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			new Comments(mockRootEl);
		});

		afterEach(() => {
			fixtures.reset();
			stream.restore();
		});

		it("calls new Stream", () => {
			assert.called(stream);
		});
	});
});

