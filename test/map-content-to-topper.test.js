const { expect } = require('chai').use(require('dirty-chai'));

const subject = require('../main').mapContentToTopper;

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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('paper');
			expect(topper.modifiers).to.deep.equal(['basic']);
		});

		it('live blog toppers for standalone live blogs', () => {
			const topper = subject({ realtime: true, liveBlog: { status: 'inprogress' }});
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('crimson');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.modifiers).to.deep.equal(['branded', 'has-headshot']);
		});

		it('the editorially selected topper if it exists — overrides backgroundColour', () => {
			const topper = subject({topper: { layout: 'full-bleed-offset' }});
			expect(topper.largeHeadline).to.be.true();
			expect(topper.backgroundColour).to.equal('paper');
		});

		it('topper with paper background color if none is defined', () => {
			const topper = subject({topper: { layout: 'split-text-center' }});
			expect(topper.backgroundColour).to.equal('paper');
		});
	});

	context('Dark background setting', () => {
		it('returns true if the background is in the list of dark backgrounds', () => {
			const topper = subject(articleContentFixture);
			expect(topper.backgroundColour).to.equal('slate');
			expect(topper.hasDarkBackground).to.equal(true);
		});
		it('returns false if the background is not in the list of dark backgrounds', () => {
			const topper = subject({topper: { theme: 'some-crazy-theme' }});
			expect(topper.backgroundColour).to.equal('paper');
			expect(topper.hasDarkBackground).to.equal(false);
		});
	});

	context('Live News package - basic', () => {
		it('news package landing page', () => {
			const topper = subject({
				type: 'package',
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				design: { theme: 'basic' }
			});
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('wheat');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('wheat');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('paper');
		});
	});

	context('Live News package - extra', () => {
		it('news package landing page', () => {
			const topper = subject({
				type: 'package',
				annotations: [{prefLabel: 'Barcelona' }, { prefLabel: 'News' }],
				design: { theme: 'extra' }
			});
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('crimson');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('crimson');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('paper');
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
			expect(topper.largeHeadline).not.to.be.true();
			expect(topper.backgroundColour).to.equal('crimson');
		});
	});

	context('package article', () => {
		it('applies slate offset topper if package theme is extra', () => {
			const topper = subject(articleContentFixture, {});
			expect(topper.backgroundColour).to.equal('slate');
			expect(topper.largeHeadline).to.be.true();
		});

		it('applies slate offset topper to article if package theme is extra-wide', () => {
			const topper = subject(articleExtraWideFixture, {});
			expect(topper.backgroundColour).to.equal('slate');
			expect(topper.largeHeadline).to.be.true();
			expect(topper.modifiers[1]).to.equal('package-extra');
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
			expect(topper.backgroundColour).to.equal('sky');
			expect(topper.isOpinion).to.be.true();
		});

		it('applies slate offset topper to article if package theme is extra-wide', () => {
			const topper = subject(opinionArticleInPackage, {});
			expect(topper.backgroundColour).to.equal('wheat');
			expect(topper.isOpinion).to.be.true();
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
			expect(topper.layout).to.equal('branded');
			expect(topper.backgroundColour).to.equal('velvet');
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
			expect(topper.layout).to.equal('branded');
			expect(topper.backgroundColour).to.equal('velvet');
			expect(topper.isOpinion).to.be.true();
		});

		it('prefers editorial themes over custom brands', () => {
			const topper = subject({
				topper: {
					isBranded: true,
					backgroundColour: 'velvet',
					layout: 'full-bleed-offset',
				},
			});
			expect(topper.backgroundColour).to.equal('paper');
			expect(topper.largeHeadline).to.be.true();
		});
	});
});
