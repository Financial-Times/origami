class Count {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [countEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (countEl, opts) {
		this.countEl = countEl;
		this.articleId = opts.articleId;
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
				this.countEl.textContent = count;
			});
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
