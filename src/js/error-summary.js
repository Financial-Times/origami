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
		div.innerHTML = '<h4 class="o-forms__error-summary__heading" id="error-summary">There is a problem</h4>';

		div.appendChild(ErrorSummary.createList(invalidInputs));
		return div;
	}

	/**
	 * Generate list of anchors
	 */
	static createList(inputs) {
		const list = document.createElement('ul');
		list.classList.add('o-forms__error-summary__list');
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
				const listItem = ErrorSummary.createItem(input);
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
		item.classList.add('o-forms__error-summary__item');

		// Return a error summary item which links to the input if an id exists.
		if (input.id) {
			const itemAnchor = ErrorSummary.createAnchor(input);
			return item.appendChild(itemAnchor);
		}
		// If no id exist return an error summary item without a link.
		console.warn(`Could not link to an invalid input from the error summary. ` +
			`Add a unique id attribute to the input element.`, input.element);

		item.innerHTML = ErrorSummary._getItemContent(input);
		return item;
	}

	/**
	 * Generate anchor element to point at invalid input
	 * @param {Object} [input] - The input object to construct an anchor for
	 * @return {Element} - a
	 */
	static createAnchor(input) {
		const anchor = document.createElement('a');
		anchor.setAttribute('href', `#${input.id}`);
		anchor.addEventListener('click', function(e) {
			e.preventDefault();
			document.getElementById(this.id).focus();
		}.bind(input));
		anchor.innerHTML = ErrorSummary._getItemContent(input);
		return anchor;
	}

	/**
	 * @access private
	 * @param {Node} input - The input element which has an error
	 * @return {Node}
	 */
	static _getItemContent(input) {
		return '<span class="o-forms__error-summary__item-overview">' +
			`${input.label}</span>: ` +
			`<span class="o-forms__error-summary__item-detail">${input.error}</span>`;
	}
}

export default ErrorSummary;
