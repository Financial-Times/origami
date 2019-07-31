import Comments from './src/js/comments';
import CommentCount from './src/js/count';

/**
 * Initialise the component.
 *
 * @param {(HTMLElement|String)} rootEl - The root element to intialise the component in, or a CSS selector for the root element
 * @param {Object} [opts={}] - An options object for configuring the component
 * @returns {(Comments|Array<Comments>)|(CommentCount|Array<CommentCount>)} - Comments or CommentCount instance(s)
 */
const init = function (rootEl, opts) {
	if (!rootEl) {
			rootEl = document.body;
	}
	if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
	}
	return Array.from(rootEl.querySelectorAll('[data-o-component="o-comments"]'), rootEl => {
		if (rootEl.hasAttribute('data-o-comments-count')) {
			return new CommentCount(rootEl, opts);
		}
		return new Comments(rootEl, opts);
	});
};

const constructAll = function () {
	Comments.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export { Comments, CommentCount };
