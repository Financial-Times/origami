class Forms {

	constructor (FormEl, { testEvent = 'blur', applyValidState = false } = {}) {
		this.FormEl = FormEl;
		this.validFormEls = [
			HTMLFormElement,
			HTMLInputElement,
			HTMLSelectElement,
			HTMLButtonElement,
			HTMLTextAreaElement
		];

		const declaredTestEvent = this.FormEl.getAttribute('data-o-forms-test-event');
		const declaredApplyValidState = this.FormEl.getAttribute('data-o-forms-apply-valid-state');

		this.opts = {
			testEvent,
			applyValidState
		};

		if (declaredTestEvent) {
			this.opts.testEvent = declaredTestEvent;
		}

		if (declaredApplyValidState) {
			this.opts.applyValidState = declaredApplyValidState === 'true';
		}

		// o-forms should only be registered against a <form>
		// element. If not, return to prevent errors
		if (!(this.FormEl instanceof HTMLFormElement)) {
			this.destroy();
			return;
		}

		// Add the event listeners
		this.listeners();
	}

	listeners() {
		// Setup checkbox toggle functionality.
		// We listen for clicks as IE does not fire onchange until onblur.
		this.FormEl.addEventListener('click', this.handleClickEvent.bind(this), false);

		// Setup validity checks.
		if (this.opts.testEvent === 'submit') {
			// Safari reports the validity state, but doesn't
			// prevent form submits, so this listens to submits and
			// checks the inputs are valid before submission.
			this.FormEl.addEventListener('submit', this.validateForm.bind(this), false);

			// All other browsers will report each item invalid on
			// submit and prevent a form submission.
			this.findInputs().forEach(input => {
				input.addEventListener('invalid', this.handleInvalidEvent.bind(this), false);
			});
		} else {
			this.findInputs().forEach((input) => {
				input.addEventListener('blur', this.handleBlurEvent.bind(this), false);
			});
		}
	}

	validateForm(event) {
		event.preventDefault();

		const checkedInputs = this.findInputs().map(input => this.validateInput(input));

		if (checkedInputs.some((val) => val === false)) {
			return;
		}

		// Complete the form submission
		event.target.submit();
	}

	validateInput(input) {
		if (input.checkValidity() === false) {
			this.invalidInput(input);
			return false;
		}

		const oFormsEl = input.closest('.o-forms');
		const oFormsElExists = (oFormsEl instanceof HTMLElement);

		if (oFormsElExists && oFormsEl.classList.contains('o-forms--error')) {
			oFormsEl.classList.remove('o-forms--error');
		}

		if (this.opts && this.opts.applyValidState && oFormsElExists) {
			oFormsEl.classList.add('o-forms--valid');
		}

		return true;
	}

	invalidInput(input) { // eslint-disable-line class-methods-use-this
		const oFormsEl = input.closest('.o-forms');
		oFormsEl.classList.add('o-forms--error');
		oFormsEl.classList.remove('o-forms--valid');
		Forms.updateInputStatus(input, null); // Remove any form status e.g. "saving" or "saved".
	}

	handleInvalidEvent(event) {
		this.invalidInput(event.target);
	}

	handleBlurEvent(event) {
		this.validateInput(event.target);
	}

	handleClickEvent(event) { // eslint-disable-line class-methods-use-this
		const input = event.target;
		// Fire an event when toggle checkboxes are clicked (toggled).
		if (input && input.hasAttribute('data-o-form-toggle')) {
			input.dispatchEvent(new CustomEvent('oForms.toggled', {
				bubbles: true
			}));
		}
	}

	findInputs() {
		return Array.from(this.FormEl.querySelectorAll('input, select, textarea, button'));
	}

	destroy() {
		this.FormEl.removeEventListener('submit', this.validateForm.bind(this));
		this.findInputs().forEach(input => {
			input.removeEventListener('invalid', this.handleInvalidEvent.bind(this));
			input.removeEventListener('blur', this.handleBlurEvent.bind(this));
		});

		this.opts = undefined;
		this.validFormEls = undefined;
		this.FormEl = undefined;
	}

	static updateInputStatus (input, status) {
		if (!(input instanceof HTMLElement)) {
			throw new TypeError(`Expecting \`${input}\` to be an instance of "HTMLElement".`);
		}
		const oFormsElSelector = '.o-forms';
		const oFormsEl = input.closest(oFormsElSelector);
		const oFormsElExists = (oFormsEl instanceof HTMLElement);
		const validStatuses = [
			'saving',
			'saved'
		];
		// 1. Check the status can be updated.
		// 1a. Validate the given status is `null` or one of the whitelisted values.
		if (status && !validStatuses.includes(status)) {
			throw new Error(`"${status}" is not a valid status for a form input.`);
		}
		// 1b. Confirm the form field element is found.
		if (!oFormsElExists) {
			console.warn(`Could not find form field element "${oFormsElSelector}" for the given input.`, input);
			return false;
		}
		// 1c. Remove status if there is an error on the form field.
		if (oFormsElExists && status && oFormsEl.classList.contains('o-forms--error')) {
			console.warn(`Can not update the status of an input to "${status}" when the input has an active error. Removing status.`, input);
			Forms.updateInputStatus(input, null);
			return false;
		}
		// 2. Prepare status element.
		// 2a. Create status element if one does not exist.
		let statusElement = oFormsEl.querySelector(`.o-forms__status`);
		if (!statusElement) {
			statusElement = document.createElement("div");
			statusElement.classList.add('o-forms__status');
			oFormsEl.append(statusElement);
		}
		// 2b. Add aria-live attributes if not set.
		if (!statusElement.hasAttribute('aria-live')) {
			statusElement.setAttribute('aria-live', 'assertive');
			statusElement.setAttribute('role', 'alert');
		}
		// 3. Remove existing status.
		statusElement.setAttribute('aria-hidden', true);
		validStatuses.forEach((status) => {
			oFormsEl.classList.remove(`o-forms--${status}`);
		});
		// 4. Set the new status.
		if (status) {
			oFormsEl.classList.add(`o-forms--${status}`);
			statusElement.setAttribute('aria-hidden', false);
		}
		return true;
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && /\bo-forms\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Forms(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-forms"]'), rootEl => new Forms(rootEl, opts));
	}
}

export default Forms;
