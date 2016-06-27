import search from './search';
import mega from './mega';

class Header {

	constructor (headerEl, config) {
		this.headerEl = headerEl;

		search.init(headerEl, config);
		mega.init(headerEl, config);

		headerEl.removeAttribute('data-o-header--no-js');
		headerEl.setAttribute('data-o-header--js', '');
	}

	static init (scope, config) {
		if (!scope) {
			scope = document.body;
		} else if (typeof scope === 'string') {
			scope = document.querySelector(scope);
		}

		const headerEl = scope.querySelector('[data-o-component="o-header"]');
		return new Header(headerEl, config);
	}

}

export default Header;
