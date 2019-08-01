/* eslint-env mocha */
import * as assert from 'proclaim';
import * as fixtures from './helpers/fixtures';
import sinon from 'sinon/pkg/sinon';
import Count from '../src/js/count';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Count", () => {
	it("is defined", () => {
		assert.isFunction(Count);
		assert.throws(Count, TypeError);
	});

	describe("new Count(countEl, opts)", () => {
		let mockDataAttributeOptions;
		let mockCountEl;
		let count;

		beforeEach(() => {
			mockDataAttributeOptions = {
				isMockDataAttributeOptions: true
			};
			sinon.stub(Count, 'getDataAttributes').returns(mockDataAttributeOptions);
			fixtures.countMarkup();

			mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
			count = new Count(mockCountEl);
		});

		afterEach(() => {
			fixtures.reset();
			Count.getDataAttributes.restore();
		});

		it("fetches options set via HTML data attributes", () => {
			assert.calledOnce(Count.getDataAttributes);
			assert.calledWithExactly(Count.getDataAttributes, mockCountEl);
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
				assert.strictEqual(count.countEl, mockCountEl);
			});
		});
	});

	describe("._renderCount()", () => {
		describe("when element exists", () => {
			it("renders the count within the element", () => {
				sinon.stub(Count.prototype, '_fetchCount').returns(10);
				fixtures.countMarkup();

				const mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
				const count = new Count(mockCountEl);
				assert.equal(count.countEl.innerHTML, 10);

				fixtures.reset();
				Count.prototype._fetchCount.restore();
			});
		});

		describe("when element does not exist", () => {
			it("will throw an error", () => {
				assert.throws(() => new Count(), 'Element must be a HTMLElement');
			});
		});

		describe("when element does not exist in the DOM", () => {
			it("will throw an error", () => {
				const element = document.createElement('div');
				const mockCountEl = element.querySelector('[data-o-comments-article-id="id"]');

				assert.throws(() => new Count(mockCountEl), 'Element must be a HTMLElement');
			});
		});
	});
});
