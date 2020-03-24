class Count {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [countEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (countEl, opts = {}) {
		this.countEl = countEl;
		this.articleId = opts.articleId;
		this.useStagingEnvironment = Boolean(opts.useStagingEnvironment);
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

		return Count.fetchCount(this.articleId, this.useStagingEnvironment)
			.then((count) => {
				this.countEl.textContent = count;

				const countLabel = Count.getCountLabel(count);
				this.countEl.setAttribute('aria-label', countLabel);
			});
	}

	/**
	 * Get the aria-label for the count element.
	 *
	 * @param {Number} count - The comment count
	 * @returns {String}
	 */
	static getCountLabel (count) {
		if (count === 1) {
			return 'There is 1 comment, click to go to the comment section.';
		} else {
			return `There are ${count} comments, click to go to the comment section.`;
		}
	}

	static fetchCount (id, useStaging) {
		const url = `https://comments-api.ft.com/story/count/${id}` + (useStaging ? '?staging=1' : '');

		return fetch(url)
			.then(res => res.json())
			.then(json => json.commentCount)
			.catch(error => {
				throw new Error(`Error with fetching comment count: ${error.message}`);
			});
	}
}

export default Count;
