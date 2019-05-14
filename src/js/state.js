class State {
	/**
	* Class constructor.
	* @param {RadioNodeList} [inputs] - A NodeList of radio input elements
	*/
	constructor(inputs, opts) {
		let radioInputs = inputs instanceof RadioNodeList;
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
		let classNames = this.opts.iconOnly ? ['o-forms-input__state', 'o-forms-input__state--icon-only'] : ['o-forms-input__state'];
		 this.stateEl.classList.add(...classNames);
		this.parent.append(this.stateEl);
	}

	/**
	* State setter
	* @param {String} [state] type of state to display
	*/
	set(state) {
		if (!this.stateEl) {
			this._generateStateEl();
		}

		if (state === 'saving') {
			this._saving();
		} else if (state === 'saved') {
			this._saved();
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
	_saving() {
		this.parent.classList.add(this.className.saving);
	}

	/**
	* Saved state
	* @access private
	*/
	_saved() {
		this.parent.classList.replace(this.className.saving, this.className.saved);
	}

	/**
	* Remove state
	* @access private
	*/
	_remove() {
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