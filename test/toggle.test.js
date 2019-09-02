/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OToggle from './../main';

describe("oToggle", () => {

	describe("init behaviour", () => {

		describe("where a config object is passed in", () => {

			let testToggle;
			let callbackFunction;
			let targetEl;
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
				testToggle = new OToggle(toggleEl, toggleConfig);
				proclaim.equal(testToggle.callback, callbackFunction);
			});

			it("sets the target to the one is passed in", () => {
				testToggle = new OToggle(toggleEl, toggleConfig);
				proclaim.equal(testToggle.targetEl, targetEl);
			});
		});

		/* the rest of the tests use the declarative set up */

		describe("where no config object is passed in", () => {
			let toggleEl;

			beforeEach(() => {
				window.myCallback = () => { };
				fixtures.declarativeMarkup('myCallback');
				toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("sets a callback if one is set declaratively on the element", () => {
				let testToggle = new OToggle(toggleEl);

				proclaim.isTypeOf(testToggle.callback, 'function');
			});

			it("does not set a callback if one isn't declaratively set on the toggleEl", () => {
				toggleEl.removeAttribute("data-o-toggle-callback");
				let testToggle = new OToggle(toggleEl);

				proclaim.isTypeOf(testToggle.callback, 'undefined');
			});

			it("sets the targetEl if one is set declaratively on the element", () => {
				let testToggle = new OToggle(toggleEl);
				let targetEl = document.querySelector('.declarativeTestTarget');

				proclaim.equal(testToggle.targetEl, targetEl);
			});

			it("does not set up a toggle if it has the data-o-toggle--js class", () => {
				toggleEl.setAttribute('data-o-toggle--js', true);
				let testToggle = new OToggle(toggleEl);

				proclaim.isTypeOf(testToggle.callback, 'undefined');
				proclaim.isTypeOf(testToggle.targetEl, 'undefined');
			});

			it("creates a new target and adds it to the _targets map", () => {
				let targetSpy = sinon.spy(OToggle, "Target");
				let testToggle = new OToggle(toggleEl);

				proclaim.equal(targetSpy.called, true);

				const key = testToggle.targetEl;
				proclaim.isTrue(OToggle._targets.has(key));
				proclaim.equal(OToggle._targets.get(key), testToggle.target);
			});

			it("calls target.addToggle() if the target already exists in the _targets map", () => {
				fixtures.reset();
				fixtures.twoTogglesOneTarget();
				const toggleEl1 = document.getElementById("testToggle1");
				const toggleEl2 = document.getElementById("testToggle2");
				let testToggle1 = new OToggle(toggleEl1);
				let target = new OToggle.Target(testToggle1);
				let targetSpy = sinon.spy(target, "addToggle");
				OToggle._targets.set(testToggle1.targetEl, target);

				// Now add another toggle with the same target
				new OToggle(toggleEl2);

				proclaim.isTrue(targetSpy.calledOnce);
			});

			it("adds a role=button if the toggle element is a link", () => {
				fixtures.reset();
				fixtures.toggleAsALink();
				let linkToggleEl = document.getElementById("linkToggle");

				proclaim.isFalse(linkToggleEl.hasAttribute('role'));

				new OToggle(linkToggleEl);
				proclaim.equal(linkToggleEl.getAttribute('role'), 'button');

			});

			it("sets aria-expanded to false on the toggle", () => {
				new OToggle(toggleEl);

				proclaim.isTrue(toggleEl.hasAttribute('aria-expanded'));
				proclaim.equal(toggleEl.getAttribute('aria-expanded'), 'false');
			});

			it("sets aria-hidden to true on the target", () => {
				let testToggle = new OToggle(toggleEl);

				proclaim.isTrue(testToggle.targetEl.hasAttribute('aria-hidden'));
				proclaim.equal(testToggle.targetEl.getAttribute('aria-hidden'), 'true');
			});

			it("sets 'data-o-toggle--js' to true", () => {
				new OToggle(toggleEl);

				proclaim.isTrue(toggleEl.hasAttribute('data-o-toggle--js'));
			});
		});

		describe("where the contents of a function are set declaratively, instead of giving a function name", () => {
			let toggleEl;

			beforeEach(() => {
				let callback = `document.querySelector('.declarativeTestTarget').classList.toggle('hidden');`;
				fixtures.declarativeMarkup(callback);
				toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			});

			afterEach(() => {
				fixtures.reset();
			});

			it("it errors", (done) => {
				try {
					new OToggle(toggleEl);
				} catch (error) {
					done();
				}
				throw new Error('Did not error for an invalid callback.');
			});
		});
	});

	describe("#destroy", () => {
		let toggleEl;
		let testToggle;

		beforeEach(() => {
			fixtures.declarativeMarkup();
			toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			testToggle = new OToggle(toggleEl);
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("calls target.removeToggle on it's target", () => {
			let target = new OToggle.Target(testToggle);
			let targetSpy = sinon.spy(target, "removeToggle");
			testToggle.target = target;

			testToggle.destroy();

			proclaim.isTrue(targetSpy.called);
		});

		it("removes the event listener from the toggleEl", () => {
			let elSpy = sinon.spy(toggleEl, 'removeEventListener');
			testToggle.destroy();

			proclaim.isTrue(elSpy.called);
		});

		it("removes aria-expanded from the toggleEl", () => {
			let elSpy = sinon.spy(toggleEl, 'removeAttribute');

			proclaim.isTrue(testToggle.toggleEl.hasAttribute('aria-expanded'));

			testToggle.destroy();

			proclaim.isTrue(elSpy.calledWith('aria-expanded'));
		});

		it("removes the aria role from the toggleEl", () => {
			let elSpy = sinon.spy(toggleEl, 'removeAttribute');

			testToggle.destroy();

			proclaim.isTrue(elSpy.calledWith('role'));
		});

		it("removes the data-o-toggle--js from the toggleEl", () => {
			let elSpy = sinon.spy(toggleEl, 'removeAttribute');

			proclaim.isTrue(testToggle.toggleEl.hasAttribute('data-o-toggle--js'));

			testToggle.destroy();

			proclaim.isTrue(elSpy.calledWith('data-o-toggle--js'));
		});

		it("removes the callback, targetEl and toggleEl", () => {
			testToggle.destroy();
			proclaim.equal(testToggle.callback, undefined);
			proclaim.equal(testToggle.toggleEl, undefined);
			proclaim.equal(testToggle.target, undefined);
		});

	});

	describe("#toggle", () => {
		let testToggle;

		beforeEach(() => {
			// declarative callback
			window.myCallback = () => {
				document.querySelector('.declarativeTestTarget').classList.toggle('hidden');
			};
			fixtures.declarativeMarkup('myCallback');
			let toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			testToggle = new OToggle(toggleEl);
		});

		afterEach(() => {
			fixtures.reset();
		});


		it("calls target.toggle", () => {
			let target = new OToggle.Target(testToggle);
			let targetSpy = sinon.spy(target, "toggle");
			testToggle.target = target;

			testToggle.toggle();

			proclaim.isTrue(targetSpy.called);
		});

		it("calls preventDefault on if an event is passed in", () => {
			let target = new OToggle.Target(testToggle);
			testToggle.target = target;
			let event = new Event('click');
			let eventSpy = sinon.spy(event, "preventDefault");

			testToggle.toggle(event);

			proclaim.isTrue(eventSpy.called);
		});

		it("calls the callback if defined with the value 'open' if the target.isOpen is true", () => {
			let event = new Event('click');
			let target = new OToggle.Target(testToggle);
			testToggle.target = target;
			sinon.stub(target, "isOpen").returns(true);
			testToggle.callback = () => {};
			let callbackSpy = sinon.spy(testToggle, "callback");

			testToggle.toggle(event);

			proclaim.isTrue(callbackSpy.called);
			proclaim.isTrue(callbackSpy.withArgs('open', event).called);
		});

		it("calls the callback with `this` bound to the correct context (the toggle not the event)", () => {
			let target = new OToggle.Target(testToggle);
			testToggle.target = target;
			testToggle.callback = () => {};

			sinon.stub(target, "isOpen").returns(true);

			let callbackSpy = sinon.spy(testToggle, "callback");
			let toggleSpy = sinon.spy(testToggle, "toggle");

			testToggle.toggleEl.addEventListener('customEvent', testToggle.toggle);
			testToggle.toggleEl.dispatchEvent(new CustomEvent('customEvent'));

			proclaim.isTrue(toggleSpy.calledOnce);
			proclaim.isTrue(callbackSpy.calledOnce);

		});

		it("calls the callback if defined with the value 'close' if the target.isOpen is false", () => {
			let event = new Event('click');
			let target = new OToggle.Target(testToggle);
			testToggle.target = target;
			sinon.stub(target, "isOpen").returns(false);
			testToggle.callback = () => {};
			let callbackSpy = sinon.spy(testToggle, "callback");

			testToggle.toggle(event);

			proclaim.isTrue(callbackSpy.called);
			proclaim.isTrue(callbackSpy.withArgs('close', event).called);
		});

		it("does not call a callback if none is defined", () => {
			let target = new OToggle.Target(testToggle);
			testToggle.target = target;
			let callbackSpy = sinon.spy(testToggle, "callback");
			testToggle.callback = undefined;

			testToggle.toggle();

			proclaim.isFalse(callbackSpy.called);
		});
	});

	describe("open", () => {
		it("sets aria-expanded to true", () => {
			fixtures.declarativeMarkup();
			let toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			const testToggle = new OToggle(toggleEl);
			testToggle.toggleEl.setAttribute('aria-expanded', 'false');
			proclaim.isTrue(testToggle.toggleEl.hasAttribute("aria-expanded"));
			proclaim.equal(testToggle.toggleEl.getAttribute("aria-expanded"), 'false');

			testToggle.open();

			proclaim.isTrue(testToggle.toggleEl.hasAttribute("aria-expanded"));
			proclaim.equal(testToggle.toggleEl.getAttribute("aria-expanded"), 'true');
		});
	});

	describe("close", () => {
		it("sets aria-expanded to false", () => {
			fixtures.declarativeMarkup();
			let toggleEl = document.querySelector('[data-o-component="o-toggle"]');
			const testToggle = new OToggle(toggleEl);
			testToggle.toggleEl.setAttribute('aria-expanded', 'true');
			proclaim.isTrue(testToggle.toggleEl.hasAttribute("aria-expanded"));
			proclaim.equal(testToggle.toggleEl.getAttribute("aria-expanded"), 'true');

			testToggle.close();
			proclaim.equal(testToggle.toggleEl.getAttribute("aria-expanded"), 'false');
		});
	});
});
