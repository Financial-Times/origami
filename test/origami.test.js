/* eslint-env mocha */
/* global proclaim sinon */

import fixtures from './helpers/fixtures';

import Tabs from '../main';

describe("Tabs", () => {
	it('is defined', () => {
		proclaim.equal(typeof Tabs, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Tabs.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Tabs, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Tabs, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.insertSimple();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const tab = Tabs.init();
			proclaim.equal(tab instanceof Array, true);
			proclaim.equal(tab[0] instanceof Tabs, true);
		});

		it("single component when initialized with a root element", () => {
			const tab = Tabs.init('#tab-element');
			proclaim.equal(tab instanceof Tabs, true);
		});
	});
});
