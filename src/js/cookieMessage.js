class CookieMessage {

	constructor (CookieMessageEl) {
		this.CookieMessageEl = CookieMessageEl;

        return this.setup();
	}

	setup () {
        const message = document.querySelector('.o-cookie-message');

		if (userHasConsentedToCookies()) {
		    hideMessage();
			return;
		}

        setupMessage();

        function setupMessage () {
            document.querySelector('.cookie-message__close-btn').addEventListener('click', flagUserAsConsentingToCookies);
        }

		function hideMessage () {
			message.classList.add('cookie-message--hidden');
		}

		function flagUserAsConsentingToCookies () {
			sessionStorage.setItem('COOKIE_CONSENT', 1);
			hideMessage();
		}

		function userHasConsentedToCookies () {
			if (sessionStorage.getItem('COOKIE_CONSENT') == 1) {
				return true;
			}

			// HACK: Whilst FT.com is still around auto-opt user in if they have accepted over there.
			if (/\bcookieconsent=accepted(?:;|$)/.test(document.cookie)){
				flagUserAsConsentingToCookies();
				return true;
			}
			return false;
		}
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
