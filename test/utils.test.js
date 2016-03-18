/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');
const sinon = require('sinon/pkg/sinon');

const Utils = require('./../src/js/utils');

describe('Utils API', () => {

	it("is defined", () => {
		expect(Utils).to.be.a('function');
	});

	it('has a destroy instance method', () => {
		expect(Utils.prototype.destroy).to.be.a('function');
	});

	it('has a selectableHandler instance method', () => {
		expect(Utils.prototype.selectableHandler).to.be.a('function');
	});

	it('has a subNavToggleHandler instance method', () => {
		expect(Utils.prototype.subNavToggleHandler).to.be.a('function');
	});

	it('has a toggleHandler instance method', () => {
		expect(Utils.prototype.toggleHandler).to.be.a('function');
	});

	it('has a isOutside static method', () => {
		expect(Utils.isOutside).to.be.a('function');
	});
});

describe('Utils instance', () => {
	let containerEl;

	before(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
	});

	after(() => {
		containerEl = null;
	});

	it('constructor', () => {
		const utils = new Utils(containerEl);
		expect(utils).to.be.a('object');
		expect(Object.getPrototypeOf(utils)).to.equal(Utils.prototype);
		expect(utils.listeners).to.be.a('array');
		expect(utils.navOpenClass).to.be('o-header--mega-nav-open');
		expect(utils.headerEl).to.be(containerEl);
	});

	it('#destroy', () => {
		const utils = new Utils(containerEl);
		expect(utils.listeners.length).to.be(0);
		utils.destroy();
		expect(utils.listeners).to.be(undefined);
		expect(utils.navOpenClass).to.be(undefined);
		expect(utils.headerEl).to.be(undefined);
	});

	it('#isOutside', () => {
		expect(Utils.isOutside(containerEl, document.body)).to.be(false);
		expect(Utils.isOutside(document.body, containerEl)).to.be(true);
	});

	describe('selectables', () => {
		let selectableEls;

		beforeEach(() => {
			containerEl.innerHTML = `
				<div data-o-header-selectable></div>
				<div data-o-header-selectable></div>
			`;
			selectableEls = containerEl.querySelectorAll('[data-o-header-selectable]');
		});

		afterEach(() => {
			for (let selectableEl of selectableEls) {
				containerEl.removeChild(selectableEl);
			}
			selectableEls = null;
		});

		it('adds and removes event listeners to selectables', () => {
			// Adding
			const realAddEventListener = Element.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			Element.prototype.addEventListener = addEventListenerSpy;

			const utils = new Utils(containerEl);

			expect(utils.listeners.length).to.be(2);
			expect(addEventListenerSpy.calledOn(selectableEls[0])).to.be(true);
			expect(addEventListenerSpy.calledOn(selectableEls[1])).to.be(true);

			const selectableEventAndHandler = addEventListenerSpy.args[0];
			expect(selectableEventAndHandler[0]).to.be('click');
			expect(selectableEventAndHandler[1]).to.be(utils.selectableHandler);

			// Removing
			const realRemoveEventListener = Element.prototype.removeEventListener;
			const removeEventListenerSpy = sinon.spy();
			Element.prototype.removeEventListener = removeEventListenerSpy;

			utils.destroy();

			expect(removeEventListenerSpy.calledOn(selectableEls[0])).to.be(true);
			expect(removeEventListenerSpy.calledOn(selectableEls[1])).to.be(true);

			expect(removeEventListenerSpy.calledWith(...selectableEventAndHandler)).to.be(true);

			// Cleanup
			Element.prototype.addEventListener = realAddEventListener;
			Element.prototype.removeEventListener = realRemoveEventListener;
		});

		it('#selectableHandler', () => {
			const utils = new Utils(containerEl);
			utils.selectableHandler({
				currentTarget: selectableEls[0]
			});
			expect(selectableEls[0].getAttribute('aria-selected')).to.be('true');
			expect(selectableEls[1].getAttribute('aria-selected')).to.be('false');
		});
	});

	describe('subNavToggle', () => {
		let navEl;

		beforeEach(() => {
			containerEl.innerHTML = `
				<div data-o-header-togglable-nav></div>
			`;
			navEl = containerEl.querySelector('[data-o-header-togglable-nav]');
		});

		afterEach(() => {
			containerEl.removeChild(navEl);
			navEl = null;
		});

		it('adds and removes event listeners to togglables', () => {
			// Adding
			const realAddEventListener = Element.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			Element.prototype.addEventListener = addEventListenerSpy;

			const utils = new Utils(containerEl);

			expect(utils.listeners.length).to.be(1);
			expect(addEventListenerSpy.calledOn(navEl)).to.be(true);

			const navEventAndHandler = addEventListenerSpy.args[0];
			expect(navEventAndHandler[0]).to.be('click');
			expect(navEventAndHandler[1]).to.be(utils.subNavToggleHandler);

			// Removing
			const realRemoveEventListener = Element.prototype.removeEventListener;
			const removeEventListenerSpy = sinon.spy();
			Element.prototype.removeEventListener = removeEventListenerSpy;

			utils.destroy();

			expect(removeEventListenerSpy.calledOn(navEl)).to.be(true);

			expect(removeEventListenerSpy.calledWith(...navEventAndHandler)).to.be(true);

			// Cleanup
			Element.prototype.addEventListener = realAddEventListener;
			Element.prototype.removeEventListener = realRemoveEventListener;
		});

		it('#subNavToggleHandler', () => {
			const utils = new Utils(containerEl);
			expect(document.documentElement.classList.contains('o-header--mega-nav-open')).to.be(false);
			expect(document.body.classList.contains('o-header--mega-nav-open')).to.be(false);

			utils.subNavToggleHandler();
			expect(document.documentElement.classList.contains('o-header--mega-nav-open')).to.be(true);
			expect(document.body.classList.contains('o-header--mega-nav-open')).to.be(true);
		});
	});

	describe('togglables', () => {
		let togglableEls;

		beforeEach(() => {
			containerEl.innerHTML = `
				<div data-o-header-togglable></div>
				<div data-o-header-togglable></div>
			`;
			togglableEls = containerEl.querySelectorAll('[data-o-header-togglable]');
		});

		afterEach(() => {
			for (let togglableEl of togglableEls) {
				containerEl.removeChild(togglableEl);
			}
			togglableEls = null;
		});

		it('adds and removes event listeners to togglables', () => {
			// Adding
			const realAddEventListener = Element.prototype.addEventListener;
			const addEventListenerSpy = sinon.spy();
			Element.prototype.addEventListener = addEventListenerSpy;

			const utils = new Utils(containerEl);

			expect(utils.listeners.length).to.be(2);
			expect(addEventListenerSpy.calledOn(togglableEls[0])).to.be(true);
			expect(addEventListenerSpy.calledOn(togglableEls[1])).to.be(true);

			const toggleEventAndHandler = addEventListenerSpy.args[0];
			expect(toggleEventAndHandler[0]).to.be('click');
			expect(toggleEventAndHandler[1]).to.be(utils.toggleHandler);

			// Removing
			const realRemoveEventListener = Element.prototype.removeEventListener;
			const removeEventListenerSpy = sinon.spy();
			Element.prototype.removeEventListener = removeEventListenerSpy;

			utils.destroy();

			expect(removeEventListenerSpy.calledOn(togglableEls[0])).to.be(true);
			expect(removeEventListenerSpy.calledOn(togglableEls[1])).to.be(true);

			expect(removeEventListenerSpy.calledWith(...toggleEventAndHandler)).to.be(true);

			// Cleanup
			Element.prototype.addEventListener = realAddEventListener;
			Element.prototype.removeEventListener = realRemoveEventListener;
		});

		it('#toggleHandler', () => {
			const utils = new Utils(containerEl);
			utils.toggleHandler({
				currentTarget: togglableEls[0]
			});
			expect(togglableEls[0].getAttribute('aria-pressed')).to.be('true');

			utils.toggleHandler({
				currentTarget: togglableEls[0]
			});
			expect(togglableEls[0].getAttribute('aria-pressed')).to.be('false');
		});
	});
});
