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
});

