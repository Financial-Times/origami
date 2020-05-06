/* eslint-env mocha */
/* global proclaim */

import { mapContentToTopper as subject } from '../main';

describe('Topper content map', () => {
	const articleContentFixture = {
		containedIn : [{ id: 123}],
		package: {
			design: {
				theme: 'extra'
			}
		}
	};

	const articleExtraWideFixture = {
		containedIn : [{ id: 123}],
		package: {
			design: {
				theme: 'extra-wide'
			}
		}
	};

	context('sets up', () => {

		it('the regular article topper if the topper theme is unknown', () => {
			const topper = subject({topper: { theme: 'some-crazy-theme' }});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'paper');
			proclaim.deepEqual(topper.modifiers, ['basic']);
		});

		it('live blog toppers for standalone live blogs', () => {
			const topper = subject({ realtime: true, liveBlog: { status: 'inprogress' }});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'crimson');
		});

		it('the branded article topper', () => {
			const topper = subject({
				authorConcepts: [{
					attributes: [{
						key: 'headshot',
						value: 'boom'
					}]
				}],
				brandConcept: true
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.deepEqual(topper.modifiers, ['branded', 'has-headshot']);
		});

		it('the editorially selected topper if it exists — overrides backgroundColour', () => {
			const topper = subject({topper: { layout: 'full-bleed-offset' }});
			proclaim.isTrue(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'paper');
		});

		it('topper with paper background color if none is defined', () => {
			const topper = subject({topper: { layout: 'split-text-center' }});
			proclaim.equal(topper.backgroundColour, 'paper');
		});
	});

	context('Dark background setting', () => {
		it('returns true if the background is in the list of dark backgrounds', () => {
			const topper = subject(articleContentFixture);
			proclaim.equal(topper.backgroundColour, 'slate');
			proclaim.isTrue(topper.hasDarkBackground);
		});
		it('returns false if the background is not in the list of dark backgrounds', () => {
			const topper = subject({topper: { theme: 'some-crazy-theme' }});
			proclaim.equal(topper.backgroundColour, 'paper');
			proclaim.isFalse(topper.hasDarkBackground);
		});
	});

	context('Live News package - basic', () => {
		it('news package landing page', () => {
			const topper = subject({
				type: 'package',
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				design: { theme: 'basic' }
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'wheat');
		});

		it('first article in a news package', () => {
			const topper = subject({
				type: 'article',
				id: 123,
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				package: {
					contains: [ { id: 123 } ],
					design: { theme: 'basic' },
					annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				}
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'wheat');
		});

		it('second article in the news package is normal', () => {
			const topper = subject({
				type: 'article',
				id: 456,
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				package: {
					contains: [ { id: 123 }, { id: 456 }],
					design: { theme: 'extra' },
					annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				}
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'paper');
		});
	});

	context('Live News package - extra', () => {
		it('news package landing page', () => {
			const topper = subject({
				type: 'package',
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				design: { theme: 'extra' }
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'crimson');
		});

		it('first article in a news package', () => {
			const topper = subject({
				type: 'article',
				id: 123,
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				package: {
					contains: [ { id: 123 } ],
					design: { theme: 'extra' },
					annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				}
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'crimson');
		});

		it('second article in a news package is normal', () => {
			const topper = subject({
				type: 'article',
				id: 456,
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				package: {
					contains: [ { id: 123 }, { id: 456 }],
					design: { theme: 'extra' },
					annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				}
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'paper');
		});

		it('live blog in package also is crimson', () => {
			const topper = subject({
				type: 'article',
				id: 456,
				realtime: true,
				liveBlog: {},
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				package: {
					contains: [ { id: 123 }, { id: 456 }],
					design: { theme: 'extra' },
					annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				}
			});
			proclaim.notOk(topper.largeHeadline);
			proclaim.equal(topper.backgroundColour, 'crimson');
		});
	});

	context('package article', () => {
		it('applies slate offset topper if package theme is extra', () => {
			const topper = subject(articleContentFixture, {});
			proclaim.equal(topper.backgroundColour, 'slate');
			proclaim.isTrue(topper.largeHeadline);
		});

		it('applies slate offset topper to article if package theme is extra-wide', () => {
			const topper = subject(articleExtraWideFixture, {});
			proclaim.equal(topper.backgroundColour, 'slate');
			proclaim.isTrue(topper.largeHeadline);
			proclaim.equal(topper.modifiers[1], 'package-extra');
		});
	});


	context('opinion article', () => {
		const opinionArticleNotInPackage = {
			genreConcept: { id: '6da31a37-691f-4908-896f-2829ebe2309e'},
			containedIn: []
		};

		const opinionArticleInPackage = {
			genreConcept: { id: '6da31a37-691f-4908-896f-2829ebe2309e'},
			containedIn : [{ id: 123 }]
		};

		it('is a sky, branded topper', () => {
			const topper = subject(opinionArticleNotInPackage, {});
			proclaim.equal(topper.backgroundColour, 'sky');
			proclaim.isTrue(topper.isOpinion);
		});

		it('applies slate offset topper to article if package theme is extra-wide', () => {
			const topper = subject(opinionArticleInPackage, {});
			proclaim.equal(topper.backgroundColour, 'wheat');
			proclaim.isTrue(topper.isOpinion);
		});
	});

	context('custom brands', () => {
		it('applies background colours for custom brands', () => {
			const topper = subject({
				topper: {
					isBranded: true,
					backgroundColour: 'velvet',
				},
			});
			proclaim.equal(topper.layout, 'branded');
			proclaim.equal(topper.backgroundColour, 'velvet');
		});

		it('blends opinion with custom brands', () => {
			const topper = subject({
				genreConcept: { id: '6da31a37-691f-4908-896f-2829ebe2309e'},
				containedIn: [],
				topper: {
					isBranded: true,
					backgroundColour: 'velvet',
				},
			});
			proclaim.equal(topper.layout, 'branded');
			proclaim.equal(topper.backgroundColour, 'velvet');
			proclaim.isTrue(topper.isOpinion);
		});

		it('prefers editorial themes over custom brands', () => {
			const topper = subject({
				topper: {
					isBranded: true,
					backgroundColour: 'velvet',
					layout: 'full-bleed-offset',
				},
			});
			proclaim.equal(topper.backgroundColour, 'paper');
			proclaim.isTrue(topper.largeHeadline);
		});
	});
});
