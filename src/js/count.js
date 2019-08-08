class Count {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [countEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (countEl, opts) {
		this.countEl = countEl;
		this.options = Object.assign({}, {}, opts || Count.getDataAttributes(countEl));
		this.articleId = this.options.articleId;
	}

	/**
	 * Render a comment count instance.
	 *
	 * @access private
	 * @returns {HTMLElement}
	 */
	renderCount () {
		if (this.countEl && !(this.countEl instanceof HTMLElement)) {
			this.countEl = document.querySelector(this.countEl);
		}

		if (!this.countEl) {
			throw new Error('Element must be a HTMLElement');
		}

		return Count.fetchCount(this.articleId)
			.then((count) => {
				this.countEl.innerHTML = count;
			});
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
			const shortKey = key.replace(/^oComments(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
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

	static fetchCount (id) {
		const url = `https://comments-api.ft.com/story/count/${id}`;

		return fetch(url)
			.then(res => res.json())
			.then(json => json.commentCount)
			.catch(error => {
				throw new Error(`Error with fetching comment count: ${error.message}`);
			});
	}
}

export default Count;
