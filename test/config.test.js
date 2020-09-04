/* eslint-env mocha */
/* global proclaim */

import * as fixtures from './helpers/fixtures.js';

import Expander from './../main.js';

describe("Expander", () => {

	it('should update the toogle\`s aria-pressed attribute but not it\'s text when "toggleState" is set to aria', (done) => {
		// Setup test.
		fixtures.manualInit();
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, {
			toggleState: 'aria'
		});
		// Confirm `toggleState` config works as expected.
		document.getElementById('expander-toggle').click();
		setTimeout(function(){
			const expanderToggle = document.getElementById('expander-toggle');
			proclaim.equal(
				expanderToggle.getAttribute('aria-expanded'),
				'true',
				'The aria-expanded attribute should "true" when "toggleState" is set to aria.'
			);
			proclaim.equal(
				expanderToggle.innerText,
				'default',
				'The toggle text should not be updated when "toggleState" is set to aria.'
			);
			done();
		}, 100);
	});

	it('should neither update the toogle\`s aria-pressed attribute or it\'s text when "toggleState" is set to none', (done) => {
		// Setup test.
		fixtures.manualInit();
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, {
			toggleState: 'none'
		});
		// Confirm `toggleState` config works as expected.
		document.getElementById('expander-toggle').click();
		setTimeout(function(){
			const expanderToggle = document.getElementById('expander-toggle');
			const ariaExpanded = expanderToggle.getAttribute('aria-expanded');
			const innerText = expanderToggle.innerText;
			proclaim.isNull(
				ariaExpanded,
				`The aria-expanded attribute was ${ariaExpanded} but should not be set when "toggleState" is set to none.`
			);
			proclaim.equal(
				innerText,
				'default',
				`The toggle text was ${innerText} but should not be updated when "toggleState" is set to none.`
			);
			done();
		}, 100);
	});

	it('should update both the toogle\`s aria-pressed attribute and it\'s text when "toggleState" is not configured', (done) => {
		// Setup test.
		fixtures.manualInit();
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, {});
		// Confirm `toggleState` config works as expected.
		document.getElementById('expander-toggle').click();
		setTimeout(function(){
			const expanderToggle = document.getElementById('expander-toggle');
			const ariaExpanded = expanderToggle.getAttribute('aria-expanded');
			const innerText = expanderToggle.innerText;
			proclaim.equal(
				ariaExpanded,
				'true',
				`The aria-expanded attribute was ${ariaExpanded} but should update when "toggleState" is not set.`
			);
			proclaim.notEqual(
				innerText,
				'default',
				`The toggle text was ${innerText} but should update on click when "toggleState" is not set.`
			);
			done();
		}, 100);
	});

	it('should apply the collapsable item class and aria-hidden attribute when "shrinkTo" is a number of items', (done) => {
		// Setup test.
		fixtures.manualInit();
		const shrinkTo = 3;
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, {
			shrinkTo
		});
		// Confirm `shrinkTo` config works as expected.
		document.getElementById('expander-toggle').click();
		setTimeout(function(){
			const collapsableItems = expanderElement.querySelectorAll('.o-expander__collapsible-item');
			const allItems = expanderElement.querySelectorAll('li');
			// Number of items with the collapsable class should be the total
			// number minus the number of items to shrink to.
			const expectedLength = allItems.length - shrinkTo;
			proclaim.equal(
				collapsableItems.length,
				expectedLength,
				`Did not apply the ".o-expander__collapsible-item" class to ` +
				`the expected number of items. Found ${collapsableItems.length} ` +
				`expected ${expectedLength}.`
			);
			collapsableItems.forEach(item => {
				proclaim.equal(item.getAttribute('aria-hidden'), 'false');
			});
			done();
		}, 100);
	});

	it('should apply the collapsable item class and aria-hidden attribute when "shrinkTo" is a number of items and `itemSelector` is "p"', (done) => {
		// Setup test.
		fixtures.numberItemSelector();
		const shrinkTo = 3;
		const itemSelector = 'p';
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, {
			shrinkTo,
			itemSelector
		});
		// Confirm `shrinkTo` config works as expected.
		document.getElementById('expander-toggle').click();
		setTimeout(function(){
			const collapsableItems = expanderElement.querySelectorAll('.o-expander__collapsible-item');
			const allItems = expanderElement.querySelectorAll(itemSelector);
			// Number of items with the collapsable class should be the total
			// number minus the number of items to shrink to.
			const expectedLength = allItems.length - shrinkTo;
			proclaim.equal(
				collapsableItems.length,
				expectedLength,
				`Did not apply the ".o-expander__collapsible-item" class to ` +
				`the expected number of items. Found ${collapsableItems.length} ` +
				`expected ${expectedLength}.`
			);
			collapsableItems.forEach(item => {
				proclaim.equal(item.getAttribute('aria-hidden'), 'false');
			});
			done();
		}, 100);
	});
});
