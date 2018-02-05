const { expect } = require('chai').use(require('dirty-chai'));

const subject = require('../js/map-content-to-topper');

describe('Topper content map', () => {
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

		context('a button which has the correct settings applied according to flags', () => {

			it('does not have enhanced behaviour if onboardingMessaging flag is not present', (done) => {
				const topper = subject({}, {});
				done();
			});

			it('does not have enhanced behaviour if onboardingMessaging parameter is not set', (done) => {
				const topper = subject({}, { onboardingMessaging:  undefined } );
				done();
			});

			it('does have enhanced behaviour if onboardingMessaging parameter set', () => {
				const topper = subject({}, { onboardingMessaging: 'followPlusEmailDigestTooltip' } );
			});

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
			genreConcept: { id: 'e569e23b-0c3e-3d20-8ed0-4c17b8177c05'},
			containedIn: []
		};

		const opinionArticleInPackage = {
			genreConcept: { id: 'e569e23b-0c3e-3d20-8ed0-4c17b8177c05'},
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

});
