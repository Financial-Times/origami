/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import * as fixtures from './helpers/fixtures.js';
import MultiSelect from '../main.js';

describe("MultiSelect", () => {
	it('is defined', () => {
		proclaim.equal(typeof MultiSelect, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof MultiSelect.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(MultiSelect, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispatched", () => {
		const initSpy = sinon.spy(MultiSelect, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-multi-select", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = MultiSelect.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof MultiSelect, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = MultiSelect.init('#element');
			proclaim.equal(boilerplate instanceof MultiSelect, true);
		});
	});
});
