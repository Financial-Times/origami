class Forms {

	constructor (FormEl, opts) {
		this.FormEl = FormEl;
		this.opts = opts || { testEvent: "blur" };
		this.validFormEls = [
			HTMLFormElement,
			HTMLInputElement,
			HTMLSelectElement,
			HTMLButtonElement,
			HTMLTextAreaElement
		];

		console.log('hello forms!');

		// Find the closest <form> element unless
		// the constructed element is a <form> element already
		this.ParentForm = (this.FormEl instanceof HTMLFormElement) ? this.FormEl : this.FormEl.closest('form');

		// Add the event listeners
		this.listeners();
	}

	// element.closest(form) - to find the form element
	// Events: blur or submit

	listeners() {
		if (this.opts.testEvent === 'submit') {
			this.ParentForm.addEventListener('submit', this.checkAllInputs, false);
			return;
		}

		// If the constructed element is a form element add
		// a listener on blur. Otherwise find any child inputs
		if (this.isValidFormElement()) {
			this.FormEl.addEventListener('blur', this.checkSingleInput, false);
		} else {
			this.findInputs().map((input) => {
				input.addEventListener('blur', this.checkSingleInput, false);
			});
		}
	}

	checkAllInputs(event) {
		event.preventDefault();

		console.log('hello');
	}

	checkSingleInput(event) {
		console.log('hello single');
	}

	checkInputValidity(input) {
		console.log("input validity", input);
	}

	isValidFormElement() {
		return this.validFormEls.some((element) => this.FormEl instanceof element);
	}

	findInputs() {
		return Array.from(this.FormEl.querySelectorAll('input, select, textarea, button, form'));
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
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-forms"]'), rootEl => new Forms(rootEl, opts));
	}
}

export default Forms;
