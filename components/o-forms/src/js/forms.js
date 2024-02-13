import Input from './input.js';
import State from './state.js';
import ErrorSummary from './error-summary.js';

class Forms {

	/**
	 * @typedef {Object} FormsOptions - An options object for configuring the form.
	 * @property {boolean} [errorSummary=true] - Display an error summary at the top of the form as part of `o-forms` validation.
	 * @property {boolean} [preventSubmit=false] - Prevent form submission after `o-froms` validation – see the `oForms.submit` event to manually submit the form after validation. This does not apply when `useBrowserValidation` is true.
	 * @property {boolean} [useBrowserValidation=false] - Do not use `o-forms` validation, rely on the browser's built-in validation instead.
	 */

	/**
	 * @typedef {Event} FormsSubmitEvent - An event emitted when the form is submitted by the userand `o-forms` has completed validation.
	 * @property {object} detail - The event detail.
	 * @property {object} detail.instance  - The instance of `o-forms`.
	 * @property {boolean} detail.valid  - The validity of the `o-forms` instance.
	 */

	/**
	 * Class constructor.
	 *
	 * @param {HTMLFormElement} [formElement] - The form element in the DOM
	 * @param {FormsOptions} [options={}] - An options object for configuring the form
	 */
	constructor(formElement, options) {
		if (!formElement || formElement.nodeName !== 'FORM') {
			throw new Error(`[data-o-component="o-forms"] must be set on a form element. It is currently set on a '${formElement.nodeName.toLowerCase()}'.`);
		}

		this.form = formElement;
		this._formInputsCache = Array.from(this.form.elements, element => new Input(element));
		this.stateElements = [];

		this.opts = Object.assign({
			useBrowserValidation: false,
			preventSubmit: false,
			errorSummary: true
		}, options || Forms.getDataAttributes(formElement));

		if(this.opts.useBrowserValidation && this.opts.preventSubmit) {
			throw new Error('The o-forms `preventSubmit` option only applies when the `useBrowserValidation` option is `false`.');
		}

		if (!this.opts.useBrowserValidation) {
			this.form.setAttribute('novalidate', '');
			this.form.addEventListener('submit', this);
			this.form.addEventListener('oForms.submit', (e) => {
				if(e.detail.valid && !this.opts.preventSubmit) {
					this.form.submit();
				}
			});
		} else {
			this.form.removeAttribute('novalidate');
			this.submits = this.form.querySelectorAll('[type=submit]');
			this.submits.forEach(submit => {
				submit.addEventListener('click', this);
				submit.addEventListener('keydown', this);
			});
		}
	}
	get formInputs() {
		if(!this.form) {
			return [];
		}
		const formElements = Array.from(this.form.elements);
		const inputsToRemove = this._formInputsCache.filter(input => !formElements.includes(input.input));
		const elementsToAdd = formElements.filter(element => !this._formInputsCache.find((input) => input.input === element));
		inputsToRemove.forEach(input => input.destroy());
		this._formInputsCache = [
			...this._formInputsCache.filter(input => !inputsToRemove.includes(input)),
			...elementsToAdd.map(element => new Input(element))
		];
		return this._formInputsCache;
	}


	/**
	 * Get the data attributes from the formElement. If the form is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @param {HTMLElement} formElement - The message element in the DOM
	 * @returns {Object.<string, any>} - The options
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
	 *
	 * @param {object} event - The event emitted by element/window interactions
	 * @returns {void}
	 */
	handleEvent(event) {
		const RETURN_KEY = 13;
		if (event.type === 'click' || event.type === 'keydown' && event.key === RETURN_KEY) {
			if (this.form.checkValidity() === false) {
				this.validateFormInputs();
			}
		}

		if (event.type === 'submit') {
			event.preventDefault();
			const checkedElements = this.validateFormInputs();
			const formInvalid = checkedElements.some(input => input.valid === false);

			if (formInvalid) {
				// Display error summary.
				if (this.opts.errorSummary) {
					if (this.summary) {
						const newSummary = new ErrorSummary(checkedElements, this.opts.errorSummaryMessage);
						this.form.replaceChild(newSummary, this.summary);
						this.summary = newSummary;
					} else {
						this.summary = this.form.insertBefore(new ErrorSummary(checkedElements, this.opts.errorSummaryMessage), this.form.firstElementChild);
					}
					const firstErrorAnchor = this.summary.querySelector('a');
					if (firstErrorAnchor) {
						firstErrorAnchor.focus();
					}
				}
			}

			/**
			 * @type {FormsSubmitEvent}
			 */
			const oFormsSubmitEvent = new CustomEvent('oForms.submit', {
				detail: {
					instance: this,
					valid: !formInvalid
				},
				cancelable: true,
				bubbles: true
			});
			this.form.dispatchEvent(oFormsSubmitEvent);
		}
	}
	/**
	 * @typedef {object} ErrorSummaryElement
	 * @property {HTMLInputElement} element - the associated element
	 * @property {string} id - the input element's id
	 * @property {boolean} valid - was the user's value valid?
	 * @property {string=} error - the error message for this element
	 * @property {HTMLElement=} field - a containing o-forms-field element
	 * @property {HTMLLabelElement} label - an associated label element
	 */

	/**
	 * Form validation
	 * Validates every element in the form and creates input objects for the error
	summary
	 *
	 * @returns {Array<ErrorSummaryElement>} - list of elements for the error summary
	 */
	validateFormInputs() {
		return this.formInputs.map(oFormInput => {
			const valid = oFormInput.validate();
			const input = oFormInput.input;
			const field = input.closest('.o-forms-field');
			const labelElement = field ? field.querySelector('.o-forms-title__main') : null;
			// label is actually the field title, not for example the label of a single checkbox.
			// this is used to generate an error summary
			const label = labelElement ? labelElement.textContent : null;
			const errorElement = field ? field.querySelector('.o-forms-input__error') : null;
			const error = errorElement ? errorElement.textContent : input.validationMessage;
			return {
				id: input.id,
				valid,
				error: !valid ? error : null,
				label,
				field,
				element: input
			};
		});
	}

	/**
	 * Input state
	 *
	 * @param {string} [name] - name of the input fields to add state to
	 * @param {string} [state] - type of state to apply — one of 'saving', 'saved', 'none'
	 * @param {boolean|object} [options] - an object of options display an icon only when true, hiding the status label
	 */

	/**
	 *
	 * @param {string} state - name of the input fields to add state to
	 * @param {string} name - type of state to apply — one of 'saving', 'saved', 'none'
	 * @param {object} options - an object of options
	 * @param {string} options.iconLabel [null] - customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
	 * @param {boolean} options.iconOnly [false] - when true display an icon only, hiding the status label
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
		this._formInputsCache.forEach(input => input.destroy());
		this._formInputsCache = [];
		this.stateElements = null;
		this.opts = null;
	}

	/**
	 * Initialise form component.
	 *
	 * @param {(HTMLElement | string)} rootEl - The root element to intialise a form in, or a CSS selector for the root element
	 * @param {object} [opts={}] - An options object for configuring the banners
	 * @returns {Forms | Forms[]} - The newly instantiated Form or Forms
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
