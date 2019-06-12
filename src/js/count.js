class CommentCount {
	/**
	 * Class constructor.
	 *
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (opts = {}) {
		this.articleIds = opts.articleIds;
		this.element = opts.element;

		if (this.element) {
			this._renderCount();
		}
	}

	/**
	 * Render a comment count instance.
	 *
	 * @access private
	 * @returns {HTMLElement}
	 */
	_renderCount () {
		if (this.element && !(this.element instanceof HTMLElement)) {
			this.element = document.querySelector(this.element);
		}

		if (!this.element) {
			throw new Error('Element must be a HTMLElement');
		}

		const count = this._fetchCount(this.articleIds);

		this.element.innerHTML = count;
	}

	getCount () {
		if (!this.articleIds) {
			return null;
		}

		const counts = Array.isArray(this.articleIds) ? this.articleIds.map(id => {
			return {
				id,
				count: this._fetchCount(id)
			}
		}).filter(item => item.count) : this._fetchCount(this.articleIds);

		if (!counts || (Array.isArray(counts) && !counts.length)) {
			return null;
		} else if (counts && !Array.isArray(counts)) {
			return counts;
		}

		return counts.reduce((obj, item) => {
			obj[item.id] = item.count;
			return obj
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
	 * @returns {(CommentCount|Array<CommentCount>)} - Comment count instance(s)
	 */
	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=comment-count]')) {
			return new CommentCount({element: rootEl});
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="comment-count"]'), rootEl => new CommentCount({element: rootEl}));
	}
}

export default CommentCount;
