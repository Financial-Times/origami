import Search from './search';
import Utils from './utils';
import EditionSwitch from './editionSwitch';

class Header {
	constructor(headerEl, config) {
		if (!headerEl) {
			headerEl = document.body;
		} else if (!(headerEl instanceof HTMLElement)) {
			headerEl = document.querySelector(headerEl);
		}

		this.headerEl = headerEl;
		this.utils = new Utils(this.headerEl, config);
		this.search = new Search(this.headerEl, config);
		this.editionSwitch = new EditionSwitch(this.headerEl, config);
		this.headerEl.setAttribute('data-o-header--js', '');
	}

	destroy() {
		this.utils.destroy();
		this.search.destroy();
		this.editionSwitch.destroy();
		this.headerEl.removeAttribute('data-o-header--js');
		delete this.headerEl;
	}

	static init(el, config) {
		if (!el) {
			el = document.body;
		} else if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}
		const headerEls = el.querySelectorAll('[data-o-component="o-header"]');
		const headers = [];
		for (let headerEl of headerEls) {
			if (!headerEl.hasAttribute('data-o-header--js')) {
				headers.push(new Header(headerEl, config));
			}
		}
		return headers;
	}
}

export default Header;
