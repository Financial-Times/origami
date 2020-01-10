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
	*		label: 'Input Label',
	*		element: <Element>
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
		const invalidInputs = this.elements.filter(e => !e.valid);

		const div = document.createElement('div');
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
		const fieldsInTheList = [];
		inputs.forEach(input => {
			// A field may contain multiple invalid inputs. E.g. a date field
			// has three text inputs for day, month, and year. Only show a
			// field in the error summary once if it has multiple invalid inputs
			if (fieldsInTheList.includes(input.field)) {
				return;
			}
			if (input.field) {
				fieldsInTheList.push(input.field);
			}
			// invalid input but with no label to create an error summary
			if (input.valid === false && !input.label) {
				console.warn(`Could not add an invalid input to the error summary. ` +
				`Check the input has a parent \`o-forms-field\` element with correct title markup. ` +
				`Or disable the error summary feature for this form with \`data-o-forms-error-summary="false"\`.`, input.element);
			}
			// invalid input, add to error summary
			if (input.valid === false && input.label) {
				let listItem = ErrorSummary.createItem(input);
				list.appendChild(listItem);
			}
		});

		return list;
	}

	/**
	 * Generate an item for the error summary
	 * @param {Object} [input] - The input object to construct an error summary item for
	 * @return {Element} - li
	 */
	static createItem(input) {
		const item = document.createElement('li');

		// Return a error summary item which links to the input if an id exists.
		if (input.id) {
			const itemAnchor = ErrorSummary.createAnchor(input);
			item.appendChild(itemAnchor);
			return item;
		}

		// If no id exist return an error summary item without a link.
		console.warn(`Could not link to an invalid input from the error summary. ` +
			`Add a unique id attribute to the input element.`, input.element);
		item.innerHTML = `<span>${input.label}</span>: ${input.error}`;
		return item;
	}

	/**
	 * Generate anchor element to point at invalid input
	 * @param {Object} [input] - The input object to construct an anchor for
	 * @return {Element} - a
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
