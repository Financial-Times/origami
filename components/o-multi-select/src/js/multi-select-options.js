/**
 * adds or removes the selection of a multi-select option in selected list.
 *
 * @param {HTMLElement} optionEl - The option element that was selected.
 * @param {string} option - The text content of the option that was selected.
 * @param {number} index - The index of the option that was selected.
 * @returns {void}
 */
export function handleOptionSelect(optionEl, option, index) {
	if (optionEl.classList.contains('o-multi-select-option__selected')) {
		removeOption.call(this, optionEl, option, index);
	} else {
		addOption.call(this, optionEl, option, index);
	}
	this.activeIndex = index;
	this.updateCurrentElement();
	handleOptionSelectionForSubmission.call(this);
}

/**
 * Removes selected item from a multi-select selected list.
 *
 * @private
 * @param {HTMLElement} optionEl - The option element to remove.
 * @param {string} option - The text content of the option to remove.
 * @param {number} index - The index of the option to remove.
 * @returns {void}
 */
function removeOption(optionEl, option, index) {
	optionEl.classList.remove('o-multi-select-option__selected');
	optionEl.setAttribute('aria-selected', 'false');
	this.numberOfSelectedOptions--;
	const button = this.selectedOptions.querySelector(`#${option}-${index}`);
	button.parentElement.remove();
	this._updateState();
}

/**
 * adds a item in a multi-select selected list.
 *
 * @private
 * @param {HTMLElement} optionEl - The option element to add.
 * @param {string} option - The text content of the option to add.
 * @param {number} index - The index of the option to add.
 * @returns {void}
 */
function addOption(optionEl, option, index) {
	this.numberOfSelectedOptions++;
	optionEl.classList.add('o-multi-select-option__selected');
	optionEl.setAttribute('aria-selected', 'true');
	const {li, button} = createOptionButton(option, index);
	this.selectedOptions.appendChild(li);
	this._updateState();

	button.addEventListener('click', () => {
		li.remove();
		optionEl.classList.remove('o-multi-select-option__selected');
		this.numberOfSelectedOptions--;
		this._updateState();
	});
}

/**
 * Creates a button for a multi-select option.
 *
 * @private
 * @param {string} option - The text content of the option.
 * @param {number} index - The index of the option.
 * @returns {{ li: HTMLElement, button: HTMLElement }} An object containing the newly created <li> and <button> elements.
 */
function createOptionButton(option, index) {
	const li = document.createElement('li');
	const button = document.createElement('button');
	button.id = `${option}-${index}`;
	button.setAttribute('aria-label', ` remove ${option} `);
	button.className = 'o-multi-select__selected-options-button';
	button.type = 'button';
	button.innerText = option;
	const span = document.createElement('span');
	span.classList = 'o-icons-icon o-icons-icon--cross';
	button.appendChild(span);
	li.appendChild(button);

	return {li, button};
}

/**
 * Creates an option element for a multi-select.
 *
 * @param {string} idBase - The base ID to use for the option element.
 * @param {string} option - The text content of the option.
 * @param {number} index - The index of the option.
 * @returns {HTMLElement} The newly created option element.
 */
export function createOption(idBase, option, index) {
	const optionEl = document.createElement('div');
	optionEl.setAttribute('role', 'option');
	optionEl.id = `${idBase}-${index}`;
	optionEl.className = 'o-multi-select-option';
	optionEl.setAttribute('aria-selected', 'false');
	optionEl.innerText = option;
	const tickSpan = document.createElement('span');
	tickSpan.className = 'o-multi-select-option-tick';
	optionEl.appendChild(tickSpan);

	return optionEl;
}

function handleOptionSelectionForSubmission() {
	const selectedOptions = Array.from(
		this.selectedOptions.querySelectorAll('li')
	).map(li => li.textContent);

	this.coreWrapper.querySelectorAll('option').forEach(option => {
		if (selectedOptions.includes(option.textContent)) {
			option.selected = true;
		} else {
			option.selected = false;
		}
	});
}
