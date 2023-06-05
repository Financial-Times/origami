/**
 * Updates the state of the multi-select component based on the current number of selected options.
 * Updates the text of the comboBoxText element and the visibility of the selectedOptions element.
 *
 * @function
 * @name updateState
 * @memberof module:multiSelect
 * @instance
 * @returns {void}
 */
export function updateState() {
	if (this._numberOfSelectedOptions) {
		this._comboBoxText.innerText = '';
		this._selectedOptions.style.display = 'block';
		const comboElWidth = this._comboEl.offsetWidth;
		const sumOfChildrenWidth = calculateSumOfChildrenWidth(
			this._selectedOptions
		);

		if (sumOfChildrenWidth > comboElWidth * 0.9) {
			this._selectedOptions.classList.add('o-multi-select__visually-hidden');
			this._comboBoxText.innerText =
				this._numberOfSelectedOptions + ' options selected';

			// Set tabindex to -1 for all children of the selectedOptions element
			// to prevent them from being focusable when the selectedOptions element
			// is visually hidden.
			[...this._selectedOptions.children].forEach(element => {
				element.children[0].setAttribute('tabindex', '-1');
			});
		} else {
			this._selectedOptions.classList.remove('o-multi-select__visually-hidden');

			// Remove tabindex from all children of the selectedOptions element
			// to make them focusable when the selectedOptions element is visible.
			[...this._selectedOptions.children].forEach(element => {
				element.children[0].removeAttribute('tabindex');
			});
		}
	} else {
		this._selectedOptions.style.display = 'none';
		if (this._open) {
			this._comboBoxText.innerText = 'Select options below';
		} else {
			this._comboBoxText.innerText = 'Click to select options';
		}
	}
}

function calculateSumOfChildrenWidth(parentElement) {
	const selectedOptionsComputedStyles = getComputedStyle(parentElement);
	const {paddingLeft, paddingRight} = selectedOptionsComputedStyles;
	const sumOfChildrenWidthInitialValue =
		parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
	const sumOfChildrenWidth = [...parentElement.children]
		.map(el => el.offsetWidth)
		.reduce((prev, curr) => prev + curr, sumOfChildrenWidthInitialValue);
	return sumOfChildrenWidth;
}
