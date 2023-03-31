/**
 * Handles opening and closing the dropdown menu for the multi-select component.
 * When the menu is opened, it sets the display property of the listbox element to 'block'.
 * When the menu is closed, it sets the display property of the listbox element to 'none'.
 * It also updates the 'aria-expanded' attribute of the combo box element.
 *
 * @param {boolean} [open] - If passed, it will force the menu to open or close.
 * @returns {void}
 */
export function toggleDropdown(open) {
	if (typeof open === 'boolean') {
		this._open = open;
		this._listboxEl.style.display = open ? 'block' : 'none';
	} else if (!this._open) {
		this._listboxEl.style.display = 'block';
		this._open = true;
	} else {
		this._listboxEl.style.display = 'none';
		this._open = false;
	}
	this._comboEl.setAttribute('aria-expanded', `${this._open}`);
	this._updateState();
}

/**
 * Handles the 'keydown' event for the combobox element of the multi-select component.
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
	const numberOfOptions = this._totalNumberOfOptions;

	// handle opening when closed
	if (!this._open) {
		if (
			key === 'ArrowDown' ||
			key === 'ArrowUp' ||
			key === 'Enter' ||
			key === ' '
		) {
			this._updateCurrentElement();
			return this._toggleDropdown();
		}
	}

	if (key === 'ArrowUp') {
		if (this._activeIndex !== 0) {
			this._activeIndex--;
		}
	} else if (key === 'ArrowDown') {
		if (this._activeIndex !== numberOfOptions - 1) {
			this._activeIndex++;
		}
	} else if (key === 'PageDown') {
		if (this._activeIndex + 10 > numberOfOptions) {
			this._activeIndex = numberOfOptions - 1;
		} else {
			this._activeIndex += 10;
		}
	} else if (key === 'PageUp') {
		if (this._activeIndex - 10 < 0) {
			this._activeIndex = 0;
		} else {
			this._activeIndex -= 10;
		}
	} else if (key === 'Home') {
		this._activeIndex = 0;
	} else if (key === 'End') {
		this._activeIndex = numberOfOptions - 1;
	}

	if (key === 'Escape' && this._open) {
		this._toggleDropdown();
		this._comboEl.focus();
	} else if (key === 'Enter' || key === ' ') {
		event.preventDefault();
		addOptionToList.call(this);
	}
	this._updateCurrentElement();
}

/**
 * Adds the currently selected listbox option to the selected items list of the multi-select component.
 *
 * @returns {void}
 */
function addOptionToList() {
	const optionEl = this.multiSelectEl.querySelector(
		`#${this._idBase}-${this._activeIndex}`
	);
	const option = this._options[this._activeIndex];
	this._handleOptionSelect(optionEl, option, this._activeIndex);
}

/**
 * Updates the currently active descendant and current listbox option of the multi-select component.
 *
 * @returns {void}
 */
export function updateCurrentElement() {
	this._comboEl.setAttribute(
		'aria-activedescendant',
		`${this._idBase}-${this._activeIndex}`
	);

	const options = _removeCurrentClass(this.multiSelectEl);
	options[this._activeIndex].classList.add('o-multi-select-option__current');
}

/**
 * Removes the 'o-multi-select-option__current' class from all listbox options.
 *
 * @param {HTMLElement} element - The multi-select element.
 * @returns {HTMLElement[]} - The listbox options.
 */

export function _removeCurrentClass(element) {
	const options = element.querySelectorAll('[role=option]');
	[...options].forEach(optionEl => {
		optionEl.classList.remove('o-multi-select-option__current');
	});
	return options;
}


// function that checks for duplicate options and warn in the console if any are found
export function checkForDuplicates(options) {
	const uniqueOptions = [];
	options.forEach(option => {
		if (uniqueOptions.includes(option)) {
			console.warn(
				`Duplicate option found: ${option}.`
			);
		} else {
			uniqueOptions.push(option);
		}
	});
}
