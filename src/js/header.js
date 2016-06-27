import search from './search';
import mega from './mega';

class Header {

	constructor (headerEl, config) {
		if (!headerEl) {
			headerEl = document.querySelector('[data-o-component="o-header"]');
		} else if (typeof headerEl === 'string') {
			headerEl = document.querySelector(headerEl);
		}

		this.headerEl = headerEl;

		search.init(headerEl, config);
		mega.init(headerEl, config);

		headerEl.setAttribute('data-o-header--js', '');
	}

	static init (rootEl, config) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const headerEl = rootEl.querySelector('[data-o-component="o-header"]');
		return new Header(headerEl, config);
	}

}

export default Header;
