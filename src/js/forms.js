import Input from './input';
import State from './state';
import ErrorSummary from './error-summary';

class Forms {
	/**
	* Class constructor.
	* @param {HTMLElement} [formElement] - The form element in the DOM
	* @param {Object} [options={}] - An options object for configuring the form
	*/
	constructor(formElement, options) {
		if (formElement.nodeName !== 'FORM') {
			throw new Error(`[data-o-component="o-forms"] must be set on a form element. It is currently set on a '${formElement.nodeName.toLowerCase()}'.`);
		}

		this.form = formElement;
		this.formInputs = Array.from(this.form.elements, element => new Input(element));
		this.stateElements = [];

		this.opts = Object.assign({
			useBrowserValidation: false,
			errorSummary: true
		}, options || Forms.getDataAttributes(formElement));

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', true);
			this.form.addEventListener('submit', this);
		} else {
			this.form.removeAttribute('novalidate');
			this.submits = this.form.querySelectorAll('[type=submit]');
			this.submits.forEach(submit => {
				submit.addEventListener('click', this);
				submit.addEventListener('keydown', this);
			});
		}
	}

	/**
	 * Get the data attributes from the formElement. If the form is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} formElement - The message element in the DOM
	 */
	static getDataAttributes(formElement) {
		if (!(formElement instanceof HTMLElement)) {
			return {};
		}

		return Object.keys(formElement.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oMessage(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = formElement.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Event Handler
	 * @param {Object} event - The event emitted by element/window interactions
	 */
	handleEvent(e) {
		const RETURN_KEY = 13;
		if (e.type === 'click' || (e.type === 'keydown' && e.key === RETURN_KEY)) {
			if (this.form.checkValidity() === false) {
				this.validateFormInputs();
			}
		}

		if (e.type === 'submit') {
			e.preventDefault();
			let checkedElements = this.validateFormInputs();

			if (checkedElements.some(input => input.valid === false)) {
				if (this.opts.errorSummary) {
					if (this.summary) {
						this.summary = this.form.replaceChild(new ErrorSummary(checkedElements), this.summary);
					} else {
						this.summary = this.form.insertBefore(new ErrorSummary(checkedElements), this.form.firstElementChild);
					}
					this.summary.querySelector('a').focus();
				}

				return;
			}

			e.target.submit();
		}
	}

	/**
	* Form validation
	* Validates every element in the form and creates input objects for the error summary
	*/
	validateFormInputs () {
		return this.formInputs.map(element => {
			let valid = element.validate();
			let input = element.input;
			let field = input.closest('.o-forms-field');
			let label = field ? field.querySelector('.o-forms-title__main').innerHTML : null;
			let errorElement = field ? field.querySelector('.o-forms-input__error') : null;
			let error = errorElement ? errorElement.innerHTML : input.validationMessage;
			return {
				id: input.id,
				valid,
				error: !valid ? error : null,
				label
			};
		});
	}

	/**
	* Input state
	* @param {String} [name] - name of the input fields to add state to
	* @param {String} [state] - type of state to apply — one of 'saving', 'saved', 'none'
	* @param {boolean|object} [options] - an object of options display an icon only when true, hiding the status label
	*/

	/**
	 *
	 * @param {String} state - name of the input fields to add state to
	 * @param {String} name - type of state to apply — one of 'saving', 'saved', 'none'
	 * @param {Object} options - an object of options
	 * @param {String} options.iconLabel [null] - customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
	 * @param {Boolean} options.iconOnly [false] - when true display an icon only, hiding the status label
	 */
	setState(state, name, options = { iconLabel: null, iconOnly: false }) {
		if (typeof options !== 'object' || options === null || Array.isArray(options)) {
			throw new Error('The `options` argument must be an object');
		}

		let object = this.stateElements.find(item => item.name === name);
		if (!object) {
			object = {
				name,
				element: new State(this.form.elements[name], options)
			};

			this.stateElements.push(object);
		}
		object.element.set(state, options.iconLabel);
	}

	/**
	* Destroy form instance
	*/
	destroy() {
		if (!this.opts.useBrowserValidation) {
			this.form.removeEventListener('submit', this);
		} else {
			this.submits.forEach(submit => {
				submit.removeEventListener('click', this);
				submit.removeEventListener('keydown', this);
			});
		}
		this.form = null;
		this.formInputs.forEach(input => input.destroy());
		this.formInputs = null;
		this.stateElements = null;
		this.opts = null;
	}

	/**
	 * Initialise form component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a form in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the banners
	 */
	static init(rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLFormElement) {
			return new Forms(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-forms"]'), rootEl => new Forms(rootEl, opts));
	}
}

export default Forms;
