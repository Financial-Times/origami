import Stream from './stream';
import Count from './count';

class Comments {
	constructor (rootEl, opts) {
		this.options = Object.assign({}, {}, opts || Comments.getDataAttributes(rootEl));
		const isCount = rootEl.getAttribute('data-o-comments-count') === 'true';

		if (isCount) {
			const count = new Count(rootEl, this.options);
			count.renderCount();

			return count;
		} else {
			const stream = new Stream(rootEl, this.options);
			stream.init();

			return stream;
		}
	}

	/**
	 * Get the data attributes from the element. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @param {HTMLElement} rootEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (rootEl) {
		if (!(rootEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(rootEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oComments(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = rootEl.dataset[key];

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
	 *
	 * @param {(HTMLElement|String)} rootEl - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [opts={}] - An options object for configuring the component
	 * @returns {(Comments|Array<Comments>)} - Comments instance(s)
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-comments]')) {
			return new Comments(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-comments"]'), rootEl => new Comments(rootEl, opts));
	}
}

export default Comments;
