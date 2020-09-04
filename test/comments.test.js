/* eslint-env mocha */
/* global proclaim sinon */
import fetchMock from 'fetch-mock';
import * as fixtures from './helpers/fixtures.js';
import Comments from '../src/js/comments.js';
import Count from '../src/js/count.js';
import Stream from '../src/js/stream.js';

describe("Comments", () => {
	it("is defined", () => {
		proclaim.isFunction(Comments);
		proclaim.throws(Comments, TypeError);
	});

	describe("new Comments(rootEl, opts)", () => {
		describe(".options", () => {
			let mockDataAttributeOptions;
			let mockRootEl;

			beforeEach(() => {
				mockDataAttributeOptions = {
					isMockDataAttributeOptions: true
				};

				sinon.stub(Stream.prototype, 'init');
				sinon.stub(Comments, 'getDataAttributes').returns(mockDataAttributeOptions);
				sinon.stub(Count.prototype, 'renderCount').callsFake(() => true);

				fixtures.countMarkup();

				mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
				new Comments(mockRootEl);
			});

			afterEach(() => {
				fixtures.reset();
				sinon.restore();
			});

			it("fetches options set via HTML data attributes", () => {
				sinon.assert.calledOnce(Comments.getDataAttributes);
				sinon.assert.calledWithExactly(Comments.getDataAttributes, mockRootEl);
			});
		});
	});

	describe("when 'data-o-comments-count' is set to true", () => {
		let comments;

		beforeEach(() => {
			fixtures.countMarkup();
			sinon.stub(Count.prototype, 'renderCount');
			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sinon.restore();
			fixtures.reset();
		});

		it("returns the new count instance", () => {
			proclaim.isInstanceOf(comments, Count);
		});

		it("exposes the renderCount method", () => {
			proclaim.isInstanceOf(comments.renderCount, Function);
		});
	});

	describe("when 'data-o-comments-count' is set to false", () => {
		let comments;

		beforeEach(() => {
			fixtures.streamMarkup();
			sinon.stub(Stream.prototype, 'init');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sinon.restore();
			fixtures.reset();
		});

		it("returns the new Stream instance", () => {
			proclaim.isInstanceOf(comments, Stream);
		});

		['init', 'authenticateUser', 'renderComments', 'publishEvent']
			.forEach(method => it(`exposes the ${method} method`, () => {
				proclaim.isInstanceOf(comments[method], Function);
			}));
	});

	describe("when 'data-o-comments-use-staging-environment' is set to true", () => {
		let comments;

		beforeEach(() => {
			fixtures.useStagingEnvironmentMarkup();
			sinon.stub(Count.prototype, 'renderCount');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sinon.restore();
			fixtures.reset();
		});

		it("initializes Stream with staging environment option set to true", () => {
			proclaim.isTrue(comments.useStagingEnvironment);
		});
	});

	describe("when 'data-o-comments-use-staging-environment' is set to false", () => {
		let comments;

		beforeEach(() => {
			fixtures.doNotUseStagingEnvironmentMarkup();
			sinon.stub(Count.prototype, 'renderCount');

			const mockRootEl = document.querySelector('[data-o-comments-article-id="id"]');
			comments = new Comments(mockRootEl);
		});

		afterEach(() => {
			sinon.restore();
			fixtures.reset();
		});

		it("initializes Stream with staging environment option set to false", () => {
			proclaim.isFalse(comments.useStagingEnvironment);
		});
	});

	describe('Comments.getCount', () => {
		beforeEach(() => {
			fetchMock.mock('begin:https://comments-api.ft.com/story/count/', {
				commentCount: 4
			});
		});

		afterEach(() => {
			fetchMock.reset();
		});

		it('returns a promise', () => {
			proclaim.isInstanceOf(Comments.getCount(), Promise);
		});

		describe('getting the count is successful', () => {
			it('returns a integer', (done) => {
				Comments.getCount('article-id')
					.then(count => {
						try {
							proclaim.isNumber(count);
							proclaim.equal(count, 4);
							done();
						} catch (error) {
							done(error);
						}
					});
			});
		});

		describe('getting the count is unsuccessful', () => {
			beforeEach(() => {
				fetchMock.mock('begin:https://comments-api.ft.com/story/count/',
					500,
					{
						overwriteRoutes: true
					}
				);
			});

			afterEach(() => {
				fetchMock.reset();
			});

			it('returns a rejected promise', (done) => {
				Comments.getCount('article-id')
					.then(() => {
						done(new Error('should have rejected the promise but instead it was resolved'));
					})
					.catch(() => {
						done();
					});
			});
		});
	});
});
