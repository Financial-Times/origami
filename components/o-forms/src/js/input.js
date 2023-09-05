class Input {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [element] - An input element in the DOM
	 */
	constructor(element) {
		this.input = element;
		this.parent = element.closest('.o-forms-input');

		this.input.addEventListener('blur', this);
		this.input.addEventListener('input', this);

		this.className = {
			invalid: 'o-forms-input--invalid'
		};
	}

	/**
	 * Event Handler
	 *
	 * @param {object} event - The event emitted by element/window interactions
	 */
	handleEvent(event) {
		if (event.type === 'blur' || event.type === 'input') {
			this.validate(event);
		}
	}

	/**
	 * Input validation
	 * Conditions for input validation
	 *
	 * @param {FocusEvent} event [] - The event which has caused re-validation.
	 * @returns {boolean} - is the input valid?
	 */
	validate(event) {
		if (!this.parent) {
			return;
		}

		// validate date input
		if (this.parent.classList.contains('o-forms-input--date')) {
			return this._validateDate(event);
		}

		if (!this.input.validity.valid) {
			this.parent.classList.toggle(this.className.invalid, true);
			return false;

		} else if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
			this.parent.classList.toggle(this.className.invalid, false);
		}

		return true;
	}


	/**
	 * Date input validation
	 *
	 * @param {FocusEvent} event [] - The event which has caused re-validation.
	 * @returns {boolean} - is the input valid?
	 */
	_validateDate(event) {
		const day = this.parent.querySelector('input.o-forms-input__day-part');
		const month = this.parent.querySelector('input.o-forms-input__month-part');
		const year = this.parent.querySelector('input.o-forms-input__year-part');

		const dateInputs = [day, month, year].filter(Boolean);

		const activeElement = event && event.relatedTarget ? event.relatedTarget : document.activeElement;
		const focusOnDateInput = dateInputs.includes(activeElement);

		const invalidDateInputAttempt = dateInputs.find(input => {
			return !focusOnDateInput && !input.validity.valid;
		});

		const entireDateValid = dateInputs.every(input => input.validity.valid);
		if(entireDateValid) {
			this.parent.classList.toggle(this.className.invalid, false);
			return true;
		}

		// Do not set validity classes before the user
		// has moved on from the date field.
		if (invalidDateInputAttempt) {
			this.parent.classList.toggle(this.className.invalid, true);
			return false;
		}

		return false;
	}

	destroy() {
		this.input.removeEventListener('blur', this);
		this.input.removeEventListener('input', this);
		this.input = null;
	}
}

export default Input;
