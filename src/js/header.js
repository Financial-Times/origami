import search from './search';
import mega from './mega';
import drawer from './drawer';
import subnav from './subnav';
import sticky from './sticky';

class Header {

	constructor (headerEl) {
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		if (headerEl.hasAttribute('data-o-header--js')) {
			return;
		}

		this.headerEl = headerEl;

		search.init(this.headerEl);
		mega.init(this.headerEl);
		drawer.init(this.headerEl);
		subnav.init(this.headerEl);
		sticky.init(this.headerEl);

		this.headerEl.removeAttribute('data-o-header--no-js');
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (/\bo-header\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new Header(rootEl);
		}

		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-header"]'), el => {
			if (!el.hasAttribute('data-o-header--js')) {
				return new Header(el);
			}
		}).filter((header) => {
			return header !== undefined;
		});
	}

}

export default Header;
