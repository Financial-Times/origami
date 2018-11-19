
class SteppedProgress {

	/**
	 * Class constructor.
	 * @param {HTMLElement} [steppedProgressElement] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (steppedProgressElement, opts) {
		this.steppedProgressElement = steppedProgressElement;
		this.options = Object.assign({}, {
			// TODO
		}, opts || SteppedProgress.getDataAttributes(steppedProgressElement));
	}

	/**
	 * Get the data attributes from the stepped progress element. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} steppedProgressElement - The component element in the DOM
	 */
	static getDataAttributes (steppedProgressElement) {
		if (!(steppedProgressElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(steppedProgressElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oSteppedProgress(w)(w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = steppedProgressElement.dataset[key];

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
	 * Initialise stepped progress component.
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
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-stepped-progress]')) {
			return new SteppedProgress(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-stepped-progress"]'), rootEl => new SteppedProgress(rootEl, opts));
	}
}

export default SteppedProgress;
