import search from './search.js';
import mega from './mega.js';
import drawer from './drawer.js';
import subnav from './subnav.js';
import sticky from './sticky.js';

class Header {

	/**
	 *
	 * @param {HTMLElement|string} headerEl - The header element or query to find it.
	 * @param {Object} [options] - Options to configure the header.
	 * @param {string} [options.searchState] - The initial state of the search UI, 'open' or 'close'.
	 */
	constructor (headerEl, {searchState = undefined} = {}) {
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		if (headerEl.hasAttribute('data-o-header--js')) {
			return;
		}

		searchState = searchState || headerEl.getAttribute('data-o-header-search-state')
		if(searchState && !['open', 'close'].includes(searchState)) {
			throw new Error(`o-header: when set, search state must be either 'open' or 'close'`);
		}

		this.headerEl = headerEl;

		search.init(this.headerEl, {searchState});
		mega.init(this.headerEl);
		drawer.init(this.headerEl);
		subnav.init(this.headerEl);
		sticky.init(this.headerEl);

		this.headerEl.removeAttribute('data-o-header--no-js');
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl, options) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (/\bo-header\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Header(rootEl, options);
		}

		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), el => {
			if (!el.hasAttribute('data-o-header--js')) {
				return new Header(el, options);
			}
		}).filter((header) => {
			return header !== undefined;
		});
	}

}

export default Header;
