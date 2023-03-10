import {
	onComboBoxKeyDown,
	toggleDropdown,
	updateCurrentElement,
	_removeCurrentClass,
} from './utils.js';
import {updateState} from './state.js';
import {handleOptionSelect, createOption} from './multi-select-options.js';
import {uidBuilder} from "@financial-times/o-utils/uniqueid.js";
const uniqueId = uidBuilder('o-multi-select');

class MultiSelect {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [multiSelectEl] - The component element in the DOM
	 * @param {Object} options - An options object for configuring the component ({multiselectOptions: ['option1', 'option2']})
	 */
	constructor(multiSelectEl, options) {
		this.multiSelectEl = multiSelectEl;
		this.coreWrapper = this._getCoreWrapper();
		this.options = Object.assign(
			{},
			options || {
				multiSelectOptions: this._getCoreOptions()
			}
		);

		this._clearCore();

		if (!this.options.multiSelectOptions.length > 0) {
			throw new Error(
				'The multi select component requires options to be passed in the config or as data attributes'
			);
		}
		this.comboEl = multiSelectEl.querySelector('[role=combobox]');
		this.comboBoxText = multiSelectEl.querySelector(
			'.o-multi-select__combobox-text'
		);
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
				optionEl.classList.remove('o-multi-select-option__current');
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
		this.comboEl.addEventListener('click', () => {
			this.toggleDropdown();
			if (this.open) {
				_removeCurrentClass(this.multiSelectEl);
			}
		});
		this.comboEl.addEventListener('keydown', onComboBoxKeyDown.bind(this));
		this.comboEl.addEventListener('blur', () => {
			requestAnimationFrame(() => {
				if (!this.listboxEl.contains(document.activeElement)) {
					this.toggleDropdown(false);
				}
			});
		});
		this.listboxEl.addEventListener('blur', () => {
			requestAnimationFrame(() => {
				if (this.comboEl !== document.activeElement) {
					this.toggleDropdown(false);
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
		const selectName = this.coreWrapper.attributes.getNamedItem('name');
		const selectId = this.coreWrapper.attributes.getNamedItem('id');

		if (!selectName || !selectId) {
			throw new Error('Select element must have attributes name and id defined.');
		}

		const labelId = uniqueId('selected');
		const labels = [...this.coreWrapper.labels].map((label) => label.id).join(' ');

		this.coreWrapper.insertAdjacentHTML('afterend', `<div class="o-multi-select__enhanced">
    <ul
            class="o-multi-select__selected-options"
            id="labelId"
    ></ul>
    <div class="o-multi-select__combobox-wrapper">
        <div
                class="o-multi-select__combobox"
                id="${selectId}"
                name=${selectName}
                role="combobox"
                aria-activedescendant=""
                aria-labelledby="${labels} ${labelId}"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-owns="o-multi-select-listbox"
                tabindex="0"
        >
            <span class="o-multi-select__combobox-text"> Click to select options </span>
        </div>
    </div>
    <div
            class="o-multi-select__dropdown-menu"
            id="o-multi-select-listbox"
            role="listbox"
            aria-label="multi select options"
            aria-multiselectable="true"
            tabindex="-1"
    ></div>
</div>
`);
		this.coreWrapper.remove();
	}

	/**
	 * Returns the core select element from the multi select element.
	 *
	 * @private
	 * @returns {HTMLElement} The core wrapper HTML Element.
	 */
	_getCoreWrapper() {
		const coreWrapper = this.multiSelectEl.querySelectorAll(
			"select"
		);
		if (coreWrapper.length > 1) {
			throw new Error('Only one select element must be provided for o-multi-select');
		}
		if (coreWrapper.length === 0) {
			throw new Error('A select element must be provided in o-multi-select');
		}
		return coreWrapper[0];
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
	 * @param {Object} options - An options object for configuring the component ({multiselectOptions: ['option1', 'option2']})
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

	/**
	 * Returns the options from the core select component.
	 *
	 * @private
	 * @returns {string[]} Array of multi-select options.
	 */
	_getCoreOptions() {
		const options = this.coreWrapper.querySelectorAll('option');

		return [...options].map((option) => option.getAttribute('value'));
	}

}

export default MultiSelect;
