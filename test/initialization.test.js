/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import Expander from './../main';

describe("Expander", () => {
	it('is defined', () => {
		proclaim.equal(typeof Expander, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Expander.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Expander, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Expander, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.simple();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const expander = Expander.init();
			proclaim.equal(expander instanceof Array, true);
			proclaim.equal(expander[0] instanceof Expander, true);
		});

		it("single component when initialized with a root element", () => {
			const expander = Expander.init('#element');
			proclaim.equal(expander instanceof Expander, true);
		});
	});
});
