/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OMeter from './../main';

describe("OMeter", () => {
	it('is defined', () => {
		proclaim.equal(typeof OMeter, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof OMeter.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(OMeter, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(OMeter, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = OMeter.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof OMeter, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = OMeter.init('#element');
			proclaim.equal(boilerplate instanceof OMeter, true);
		});
	});
});