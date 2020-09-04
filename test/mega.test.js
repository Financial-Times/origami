/* eslint-env mocha */
/* global proclaim */

import mega from '../src/js/mega.js';

function dispatch (target, type) {
	target.dispatchEvent(new Event(type, { bubbles: true }));
}

function waitFor (target, events) {
	const promises = events.map(event => {
		return new Promise(resolve => target.addEventListener(event, resolve));
	});

	return Promise.all(promises);
}

describe('Mega', () => {
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		containerEl.innerHTML = `
			<ul>
				<li>
					<a href="#">Link 1</a>
					<div data-o-header-mega></div>
				</li>
				<li>
					<a href="#">Link 2</a>
					<div data-o-header-mega></div>
				</li>
			</ul>
		`;

		document.body.appendChild(containerEl);
		mega.init(containerEl);
	});

	afterEach(() => {
		containerEl.innerHTML = '';
		containerEl = null;
	});

	it('shows the menu on mouseenter', () => {
		const parent = containerEl.querySelector('li');
		const menu = containerEl.querySelector('div');

		dispatch(parent, 'mouseenter');

		return waitFor(containerEl, [ 'oHeader.MegaMenuShow' ]).then(() => {
			proclaim.equal(menu.getAttribute('aria-hidden'), 'false');
			proclaim.equal(menu.getAttribute('aria-expanded'), 'true');
			proclaim.equal(menu.classList.contains('o-header__mega--animation'), true);
		});
	});

	it('hides the menu on mouseleave', () => {
		const parent = containerEl.querySelector('li');
		const menu = containerEl.querySelector('div');

		mega.show(menu, true);
		dispatch(parent, 'mouseleave');

		return waitFor(containerEl, [ 'oHeader.MegaMenuHide' ]).then(() => {
			proclaim.equal(menu.getAttribute('aria-hidden'), 'true');
			proclaim.equal(menu.getAttribute('aria-expanded'), 'false');

			proclaim.equal(menu.classList.contains('o-header__mega--animation'), false);
		});
	});

	it('skips animation when switching menus', () => {
		const parents = containerEl.querySelectorAll('li');
		const menus = containerEl.querySelectorAll('div');

		mega.show(menus[0]);

		dispatch(parents[0], 'mouseleave');
		dispatch(parents[1], 'mouseenter');

		return waitFor(containerEl, [ 'oHeader.MegaMenuShow', 'oHeader.MegaMenuHide' ]).then(() => {
			proclaim.equal(menus[1].classList.contains('o-header__mega--animation'), false);
		});
	});
});
