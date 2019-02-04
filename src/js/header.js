import Drawer from './drawer';
import DropDown from './drop-down';
import Scroll from './scroll';

class HeaderServices {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		new Drawer(headerEl);
		new DropDown(headerEl);
		new Scroll(headerEl);
	}

	/**
	 * Initialise header component
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-header-services]')) {
			return new HeaderServices(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-header-services"]'), rootEl => new HeaderServices(rootEl, opts));
	}
}

export default HeaderServices;
