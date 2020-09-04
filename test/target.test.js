/* eslint-env mocha */
/* global proclaim sinon */

import OToggle from './../main.js';

describe("Target", () => {

	describe("init behaviour", () => {
		it("assigns the target el to the toggle target el", () => {
			const fakeToggle = {targetEl: 'testEl'};
			const target = new OToggle.Target(fakeToggle);

			proclaim.strictEqual(target.targetEl, fakeToggle.targetEl);
		});
	});

	describe("addToggle", () => {
		it("adds the toggle passed in to the toggles array", () => {
			const fakeToggle = {targetEl: 'testEl'};
			const target = new OToggle.Target(fakeToggle);

			proclaim.doesNotInclude(target.toggles, fakeToggle);

			target.addToggle(fakeToggle);

			proclaim.include(target.toggles, fakeToggle);
		});
	});

	describe("removeToggle", () => {
		it("removes the toggle passed in from its toggles array if its there", () => {
			const fakeToggle = {targetEl: 'testEl'};
			const target = new OToggle.Target(fakeToggle);
			sinon.stub(target, 'open');
			target.toggles = [fakeToggle];

			target.removeToggle(fakeToggle);

			proclaim.doesNotInclude(target.toggles, fakeToggle);
		});

		it("calls open on the target if the toggle was the last one that had control of the target", () => {
			const fakeToggle = {targetEl: 'testEl'};
			const target = new OToggle.Target(fakeToggle);
			const openStub = sinon.stub(target, 'open');
			target.toggles = [fakeToggle];

			target.removeToggle(fakeToggle);

			proclaim.doesNotInclude(target.toggles, fakeToggle);
			proclaim.isTrue(openStub.calledOnce);
		});

		it("does not call open on the target if there are other toggles that have control of the target too", () => {
			const fakeToggle = {targetEl: 'testEl'};
			const otherFakeToggle = {targetEl: 'testEl'};
			const target = new OToggle.Target(fakeToggle);
			const openStub = sinon.stub(target, 'open');

			target.toggles = [fakeToggle, otherFakeToggle];

			target.removeToggle(fakeToggle);

			proclaim.doesNotInclude(target.toggles, fakeToggle);
			proclaim.isFalse(openStub.calledOnce);
		});
	});

	describe("open", () => {
		it("sets aria-hidden to false on the target el", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			const target = new OToggle.Target(fakeToggle);

			proclaim.isFalse(target.targetEl.hasAttribute("aria-hidden"));

			target.open();

			proclaim.isTrue(target.targetEl.hasAttribute("aria-hidden"));
			proclaim.equal(target.targetEl.getAttribute("aria-hidden"), "false");
		});

		it("adds o-toggle--active to the target el", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			const target = new OToggle.Target(fakeToggle);

			proclaim.isFalse(target.targetEl.classList.contains("o-toggle--active"));

			target.open();

			proclaim.isTrue(target.targetEl.classList.contains("o-toggle--active"));
		});

		it("sets all of the toggles that control this target to be open", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl, open: ()=>{}};
			const fakeToggle2 = {targetEl: targetEl, open: ()=>{}};
			const toggleOpenSpy = sinon.spy(fakeToggle, 'open');
			const toggleOpenSpy2 = sinon.spy(fakeToggle2, 'open');
			const target = new OToggle.Target(fakeToggle);
			target.toggles = [fakeToggle, fakeToggle2];

			target.open();

			proclaim.isTrue(toggleOpenSpy.calledOnce);
			proclaim.isTrue(toggleOpenSpy2.calledOnce);
		});
	});

	describe("close", () => {
		it("sets aria-hidden to true on the target el", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			const target = new OToggle.Target(fakeToggle);
			target.open();

			proclaim.isTrue(target.targetEl.hasAttribute("aria-hidden"));
			proclaim.equal(target.targetEl.getAttribute("aria-hidden"), "false");

			target.close();

			proclaim.isTrue(target.targetEl.hasAttribute("aria-hidden"));
			proclaim.equal(target.targetEl.getAttribute("aria-hidden"), "true");
		});

		it("removes o-toggle--active from the target el", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			const target = new OToggle.Target(fakeToggle);
			target.open();

			proclaim.isTrue(target.targetEl.classList.contains("o-toggle--active"));

			target.close();

			proclaim.isFalse(target.targetEl.classList.contains("o-toggle--active"));
		});

		it("sets all of the toggles that control this target to be closed", () => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl, open: ()=>{}, close: ()=>{}};
			const fakeToggle2 = {targetEl: targetEl, open: ()=>{}, close: ()=>{}};
			const toggleOpenSpy = sinon.spy(fakeToggle, 'close');
			const toggleOpenSpy2 = sinon.spy(fakeToggle2, 'close');

			const target = new OToggle.Target(fakeToggle);
			target.toggles = [fakeToggle, fakeToggle2];

			target.close();

			proclaim.isTrue(toggleOpenSpy.calledOnce);
			proclaim.isTrue(toggleOpenSpy2.calledOnce);
		});
	});

	describe("toggle", () => {

		let target;

		beforeEach(() => {
			const targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			target = new OToggle.Target(fakeToggle);
		});

		it("calls close if isOpen returns true", ()=>{
			const isOpenSpy = sinon.stub(target, 'isOpen').returns(true);
			const openSpy = sinon.spy(target, 'open');
			const closeSpy = sinon.spy(target, 'close');

			target.toggle();

			proclaim.isTrue(isOpenSpy.calledOnce);
			proclaim.isTrue(closeSpy.calledOnce);
			proclaim.isFalse(openSpy.called);
		});

		it("calls open if isOpen returns false", () => {
			const isOpenSpy = sinon.stub(target, 'isOpen').returns(false);
			const openSpy = sinon.spy(target, 'open');
			const closeSpy = sinon.spy(target, 'close');

			target.toggle();

			proclaim.isTrue(isOpenSpy.calledOnce);
			proclaim.isTrue(openSpy.calledOnce);
			proclaim.isFalse(closeSpy.called);
		});
	});

	describe("isOpen", () => {
		let target;
		let targetEl;

		beforeEach(() => {
			targetEl = document.createElement("div");
			const fakeToggle = {targetEl: targetEl};
			target = new OToggle.Target(fakeToggle);
		});

		it("returns true if the target el classList contains o-toggle--active, false otherwise", () => {
			proclaim.isFalse(target.isOpen());
			target.targetEl.classList.add('o-toggle--active');
			proclaim.isTrue(target.isOpen());
			target.targetEl.classList.remove('o-toggle--active');
			proclaim.isFalse(target.isOpen());
		});
	});

});
