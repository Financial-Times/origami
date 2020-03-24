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
		window.addEventListener('resize', oUtils.debounce(() => this.reset(), 33));
		window.addEventListener('keydown', this);
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
		DropDown.collapseAll(this.navItems);
		if (this.isDrawer()) {
			DropDown.expandAll(DropDown.getCurrent(this.navItems));
		}
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
		item.setAttribute('aria-expanded', true);
		childList.setAttribute('aria-hidden', false);
		DropDown.position(childList);
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
	 * with the attribute `aria-current` set to true.
	 */
	static getCurrent(items) {
		return items.filter(item => {
			const links = item.querySelectorAll('a');
			const hasCurrentLink = Array.from(links).reduce((result, link) => {
				return result || link.getAttribute('aria-current') === 'true';
			}, false);
			return hasCurrentLink;
		});
	}
}

export default DropDown;
