class MultiSelect {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [multiSelectEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor(multiSelectEl, options) {
		this.multiSelectEl = multiSelectEl;
		this.clearCore();

		this.inputEl = multiSelectEl.querySelector('input');
		this.listboxEl = multiSelectEl.querySelector('[role=listbox]');
		this.selectedOptions = multiSelectEl.querySelector(
			'.o-multi-select__selected-options'
		);
		this.clearButton = multiSelectEl.querySelector('.o-multi-select__clear');
		this.clearButton.addEventListener('click', () => {
			this.numberOfSelectedOptions = 0;
			[...this.selectedOptions.children].forEach(el => el.remove());
			[
				...document.querySelectorAll('.o-multi-select-option__selected'),
			].forEach(el => el.classList.remove('o-multi-select-option__selected'));
			this._updateInputState();
		});

		// data
		this.idBase = this.inputEl.id;

		// state
		this.numberOfSelectedOptions = 0;
		this.activeIndex = 0;
		this.open = false;

		this.inputEl.parentElement.addEventListener('mouseleave', () => {
			this.listboxEl.style.display = 'none';
			this.clearButton.style.display = 'none';
			this.open = false;
			this._updateInputState();
		});
		this.inputEl.addEventListener('click', () => {
			if (!this.open) {
				this.listboxEl.style.display = 'block';
				this.open = true;
			} else {
				this.listboxEl.style.display = 'none';
				this.open = false;
			}
			this._updateInputState();
		});

		this.options = Object.assign(
			{},
			{},
			options || {
				multiSelectOptions: MultiSelect.getDataAttributes(multiSelectEl),
			}
		);
		this.options.multiSelectOptions.forEach((option, index) => {
			const optionEl = document.createElement('div');
			optionEl.setAttribute('role', 'option');
			optionEl.id = `${this.idBase}-${index}`;
			optionEl.className = 'o-multi-select-option';
			optionEl.setAttribute('aria-selected', `${index === 0}`);
			optionEl.innerText = option;

			optionEl.addEventListener('click', () => {
				this.onOptionClick(optionEl, option, index);
			});
			this.listboxEl.appendChild(optionEl);
		});
	}

	_updateInputState() {
		if (this.numberOfSelectedOptions) {
			if (this.open) {
				this.clearButton.style.display = 'block';
			}
			this.inputEl.placeholder = '';
			this.selectedOptions.style.display = 'block';
			const inputElWidth = this.inputEl.offsetWidth; // this needs to change and take clear button into account
			const selectedOptionsComputedStyles = getComputedStyle(
				this.selectedOptions
			);
			const {paddingLeft, paddingRight} = selectedOptionsComputedStyles;
			const sumOfChildrenWidthInitialValue =
				parseInt(paddingLeft, 10) + parseInt(paddingRight, 10);
			const sumOfChildrenWidth = [...this.selectedOptions.children]
				.map(el => el.offsetWidth)
				.reduce((prev, curr) => prev + curr, sumOfChildrenWidthInitialValue);

			if (sumOfChildrenWidth > inputElWidth * 0.9) {
				this.selectedOptions.classList.add('o-multi-select__visually-hidden');
				this.inputEl.placeholder =
					this.numberOfSelectedOptions + ' options selected';
			} else {
				this.selectedOptions.classList.remove(
					'o-multi-select__visually-hidden'
				);
			}
		} else {
			this.selectedOptions.style.display = 'none';
			this.clearButton.style.display = 'none';
			if (this.open) {
				this.inputEl.placeholder = 'Select options below';
			} else {
				this.inputEl.placeholder = 'Click to select options';
			}
		}
	}

	clearCore() {
		const coreWrapper = this.multiSelectEl.querySelector(
			'.o-multi-select_core'
		);
		coreWrapper.style.display = 'none';
		const enhancedWrapper = this.multiSelectEl.querySelector(
			'.o-multi-select_enhanced'
		);
		enhancedWrapper.style.display = 'block';
	}

	onOptionClick(optionEl, option, index) {
		if (optionEl.classList.contains('o-multi-select-option__selected')) {
			optionEl.classList.remove('o-multi-select-option__selected');
			this.numberOfSelectedOptions--;
			const button = this.selectedOptions.querySelector(`#${option + index}`);
			button.parentElement.remove();
			this._updateInputState();
			return;
		}

		this.numberOfSelectedOptions++;
		optionEl.classList.add('o-multi-select-option__selected');
		// create a button with remove icon
		const li = document.createElement('li');
		const button = document.createElement('button');
		button.id = option + index;
		button.className = 'o-multi-select__selected-options-button';
		button.type = 'button';
		button.innerText = option;
		const span = document.createElement('span');
		span.classList = 'o-icons-icon o-icons-icon--cross';
		button.appendChild(span);
		li.appendChild(button);
		this.selectedOptions.appendChild(li);
		this._updateInputState();

		button.addEventListener('click', () => {
			li.remove();
			optionEl.classList.remove('o-multi-select-option__selected');
			this.numberOfSelectedOptions--;
			this._updateInputState();
		});
	}

	/**
	 * Get the data attributes from the MultiSelectElement. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @param {HTMLElement} multiSelectEl - The component element in the DOM
	 * @returns {Object} An options object which can be used for configuring the component
	 */
	static getDataAttributes(multiSelectEl) {
		if (!(multiSelectEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(multiSelectEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oMultiSelect(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(
				/^oMultiSelect(\w)(\w+)$/,
				(m, m1, m2) => m1.toLowerCase() + m2
			);
			const value = multiSelectEl.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options.options.split(',');
		}, {});
	}
	/**
	 * Initialise o-multi-select component/s.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {MultiSelect|MultiSelect[]} The newly constructed MultiSelect components
	 */
	static init(rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (
			rootElement instanceof HTMLElement &&
			rootElement.matches('[data-o-component=o-multi-select]')
		) {
			return new MultiSelect(rootElement, options);
		}
		return Array.from(
			rootElement.querySelectorAll('[data-o-component="o-multi-select"]'),
			rootEl => new MultiSelect(rootEl, options)
		);
	}
}

export default MultiSelect;
