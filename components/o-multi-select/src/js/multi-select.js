import {onInputKeyDown, toggleDropdown, updateCurrentElement} from './utils.js';
import {updateState} from './state.js';
import {handleOptionSelect, createOption} from './multi-select-options.js';

class MultiSelect {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [multiSelectEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor(multiSelectEl, options) {
		this.multiSelectEl = multiSelectEl;
		this._clearCore();

		this.options = Object.assign(
			{},
			{},
			options || {
				multiSelectOptions: MultiSelect.getDataAttributes(multiSelectEl),
			}
		);
		if (!this.options.multiSelectOptions.length > 0) {
			throw new Error(
				'The multi select component requires options to be passed in the config or as data attributes'
			);
		}
		this.comboEl = multiSelectEl.querySelector('[role=combobox]');
		this.comboBoxText = multiSelectEl.querySelector('.o-multi-select__input-text');
		this.listboxEl = multiSelectEl.querySelector('[role=listbox]');
		this.selectedOptions = multiSelectEl.querySelector(
			'.o-multi-select__selected-options'
		);
		// data
		this.idBase = this.comboEl.id;
		this.totalNumberOfOptions = this.options.multiSelectOptions.length;

		// state
		this.numberOfSelectedOptions = 0;
		this.activeIndex = 0;
		this.open = false;

		this.options.multiSelectOptions.forEach((option, index) => {
			const optionEl = createOption(this.idBase, option, index);
			optionEl.addEventListener('click', () => {
				this.handleOptionSelect(optionEl, option, index);
			});
			this.listboxEl.appendChild(optionEl);
		});

		this._bindHelperFunctionsAndEventListeners();
	}

	/**
	 * Binds the helper functions and event listeners for the MultiSelect instance and its children.
	 *
	 * @private
	 */
	_bindHelperFunctionsAndEventListeners() {
		this.toggleDropdown = toggleDropdown.bind(this);
		this.handleOptionSelect = handleOptionSelect.bind(this);
		this.updateCurrentElement = updateCurrentElement.bind(this);
		this._updateState = updateState.bind(this);
		this.comboEl.addEventListener('click', () => this.toggleDropdown());
		this.comboEl.addEventListener('keydown', onInputKeyDown.bind(this));
		this.comboEl.addEventListener('blur', () => {
			console.log('comboEl blur')
			requestAnimationFrame(() => {
				if (!this.listboxEl.contains(document.activeElement)) {
					this.toggleDropdown();
				}
			});
		});
		this.listboxEl.addEventListener('blur', () => {
			console.log('listbox blur')

			requestAnimationFrame(() => {
				if (this.comboEl !== document.activeElement) {
					this.toggleDropdown();
				}
			});
		});
	}

	/**
	 * Clears the core element of the MultiSelect instance.
	 *
	 * @private
	 */
	_clearCore() {
		const coreWrapper = this.multiSelectEl.querySelector(
			'.o-multi-select--core'
		);
		coreWrapper.style.display = 'none';
		const enhancedWrapper = this.multiSelectEl.querySelector(
			'.o-multi-select--enhanced'
		);
		enhancedWrapper.style.display = 'block';
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
	 *
	 * @param {(HTMLElement|string)} rootElement - The root element to initialise the component in, or a CSS selector for the root element
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
