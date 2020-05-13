/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from './helpers/fixtures';
import fetchMock from 'fetch-mock';
import Count from '../src/js/count';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe("Count", () => {
	it("is defined", () => {
		proclaim.isFunction(Count);
		proclaim.throws(Count, TypeError);
	});

	describe(".renderCount()", () => {
		describe("when element exists", () => {
			describe("when initialized without staging option", () => {
				beforeEach(() => {
					sinon.stub(Count, 'fetchCount').withArgs('id').resolves(10);
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
						.then(() => proclaim.equal(count.countEl.innerHTML, 10));
				});
			});

			describe("when the comment count is 1", () => {
				beforeEach(() => {
					sinon.stub(Count, 'fetchCount').withArgs('id').resolves(1);
					fixtures.countMarkup();
				});

				afterEach(() => {
					fixtures.reset();
					Count.fetchCount.restore();
				});

				it("doesn't pluralise the text in the aria-label", () => {
					const mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
					const count = new Count(mockCountEl, {
						articleId: 'id'
					});

					return count.renderCount()
						.then(() => {
							const countLabel = count.countEl.getAttribute('aria-label');
							proclaim.equal(countLabel, 'There is 1 comment, click to go to the comment section.');
						});
				});
			});

			describe("when the comment count is greater than 1", () => {
				beforeEach(() => {
					sinon.stub(Count, 'fetchCount').withArgs('id').resolves(10);
					fixtures.countMarkup();
				});

				afterEach(() => {
					fixtures.reset();
					Count.fetchCount.restore();
				});

				it("pluralises the text in the aria-label", () => {
					const mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
					const count = new Count(mockCountEl, {
						articleId: 'id'
					});

					return count.renderCount()
						.then(() => {
							const countLabel = count.countEl.getAttribute('aria-label');
							proclaim.equal(countLabel, 'There are 10 comments, click to go to the comment section.');
						});
				});
			});

			describe("when initialized with staging option", () => {
				beforeEach(() => {
					sinon.stub(Count, 'fetchCount').withArgs('id', true).resolves(20);
					fixtures.countMarkup();
				});

				afterEach(() => {
					fixtures.reset();
					Count.fetchCount.restore();
				});

				it("renders the count within the element", () => {
					const mockCountEl = document.querySelector('[data-o-comments-article-id="id"]');
					const count = new Count(mockCountEl, {
						articleId: 'id',
						useStagingEnvironment: true
					});

					return count.renderCount()
						.then(() => proclaim.equal(count.countEl.innerHTML, 20));
				});
			});
		});

		describe("when element does not exist", () => {
			let mockCountEl;

			it("will throw an error", () => {
				const count = new Count(mockCountEl, {
					articleId: 'id'
				});

				proclaim.throws(() => count.renderCount());
			});
		});

		describe("when element does not exist in the DOM", () => {
			it("will throw an error", () => {
				const element = document.createElement('div');
				const mockCountEl = element.querySelector('[data-o-comments-article-id="id"]');
				const count = new Count(mockCountEl, {
					articleId: 'id'
				});

				proclaim.throws(() => count.renderCount());
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
					.then(count => proclaim.equal(count, 10));
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
						proclaim.include(error.message, 'Error with fetching comment count:');
					});
			});
		});

		describe("when called for the staging environment", () => {
			beforeEach(() => {
				fetchMock.mock('https://comments-api.ft.com/story/count/article-id?staging=1', {
					commentCount: 20
				});
			});

			it("returns the comment count from staging", () => {
				const useStaging = true;
				return Count.fetchCount('article-id', useStaging)
					.then(count => proclaim.equal(count, 20));
			});
		});
	});
});
