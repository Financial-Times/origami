import search from './search';
import utils from './_utils';
import editionSwitcher from './edition-switch';

class Header {
	constructor(headerEl, config) {
		if (!headerEl) {
			headerEl = document.body;
		} else if (!(headerEl instanceof HTMLElement)) {
			headerEl = document.querySelector(headerEl);
		}
		
		utils.init(headerEl, config);
		search.init(headerEl, config);
		editionSwitcher.init(headerEl, config);
		headerEl.setAttribute('data-o-header--js', '');
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
