/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import * as fixtures from './helpers/fixtures.js';
import ButtonsExperimental from '../main.js';

describe("ButtonsExperimental", () => {
	it('is defined', () => {
		proclaim.equal(typeof ButtonsExperimental, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof ButtonsExperimental.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(ButtonsExperimental, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispatched", () => {
		const initSpy = sinon.spy(ButtonsExperimental, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-buttons-experimental", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = ButtonsExperimental.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof ButtonsExperimental, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = ButtonsExperimental.init('#element');
			proclaim.equal(boilerplate instanceof ButtonsExperimental, true);
		});
	});
});
