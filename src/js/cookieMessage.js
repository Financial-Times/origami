class CookieMessage {

	constructor (CookieMessageEl) {
		if (!CookieMessageEl) {
			CookieMessageEl = document.querySelector('[data-o-component="o-cookie-message"]');
		} else if (typeof CookieMessageEl === 'string') {
			CookieMessageEl = document.querySelector(CookieMessageEl);
		}

		this.CookieMessageEl = CookieMessageEl;

		this.setup();
	}

	setup () {
		if (!CookieMessage.userHasConsentedToCookies()) {
			CookieMessage.showMessage();
			CookieMessage.setupMessage();
			return;
		}
	}

	static setupMessage () {
		document.querySelector('[data-o-component="o-cookie-message-close"]').addEventListener('click', this.flagUserAsConsentingToCookies);
	}

	static hideMessage () {
		const message = document.querySelector('[data-o-component="o-cookie-message"]');
		message.classList.add('o-cookie-message--hidden');
	}

	static showMessage () {
		const message = document.querySelector('[data-o-component="o-cookie-message"]');
		message.classList.remove('o-cookie-message--hidden');
	}

	static flagUserAsConsentingToCookies () {
		localStorage.setItem('COOKIE_CONSENT', 1);
		CookieMessage.hideMessage();
	}

	static userHasConsentedToCookies () {
		if (localStorage.getItem('COOKIE_CONSENT') === '1') {
			return true;
		}

		// HACK: Whilst FT.com is still around auto-opt user in if they have accepted over there.
		if (/\bcookieconsent=accepted(?:;|$)/.test(document.cookie)){
			this.flagUserAsConsentingToCookies();
			return true;
		}
		return false;
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
