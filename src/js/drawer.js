import * as oUtils from 'o-utils';

class Drawer {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor(headerEl) {
		this.headerEl = headerEl;
		this.class = {
			drawer: 'o-header-services__primary-nav--drawer',
			open: 'o-header-services__primary-nav--open'
		};

		this.relatedContent = headerEl.querySelector('.o-header-services__related-content');
		this.nav = headerEl.querySelector('.o-header-services__primary-nav');

		// If the primary nav `nav` does not exist, but related content does,
		// then create an empty primary nav which functions as a draw for
		// related content on mobile.
		if (!this.nav && this.relatedContent) {
			this.nav = document.createElement('div');
			this.nav.classList.add('o-header-services__primary-nav');
			this.nav.setAttribute('aria-label', 'primary navigation');
			this.nav.setAttribute('aria-hidden', 'true'); // Hidden until related content is added the drawer.

			this.navList = document.createElement('ul');
			this.navList.classList.add('o-header-services__primary-nav-list');
			this.nav.appendChild(this.navList);

			this.headerEl.appendChild(this.nav);
		}

		// If there's no primary nav and we didn't create one exit.
		if (!this.nav) {
			return;
		}

		this.navList = this.nav.querySelector('.o-header-services__primary-nav-list');

		// Create drawer header.
		const drawerHeader = document.createElement('li');
		drawerHeader.classList.add('o-header-services__drawer-header');
		this.drawerCloseButton = document.createElement('button');
		this.drawerCloseButton.classList.add('o-header-services__drawer-close-button');
		this.drawerCloseButton.innerText = 'Close';
		// Add drawer header to navlist, with close button.
		if (this.navList) {
			drawerHeader.appendChild(this.drawerCloseButton);
			if (this.navList && this.navList.firstChild) {
				this.navList.insertBefore(drawerHeader, this.navList.firstChild);
			} else {
				this.navList.appendChild(drawerHeader);
			}
		}

		this.debouncedRender = oUtils.debounce(() => this.render(), 33);
		this.burger = this.headerEl.querySelector('.o-header-services__hamburger-icon');
		if (this.burger) {
			this.burger.addEventListener('click', this);
		}
		window.addEventListener('resize', this);
		window.addEventListener('keydown', this);

		this.render();
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 * @return {void}
	 */
	handleEvent(event) {
		if (event.type === 'resize') {
			this.debouncedRender();
		}

		if (event.type === 'keydown' && this.burger) {
			if (event.key === 'Escape' && this.nav.classList.contains(this.class.open)) {
				this.toggleDrawer();
				this.burger.focus();
			}
		}

		if (event.type === 'click' && this.burger && [this.nav, this.burger, this.drawerCloseButton].includes(event.target)) {
			event.preventDefault();
			this.toggleDrawer();
		}
	}

	/**
	 * Check if the drawer is currently enabled.
	 * If the burger element is visible, the drawer is enabled.
	 */
	get enabled () {
		return this.nav && this.burger && this.burger.offsetHeight !== 0;
	}

	/**
	 * Drawer rendering
	 * @return {void}
	 */
	render () {
		if (this.enabled) {
			this.nav.addEventListener('click', this);
		} else {
			this.nav.removeEventListener('click', this);
		}

		// Shift related content (sign in, etc) between drawer and header title section
		if (this.relatedContent && this.enabled) {
			this.navList.appendChild(this.relatedContent);
		}
		if (this.relatedContent && !this.enabled) {
			const headerTop = this.headerEl.querySelector('.o-header-services__top');
			headerTop.appendChild(this.relatedContent);
		}

		this.nav.classList.toggle(this.class.drawer, this.enabled);

		this.nav.setAttribute('aria-hidden', this.enabled);
	}

	/**
	 * Drawer hide/show functionality
	 * @return {void}
	 */
	toggleDrawer () {
		this.nav.classList.toggle(this.class.open);
		const open = this.nav.classList.contains(this.class.open);

		this.nav.setAttribute('aria-hidden', !open);
		this.burger.setAttribute('aria-expanded', open);
		this.burger.querySelector('span').innerText = open ? 'Close primary navigation' : 'Open primary navigation';

		if (open) {
			setTimeout(function(){
				this.drawerCloseButton.focus();
			}.bind(this), 50); // Wait for drawer to be open
		}
	}
}

export default Drawer;
