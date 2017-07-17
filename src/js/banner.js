
/**
 * Represents a banner.
 */
class Banner {

	/**
	 * Class constructor.
	 * @param {HTMLElement} bannerElement - The banner element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the banner
	 */
	constructor (bannerElement, options) {
		this.bannerElement = bannerElement;
		this.options = options || Banner.getOptions(bannerElement);
		this.options = Banner.checkOptions(this.options);
	}

	/**
	 * Get the data attributes from the bannerElement. If the banner is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} bannerElement - The banner element in the DOM
	 */
	static getOptions (bannerElement) {
		return Object.keys(bannerElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oBanner(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = bannerElement.dataset[key];

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
	 * Check that an options object is valid.
	 * @param {Object} options - An Object with configuration options for the banner
	 * @throws {Error} Throws if options are not valid
	 */
	static checkOptions (options) {
		return options;
	}

	/**
 	 * Initialise banner components.
 	 * @param {(HTMLElement|String)} rootElement - The root element to intialise banners in, or a CSS selector for the root element
 	 * @param {Object} [options={}] - An options object for configuring the banners
 	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}

		// If the rootElement isnt an HTMLElement, treat it as a selector
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}

		// If the rootElement is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootElement has the data-o-component=o-banner then initialise just 1 banner (this one)
		if (rootElement instanceof HTMLElement && /\bo-banner\b/.test(rootElement.getAttribute('data-o-component'))) {
			return new Banner(rootElement, options);
		}

		// If the rootElement wasn't itself a banner, then find ALL of the child things that have the data-o-component=oBanner set
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-banner"]'), rootElement => new Banner(rootElement, options));
	}

}

// Exports
export default Banner;
