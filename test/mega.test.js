/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');
const subject = require('./../src/js/mega');

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
					<div data-o-component="o-header-mega"></div>
				</li>
				<li>
					<a href="#">Link 2</a>
					<div data-o-component="o-header-mega"></div>
				</li>
			</ul>
		`;

		document.body.appendChild(containerEl);
		subject.init(containerEl);
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
			expect(menu.getAttribute('aria-hidden')).to.equal('false');
			expect(menu.getAttribute('aria-expanded')).to.equal('true');
			expect(menu.classList.contains('has-animation')).to.be(true);
		});
	});

	it('hides the menu on mouseleave', () => {
		const parent = containerEl.querySelector('li');
		const menu = containerEl.querySelector('div');

		subject.show(menu, true);
		dispatch(parent, 'mouseleave');

		return waitFor(containerEl, [ 'oHeader.MegaMenuHide' ]).then(() => {
			expect(menu.getAttribute('aria-hidden')).to.equal('true');
			expect(menu.getAttribute('aria-expanded')).to.equal('false');

			expect(menu.classList.contains('has-animation')).to.be(false);
		});
	});

	it('skips animation when switching menus', () => {
		const parents = containerEl.querySelectorAll('li');
		const menus = containerEl.querySelectorAll('div');

		subject.show(menus[0]);

		dispatch(parents[0], 'mouseleave');
		dispatch(parents[1], 'mouseenter');

		return waitFor(containerEl, [ 'oHeader.MegaMenuShow', 'oHeader.MegaMenuHide' ]).then(() => {
			expect(menus[1].classList.contains('no-animation')).to.be(true);
		});
	});
});
