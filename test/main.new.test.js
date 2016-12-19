/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const oToggle = require('./../main');

describe("oToggle", () => {

	describe("init behaviour", () => {

		describe("where a config object is passed in", () => {

			let testToggle;
			let callbackFunction;
			let targetEl;
			let targetStub;
			let toggleEl;
			let toggleConfig;

			beforeEach(() => {
				fixtures.imperativeMarkup();

				callbackFunction = sinon.stub();
				targetEl = document.querySelector('.imperativeTestTarget');

				toggleEl = document.querySelector('[data-o-component="o-toggle"]');
				toggleConfig = {callback: callbackFunction, target: targetEl};
			});

			afterEach(() => {
				fixtures.reset();
				callbackFunction.reset();
			});

			it("sets a callback to the one passed in", () => {
				testToggle = new oToggle(toggleEl, toggleConfig);
				proclaim.equal(testToggle.callback, callbackFunction);
			});

			it("sets the target to the one is passed in", () => {
				testToggle = new oToggle(toggleEl, toggleConfig);
				proclaim.equal(testToggle.targetEl, targetEl);
			});
		});

		/* the rest of the tests use the declarative set up */

		describe("where no config object is passed in", () => {
			let toggleEl;

			beforeEach(() => {
				fixtures.declarativeMarkup();
				toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("sets a callback if one is set declaratively on the element", () => {
				let testToggle = new oToggle(toggleEl);
				proclaim.isTypeOf(testToggle.callback, 'function');
			});

			it("does not set a callback if one isn't declaratively set on the toggleEl", () => {
				toggleEl.removeAttribute("data-o-toggle-callback");
				let testToggle = new oToggle(toggleEl);
				proclaim.isTypeOf(testToggle.callback, 'undefined');
			});

			it("sets the target if one is set declaratively on the element", () => {
				let testToggle = new oToggle(toggleEl);
				let targetEl = document.querySelector('.declarativeTestTarget');

				proclaim.equal(testToggle.targetEl, targetEl);
			});

			it("does not set up a toggle if it has the data-o-toggle--js class", () => {
				toggleEl.setAttribute('data-o-toggle--js');
				let testToggle = new oToggle(toggleEl);

				proclaim.isTypeOf(testToggle.callback, 'undefined');
				proclaim.isTypeOf(testToggle.targetEl, 'undefined');
			});

			it("adds the new toggle to the _toggles map", () => {
				let testToggle = new oToggle(toggleEl);
				proclaim.equal(oToggle._toggles.get(testToggle.targetEl)[0], testToggle);
			});

			it("adds the new toggle to the _toggles map if the target already exists", () => {
				fixtures.reset();
				fixtures.twoTogglesOneTarget();

				const toggleEl1 = document.getElementById("testToggle1");
				const toggleEl2 = document.getElementById("testToggle2");

				let testToggle1 = new oToggle(toggleEl1);
				proclaim.isTrue(oToggle._toggles.has(testToggle1.targetEl));
				proclaim.equal(oToggle._toggles.get(testToggle1.targetEl)[0], testToggle1);

				// Now add another toggle with the same target
				let testToggle2 = new oToggle(toggleEl2);
				proclaim.equal(oToggle._toggles.get(testToggle2.targetEl)[1], testToggle2);
				proclaim.equal(testToggle2.targetEl, testToggle1.targetEl);
			});

			it("adds a role=button if the toggle element is a link", () => {
				fixtures.reset();
				fixtures.toggleAsALink();
				let linkToggleEl = document.getElementById("linkToggle");
				proclaim.isFalse(linkToggleEl.hasAttribute('role'));

				let linkToggle = new oToggle(linkToggleEl);
				proclaim.equal(linkToggleEl.getAttribute('role'), 'button');

			});

			it("sets aria-expanded to false on the toggle", () => {
				let testToggle = new oToggle(toggleEl);
				proclaim.isTrue(toggleEl.hasAttribute('aria-expanded'));
				proclaim.equal(toggleEl.getAttribute('aria-expanded'), 'false');

			});

			it("sets aria-hidden to true on the target", () => {
				let testToggle = new oToggle(toggleEl);
				proclaim.isTrue(testToggle.targetEl.hasAttribute('aria-hidden'));
				proclaim.equal(testToggle.targetEl.getAttribute('aria-hidden'), 'true');
			});

			it("sets 'data-o-toggle--js' to true", () => {
				let testToggle = new oToggle(toggleEl);
				proclaim.isTrue(toggleEl.hasAttribute('data-o-toggle--js'));
			});
		});
	});

	describe("#destroy", () => {
		it("removes the event listener from the toggle");
		it("removes aria-expanded from the toggle");
		it("removes the aria role from the toggle");
		it("removes the data-o-toggle--js from the toggle");
		it("removes the aria-hidden attribute from the target");
		it("removes the callback, targetEl and toggleEl");

	});

	describe("#toggle", () => {
		it("sets aria-expanded to the value of state on every toggle for this target");
		it("sets aria-hidden on this.target to = state");
		it("if an event is passed in, calls preventDefault on it");

		describe("when a callback is defined", () => {
			it("calls the callback with 'open' if the state is true");
			it("calls the callback with 'close' if the state is false");
			it("calls the callback with the event");
		});
	});
});
