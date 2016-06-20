/*global describe,beforeEach,afterEach,it*/

import expect from 'expect.js';
import sinon from 'sinon/pkg/sinon';

import Toggle from './../main';

describe('Toggle', () => {

	let testToggle;
	let toggleEl;
	let targetEl;
	let callbackFunc;

	beforeEach(() => {
		toggleEl = document.createElement('button');
		targetEl = document.createElement('div');
		document.body.appendChild(toggleEl);
		document.body.appendChild(targetEl);
		callbackFunc = sinon.spy();
		testToggle = new Toggle(toggleEl, {
			target: targetEl,
			callback: callbackFunc
		});
	});

	afterEach(() => {
		document.body.removeChild(toggleEl);
		document.body.removeChild(targetEl);
		testToggle = null;
		toggleEl = null;
		targetEl = null;
		callbackFunc = null;
		Toggle._toggles = {};
	});

	it('constructor', () => {
		expect(typeof Toggle).to.be('function');
		expect(testToggle instanceof Toggle).to.be(true);
	});

	it('instantiates', () => {
		expect(testToggle.targetEl).to.be(targetEl);
		expect(testToggle.toggleEl).to.be(toggleEl);
		expect(testToggle.callback).to.be(callbackFunc);

		expect(Toggle._toggles[targetEl]).to.contain(testToggle);
		expect(toggleEl.hasAttribute('data-o-toggle--js')).to.be(true);
		expect(toggleEl.getAttribute('role')).to.not.be('button');
		expect(toggleEl.getAttribute('aria-expanded')).to.be('false');
		expect(targetEl.getAttribute('aria-hidden')).to.be('true');
	});

	it('#init', () => {
		expect(typeof Toggle.init).to.be('function');

		const contextEl = document.createElement('div');
		contextEl.classList.add('toggle-context');
		const toggleEl2 = document.createElement('button');
		toggleEl2.setAttribute('data-o-component', 'o-toggle');
		const toggleEl3 = document.createElement('button');
		toggleEl3.setAttribute('data-o-component', 'o-toggle');
		contextEl.appendChild(toggleEl2);
		contextEl.appendChild(toggleEl3);
		document.body.appendChild(contextEl);

		Toggle.init('.toggle-context', {
			target: targetEl
		});

		expect(Toggle._toggles[targetEl]).to.contain(testToggle);
		expect(Toggle._toggles[targetEl].length).to.be(3);

		document.body.removeChild(contextEl);
	});

	it('#toggle', () => {
		expect(typeof Toggle.prototype.toggle).to.be('function');

		const contextEl = document.createElement('div');
		contextEl.classList.add('toggle-context');
		const toggleEl2 = document.createElement('button');
		toggleEl2.setAttribute('data-o-component', 'o-toggle');
		contextEl.appendChild(toggleEl2);
		document.body.appendChild(contextEl);

		Toggle.init(contextEl, {
			target: targetEl
		});


		testToggle.toggle();

		expect(targetEl.classList.contains('o-toggle--active')).to.be(true);
		expect(toggleEl.getAttribute('aria-expanded')).to.be('true');
		expect(toggleEl2.getAttribute('aria-expanded')).to.be('true');
		expect(targetEl.getAttribute('aria-hidden')).to.be('false');
		expect(callbackFunc.calledOnce).to.be(true);
		expect(callbackFunc.calledWith('open', undefined)).to.be(true);

		testToggle.toggle();

		expect(targetEl.classList.contains('o-toggle--active')).to.be(false);
		expect(toggleEl.getAttribute('aria-expanded')).to.be('false');
		expect(toggleEl2.getAttribute('aria-expanded')).to.be('false');
		expect(targetEl.getAttribute('aria-hidden')).to.be('true');
		expect(callbackFunc.calledTwice).to.be(true);
		expect(callbackFunc.calledWith('close', undefined)).to.be(true);

		document.body.removeChild(contextEl);
	});

	it('#destroy', () => {
		expect(typeof Toggle.prototype.destroy).to.be('function');

		testToggle.destroy();

		expect(toggleEl.hasAttribute('data-o-toggle--js')).to.be(false);
		expect(toggleEl.hasAttribute('role')).to.be(false);
		expect(toggleEl.hasAttribute('aria-expanded')).to.be(false);
		expect(targetEl.hasAttribute('aria-hidden')).to.be(false);
		expect(testToggle.targetEl).to.be(undefined);
		expect(testToggle.toggleEl).to.be(undefined);
		expect(testToggle.callback).to.be(undefined);
		expect(Toggle._toggles[targetEl]).to.not.contain(testToggle);
	});

	it('can instantiate declaratively', () => {
		const toggleEl2 = document.createElement('button');
		toggleEl2.setAttribute('data-o-toggle-target', 'div');
		toggleEl2.setAttribute('data-o-toggle-callback', 'console.log("test");');
		document.body.appendChild(toggleEl2);

		const testToggle2 = new Toggle(toggleEl2);
		expect(testToggle2.targetEl).to.be(targetEl);
		expect(testToggle2.toggleEl).to.be(toggleEl2);
		expect(typeof testToggle2.callback).to.be('function');

		document.body.removeChild(toggleEl2);
	});
});
