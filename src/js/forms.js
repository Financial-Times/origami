class Forms {

	constructor (FormEl, opts) {
		this.FormEl = FormEl;
		this.validFormEls = [
			HTMLFormElement,
			HTMLInputElement,
			HTMLSelectElement,
			HTMLButtonElement,
			HTMLTextAreaElement
		];

		const declaredTestEvent = this.FormEl.getAttribute('data-o-forms-test-event');

		if (declaredTestEvent) {
			opts = { testEvent: declaredTestEvent };
		}

		this.opts = opts || { testEvent: "blur" };

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
			this.findInputs(this.FormEl).map(input => {
				input.addEventListener('invalid', this.handleInvalidEvent.bind(this), false);
			});

			return;
		} else {
			this.findInputs().map((input) => {
				input.addEventListener('blur', this.handleBlurEvent.bind(this), false);
			});
		}
	}

	validateForm(event) {
		event.preventDefault();

		const checkedInputs = this.findInputs(this.FormEl).map(input => this.validateInput(input));

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

		if ((oFormsEl instanceof HTMLElement) && oFormsEl.classList.contains('o-forms--error')) {
			oFormsEl.classList.remove('o-forms--error');
		}

		return true;
	}

	invalidInput(input) {
		input.closest('.o-forms').classList.add('o-forms--error');
	}

	handleInvalidEvent(event) {
		const input = event.target;

		this.invalidInput(input);
	}

	handleBlurEvent(event) {
		const input = event.target;

		this.validateInput(input);
	}

	handleClickEvent(event) {
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
		this.findInputs(this.FormEl).map(input => {
			input.removeEventListener('invalid', this.handleInvalidEvent.bind(this));
			input.removeEventListener('blur', this.handleBlurEvent.bind(this));
		});

		this.opts = undefined;
		this.validFormEls = undefined;
		this.FormEl = undefined;
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
