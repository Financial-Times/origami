/**
 * @typedef {object} ErrorSummaryElement
 * @property {HTMLInputElement} element - the associated element
 * @property {string} id - the input element's id
 * @property {boolean} valid - was the user's value valid?
 * @property {string=} error - the error message for this element
 * @property {HTMLElement=} field - a containing o-forms-field element
 * @property {HTMLLabelElement} label - an associated label element
 */

class ErrorSummary {
	/**
	 * Class constructor.
	 *
	 * @param {Array<ErrorSummaryElement>} [elements] - An array of objects, where each object describes an invalid input element
	 * @param {string} [headingMessage='There is a problem'] - A message to show in the header. It defaults to: 'There is a problem'
	 * @example
	 *	const elementsExample = [
	 *		{
	 *			id: 'text-input',
	 *			valid: false,
	 *			error: 'Please fill out this field',
	 *			label: 'Input Label',
	 *			element: <Element />,
	 *		},
	 *		{...},
	 *	];
	 *	new ErrorSummary(example, 'This is a heading message')
	 */
	constructor(elements, headingMessage) {
		this.elements = elements;
		this.headingMessage = headingMessage || 'There is a problem';
		const hasAnInverseField = elements.some(elem => {
			if (elem.field) {
				return elem.field.classList.contains('o-forms-field--inverse');
			} else {
				return false;
			}
		});
		this.inverse = hasAnInverseField;
		this.invalidInputs = [];

		return this.createSummary();
	}

	/**
	 * Generate Node to hold list of invalid inputs
	 *
	 * @returns {HTMLDivElement} - a div full of error messages
	 */
	createSummary() {
		const invalidInputs = this.elements.filter(e => !e.valid);

		const div = document.createElement('div');
		div.classList.add('o-forms__error-summary');
		if (this.inverse) {
			div.classList.add('o-forms__error-summary--inverse');
		}
		div.setAttribute('aria-labelledby', 'error-summary');
		div.setAttribute('role', 'alert');

		div.innerHTML = `<h4 class="o-forms__error-summary__heading" id="error-summary">${this.headingMessage}</h4>`;
		div.appendChild(ErrorSummary.createList(invalidInputs));
		return div;
	}

	/**
	 * Generate list of anchors
	 *
	 * @param {Array<ErrorSummaryElement>} inputs - element descriptors
	 * @returns {HTMLUListElement} - the list
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
				// eslint-disable-next-line no-console
				console.warn(
					`Could not add an invalid input to the error summary. ` +
						`Check the input has a parent \`o-forms-field\` element with correct title markup. ` +
						`Or disable the error summary feature for this form with \`data-o-forms-error-summary="false"\`.`,
					input.element
				);
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
	 *
	 * @param {object} [input] - The input object to construct an error summary item for
	 * @returns {Element} - li
	 */
	static createItem(input) {
		const item = document.createElement('li');
		item.classList.add('o-forms__error-summary__item');

		// Return a error summary item which links to the input if an id exists.
		if (input.id) {
			const itemAnchor = ErrorSummary.createAnchor(input);
			item.appendChild(itemAnchor);
			return item;
		}
		// If no id exist return an error summary item without a link.
		// eslint-disable-next-line no-console
		console.warn(
			`Could not link to an invalid input from the error summary. ` +
				`Add a unique id attribute to the input element.`,
			input.element
		);

		item.innerHTML = ErrorSummary._getItemContent(input);
		return item;
	}

	/**
	 * Generate anchor element to point at invalid input
	 *
	 * @param {object} [input] - The input object to construct an anchor for
	 * @returns {Element} - a
	 */
	static createAnchor(input) {
		const anchor = document.createElement('a');
		anchor.setAttribute('href', `#${input.id}`);
		anchor.addEventListener(
			'click',
			function (e) {
				e.preventDefault();
				document.getElementById(this.id).focus();
			}.bind(input)
		);
		anchor.innerHTML = ErrorSummary._getItemContent(input);
		return anchor;
	}

	/**
	 * @access private
	 * @param {Node} input - The input element which has an error
	 * @returns {string} - the html text for an error summary item
	 */
	static _getItemContent(input) {
		return (
			'<span class="o-forms__error-summary__item-overview">' +
			`${input.label}</span>: ` +
			`<span class="o-forms__error-summary__item-detail">${input.error}</span>`
		);
	}
}

export default ErrorSummary;
