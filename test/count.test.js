/* eslint-env mocha */
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import {CommentCount} from '../main';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("CommentCount", () => {
	it("exports a class constructor", () => {
		assert.isFunction(CommentCount);
		assert.throws(CommentCount, TypeError);
	})

	describe("new CommentCount(countEl, opts)", () => {
		let mockDataAttributeOptions;
		let mockCountElement;
		let count;

		beforeEach(() => {
			mockDataAttributeOptions = {
				isMockDataAttributeOptions: true
			};
			sinon.stub(CommentCount, 'getDataAttributes').returns(mockDataAttributeOptions);

			const element = document.createElement('div');
			element.innerHTML = '<div data-o-component=o-comments-count" data-o-comments-count-article-id="id"></div>';
			mockCountElement = element.querySelector('[data-o-comments-count-article-id="id"]');

			count = new CommentCount(mockCountElement);
		});

		afterEach(() => {
			CommentCount.getDataAttributes.restore();
		});

		it("fetches options set via HTML data attributes", () => {
			assert.calledOnce(CommentCount.getDataAttributes);
			assert.calledWithExactly(CommentCount.getDataAttributes, mockCountElement);
		});

		describe(".options", () => {
			it("is a defaulted options object", () => {
				assert.isObject(count.options);
				assert.deepEqual(count.options, {
					isMockDataAttributeOptions: true
				});
				assert.notStrictEqual(count.options, mockDataAttributeOptions);
			});
		});

		describe(".countEl", () => {
			it("is set to the `countElement` that was passed into the constructor", () => {
				assert.strictEqual(count.countEl, mockCountElement);
			});
		});
	});

	describe("._renderCount()", () => {
		describe("when element exists", () => {
			it("renders the count within the element", () => {
				sinon.stub(CommentCount.prototype, '_fetchCount').returns(10);

				const element = document.createElement('div');
				element.innerHTML = '<div data-o-component="o-comments-count" data-o-comments-count-article-id="id"></div>';
				const mockCountElement = element.querySelector('[data-o-comments-count-article-id="id"]');

				const count = new CommentCount(mockCountElement);

				assert.equal(count.countEl.innerHTML, 10);

				CommentCount.prototype._fetchCount.restore();
			});
		});

		describe("when element does not exist", () => {
			it("will throw an error", () => {
				assert.throws(() => new CommentCount(), 'Element must be a HTMLElement');
			});
		});

		describe("when element does not exist in the DOM", () => {
			it("will throw an error", () => {
				const element = document.createElement('div');
				element.innerHTML = '<div data-o-component="o-comments-count"></div>';
				const mockCountElement = element.querySelector('[data-o-comments-count-article-id="id"]');

				assert.throws(() => new CommentCount(mockCountElement), 'Element must be a HTMLElement');
			});
		});
	});
});
