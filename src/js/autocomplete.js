import accessibleAutocomplete from 'accessible-autocomplete';

class Autocomplete {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [autocompleteEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (autocompleteEl, options) {
		this.autocompleteEl = autocompleteEl;
		this.options = Object.assign({}, {
		}, options || Autocomplete.getDataAttributes(autocompleteEl));

		const element = autocompleteEl.querySelector('select');

		if (this.options.source) {
			accessibleAutocomplete({
				element: autocompleteEl,
				id: autocompleteEl.id,
				source: window[this.options.source],
				cssNamespace: 'o-autocomplete'
			});
		} else {
			accessibleAutocomplete.enhanceSelectElement({
				selectElement: element,
				cssNamespace: 'o-autocomplete'
			});
		}
	}
	/**
	 * Get the data attributes from the AutocompleteElement. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} autocompleteEl - The component element in the DOM
	 * @returns {Object} An options object which can be used for configuring the component
	 */
	static getDataAttributes (autocompleteEl) {
		if (!(autocompleteEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(autocompleteEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oAutocomplete(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oAutocomplete(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = autocompleteEl.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}
	/**
	 * Initialise o-autocomplete component/s.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {Autocomplete|Autocomplete[]} The newly constructed Autocomplete components
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-autocomplete]')) {
			return new Autocomplete(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-autocomplete"]'), rootEl => new Autocomplete(rootEl, options));
	}
}

export default Autocomplete;
