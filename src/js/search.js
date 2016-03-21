class Search {
	constructor(headerEl) {
		this.headerEl = headerEl;
		if (!this.headerEl) {
			return;
		}

		this.formEl = this.headerEl.querySelector('[data-o-header-search]');
		if (!this.formEl) {
			return;
		}

		this.toggleEl = this.headerEl.querySelector('[data-o-header-togglable-search]');

		if (this.toggleEl) {
			this.inputEl = this.formEl.querySelector('input');
			this.toggleHandler = this.searchToggleClickHandler.bind(this);
			this.toggleEl.addEventListener('touchend', this.toggleHandler);
			this.toggleEl.addEventListener('click', this.toggleHandler);
		}
	}

	searchToggleClickHandler() {
		const isOpen = getComputedStyle(this.formEl).getPropertyValue('visibility') === 'visible';

		if (isOpen) {
			this.inputEl.focus();
		}

		this.headerEl.dispatchEvent(new CustomEvent('oHeader.searchToggle', {
			bubbles: true,
			detail: {
				isOpen: isOpen
			}
		}));
	}

	destroy() {
		if (this.toggleEl) {
			this.toggleEl.removeEventListener('touchend', this.toggleHandler);
			this.toggleEl.removeEventListener('click', this.toggleHandler);
			delete this.toggleEl;
			delete this.inputEl;
			delete this.toggleHandler;
		}
		delete this.headerEl;
		delete this.formEl;
	}
}

export default Search;
