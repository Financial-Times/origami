/**
 * Handles opening and closing the dropdown menu for the multi-select component.
 * When the menu is opened, it sets the display property of the listbox element to 'block'.
 * When the menu is closed, it sets the display property of the listbox element to 'none'.
 * It also updates the 'aria-expanded' attribute of the combo box element.
 *
 * @returns {void}
 */
export function toggleDropdown() {
	if (!this.open) {
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
 * Handles the 'mousedown' event for multi-select options.
 * Sets 'ignoreBlur' property to true.
 */
export function onOptionMouseDown() {
	this.ignoreBlur = true;
}

/**
 * Handles the 'blur' event for the input element of the multi-select component.
 * If the 'ignoreBlur' property is true, it sets 'ignoreBlur' back to false and returns.
 * If the component is open, it calls 'toggleDropdown' to close it.
 *
 * @returns {void}
 */
export function onInputBlur() {
	if (this.ignoreBlur) {
		this.ignoreBlur = false;
		return;
	}

	if (this.open) {
		toggleDropdown.call(this);
	}
}

/**
 * Handles the 'keydown' event for the input element of the multi-select component.
 * If the component is closed, it handles opening the menu if the key pressed is 'ArrowDown', 'ArrowUp', 'Enter', or ' '.
 * If the component is open and 'Alt' and 'ArrowUp' keys are pressed, it calls 'addOptionToList' and then opens the menu.
 * If any other key is pressed, it updates the active index of the listbox options based on the key pressed.
 * If the key pressed is 'Escape', it closes the menu.
 * If the key pressed is 'Tab' and the menu is open, it closes the menu.
 * If the key pressed is 'Enter' or ' ', it calls 'addOptionToList'.
 * Finally, it calls 'updateCurrentElement' to update the active descendant and current listbox option.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {void}
 */
export function onInputKeyDown(event) {
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
			updateCurrentElement.call(this);
			return this.handleListBoxOpen();
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
		this.handleListBoxOpen();
	} else if (key === 'Tab' && this.open) {
		this.handleListBoxOpen();
	} else if (key === 'Enter' || key === ' ') {
		event.preventDefault();
		addOptionToList.call(this);
	}
	updateCurrentElement.call(this);
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
function updateCurrentElement() {
	this.inputEl.setAttribute(
		'aria-activedescendant',
		`${this.idBase}-${this.activeIndex}`
	);

	const options = this.multiSelectEl.querySelectorAll('[role=option]');
	[...options].forEach(optionEl => {
		optionEl.classList.remove('o-multi-select-option__current');
	});
	options[this.activeIndex].classList.add('o-multi-select-option__current');
}
