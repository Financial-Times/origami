/**
 * Handles opening and closing the dropdown menu for the multi-select component.
 * When the menu is opened, it sets the display property of the listbox element to 'block'.
 * When the menu is closed, it sets the display property of the listbox element to 'none'.
 * It also updates the 'aria-expanded' attribute of the combo box element.
 *
 * @param {boolean} open - If passed, it will force the menu to open or close.
 * @returns {void}
 */
export function toggleDropdown(open) {
	if (typeof open === 'boolean') {
		this.open = open;
		this.listboxEl.style.display = open ? 'block' : 'none';
	} else if (!this.open) {
		this.listboxEl.style.display = 'block';
		this.open = true;
	} else {
		this.listboxEl.style.display = 'none';
		this.open = false;
	}
	this.comboEl.setAttribute('aria-expanded', `${this.open}`);
	this._updateState();
}

/**
 * Handles the 'keydown' event for the input element of the multi-select component.
 * If the component is closed, it handles opening the menu if the key pressed is 'ArrowDown', 'ArrowUp', 'Enter', or ' '.
 * If the component is open and 'Alt' and 'ArrowUp' keys are pressed, it calls 'addOptionToList' and then opens the menu.
 * If any other key is pressed, it updates the active index of the listbox options based on the key pressed.
 * If the key pressed is 'Escape', it closes the menu.
 * If the key pressed is 'Enter' or ' ', it calls 'addOptionToList'.
 * Finally, it calls 'updateCurrentElement' to update the active descendant and current listbox option.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {void}
 */
export function onComboBoxKeyDown(event) {
	const {key} = event;
	const numberOfOptions = this.totalNumberOfOptions;

	// handle opening when closed
	if (!this.open) {
		if (
			key === 'ArrowDown' ||
			key === 'ArrowUp' ||
			key === 'Enter' ||
			key === ' '
		) {
			this.updateCurrentElement();
			return this.toggleDropdown();
		}
	}

	if (key === 'ArrowUp') {
		if (this.activeIndex !== 0) {
			this.activeIndex--;
		}
	} else if (key === 'ArrowDown') {
		if (this.activeIndex !== numberOfOptions - 1) {
			this.activeIndex++;
		}
	} else if (key === 'PageDown') {
		if (this.activeIndex + 10 > numberOfOptions) {
			this.activeIndex = numberOfOptions - 1;
		} else {
			this.activeIndex += 10;
		}
	} else if (key === 'PageUp') {
		if (this.activeIndex - 10 < 0) {
			this.activeIndex = 0;
		} else {
			this.activeIndex -= 10;
		}
	} else if (key === 'Home') {
		this.activeIndex = 0;
	} else if (key === 'End') {
		this.activeIndex = numberOfOptions - 1;
	}

	if (key === 'Escape' && this.open) {
		this.toggleDropdown();
		this.comboEl.focus();
	} else if (key === 'Enter' || key === ' ') {
		event.preventDefault();
		addOptionToList.call(this);
	}
	this.updateCurrentElement();
}

/**
 * Adds the currently selected listbox option to the selected items list of the multi-select component.
 *
 * @returns {void}
 */
function addOptionToList() {
	const optionEl = this.multiSelectEl.querySelector(
		`#${this.idBase}-${this.activeIndex}`
	);
	const option = this.options.multiSelectOptions[this.activeIndex];
	this.handleOptionSelect(optionEl, option, this.activeIndex);
}

/**
 * Updates the currently active descendant and current listbox option of the multi-select component.
 *
 * @returns {void}
 */
export function updateCurrentElement() {
	this.comboEl.setAttribute(
		'aria-activedescendant',
		`${this.idBase}-${this.activeIndex}`
	);

	const options = _removeCurrentClass(this.multiSelectEl);
	options[this.activeIndex].classList.add('o-multi-select-option__current');
}

/**
 * Removes the 'o-multi-select-option__current' class from all listbox options.
 *
 * @param {HTMLElement} element - The multi-select element.
 * @returns {NodeListOf<HTMLElement>} - The listbox options.
 */

export function _removeCurrentClass(element) {
	const options = element.querySelectorAll('[role=option]');
	[...options].forEach(optionEl => {
		optionEl.classList.remove('o-multi-select-option__current');
	});
	return options;
}
