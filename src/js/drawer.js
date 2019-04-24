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
			this.nav.setAttribute('aria-hidden', 'true');

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
		let drawerHeader = document.createElement('li');
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

		this.debouncedRender = oUtils.debounce(() => this.render(), 100);
		this.burger = this.headerEl.querySelector('.o-header-services__hamburger-icon');
		this.burger.addEventListener('click', this);
		window.addEventListener('resize', this);
		window.addEventListener('keydown', this);

		this.render();
	}

	/**
	 * Event Handler
	 * @param {Object} event - The revent emitted by element/window interactions
	 */
	handleEvent(e) {
		if (e.type === 'resize') {
			this.debouncedRender();
		}

		if (e.type === 'keydown') {
			if (e.key === 'Escape' && this.nav.classList.contains(this.class.open)) {
				this.toggleDrawer();
				this.burger.focus();
			}
		}

		if ((e.type === 'click' && [this.nav, this.burger, this.drawerCloseButton].includes(e.target))) {
			e.preventDefault();
			this.toggleDrawer();
		}
	}

	/**
	 * Drawer rendering
	 */
	render () {
		// If burger is visible, render the drawer.
		// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetHeight
		const enableDrawer = this.burger.offsetHeight !== 0;

		if (enableDrawer) {
			this.nav.addEventListener('click', this);
		} else {
			this.nav.removeEventListener('click', this);
		}

		this._shiftRelatedContentList(enableDrawer);
		this.nav.classList.toggle(this.class.drawer, enableDrawer);
		this.nav.classList.toggle(this.class.open, !enableDrawer);

		this.nav.setAttribute('aria-hidden', enableDrawer);
	}

	/**
	 * Drawer hide/show functionality
	 */
	toggleDrawer () {
		this.nav.classList.toggle(this.class.open);
		const open = this.nav.classList.contains(this.class.open);
		this._toggleAriaAttributes(open);
		if (open) {
			setTimeout(function(){
				this.drawerCloseButton.focus();
			}.bind(this), 50); // Wait for drawer to be open
		}
	}

	/**
	 * Shift related content (sign in, etc) between drawer and header title section
	 */
	_shiftRelatedContentList (shiftItems) {
		let relatedContent = this.relatedContent;

		if (!relatedContent) { return; }

		let headerTop = this.headerEl.querySelector('.o-header-services__top');

		return shiftItems ? this.navList.appendChild(relatedContent) : headerTop.appendChild(relatedContent);
	}

	/**
	 * Set aria attributes specific to presence of drawer
	 */
	_toggleAriaAttributes(expand) {
		this.nav.setAttribute('aria-hidden', !expand);
		this.burger.setAttribute('aria-expanded', expand);
		this.burger.querySelector('span').innerText = expand ? 'Close primary navigation' : 'Open primary navigation';
	}
}

export default Drawer;
