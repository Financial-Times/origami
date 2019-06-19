class CommentCount {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [countEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (countEl, opts) {
		this.countEl = countEl;
		this.options = Object.assign({}, {}, opts || CommentCount.getDataAttributes(countEl));
		this.articleId = this.options.articleId;
		this._renderCount();
	}

	/**
	 * Render a comment count instance.
	 *
	 * @access private
	 * @returns {HTMLElement}
	 */
	_renderCount () {
		if (this.countEl && !(this.countEl instanceof HTMLElement)) {
			this.countEl = document.querySelector(this.countEl);
		}

		if (!this.countEl) {
			throw new Error('Element must be a HTMLElement');
		}

		const count = this._fetchCount(this.articleId);

		this.countEl.innerHTML = count;
	}

	/**
	 * Get the data attributes from the CountElement. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @param {HTMLElement} countEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (countEl) {
		if (!(countEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(countEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oCommentsCount(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = countEl.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	_fetchCount (id) {
		/*
 		 * This will be replaced by an API call eventually
 		 */

		return id === 'invalid-id' ? null : Math.floor(Math.random() * 10) + 1;
	}

	/**
	 * Initialise the component.
	 *
	 * @param {(HTMLElement|String)} rootEl - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [opts={}] - An options object for configuring the component
	 * @returns {(CommentCount|Array<CommentCount>)} - Comment count instance(s)
	 */
	static init (rootEl, opts) {

		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-comments-count]')) {
			return new CommentCount(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-comments-count"]'), rootEl => new CommentCount(rootEl, opts));
	}
}

export default CommentCount;
