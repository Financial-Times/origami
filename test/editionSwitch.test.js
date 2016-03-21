/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');
const sinon = require('sinon/pkg/sinon');

const EditionSwitch = require('./../src/js/editionSwitch');

describe('EditionSwitch API', () => {

	it("is defined", () => {
		expect(EditionSwitch).to.be.a('function');
	});

	it('has a destroy instance method', () => {
		expect(EditionSwitch.prototype.destroy).to.be.a('function');
	});

	it('has a toggle instance method', () => {
		expect(EditionSwitch.prototype.toggle).to.be.a('function');
	});

	it('has a click instance method', () => {
		expect(EditionSwitch.prototype.click).to.be.a('function');
	});
});

describe('EditionSwitch instance', () => {
	let editionSwitchEl;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<div class="o-header__edition-switch">
				<button class="o-header__edition-switch-button" aria-controls="o-header__edition-switch-container" aria-expanded="false" data-o-header-edition-switch-button>UK Edition</button>
				<ul class="o-header__edition-switch-container" id="o-header__edition-switch-container" aria-hidden="true">
					<li><a href="#" class="o-header__edition-switch-link">International Edition</a></li>
				</ul>
			</div>
		`;
		editionSwitchEl = containerEl.querySelector('.o-header__edition-switch');
	});

	afterEach(() => {
		containerEl.removeChild(editionSwitchEl);
		editionSwitchEl = null;
		containerEl = null;
	});

	it('constructor', () => {
		const editionSwitch = new EditionSwitch(containerEl);
		expect(editionSwitch).to.be.a('object');
		expect(Object.getPrototypeOf(editionSwitch)).to.equal(EditionSwitch.prototype);
		expect(editionSwitch.editionSwitchEl).to.be(editionSwitchEl);
		expect(editionSwitch.editionSwitchContainerEl).to.be(editionSwitchEl.querySelector('#o-header__edition-switch-container'));
		expect(editionSwitch.btnEl).to.be(editionSwitchEl.querySelector('[data-o-header-edition-switch-button]'));
		expect(editionSwitch.openClass).to.be('o-header__edition-switch--open');
		expect(editionSwitch.toggleHandler).to.be.a('function');
		expect(editionSwitch.clickHandler).to.be.a('function');
	});

	it('#destroy', () => {
		const editionSwitch = new EditionSwitch(containerEl);
		expect(editionSwitch.editionSwitchEl).to.be(editionSwitchEl);
		editionSwitch.destroy();
		expect(editionSwitch.editionSwitchEl).to.be(undefined);
		expect(editionSwitch.editionSwitchContainerEl).to.be(undefined);
		expect(editionSwitch.btnEl).to.be(undefined);
		expect(editionSwitch.openClass).to.be(undefined);
		expect(editionSwitch.toggleHandler).to.be(undefined);
		expect(editionSwitch.clickHandler).to.be(undefined);
	});

	it('#toggle', () => {
		const editionSwitch = new EditionSwitch(containerEl);
		expect(editionSwitch.isOpen).to.be(false);
		expect(editionSwitch.btnEl.getAttribute('aria-expanded')).to.be('false');
		expect(editionSwitch.editionSwitchContainerEl.getAttribute('aria-hidden')).to.be('true');

		editionSwitch.toggle();
		expect(editionSwitch.isOpen).to.be(true);
		expect(editionSwitch.btnEl.getAttribute('aria-expanded')).to.be('true');
		expect(editionSwitch.editionSwitchContainerEl.getAttribute('aria-hidden')).to.be('false');
	});

	it('#click', () => {
		const toggleFunction = EditionSwitch.prototype.toggle;
		const toggleSpy = sinon.spy();
		EditionSwitch.prototype.toggle = toggleSpy;

		const editionSwitch = new EditionSwitch(containerEl);
		editionSwitch.click();
		expect(toggleSpy.callCount).to.be(0);

		editionSwitch.isOpen = true;
		editionSwitch.click({
			target: editionSwitch.btnEl
		});
		expect(toggleSpy.callCount).to.be(0);

		editionSwitch.click({
			target: document.body
		});
		expect(toggleSpy.callCount).to.be(1);

		EditionSwitch.prototype.toggle = toggleFunction;
	});

	it('adds and removes event listeners to toggle and body', () => {
		// Adding
		const realAddEventListener = Element.prototype.addEventListener;
		const addEventListenerSpy = sinon.spy();
		Element.prototype.addEventListener = addEventListenerSpy;

		const editionSwitch = new EditionSwitch(containerEl);

		expect(addEventListenerSpy.calledOn(editionSwitch.btnEl)).to.be(true);
		expect(addEventListenerSpy.calledOn(document.body)).to.be(true);

		const toggleEventAndHandler = addEventListenerSpy.args[0];
		expect(toggleEventAndHandler[0]).to.be('click');
		expect(toggleEventAndHandler[1]).to.be(editionSwitch.toggleHandler);
		const bodyEventAndHandler = addEventListenerSpy.args[1];
		expect(bodyEventAndHandler[0]).to.be('click');
		expect(bodyEventAndHandler[1]).to.be(editionSwitch.clickHandler);

		// Removing
		const realRemoveEventListener = Element.prototype.removeEventListener;
		const removeEventListenerSpy = sinon.spy();
		Element.prototype.removeEventListener = removeEventListenerSpy;

		editionSwitch.destroy();

		expect(removeEventListenerSpy.calledOn(addEventListenerSpy.thisValues[0])).to.be(true);
		expect(removeEventListenerSpy.calledOn(document.body)).to.be(true);

		expect(removeEventListenerSpy.calledWith(...toggleEventAndHandler)).to.be(true);
		expect(removeEventListenerSpy.calledWith(...bodyEventAndHandler)).to.be(true);

		// Cleanup
		Element.prototype.addEventListener = realAddEventListener;
		Element.prototype.removeEventListener = realRemoveEventListener;
	});


});
