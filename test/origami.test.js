/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import oToggle from './../main';

describe("oToggle", () => {
	it('is defined', () => {
		proclaim.equal(typeof oToggle, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof oToggle.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(oToggle, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(oToggle, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("initialisation", () => {

		beforeEach(() => {
			// declarative callback
			window.myCallback = () => { };
			fixtures.declarativeMarkup('myCallback');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("creates an array of oToggles when passed no arguments", () => {
			const toggles = oToggle.init();
			for (const toggle of toggles) {
				proclaim.equal(toggle instanceof oToggle, true);
			}
		});

		it("creates an array of Toggles limited to the selector when a selector is passed in", () => {
			const toggles = oToggle.init('.declarativeToggleContainer');
			for (const toggle of toggles) {
				proclaim.equal(toggle instanceof oToggle, true);
			}
			proclaim.equal(toggles.length, document.querySelector('.declarativeToggleContainer').querySelectorAll('[data-o-component="o-toggle"]').length);
		});
	});
});
