class Search {
	constructor(headerEl) {
		this.headerEl = headerEl;
		if (!this.headerEl) {
			return;
		}

		this.form = headerEl.querySelector('[data-o-header-search]');
		if (!this.form) {
			return;
		}

		this.toggle = headerEl.querySelector('[data-o-header-togglable-search]');

		if (this.toggle) {
			this.toggle.addEventListener('touchend', this.searchToggleClickHandler);
			this.toggle.addEventListener('click', this.searchToggleClickHandler);
		}
	}

	searchToggleClickHandler() {
		const isOpen = getComputedStyle(this.form, null).getPropertyValue('visibility') === 'visible';

		if (isOpen) {
			this.input.focus();
		}

		this.headerEl.dispatchEvent(new CustomEvent('oHeader.searchToggle', {
			bubbles: true,
			detail: {
				isOpen: isOpen
			}
		}));
	}

	destroy() {
		if (this.toggle) {
			this.toggle.removeEventListener('touchend', this.searchToggleClickHandler);
			this.toggle.removeEventListener('click', this.searchToggleClickHandler);
			delete this.toggle;
		}
		delete this.headerEl;
		delete this.form;
		delete this.input;
	}
}

export default Search;
