/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import * as fixtures from './helpers/fixtures.js';
import PrivateFoundation from '../main.js';

describe("PrivateFoundation", () => {
	it('is defined', () => {
		proclaim.equal(typeof PrivateFoundation, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof PrivateFoundation.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(PrivateFoundation, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispatched", () => {
		const initSpy = sinon.spy(PrivateFoundation, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-private-foundation", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = PrivateFoundation.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof PrivateFoundation, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = PrivateFoundation.init('#element');
			proclaim.equal(boilerplate instanceof PrivateFoundation, true);
		});
	});
});
