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

		if (!this.input.validity.valid) {
			this.parent.classList.add(this.className.invalid);
			return false;

		} else if (this.input.validity.valid && this.parent.classList.contains(this.className.invalid)) {
			this.parent.classList.remove(this.className.invalid);
			this.parent.classList.add(this.className.valid);
		}

		return true;
	}

	destroy() {
		this.input.removeEventListener('blur', this);
		this.input.removeEventListener('input', this);
		this.input = null;
	}
}

export default Input;
