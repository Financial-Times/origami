class ButtonsExperimental {
	/**
		* Class constructor.
		* @param {HTMLElement} [buttonsExperimentalEl] - The component element in the DOM
		* @param {Object} [options={}] - An options object for configuring the component
		*/
	constructor (buttonsExperimentalEl, options) {
		this.buttonsExperimentalEl = buttonsExperimentalEl;
		this.options = Object.assign({}, {
		}, options || ButtonsExperimental.getDataAttributes(buttonsExperimentalEl));
	}
	/**
		* Get the data attributes from the ButtonsExperimentalElement. If the element is being set up
		* declaratively, this method is used to extract the data attributes from the DOM.
		* @param {HTMLElement} buttonsExperimentalEl - The component element in the DOM
		* @returns {Object} An options object which can be used for configuring the component
		*/
	static getDataAttributes (buttonsExperimentalEl) {
		if (!(buttonsExperimentalEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(buttonsExperimentalEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oButtonsExperimental(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oButtonsExperimental(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = buttonsExperimentalEl.dataset[key];
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
		* Initialise o-buttons-experimental component/s.
		* @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
		* @param {Object} [options={}] - An options object for configuring the component
		* @returns {ButtonsExperimental|ButtonsExperimental[]} The newly constructed ButtonsExperimental components
		*/
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-buttons-experimental]')) {
			return new ButtonsExperimental(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-buttons-experimental"]'), rootEl => new ButtonsExperimental(rootEl, options));
	}
}

export default ButtonsExperimental;
