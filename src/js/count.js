class CommentCount {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [oCommentsEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (opts = {}) {
		this.articleIds = opts.articleIds;
		this.element = opts.element;

		if (this.element) {
			this.init();
		}
	}
	
	init () {
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

}

export default CommentCount;
