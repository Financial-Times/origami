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
	if (this.numberOfSelectedOptions) {
		this.comboBoxText.innerText = '';
		this.selectedOptions.style.display = 'block';
		const comboElWidth = this.comboEl.offsetWidth;
		const sumOfChildrenWidth = calculateSumOfChildrenWidth(
			this.selectedOptions
		);
		if (sumOfChildrenWidth > comboElWidth * 0.9) {
			this.selectedOptions.classList.add('o-multi-select__visually-hidden');
			this.comboBoxText.innerText =
				this.numberOfSelectedOptions + ' options selected';
		} else {
			this.selectedOptions.classList.remove('o-multi-select__visually-hidden');
		}
	} else {
		this.selectedOptions.style.display = 'none';
		if (this.open) {
			this.comboBoxText.innerText = 'Select options below';
		} else {
			this.comboBoxText.innerText = 'Click to select options';
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
