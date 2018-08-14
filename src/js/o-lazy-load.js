// <https://github.com/ApoorvSaxena/lozad.js>
import lozad from 'lozad';

const defaults = {
	selector: '.o-lazy-target'
};

class OLazyLoad {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [rootEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (rootEl, opts) {
		this.rootEl = rootEl;
		this.options = Object.assign({}, defaults, opts);
		this.observer = lozad(rootEl.querySelectorAll(this.options.selector), this.options);
		this.observer.observe();
	}

	/**
	 * Initialise message component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (rootEl, opts) {
		console.log()

		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component="o-lazy-load"]')) {
			return new OLazyLoad(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-lazy-load"]'), (el) => new OLazyLoad(el, opts));
	}
}

export default OLazyLoad;
