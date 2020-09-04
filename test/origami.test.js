/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures.js';

import Tooltip from './../main.js';

describe("Tooltip", () => {
	it('is defined', () => {
		proclaim.equal(typeof Tooltip, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Tooltip.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Tooltip, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Tooltip, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.declarativeCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const tooltip = Tooltip.init();
			proclaim.equal(tooltip instanceof Array, true);
			proclaim.equal(tooltip[0] instanceof Tooltip, true);
		});

		it("single component when initialized with a root element", () => {
			const tooltip = Tooltip.init('#tooltip-demo');
			proclaim.equal(tooltip instanceof Tooltip, true);
		});
	});
});
