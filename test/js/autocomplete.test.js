/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from './helpers/fixtures.js';
import Autocomplete from '../../main.js';

describe("Autocomplete", () => {
	it('is defined', () => {
		proclaim.equal(typeof Autocomplete, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Autocomplete.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Autocomplete, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Autocomplete, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-autocomplete", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = Autocomplete.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof Autocomplete, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = Autocomplete.init('#element');
			proclaim.equal(boilerplate instanceof Autocomplete, true);
		});
	});
});