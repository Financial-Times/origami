import {
	onComboBoxKeyDown,
	toggleDropdown,
	updateCurrentElement,
	_removeCurrentClass,
	checkForDuplicates
} from './utils.js';
import {updateState} from './state.js';
import {handleOptionSelect, createOption, addSelectedOption} from './multi-select-options.js';
import {uidBuilder} from "@financial-times/o-utils";

const uniqueId = uidBuilder('o-multi-select');

class MultiSelect {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [multiSelectEl] - The component element in the DOM
	 */
	constructor(multiSelectEl) {
		this.multiSelectEl = multiSelectEl;
		this._coreWrapper = this._getCoreWrapper();
		this._options = this._getCoreOptions();

		this._clearCore();
		checkForDuplicates(this._options);

		if (!this._options.length > 0) {
			throw new Error(
				'The multi select component requires option elements to be defined in the <select> tag.'
			);
		}
		this._comboEl = this.multiSelectEl.querySelector('[role=combobox]');
		this._comboBoxText = this.multiSelectEl.querySelector(
			'.o-multi-select__combobox-text'
		);
		this._listboxEl = this.multiSelectEl.querySelector('[role=listbox]');
		this._selectedOptions = this.multiSelectEl.querySelector(
			'.o-multi-select__selected-options'
		);
		// data
		this._idBase = this._comboEl.id;
		this._totalNumberOfOptions = this._options.length;

		// state
		this._numberOfSelectedOptions = 0;
		this._activeIndex = 0;
		this._open = false;

		this._bindHelperFunctionsAndEventListeners();

		this._options.forEach((option, index) => {
			const selected = this._coreOptions[index].selected;
			const optionEl = createOption(this._idBase, option, index, selected);
			optionEl.addEventListener('click', () => {
				this._handleOptionSelect(optionEl, option, index);
				optionEl.classList.remove('o-multi-select-option__current');
			});
			this._listboxEl.appendChild(optionEl);
			if (selected) {
				addSelectedOption.call(this, optionEl, option, index);
			}
		});
	}

	/**
	 * Binds the helper functions and event listeners for the MultiSelect instance and its children.
	 *
	 * @private
	 */
	_bindHelperFunctionsAndEventListeners() {
		this._toggleDropdown = toggleDropdown.bind(this);
		this._handleOptionSelect = handleOptionSelect.bind(this);
		this._updateCurrentElement = updateCurrentElement.bind(this);
		this._updateState = updateState.bind(this);
		this._comboEl.addEventListener('click', () => {
			this._toggleDropdown();
			if (this._open) {
				_removeCurrentClass(this.multiSelectEl);
			}
		});
		this._comboEl.addEventListener('keydown', onComboBoxKeyDown.bind(this));
		this._comboEl.addEventListener('blur', () => {
			requestAnimationFrame(() => {
				if (!this._listboxEl.contains(document.activeElement)) {
					this._toggleDropdown(false);
				}
			});
		});
		this._listboxEl.addEventListener('blur', () => {
			requestAnimationFrame(() => {
				if (this._comboEl !== document.activeElement) {
					this._toggleDropdown(false);
				}
			});
		});
		this._windowResizelistener = this._updateState.bind(this);
		window.addEventListener('resize', this._windowResizelistener);
	}

	/**
	 * Clears the core element of the MultiSelect instance.
	 *
	 * @private
	 */
	_clearCore() {
		const selectName = this._coreWrapper.attributes.getNamedItem('name').value;
		const selectId = this._coreWrapper.attributes.getNamedItem('id').value;
		if (!selectName || !selectId) {
			throw new Error('Select element must have attributes name and id defined.');
		}

		// change ID of native select element so enhanced select element does not have same ID
		this._coreWrapper.id = `${selectId}-core`;

		const selectedWrapperId = uniqueId('selected');
		const labelId = uniqueId('label');
		const label = document.querySelector(`[for=${selectId}]`);
		label.id = labelId;

		this.multiSelectEl.insertAdjacentHTML('beforeend', `<div class="o-multi-select__enhanced">
    <ul
            class="o-multi-select__selected-options"
            id=${selectedWrapperId}
    ></ul>
    <div class="o-multi-select__combobox-wrapper">
        <div
                class="o-multi-select__combobox"
                id="${selectId}"
								name=${selectName}
                role="combobox"
                aria-activedescendant=""
                aria-labelledby="${labelId} ${selectedWrapperId}"
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
		this._coreWrapper.style.display = 'none';
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
		const options = this._coreWrapper.querySelectorAll('option');
		this._coreOptions = options;
		return [...options].map((option) => ({ label: option.textContent, value: option.value }));
	}

	/**
	 * Remove window event listeners.
	 *
	 * @returns {void}
	 */
	destroy() {
		window.removeEventListener('resize', this._windowResizelistener);
	}
}

export default MultiSelect;
