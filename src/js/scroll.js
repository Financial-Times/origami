import * as oUtils from 'o-utils';

class Scroll {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		this.headerEl = headerEl;
		this.container = headerEl.querySelector('[data-o-header-services-nav]');

		if (!this.container) { return; }

		this.list = this.container.querySelector('[data-o-header-services-nav-list]');
		this.buttons = Array.from(this.container.getElementsByTagName('button'), button => {
			button.addEventListener('click', this.scroll.bind(this));
			return button;
		});

		this.width = {};

		this.list.addEventListener('scroll', oUtils.debounce(this.toggleScrollButtons.bind(this), 100));
		window.addEventListener('resize', oUtils.debounce(this.toggleScrollButtons.bind(this), 500));

		this.render();
	}

	/**
	 * Scroll functionality rendering
	 * @return {void}
	 */
	render () {
		this.showCurrentSelection();
		this.toggleScrollButtons();
	}

	/**
	 * Hide/show scroll buttons
	 * @return {void}
	 */
	toggleScrollButtons () {
		this._getWidths();
		this.buttons.forEach(button => {
			if (button.className.match('left')) {
				button.disabled = this.list.scrollLeft === 0;
			} else {
				const remaining = this.width.list > this.width.container ? this._remaining() : 0;
				button.disabled = remaining <= 1;
			}
		});
	}

	/**
	 * Scrolling functionality
	 * @param {Object} event - A scroll event
	 * @return {void}
	 */
	scroll(event) {
		const target = event.currentTarget;
		let distance = 100;

		if (target.className.match('left')) {
			distance = (this.list.scrollLeft > distance ? distance : this.list.scrollLeft) * -1;
		} else {
			const remaining = this._remaining();
			distance = remaining > distance ? distance : remaining;
		}

		this.list.scrollLeft = this.list.scrollLeft + distance;

		this.toggleScrollButtons();
	}

	_remaining () {
		return this.width.list - this.width.container - this.list.scrollLeft;
	}

	_getWidths () {
		this.width.list = this.list.scrollWidth;
		this.width.container = this.list.clientWidth;
	}

	/**
	 * Scroll secondary nav to 'current selection'
	 * @return {void}
	 */
	showCurrentSelection () {
		this._getWidths();
		const currentSelection = this.list.querySelector('[aria-current]');

		if (!currentSelection) { return; }

		const currentSelectionEnd = currentSelection.getBoundingClientRect().right;

		//if the current selection is wider than the end of the list
		if (currentSelectionEnd > this.width.container) {
			// check by how much
			let diff = currentSelectionEnd - this.width.container;
			// if the difference is greater than half of the list, scroll to the end of the current selection.
			diff = diff > this.width.container / 2 ? currentSelectionEnd : this.width.container / 2;

			this.list.scrollTo({ left: diff, top: 0, behaviour: 'smooth' });
		}
	}
}

export default Scroll;
