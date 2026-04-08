/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
import userEvent, {dom} from "@financial-times/o-testing-library";

import { initSubnavDropdowns } from '../src/js/subnavDropdown.js';

const {screen} = dom;

describe('Subnav Dropdown', () => {
	let containerEl;
	let clock;
	let matchMediaStub;
	let addEventListenerStub;

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
								<button aria-expanded="false" data-o-header-subnav-dropdown-button>Item 1</button>
								<div data-o-header-subnav-dropdown-modal style="display: none;">
									<button data-o-header-subnav-dropdown-close>Close</button>
									<a href="#">Subnav Link 1</a>
									<a href="#">Subnav Link 2</a>
								</div>
							</div>
						</li>
						<li class="o-header__nav-item">
							<div data-o-header-subnav-dropdown-parent>
								<button aria-expanded="false" data-o-header-subnav-dropdown-button>Item 2</button>
								<div data-o-header-subnav-dropdown-modal style="display: none;">
									<button data-o-header-subnav-dropdown-close>Close</button>
									<a href="#">Subnav Link 3</a>
									<a href="#">Subnav Link 4</a>
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
			addEventListenerStub = sinon.stub();
			matchMediaStub = sinon.stub(window, 'matchMedia').callsFake((query) => ({
				matches: true,
				media: query,
				onchange: null,
				addEventListener: addEventListenerStub,
				removeEventListener: sinon.stub(),
				addListener: sinon.stub(),
				removeListener: sinon.stub(),
				dispatchEvent: sinon.stub()
			}));
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

		it('does not respond to close button events', () => {
			const headerEl = containerEl.querySelector('.o-header');
			initSubnavDropdowns(headerEl);

			const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
			const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
			const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');
			const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');

			button.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsVisible(button, dropdown);

			closeButton.dispatchEvent(new Event('click', { bubbles: true }));
			assertDropdownIsVisible(button, dropdown);
		});
		
		context('when opened via the keyboard', () => {
			it('tab will take you through the elements', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');

				assertDropdownIsVisible(button, dropdown);

				userEvent.tab();
				userEvent.tab();
			
				const activeElement = document.activeElement;
				const lastDropdownItem = screen.getByRole('link', { name: 'Subnav Link 2'})

				proclaim.equal(lastDropdownItem, activeElement)
			});

			it('if you tab from the last dropdown item, the dropdown will close and focus will be on the next button', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');
				userEvent.tab();
				userEvent.tab();
			
				let activeElement = document.activeElement;
				const lastDropdownItem = screen.getByRole('link', { name: 'Subnav Link 2'})
				proclaim.equal(lastDropdownItem, activeElement)

				userEvent.tab();

				activeElement = document.activeElement;
				const nextDropdownButton = screen.getByRole('button', { name: 'Item 2'})
				proclaim.equal(activeElement, nextDropdownButton);
				assertDropdownIsHidden(button, dropdown);
			});

			it('if you shift+tab from the first dropdown item, the dropdown will close and focus will return to the initial button', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');
				assertDropdownIsVisible(button, dropdown);	
			
				userEvent.tab({ shift: true });

				const activeElement = document.activeElement;
				proclaim.equal(activeElement, button);
				assertDropdownIsHidden(button, dropdown);
			});
		})
	});

	describe('On Mobile', () => {
		beforeEach(() => {
			addEventListenerStub = sinon.stub();
			matchMediaStub = sinon.stub(window, 'matchMedia').callsFake((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addEventListener: addEventListenerStub,
				removeEventListener: sinon.stub(),
				addListener: sinon.stub(),
				removeListener: sinon.stub(),
				dispatchEvent: sinon.stub()
			}));
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

		context('when opened via the keyboard', () => {
			it('the close button gets the initial focus', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');

				assertDropdownIsVisible(button, dropdown);

				const activeElement = document.activeElement;
				const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');
				proclaim.equal(closeButton, activeElement)
			});

			it('tab will take you through the elements', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');

				assertDropdownIsVisible(button, dropdown);
				userEvent.tab();
				userEvent.tab();
			
				const activeElement = document.activeElement;
				const lastListElement = screen.getByRole('link', { name: 'Subnav Link 2'})
				proclaim.equal(lastListElement, activeElement)
			});

			it('shift+tab will take you backwards through the elements', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');

				assertDropdownIsVisible(button, dropdown);
				userEvent.tab({ shift: true });
			
				const activeElement = document.activeElement;
				const lastListElement = screen.getByRole('link', { name: 'Subnav Link 2'})
				proclaim.equal(lastListElement, activeElement)
			});

			it('when focused on the last dropdown element, the next tab will take you back to the close button', () => {
				const headerEl = containerEl.querySelector('.o-header');
				initSubnavDropdowns(headerEl);

				const parent = containerEl.querySelector('[data-o-header-subnav-dropdown-parent]');
				const button = parent.querySelector('[data-o-header-subnav-dropdown-button]');
				const dropdown = parent.querySelector('[data-o-header-subnav-dropdown-modal]');

				button.focus();
				userEvent.keyboard('{Enter}');

				assertDropdownIsVisible(button, dropdown);
				userEvent.tab();
				userEvent.tab();
			
				let activeElement = document.activeElement;
				const lastListElement = screen.getByRole('link', { name: 'Subnav Link 2'})
				proclaim.equal(lastListElement, activeElement)
			
				userEvent.tab();

				activeElement = document.activeElement;
				const closeButton = dropdown.querySelector('[data-o-header-subnav-dropdown-close]');		
				proclaim.equal(closeButton, activeElement);			
			});
		});
	});
});
