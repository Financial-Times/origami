/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import userEvent from "@financial-times/o-testing-library";

import { initSubnavDropdowns } from '../src/js/subnavDropdown.js';

describe('Subnav Dropdown', () => {
	let containerEl;
	let clock;
	let matchMediaStub;

	function assertDropdownIsHidden(button, dropdown) {
		proclaim.equal(button.getAttribute('aria-expanded'), 'false');
		proclaim.equal(dropdown.style.display, 'none');
	}

	function assertDropdownIsVisible(button, dropdown) {
		proclaim.equal(button.getAttribute('aria-expanded'), 'true');
		proclaim.equal(dropdown.style.display, 'block');
	}

	beforeEach(() => {
		clock = sinon.useFakeTimers();
		containerEl = document.createElement('div');
		containerEl.innerHTML = `
			<header class="o-header">
				<nav data-o-header-subnav>
					<ul>
						<li class="o-header__nav-item">
							<div data-o-header-subnav-dropdown-parent>
								<button aria-expanded="false" data-o-header-subnav-dropdown-button>
									Item 1
								</button>
								<div data-o-header-subnav-dropdown-modal style="display: none;">
									<a href="#">Subnav Link 1</a>
									<a href="#">Subnav Link 2</a>
									<button data-o-header-subnav-dropdown-close>Close</button>
								</div>
							</div>
						</li>
						<li class="o-header__nav-item">
							<div data-o-header-subnav-dropdown-parent>
								<button aria-expanded="false" data-o-header-subnav-dropdown-button>
									Item 2
								</button>
								<div data-o-header-subnav-dropdown-modal style="display: none;">
									<a href="#">Subnav Link 3</a>
									<a href="#">Subnav Link 4</a>
									<button data-o-header-subnav-dropdown-close>Close</button>
								</div>
							</div>
						</li>
					</ul>
				</nav>
			</header>
		`;
		document.body.appendChild(containerEl);
	});

	afterEach(() => {
		clock.restore();
		if (matchMediaStub) {
			matchMediaStub.restore();
		}
		document.body.removeChild(containerEl);
		containerEl = null;
	});

	describe('On Desktop', () => {
		beforeEach(() => {
			matchMediaStub = sinon.stub(window, 'matchMedia');
			matchMediaStub.withArgs('(hover: hover) and (pointer: fine)').returns({
				matches: true
			});
		});

		it('shows the dropdown after hover intent delay', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = headerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			
			assertDropdownIsHidden(button, dropdown);

			clock.tick(300);
			
			assertDropdownIsVisible(button, dropdown);
		});

		it('positions the dropdown below the parent element', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			proclaim.equal(dropdown.style.position, 'fixed');
			proclaim.notEqual(dropdown.style.top, '');
			proclaim.notEqual(dropdown.style.left, '');
		});

		it('hides the dropdown after leave intent delay', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			assertDropdownIsVisible(button, dropdown);

			parent.dispatchEvent(new Event('mouseleave', { bubbles: true }));

			assertDropdownIsVisible(button, dropdown);

			clock.tick(400);

			assertDropdownIsHidden(button, dropdown);
		});

		it('hides the dropdown when Escape is pressed', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			assertDropdownIsVisible(button, dropdown);

			userEvent.keyboard('{Escape}');

			assertDropdownIsHidden(button, dropdown);
		});

		it('closes the first dropdown when hovering over a second item', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const buttons = containerEl.querySelectorAll('[data-o-header-subnav-dropdown-button]');
			const dropdowns = containerEl.querySelectorAll('[data-o-header-subnav-dropdown-modal]');

			buttons[0].dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			assertDropdownIsVisible(buttons[0], dropdowns[0]);

			buttons[1].dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			assertDropdownIsHidden(buttons[0], dropdowns[0]);
			assertDropdownIsVisible(buttons[1], dropdowns[1]);
		});

		it('updates dropdown position when window scrolls', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			window.dispatchEvent(new Event('scroll', { bubbles: true }));
			proclaim.notEqual(dropdown.style.top, '');
		});

		it('does not show dropdown if mouse leaves before intent delay', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			
			clock.tick(100);
			parent.dispatchEvent(new Event('mouseleave', { bubbles: true }));
			
			clock.tick(200);

			assertDropdownIsHidden(button, dropdown);
		});

		it('does not hide dropdown if mouse re-enters before leave delay', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);

			assertDropdownIsVisible(button, dropdown);

			parent.dispatchEvent(new Event('mouseleave', { bubbles: true }));
			
			clock.tick(100);
			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			
			clock.tick(300);
			
			assertDropdownIsVisible(button, dropdown);
		});
	});

	describe('On Mobile', () => {
		beforeEach(() => {
			matchMediaStub = sinon.stub(window, 'matchMedia');
			matchMediaStub.withArgs('(hover: hover) and (pointer: fine)').returns({
				matches: false
			});
		});

		it('user can open and close dropdown with tap/clicks', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');
			const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');

			button.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsVisible(button, dropdown);

			closeButton.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsHidden(button, dropdown);
		});

		it('does not respond to hover events on mobile', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('mouseenter', { bubbles: true }));
			clock.tick(300);
			assertDropdownIsHidden(button, dropdown);

			button.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsVisible(button, dropdown);

			parent.dispatchEvent(new Event('mouseleave', { bubbles: true }));
			clock.tick(400);
			assertDropdownIsVisible(button, dropdown);
		});

		it('does not update dropdown position when window scrolls on mobile', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

			button.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsVisible(button, dropdown);

			const initialTop = dropdown.style.top;
			const initialLeft = dropdown.style.left;

			window.dispatchEvent(new Event('scroll', { bubbles: true }));

			proclaim.equal(dropdown.style.top, initialTop);
			proclaim.equal(dropdown.style.left, initialLeft);
		});
	});
});
