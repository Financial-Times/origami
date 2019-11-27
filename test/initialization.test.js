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

	it('should be collapsed by default', (done) => {
		fixtures.simple();
		// init all expanders on the page
		const expanders = Expander.init();
		setTimeout(function () {
			// check each are collapsed by default
			expanders.forEach(e => {
				proclaim.isTrue(e.isCollapsed());
			});
			done();
		}, 100);
	});

	it('should be expanded by default given the expanded modifier class is applied', (done) => {
		fixtures.simple();
		const expanderContentElements = document.querySelectorAll('[data-o-component="o-expander"]');
		// add the expanded class to non-hidden expanders
		[].slice.apply(expanderContentElements)
			.filter(e => e.getAttribute('data-o-expander-shrink-to') !== 'hidden')
			.forEach(e => e.querySelector('.o-expander__content').classList.add('o-expander__content--expanded'));
		// add the aria-hidden=false attribute to hidden expanders
		[].slice.apply(expanderContentElements)
			.filter(e => e.getAttribute('data-o-expander-shrink-to') === 'hidden')
			.forEach(e => e.querySelector('.o-expander__content').setAttribute('aria-hidden', 'false'));
		// init all expanders on the page
		const expanders = Expander.init();
		setTimeout(function () {
			// check each are expanded
			expanders.forEach(e => {
				proclaim.isFalse(e.isCollapsed());
			});
			done();
		}, 100);
	});
});
