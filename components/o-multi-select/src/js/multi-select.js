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

		// data
		this.idBase = this.inputEl.id;

		// state
		this.activeIndex = 0;
		this.open = false;

		document.addEventListener('click', e => {
			if (
				!e.target.classList.contains('o-multi-select-option') &&
				e.target !== this.inputEl
			) {
				this.listboxEl.style.display = 'none';
				this.open = false;
			}
		});
		this.inputEl.addEventListener('click', () => {
			if (!this.open) {
				this.listboxEl.style.display = 'block';
				this.open = true;
				this.inputEl.placeholder = 'Select options below';
				return;
			}
			this.listboxEl.style.display = 'none';
			this.open = false;
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
			// optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

			this.listboxEl.appendChild(optionEl);
		});
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
			const button = this.selectedOptions.querySelector(`#${option + index}`);
			button.parentElement.remove();
			if (this.selectedOptions.children.length < 1) {
				this.selectedOptions.style.display = 'none';
			}
			return;
		}
		this.selectedOptions.style.display = 'block';
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
		button.addEventListener('click', () => {
			li.remove();
			optionEl.classList.remove('o-multi-select-option__selected');
			if (this.selectedOptions.children.length < 1) {
				this.selectedOptions.style.display = 'none';
			}
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
