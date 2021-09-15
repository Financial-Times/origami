class State {
	/**
	* Class constructor.
	* @param {RadioNodeList} [inputs] - A NodeList of radio input elements
	 * @param {Boolean|Object} opts - an object of options
	 * @param {String} options.iconOnly [null] - when true display an icon only, hiding the status label
	*/
	constructor(inputs, opts) {
		const radioInputs = inputs instanceof RadioNodeList;
		if (radioInputs) {
			this.inputs = inputs;
			this.parent = this.inputs[0].closest('.o-forms-input');
		} else {
			throw new Error('State can only be applied to `radio` type inputs.');
		}

		this._verify();
		this.opts = Object.assign({
			iconOnly: false
		}, opts);

		this.className = {
			saving: 'o-forms-input--saving',
			saved: 'o-forms-input--saved'
		};
	}

	/**
	* Create state element
	* @access private
	*/
	_generateStateEl() {
		this.stateEl = document.createElement('span');
		const classNames = this.opts.iconOnly ? ['o-forms-input__state', 'o-forms-input__state--icon-only'] : ['o-forms-input__state'];
		 this.stateEl.classList.add(...classNames);
		this.parent.append(this.stateEl);
	}

	/**
	* State setter
	* @param {String} state type of state to display
	* @param {String} label customise the label of the state, e.g. the saved state defaults to "Saving" but could be "Sent"
	*/
	set(state, label) {
		if (!this.stateEl) {
			this._generateStateEl();
		}

		if (state === 'saving') {
			this._saving(label);
		} else if (state === 'saved') {
			this._saved(label);
		} else if (state === 'none') {
			this._remove();
		} else {
			throw new Error(`${state} is not a recognised state, the options are 'saving', 'saved' or 'none'.`);
		}
	}

	/**
	* Saving state
	* @access private
	*/
	_saving(label) {
		// Remove other state classes.
		this.parent.classList.remove(this.className.saved);
		// Add saving state class.
		this.parent.classList.add(this.className.saving);
		// Add custom state label if given.
		// Default label copy is added via the CSS `content` attribute.
		this.stateEl.classList.toggle('o-forms-input__state--custom', Boolean(label));
		this.stateEl.textContent = label && !this.opts.iconOnly ? label : '';
		// When icon-only is set there is no copy when given a custom label so
		// add an aria label.
		this.stateEl.setAttribute('aria-label', label || 'Saving');
	}

	/**
	* Saved state
	* @access private
	*/
	_saved(label) {
		// Remove other state classes.
		this.parent.classList.remove(this.className.saving);
		// Add saved state class.
		this.parent.classList.add(this.className.saved);
		// Add custom state label if given.
		// Default label copy is added via the CSS `content` attribute.
		this.stateEl.classList.toggle('o-forms-input__state--custom', Boolean(label));
		this.stateEl.textContent = label && !this.opts.iconOnly ? label : '';
		// When icon-only is set there is no copy when given a custom label so
		// add an aria label.
		this.stateEl.setAttribute('aria-label', label || 'Saved');
	}

	/**
	* Remove state
	* @access private
	*/
	_remove() {
		this.parent.classList.remove(this.className.saving);
		this.parent.classList.remove(this.className.saved);
		this.parent.removeChild(this.stateEl);
		this.stateEl = null;
	}

	/**
	* Verify input parent
	* @access private
	*/
	_verify() {
		if (!this.parent.classList.contains('o-forms-input--radio-box')) {
			throw new Error('State can only be set on radio inputs with a box style (o-forms-input--radio-box).');
		} else if (this.parent.classList.contains('.o-forms--input-invalid')) {
			throw new Error('State cannot be set on an invalid input field.');
		}
	}
}

export default State;
