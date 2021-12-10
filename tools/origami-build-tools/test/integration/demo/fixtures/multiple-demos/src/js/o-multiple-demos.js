class OMultipleDemos {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [oMultipleDemosEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (oMultipleDemosEl, opts) {
		this.oMultipleDemosEl = oMultipleDemosEl;
		this.options = Object.assign({}, {
		}, opts || OMultipleDemos.getDataAttributes(oMultipleDemosEl));
	}
	/**
	 * Get the data attributes from the OMultipleDemosElement. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} oMultipleDemosEl - The component element in the DOM
	 */
	static getDataAttributes (oMultipleDemosEl) {
		if (!(oMultipleDemosEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oMultipleDemosEl.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oMultipleDemos(w)(w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oMultipleDemosEl.dataset[key];
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
	 * Initialise o-multiple-demos component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-multiple-demos]')) {
			return new OMultipleDemos(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-multiple-demos"]'), rootEl => new OMultipleDemos(rootEl, opts));
	}
}

export default OMultipleDemos;