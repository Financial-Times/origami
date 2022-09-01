/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import * as fixtures from './helpers/fixtures.js';
import Example from '../main.js';

describe("Example", () => {
	it('is defined', () => {
		proclaim.equal(typeof Example, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Example.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Example, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Example, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-example", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = Example.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof Example, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = Example.init('#element');
			proclaim.equal(boilerplate instanceof Example, true);
		});
	});


	describe("with a button", () => {

		beforeEach(() => {
		// Add our component markup to the DOM
			fixtures.htmlCode();
		});

		afterEach(() => {
		// Remove our component markup from the DOM
			fixtures.reset();
		});

		it("should increment the count on click", () => {
		// initialise o-example on fixture markup
			const oExample = Example.init('#element');
			// find and click the button
			const button = document.querySelector('button');
			button.click();
			// confirm the count has incremented
			const actual = oExample.count;
			const expected = 1;
			proclaim.equal(actual, expected, `Expected count to equal ${expected} given a single button click.`);
		});

		it("should display the new count on click", () => {
		// initialise o-example on fixture markup
			Example.init('#element');
			// find and click the button
			const button = document.querySelector('button');
			button.click();
			// confirm the new count is reflected in the DOM
			const countElement = document.querySelector('[data-o-example-current-count]');
			const actual = countElement.textContent;
			const expected = '1';
			proclaim.include(
				actual,
				expected,
				`Expected the new count to display in the component.`
			);
		});
	});
});

