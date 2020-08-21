/* eslint-env mocha */
/* global proclaim */

import HeaderServices from '../../src/js/header.js';
import * as fixtures from '../helpers/fixtures.js';

describe('Dropdown', () => {
	let attribute;
	let click;
	let headerEl;
	let navItems;
	let sandbox;

	beforeEach(() => {
		sandbox = document.createElement('div');
		sandbox.innerHTML = fixtures.withPrimaryNav;
		document.body.appendChild(sandbox);
		headerEl = document.body.querySelector('.o-header-services');
		new HeaderServices(headerEl);
		navItems = document.querySelectorAll('li[data-o-header-services-level="1"]');
		click = (parent, element) => parent.querySelector(element).dispatchEvent(new Event('click'));
	});

	afterEach(() => {
		document.body.removeChild(sandbox);
		headerEl = null;
	});

	describe('toggles drop down menu via `aria-expanded`', () => {
		it('open on click', (done) => {
			click(navItems[0], 'button');
			setTimeout(() => {
				attribute = navItems[0].getAttribute('aria-expanded') === 'true';
				try {
					proclaim.isTrue(attribute);
					done();
				} catch (error) {
					done(error);
				}
			}, 100);
		});

		it('hides on double click', () => {
			click(navItems[0], 'button');
			click(navItems[0], 'button');
			attribute = navItems[0].getAttribute('aria-expanded') === 'false';
			proclaim.isTrue(attribute);
		});

		it('hides open dropdowns when different nav item is toggled', (done) => {
			click(navItems[0], 'button');
			setTimeout(() => {
				attribute = navItems[0].getAttribute('aria-expanded') === 'true';
				try {
					proclaim.isTrue(attribute);
				} catch (error) {
					done(error);
					return;
				}
				click(navItems[1], 'button');
				setTimeout(() => {
					try {
						attribute = navItems[0].getAttribute('aria-expanded') === 'false';
						proclaim.isTrue(attribute);
						attribute = navItems[1].getAttribute('aria-expanded') === 'true';
						proclaim.isTrue(attribute);
						done();
					} catch (error) {
						done(error);
					}
				}, 100);
			}, 100);
		});

		it('hides all menus if click outside of nav items', (done) => {
			click(navItems[0], 'button');
			setTimeout(() => {
				// Assert expanded dropdown
				attribute = navItems[0].getAttribute('aria-expanded') === 'true';
				proclaim.isTrue(attribute);
				// Click on body
				click(document, 'body');
				setTimeout(() => {
					// Assert collapsed dropdown
					attribute = navItems[0].getAttribute('aria-expanded') === 'false';
					proclaim.isTrue(attribute);
					done();
				}, 100); // allow time for requestAnimationFrame
			}, 100); // allow time for requestAnimationFrame
		});
	});

	describe('toggles drop down menu via `aria-expanded`', () => {
		it('repositions dropdown menu if it doesnt fit to the right of the window but can fit to the left', (done) => {
			const subItem = navItems[1].querySelector('li');
			navItems[1].style['margin-left'] = window.innerWidth / 2 + 'px';
			subItem.style['width'] = window.innerWidth / 2 + 'px';
			click(navItems[1], 'button');
			setTimeout(() => {
				proclaim.isTrue(navItems[1].lastElementChild.classList.contains('o-header-services__list--right'));
				done();
			}, 100);
		});
	});
});
