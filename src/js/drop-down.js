import * as oUtils from 'o-utils';

class DropDown {
	/**
	 * Class constructor
	 * @param {HTMLElement} headerEl - The component element in the DOM
	 * @param {Drawer|null} drawer [null] - The drawer that this drop down belongs to if any.
	 */
	constructor(headerEl, drawer = null) {
		this.primaryNav = headerEl.querySelector('.o-header-services__primary-nav');
		this.drawer = drawer;
		this.headerEl = headerEl;

		this.navItems = [...headerEl.querySelectorAll('[data-o-header-services-level="1"]')];
		this.navItems.forEach(item => {
			const button = item.querySelector('button');
			if (!button) {
				return;
			}
			button.addEventListener('click', this);
		});

		// the event listener is added to the body here to handle cases where a
		// user might click anywhere else on the body to collapse open dropdowns
		document.body.addEventListener('click', this);
		window.addEventListener('keydown', this);

		// When the drawer is enabled or disabled reset the dropdowns.
		// The breakpoint the drawer is enabled is customisable with SASS,
		// we use the drawer burger icon visibility to decide when it is enabled.
		// Use ResizeObserver where supported to detect drawer icon changes where
		// possible, otherwise fallback to a debounced resize listener.
		if (window.ResizeObserver && this.drawer && this.drawer.burger) {
			const resizeObserver = new ResizeObserver(this.reset.bind(this));
			resizeObserver.observe(this.drawer.burger);
		} else {
			window.addEventListener('resize', oUtils.debounce(() => this.reset(), 33));
		}

	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 * @return {void}
	 */
	handleEvent(event) {
		if (event.key === 'Escape') {
			this.reset();
		}

		if (event.type === 'click' && event.target) {
			// Close dropdown if some non-nav element on the page is clicked.
			if (event.target.nodeName !== 'BUTTON' &&
				event.target.nodeName !== 'A' &&
				event.target !== this.drawer.navList
			) {
				this.reset();
				return;
			}

			// Bail if there's no parent menu to toggle. Note: IE11 does not
			// support `Array.prototype.find()` or `Element.closest()`,
			// adding a polyfill requirement is a breaking change
			let parentMenu;
			for (let itemIndex = 0; itemIndex < this.navItems.length; itemIndex++) {
				const navItem = this.navItems[itemIndex];

				if (navItem.contains(event.target)) {
					parentMenu = navItem;
					break; // found the parent menu
				}
			}

			if (!parentMenu) {
				return;
			}

			// Toggle the menu. Close other open menus when not in the drawer.
			if (!DropDown.isExpanded(parentMenu)) {
				if (!this.isDrawer()) {
					DropDown.collapseAll(this.navItems);
				}
				DropDown.expand(parentMenu);
			} else {
				DropDown.collapse(parentMenu);
			}

			event.stopPropagation();
		}
	}

	/**
	 * Checks if primary nav is in a drawer
	 * This boolean will change the drop down behaviour.
	 * @return {boolean} - whether the drawer is enabled or not
	 */
	isDrawer() {
		return this.drawer && this.drawer.enabled;
	}

	/**
	 * Returns nav items to their original collapsed state,
	 * items which contain links with the attribute `aria-current`
	 * set to true remain expanded.
	 * @return {void}
	 */
	reset() {
		// Disable transitions immediately. These should only happen on user
		// interaction. We do not want the dropdowns to transition when we are
		// resetting them i.e. due to the drawer being enabled on a viewport
		// change.
		this.headerEl.classList.add('o-header-services--disable-transition');
		// In the next animation frame...
		window.requestAnimationFrame(function () {
			// Close all dropdowns except within the drawer only, where the
			// dropdown for the current page should be open.
			DropDown.collapseAll(this.navItems);
			if (this.isDrawer()) {
				DropDown.expandAll(DropDown.getCurrent(this.navItems));
			}
			// Enable transitions again, which should happen on user interaction
			this.headerEl.classList.remove('o-header-services--disable-transition');
		}.bind(this));
	}

	/**
	 * Checks whether nav menu is expanded
	 * @param {HTMLElement} item - the nav menu
	 * @return {boolean} - whether the nav menu is expanded
	 */
	static isExpanded(item) {
		return item.getAttribute('aria-expanded') === 'true';
	}

	/**
	 * Expands closed nav menu
	 * @param {HTMLElement} item - the nav menu
	 * @return {void}
	 */
	static expand(item) {
		const childList = item.querySelector('ul');
		requestAnimationFrame(() => {
			childList.setAttribute('aria-hidden', false);
			DropDown.position(childList);
			requestAnimationFrame(() => {
				item.setAttribute('aria-expanded', true);
			});
		});
	}

	/**
	 * Changes nav menu position relative to the window
	 * @param {HTMLElement} item - the nav menu
	 * @return {void}
	 */
	static position(item) {
		if (item.getBoundingClientRect().right > window.innerWidth) {
			item.classList.add('o-header-services__list--right');
		}
	}

	/**
	 * Collapses open nav menu
	 * @param {HTMLElement} item - the nav menu
	 * @return {void}
	 */
	static collapse(item) {
		const childList = item.querySelector('ul');
		item.setAttribute('aria-expanded', false);
		childList.setAttribute('aria-hidden', true);
	}

	/**
	 * Collapses all open nav menus
	 * @param {Array<HTMLElement>} items - the menu items to collapse
	 * @return {void}
	 */
	static collapseAll(items) {
		items.forEach(DropDown.collapse);
	}

	/**
	 * Expands all open nav menus
	 * @param {Array<HTMLElement>} items - the menu items to expand
	 * @return {void}
	 */
	static expandAll(items) {
		items.forEach(DropDown.expand);
	}

	/**
	 * Returns items which contain an anchor
	 * with the attribute `aria-current` set to true or "page".
	 * @param {Array<HTMLElement>} items - the menu items to check
	 * @return {HTMLElement} - The current menu item
	 */
	static getCurrent(items) {
		return items.filter(item => {
			const links = item.querySelectorAll('a');
			const hasCurrentLink = Array.from(links).reduce((result, link) => {
				// Check against "page" and "true" as o-header-services
				// used "true" in its markup before switching to "page".
				// https://www.aditus.io/aria/aria-current/#aria-current-page
				const ariaCurrent = link.getAttribute('aria-current') ;
				return result || (ariaCurrent === 'true' || ariaCurrent === 'page');
			}, false);
			return hasCurrentLink;
		});
	}
}

export default DropDown;
