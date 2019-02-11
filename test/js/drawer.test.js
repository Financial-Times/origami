/* eslint-env mocha*/

import proclaim from 'proclaim';
import HeaderServices from '../../src/js/header';
import * as fixtures from '../helpers/fixtures';

describe('Drawer', () => {
	let headerEl;
	let primaryNav;
	let sandbox;

	beforeEach(() => {
		sandbox = document.createElement('div');
		sandbox.innerHTML = fixtures.withPrimaryNav;
		document.body.appendChild(sandbox);
		headerEl = document.body.querySelector('.o-header-services');
		new HeaderServices(headerEl);
		primaryNav = headerEl.querySelector('.o-header-services__primary-nav');
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
		window.resizeTo(window.screen.availHeight, window.screen.availWidth);
	});

	context('on viewports above 740px', () => {
		it('primary nav is visibile', (done) => {
			setTimeout(() => {
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--open'));
				done();
			}, 100);
		});
	});

	context('on viewports below 740px', () => {
		let click;

		beforeEach(() => {
			window.resizeTo(740, 740);
			click = element => headerEl.querySelector(element).dispatchEvent(new Event('click'));
		});

		it('primary nav is hidden', (done) => {
			setTimeout(() => {
				proclaim.isFalse(primaryNav.classList.contains('o-header-services__primary-nav--open'));
				proclaim.isTrue(primaryNav.hasAttribute('aria-hidden', 'true'));
				done();
			}, 100);
		});

		it('display primary nav on burger icon click', (done) => {
			let burgerIcon = '.o-header-services__hamburger-icon';
			setTimeout(() => {
				click(burgerIcon);
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--open'));
				done();
			}, 100);
		});

		it('hides primary nav on close button click', (done) => {
			let burgerIcon = '.o-header-services__drawer-close-button';

			setTimeout(() => {
				click(burgerIcon);
				click(burgerIcon);
				proclaim.isTrue(primaryNav.classList.contains('o-header-services__primary-nav--open'));
				done();
			}, 100);
		});

		it('shifts related content to primary nav', (done) => {
			setTimeout(() => {
				let listItems = primaryNav.querySelector('ul');
				proclaim.equal(listItems.children.length, 3);
				done();
			}, 100);
		});
	});
});
