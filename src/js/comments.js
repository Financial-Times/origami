class Comments {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [oCommentsEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (oCommentsEl, opts) {
		this.oCommentsEl = oCommentsEl;
		this.options = Object.assign({}, {}, opts || Comments.getDataAttributes(oCommentsEl));
		this._renderComments();
	}

	/**
	 * Render comment instances and store them on the `_comments` property.
	 *
	 * @access private
	 * @returns {void}
	 */
	_renderComments() {
		const scriptElement = document.createElement('script');
		scriptElement.src = 'https://ft-next-talk-spike.herokuapp.com/static/embed.js';
		scriptElement.setAttribute('onload', `Coral.Talk.render(document.querySelector('[data-o-component="o-comments"]'), {talk: 'https://ft-next-talk-spike.herokuapp.com'})`);

		this.oCommentsEl.appendChild(scriptElement);
	}

	/**
	 * Get the data attributes from the CommentsElement. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} oCommentsEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (oCommentsEl) {
		if (!(oCommentsEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oCommentsEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oComments(w)(w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oCommentsEl.dataset[key];

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
	 * Initialise the component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
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
