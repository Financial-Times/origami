class Meter {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [oMeterEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (oMeterEl, opts) {
		this.oMeterEl = oMeterEl;
		this.options = Object.assign({}, {

		}, opts || Meter.getDataAttributes(oMeterEl));
	}

	/**
	 * Get the data attributes from the MeterElement. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} oMeterEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (oMeterEl) {
		if (!(oMeterEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oMeterEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oMeter(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oMeterEl.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Initialise the component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [opts={}] - An options object for configuring the component
	 * @returns {(Meter|Array<Meter>)} - Meter instance(s)
	 */

	static init (rootEl = document.body, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-meter]')) {
			return new Meter(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-meter"]'), rootEl => {
			new Meter(rootEl, opts)
		});
	}
}

export default Meter;
