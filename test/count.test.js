/* eslint-env mocha */
import * as assert from 'proclaim';
import * as fixtures from './helpers/fixtures';
import fetchMock from 'fetch-mock';
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

	describe("._fetchCount()", () => {
		afterEach(() => {
				fetchMock.reset();
		});

		describe("when the API returns a valid JSON", () => {
			beforeEach(() => {
				fetchMock.mock('https://comments-api.ft.com/story/count/article-id', {
					commentCount: 10
				});
			});

			it("returns the comment count", () => {
				return Count.prototype._fetchCount('article-id')
					.then(count => assert.equal(count, 10));
			});
		});

		describe("when the API responds with an error", () => {
			beforeEach(() => {
				fetchMock.mock('https://comments-api.ft.com/story/count/article-id', 500)
			});

			it("will throw an error", () => {
				return Count.prototype._fetchCount('article-id')
					.then(() => {
						throw new Error('This should never happen, its just here to make sure the .then is never entered');
					}).catch((error) => {
						assert.include(error.message, 'Error with fetching comment count:');
					});
			});
		});
	});
});
