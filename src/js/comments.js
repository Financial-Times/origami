import Stream from './stream';
import Count from './count';

class Comments {
	constructor (rootEl, opts) {
		const isCount = rootEl.getAttribute('data-o-comments-count') === 'true';

		if (isCount) {
			const count = new Count(rootEl, opts);
			count.renderCount();
		} else {
			new Stream(rootEl, opts);
		}
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
