/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import * as fixtures from './helpers/fixtures';

import Expander from './../main';

describe("Expander", () => {
	let expanderConfig;

	beforeEach(() => {
		expanderConfig = {
		};
	});

	it('should update the toogle\`s aria-pressed attribute but not it\'s text when "toggleState" is set to aria', (done) => {
		// Setup test.
		expanderConfig.toggleState = 'aria';
		fixtures.manualInit();
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, expanderConfig);
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
		expanderConfig.toggleState = 'none';
		fixtures.manualInit();
		// Select and init expander.
		const expanderElement = document.getElementById('expander');
		new Expander(expanderElement, expanderConfig);
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
		new Expander(expanderElement, expanderConfig);
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
});
