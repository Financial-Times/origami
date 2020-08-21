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
		if (ResizeObserver && this.drawer && this.drawer.burger) {
			const resizeObserver = new ResizeObserver(this.reset.bind(this));
			resizeObserver.observe(this.drawer.burger);
		} else {
			window.addEventListener('resize', oUtils.debounce(() => this.reset(), 33));
		}

	}

	/**
	 * Event Handler
	 * @param {Object} event - The revent emitted by element/window interactions
	 */
	handleEvent(e) {
		if (e.type === 'click') {
			if (!e.target.parentNode || !e.target.parentNode.getAttribute('data-o-header-services-level')) {
				this.reset();
				return;
			}

			const target = e.target.closest('li');
			if (!DropDown.isExpanded(target) && e.target.type === 'button') {
				if (!this.isDrawer()) {
					DropDown.collapseAll(this.navItems);
				}
				DropDown.expand(target);
			} else {
				DropDown.collapse(target);
			}

			e.stopPropagation();
		}

		if (e.key === 'Escape') {
			this.reset();
		}
	}

	/**
	 * Checks if primary nav is in a drawer
	 * This boolean will change the drop down behaviour.
	 */
	isDrawer() {
		return this.drawer && this.drawer.enabled;
	}

	/**
	 * Returns nav items to their original collapsed state,
	 * items which contain links with the attribute `aria-current`
	 * set to true remain expanded.
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
	 */
	static isExpanded(item) {
		return item.getAttribute('aria-expanded') === 'true';
	}

	/**
	 * Expands closed nav menu
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
	 */
	static position(item) {
		if (item.getBoundingClientRect().right > window.innerWidth) {
			item.classList.add('o-header-services__list--right');
		}
	}

	/**
	 * Collapses open nav menu
	 */
	static collapse(item) {
		const childList = item.querySelector('ul');
		item.setAttribute('aria-expanded', false);
		childList.setAttribute('aria-hidden', true);
	}

	/**
	 * Collapses all open nav menus
	 */
	static collapseAll(items) {
		items.forEach(DropDown.collapse);
	}

	/**
	 * Expands all open nav menus
	 */
	static expandAll(items) {
		items.forEach(DropDown.expand);
	}

	/**
	 * Returns items which contain an anchor
	 * with the attribute `aria-current` set to true or "page".
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
