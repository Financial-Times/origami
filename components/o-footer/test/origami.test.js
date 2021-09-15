/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures.js';

import oFooter from './../main.js';

describe("oFooter", () => {
	it('is defined', () => {
		proclaim.equal(typeof oFooter, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof oFooter.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(oFooter, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(oFooter, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("initialisation", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("creates an instance of oFooter when passed no arguments", () => {
			const footer = oFooter.init();
			proclaim.equal(footer instanceof oFooter, true);
		});

		it("creates an instance of oFooter when passed a selector", () => {
			const footer = oFooter.init('#my-footer');
			proclaim.equal(footer instanceof oFooter, true);
		});
	});
});
