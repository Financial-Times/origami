/* eslint-env mocha */
/* global proclaim */

import * as fixtures from './helpers/fixtures';

import Expander from './../main';

describe("Expander", () => {
	describe("createCustom", () => {

		let customConfig;

		beforeEach(() => {
			customConfig = {
				shrinkTo: 3,
				selectors: {
					toggle: '.my-expander__toggle',
					content: '.my-expander__content',
					item: '.my-expander__content > li',
				},
				classnames: {
					initialized: 'my-expander--initialized',
					inactive: 'my-expander--inactive',
					expanded: 'my-expander__content--expanded',
					collapsed: 'my-expander__content--collapsed',
					collapsibleItem: 'my-expander__collapsible-item'
				}
			};
		});

		it('should error when `expanderElement` is not an Element', () => {
			// Setup test.
			fixtures.custom();
			// Miss the expander element which should be the first argument.
			proclaim.throws(() => {
				Expander.createCustom(customConfig);
			}, /Element/);
		});

		it('should error when `optios` is not an object', () => {
			// Setup test.
			fixtures.custom();
			// Select expander.
			const expanderElement = document.getElementById('expander');
			// Don't pass the `opts` object.
			proclaim.throws(() => {
				Expander.createCustom(expanderElement);
			}, /object/);
		});

		it('should error when required `classnames` are not configured', () => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			// Init custom expander, with missing config.
			delete customConfig.classnames.collapsibleItem;
			proclaim.throws(() => {
				Expander.createCustom(expanderElement, customConfig);
			}, /Expected the following "classnames"/);
		});

		it('should error when required `selectors` are not configured', () => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			// Init custom expander, with missing config.
			delete customConfig.selectors.item;
			proclaim.throws(() => {
				Expander.createCustom(expanderElement, customConfig);
			}, /Expected the following "selectors"/);
		});

		it('`classnames.collapsibleItem` and `selectors.item` are not required when `shrinkTo` is a number.', () => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			// Init custom expander without config which is only required when
			// `shrinkTo` is set to a number.
			customConfig.shrinkTo = 'height';
			delete customConfig.classnames.collapsibleItem;
			delete customConfig.classnames.item;
			try {
				Expander.createCustom(expanderElement, customConfig);
			} catch (error) {
				throw new Error(`createCustom threw an unexpected error: ${error.message}`);
			}
		});

		it('should toggle a collapsed expander with custom selectors and classnames', (done) => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			const expanderContentElement = document.getElementById('expander-content');
			// Init custom expander.
			Expander.createCustom(expanderElement, customConfig);
			// Assert collapsed classes applied.
			setTimeout(function () {
				const classnames = customConfig.classnames;
				// Custom collapsed class applied to the expander content.
				proclaim.isTrue(
					expanderContentElement.classList.contains(classnames.collapsed),
					`Custom collapsed class was not applied to the expander content.`
				);
				// Custom initialised class applied to the expander.
				proclaim.isTrue(
					expanderElement.classList.contains(classnames.initialized),
					`Custom initialised class was not applied to the expander.`
				);
				// Custom inactive and expanded classes not applied, this test
				// expander is active and collapsed.
				proclaim.isFalse(
					expanderElement.classList.contains(classnames.inactive),
					'Custom inactive class was applied, but an active ' +
					'expander was expected.'
				);
				proclaim.isFalse(
					expanderContentElement.classList.contains(classnames.expanded),
					'Custom expanded class was applied, but a collapsed ' +
					'expander was expected.'
				);
				// Custom `collapsibleItem` class has been applied, to items
				// within the expander which can collapse.
				const collapsableItems = expanderElement.querySelectorAll(`.${classnames.collapsibleItem}`);
				const allItems = expanderElement.querySelectorAll('li');
				const expectedLength = allItems.length - customConfig.shrinkTo;
				proclaim.equal(
					collapsableItems.length,
					expectedLength,
					`Did not apply the custom collapsible item  class to ` +
					`the expected number of items. Found ${collapsableItems.length} ` +
					`expected ${expectedLength}.`
				);
				done();
			}, 100);
		});

		it('should toggle an expanded expander with custom selectors and classnames', (done) => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			const expanderContentElement = document.getElementById('expander-content');
			// Init custom expander.
			const myExpander = Expander.createCustom(expanderElement, customConfig);
			myExpander.expand();
			// Assert expanded classes applied.
			setTimeout(function () {
				const classnames = customConfig.classnames;
				// Custom collapsed class applied to the expander content.
				proclaim.isTrue(
					expanderContentElement.classList.contains(classnames.expanded),
					`Custom expanded class was not applied to the expander content.`
				);
				// Custom initialised class applied to the expander.
				proclaim.isTrue(
					expanderElement.classList.contains(classnames.initialized),
					`Custom initialised class was not applied to the expander.`
				);
				// Custom inactive and collapsed classes not applied, this test
				// expander is active and expanded.
				proclaim.isFalse(
					expanderElement.classList.contains(classnames.inactive),
					'Custom inactive class was applied, but an active ' +
					'expander was expected.'
				);
				proclaim.isFalse(
					expanderContentElement.classList.contains(classnames.collapsed),
					'Custom collapsed class was applied, but an expanded ' +
					'expander was expected.'
				);
				done();
			}, 100);
		});

		it('should add a custom inactive class to an inactive expander', (done) => {
			// Setup test.
			fixtures.custom();
			// Select and init expander.
			const expanderElement = document.getElementById('expander');
			// Init custom expander.
			// The `shrinkTo` value is far higher than the number of items,
			// so there is nothing to expand. The expander is inactive.
			customConfig.shrinkTo = 300;
			Expander.createCustom(expanderElement, customConfig);
			// Assert inactive class applied.
			setTimeout(function () {
				const classnames = customConfig.classnames;
				// Custom initialised and collapsed classes applied to the expander.
				proclaim.isTrue(
					expanderElement.classList.contains(classnames.inactive),
					`Custom inactive class was not applied.`
				);
				done();
			}, 100);
		});


	});
});
