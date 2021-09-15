import Drawer from './drawer.js';
import DropDown from './drop-down.js';
import Scroll from './scroll.js';

class HeaderServices {
	/**
	 * Class constructor
	 * @param {HTMLElement} [headerEl] - The component element in the DOM
	 */
	constructor (headerEl) {
		const drawer = new Drawer(headerEl);
		new DropDown(headerEl, drawer);
		new Scroll(headerEl);
		headerEl.setAttribute('data-o-header-services-js', true);
	}

	/**
	 * Initialise header component
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @return {Array<HTMLElement>|HTMLElement} - The header(s) initalised.
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-header-services]')) {
			return new HeaderServices(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-header-services"]'), rootElement => new HeaderServices(rootElement, options));
	}
}

export default HeaderServices;
