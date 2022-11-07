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
			invalid: 'o-forms-input--invalid',
			valid: 'o-forms-input--valid'
		};
	}

	/**
	 * Event Handler
	 *
	 * @param {object} event - The event emitted by element/window interactions
	 */
	handleEvent(event) {
		if (event.type === 'blur' || event.type === 'input') {
			this.validate(event.target);
		}
	}

	/**
	 * Input validation
	 * Conditions for input validation
	 *
	 * @returns {boolean} - is the input valid?
	 */
	validate() {
		if (!this.parent) {
			return;
		}

		// validate date input
		// Date input is a special case as it contains 3 input elements and needs to be validated as a group
		// Which is not responsibility of input element itself but not make braking changes to o-forms
		// input class will handle date input validation
		if (this.parent.classList.contains('o-forms-input--date')) {
			return this._validateDate();
		}

		if (!this.input.validity.valid) {
			this._toggleParentClasses("invalid");
			return false;

		} else if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
			this._toggleParentClasses("valid");
		}

		return true;
	}


	_validateDate() {
		const elements = this.parent.querySelectorAll('input');

		if (!elements.length > 0 ) {
			return console.error("Make sure 'o-forms-input--date' element contains input elements for date, month and year.");
		}
		const [date, month, year] = Array.from(elements).map(element => element.value);
		const dateObj = Date.parse(`${year}/${month}/${date}`);
		if (isNaN(dateObj)) {
			this._toggleParentClasses("invalid");
			return false;
		}

		const isDateInputValid = /(0[1-9]|1[0-9]|2[0-9]|3[01])/.test(date);
		const isMonthInputValid = /(0[1-9]|1[012])/.test(month);
		const isYearInputValid = /[0-9]{4}/.test(year);
		const dateFormatIsInvalid = !isDateInputValid || !isMonthInputValid || !isYearInputValid;
		if (dateFormatIsInvalid) {
			this._toggleParentClasses("invalid");
			return false;
		}

		this._toggleParentClasses("valid");
		return true;
	}

	_toggleParentClasses(state) {
		if (state === "valid" ) {
			this.parent.classList.remove(this.className.invalid);
			this.parent.classList.add(this.className.valid);
		} else {
			this.parent.classList.remove(this.className.valid);
			this.parent.classList.add(this.className.invalid);
		}
	}

	destroy() {
		this.input.removeEventListener('blur', this);
		this.input.removeEventListener('input', this);
		this.input = null;
	}
}

export default Input;
