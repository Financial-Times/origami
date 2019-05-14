class ErrorSummary {
	/**
	* Class constructor.
	* @param {Array} [elements] - An array of objects, where each object describes an invalid input element
	* @example
	* const example = [
	*	{
	*		id: 'text-input',
	*		valid: false,
	*		error: 'Please fill out this field'
	*		label: 'Input Label'
	*	}
	*	...
	*	]
	*	new ErrorSummary(example)
	*/
	constructor(elements) {
		this.elements = elements;
		this.invalidInputs = [];

		return this.createSummary();
	}

	/**
	 * Generate Node to hold list of invalid inputs
	 */
	createSummary() {
		let invalidInputs = [];
		this.elements.forEach(element => {
			if (element.valid) {
				return;
			}
			invalidInputs.push(element);
		});

		let div = document.createElement('div');
		div.classList.add('o-forms__error-summary');
		div.setAttribute('aria-labelledby', 'error-summary');
		div.setAttribute('role', 'alert');
		div.innerHTML = '<h4 id="error-summary">There is a problem</h4>';

		div.appendChild(ErrorSummary.createList(invalidInputs));
		return div;
	}

	/**
	 * Generate list of anchors
	 */
	static createList(inputs) {
		let list = document.createElement('ul');
		inputs.forEach(input => {
			if (input.id && !input.valid) {
				let listItem = document.createElement('li');
				let anchor = ErrorSummary.createAnchor(input);
				listItem.appendChild(anchor);
				list.appendChild(listItem);
			}
		});

		return list;
	}

	/**
	 * Generate anchor element to point at invalid input
	 * @param {Object} [input] - The input object to construct an anchor for
	 */
	static createAnchor(input) {
		let anchor = document.createElement('a');
		anchor.setAttribute('href', `#${input.id}`);
		anchor.innerHTML = `<span>${input.label}</span>: ${input.error}`;
		anchor.addEventListener('click', (e) => {
			e.preventDefault();
			document.querySelector(e.target.hash).focus();
		});
		return anchor;
	}
}

export default ErrorSummary;
