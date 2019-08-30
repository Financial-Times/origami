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

	describe(".renderCount()", () => {
		describe("when element exists", () => {
			beforeEach(() => {
				sinon.stub(Count, 'fetchCount').resolves(10);
				fixtures.countMarkup();
			});

			afterEach(() => {
				fixtures.reset();
				Count.fetchCount.restore();
			});

			it("renders the count within the element", () => {
				const mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
				const count = new Count(mockCountEl, {
					articleId: 'id'
				});

				return count.renderCount()
					.then(() => assert.equal(count.countEl.innerHTML, 10));
			});
		});

		describe("when element does not exist", () => {
			let mockCountEl;

			it("will throw an error", () => {
				const count = new Count(mockCountEl, {
					articleId: 'id'
				});

				assert.throws(() => count.renderCount());
			});
		});

		describe("when element does not exist in the DOM", () => {
			it("will throw an error", () => {
				const element = document.createElement('div');
				const mockCountEl = element.querySelector('[data-o-comments-article-id="id"]');
				const count = new Count(mockCountEl, {
					articleId: 'id'
				});

				assert.throws(() => count.renderCount());
			});
		});
	});

	describe(".fetchCount()", () => {
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
				return Count.fetchCount('article-id')
					.then(count => assert.equal(count, 10));
			});
		});

		describe("when the API responds with an error", () => {
			beforeEach(() => {
				fetchMock.mock('https://comments-api.ft.com/story/count/article-id', 500);
			});

			it("will throw an error", () => {
				return Count.fetchCount('article-id')
					.then(() => {
						throw new Error('This should never happen, its just here to make sure the .then is never entered');
					}).catch((error) => {
						assert.include(error.message, 'Error with fetching comment count:');
					});
			});
		});
	});
});
