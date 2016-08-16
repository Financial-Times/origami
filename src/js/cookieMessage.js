class CookieMessage {

	constructor (CookieMessageEl) {
		this.CookieMessageEl = CookieMessageEl;
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const CookieMessageEl = rootEl.querySelector('[data-o-component="o-cookie-message"]');
		if (!CookieMessageEl.hasAttribute('data-o-cookie-message--js')) {
			return new CookieMessage(CookieMessageEl);
		}
	}
}

export default CookieMessage;
