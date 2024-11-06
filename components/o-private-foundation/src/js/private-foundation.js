class PrivateFoundation {
	/**
		* Class constructor.
		* @param {HTMLElement} [privateFoundationEl] - The component element in the DOM
		* @param {Object} [options={}] - An options object for configuring the component
		*/
	constructor (privateFoundationEl, options) {
		this.privateFoundationEl = privateFoundationEl;
		this.options = Object.assign({}, {
		}, options || PrivateFoundation.getDataAttributes(privateFoundationEl));
	}
	/**
		* Get the data attributes from the PrivateFoundationElement. If the element is being set up
		* declaratively, this method is used to extract the data attributes from the DOM.
		* @param {HTMLElement} privateFoundationEl - The component element in the DOM
		* @returns {Object} An options object which can be used for configuring the component
		*/
	static getDataAttributes (privateFoundationEl) {
		if (!(privateFoundationEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(privateFoundationEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oPrivateFoundation(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oPrivateFoundation(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = privateFoundationEl.dataset[key];
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
		* Initialise o-private-foundation component/s.
		* @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
		* @param {Object} [options={}] - An options object for configuring the component
		* @returns {PrivateFoundation|PrivateFoundation[]} The newly constructed PrivateFoundation components
		*/
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-private-foundation]')) {
			return new PrivateFoundation(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-private-foundation"]'), rootEl => new PrivateFoundation(rootEl, options));
	}
}

export default PrivateFoundation;
