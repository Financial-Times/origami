import search from './search';
import utils from './_utils';
import editionSwitcher from './edition-switcher';

class Header {
	constructor(headerEl, config) {
		utils.init(headerEl, config);
		search.init(headerEl, config);
		editionSwitcher.init(headerEl, config);
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
