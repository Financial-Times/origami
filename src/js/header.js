import search from './search';
import mega from './mega';
import drawer from './drawer';
import subnav from './subnav';

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

		this.headerEl.removeAttribute('data-o-header--no-js');
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const headerEl = rootEl.querySelector('[data-o-component="o-header"]');
		if (!headerEl.hasAttribute('data-o-header--js')) {
			return new Header(headerEl);
		}

	}

}

export default Header;
