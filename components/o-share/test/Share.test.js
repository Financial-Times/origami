/* eslint-env mocha */

import proclaim from 'proclaim';

import * as fixtures from './helpers/fixtures.js';
import Share from './../main.js';

let testShare;
let shareEl;

describe('general behaviour', () => {

	beforeEach(() => {
		fixtures.insertShareLinks();
		shareEl = document.querySelector('[data-o-component=o-share]');
		testShare = new Share(shareEl);
	});

	afterEach(() => {
		testShare.destroy();
		fixtures.reset();
	});

	it('initialisation', () => {
		proclaim.isTrue(shareEl.hasAttribute('data-o-share--js'));
	});
});

describe('links', () => {
	let xLinkEl;
	let spy;

	beforeEach(() => {
		fixtures.insertShareLinks();
		shareEl = document.querySelector('[data-o-component=o-share]');
		testShare = new Share(shareEl);
		spy = newWindowSpy();
		window.open = spy.func;
		xLinkEl = document.querySelector('.o-share__icon--x');
		const ev = document.createEvent('Event');
		ev.initEvent('click', true, true);
		xLinkEl.dispatchEvent(ev);
	});

	afterEach(() => {
		testShare.destroy();
		fixtures.reset();
	});

	it('clicking link opens new window', () => {
		proclaim.strictEqual(spy.calledWith[0], xLinkEl.getAttribute('href'));
		proclaim.strictEqual(spy.calledWith[1], '');
		proclaim.strictEqual(spy.calledWith[2], 'width=646,height=436');
	});

	it('clicking link opens new window only once', () => {
		proclaim.strictEqual(spy.callCount, 1);

		proclaim.strictEqual(spy.calledWith[0], xLinkEl.getAttribute('href'));
		proclaim.strictEqual(spy.calledWith[1], '');
		proclaim.strictEqual(spy.calledWith[2], 'width=646,height=436');

		const ev = document.createEvent('Event');
		ev.initEvent('click', true, true);
		xLinkEl.dispatchEvent(ev);
		proclaim.strictEqual(spy.callCount, 1);
	});
});

describe('component', () => {
	let spy;

	beforeEach(() => {
		fixtures.insertShareComponent();
		shareEl = document.querySelector('[data-o-component=o-share]');
		new Share(shareEl);

		spy = newWindowSpy();
		window.open = spy.func;
	});

	it('generates markup when instantiating a component', () => {
		proclaim.instanceOf(document.querySelector('.o-share__icon--x'), HTMLElement);
		proclaim.instanceOf(document.querySelector('.o-share__icon--facebook'), HTMLElement);
		proclaim.instanceOf(document.querySelector('.o-share__icon--linkedin'), HTMLElement);
		proclaim.instanceOf(document.querySelector('.o-share__icon--whatsapp'), HTMLElement);
		proclaim.instanceOf(document.querySelector('.o-share__icon--pinterest'), HTMLElement);
	});

	it('generates descriptive link text', () => {
		const xText = document.querySelector('.o-share__icon--x .o-share__text').innerText;
		const facebookText = document.querySelector('.o-share__icon--facebook .o-share__text').innerText;
		const linkedinText = document.querySelector('.o-share__icon--linkedin .o-share__text').innerText;
		const whatsappText = document.querySelector('.o-share__icon--whatsapp .o-share__text').innerText;
		const pinterestText = document.querySelector('.o-share__icon--pinterest .o-share__text').innerText;

		proclaim.strictEqual(xText, 'Share Test Article on Twitter (opens a new window)');
		proclaim.strictEqual(facebookText, 'Share Test Article on Facebook (opens a new window)');
		proclaim.strictEqual(linkedinText, 'Share Test Article on LinkedIn (opens a new window)');
		proclaim.strictEqual(whatsappText, 'Share Test Article on Whatsapp (opens a new window)');
		proclaim.strictEqual(pinterestText, 'Share Test Article on Pinterest (opens a new window)');
	});

	it('responds correctly to x clicks in the component', () => {
		const xLinkElement = document.querySelector('.o-share__icon--x');
		const event = document.createEvent('Event');
		event.initEvent('click', true, true);
		xLinkElement.dispatchEvent(event);

		proclaim.strictEqual(spy.callCount, 1);
		proclaim.strictEqual(spy.calledWith[0], xLinkElement.getAttribute('href'));
		proclaim.strictEqual(spy.calledWith[1], '');
		proclaim.strictEqual(spy.calledWith[2], 'width=646,height=436');

	});
});

function newWindowSpy() {
	const self = {
		callCount: 0,
		calledWith: [],
		func: function() {
			self.callCount++;
			self.calledWith = arguments;

			return {
				focus: Function.prototype
			};
		}
	};

	return self;
}
