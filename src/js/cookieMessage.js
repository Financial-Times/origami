const store = require('superstore-sync');

class CookieMessage {

	constructor (CookieMessageEl) {
		if (!CookieMessageEl) {
			CookieMessageEl = CookieMessage.getMessageElement();
		} else if (typeof CookieMessageEl === 'string') {
			CookieMessageEl = document.querySelector(CookieMessageEl);
		}

		this.CookieMessageEl = CookieMessageEl;

		this.setup();
		CookieMessage.dispatchEvent('oCookieMessage.ready');
	}

	setup () {
		if (!CookieMessage.userHasConsentedToCookies()) {
			this.CookieMessageEl.classList.add('o-cookie-message--active');
			CookieMessage.setupMessage();
		}
	}

	static getMessageElement () {
		return document.querySelector('[data-o-component="o-cookie-message"]');
	}

	static dispatchEvent (eventName) {
		const message = CookieMessage.getMessageElement();
		const e = new CustomEvent(eventName, { bubbles: true });
		message.dispatchEvent(e);
	}

	static cookieHTML () {
		return `
			<div id="o-cookie-message" class="o-cookie-message__container">
				<div>
					<p class="o-cookie-message__description">
						By continuing to use this site you consent to the use of cookies on your device as described in our <a href="http://help.ft.com/tools-services/how-the-ft-manages-cookies-on-its-websites/">Cookie Policy</a> unless you have disabled them. You can change your <a href="http://help.ft.com/help/legal-privacy/cookies/how-to-manage-cookies/">Cookie Settings</a> at any time but parts of our site will not function correctly without them.
					</p>
					<div class="o-cookie-message__close-btn-container">
							<button class="o-cookie-message__close-btn" data-o-component="o-cookie-message-close" aria-controls="o-cookie-message">
									<span class="o-cookie-message__close-btn-label">Dismiss cookie message</span>
							</button>
					</div>
				</div>
			</div>`;
	}

	static setupMessage () {
		document.querySelector('[data-o-component="o-cookie-message-close"]').addEventListener('click', this.flagUserAsConsentingToCookies);
	}

	static hideMessage () {
		const message = CookieMessage.getMessageElement();
		message.classList.remove('o-cookie-message--active');
		message.setAttribute('tabindex', '-1');
	}

	static flagUserAsConsentingToCookies () {
		CookieMessage.setConsentCookieAndHideMessage();
		CookieMessage.dispatchEvent('oCookieMessage.accepted');
	}

	static setConsentCookieAndHideMessage () {
		let now = Date.now();
		store.local.set('COOKIE_CONSENT', now);
		CookieMessage.hideMessage();
	}

	static userHasConsentedToCookies () {

		const cookieConsent = store.local.get('COOKIE_CONSENT');

		// Update user to new cookie format, which reappears after three months
		if (cookieConsent === '1') {
			// Calls setConsentCookieAndHideMessage rather than flagUserAsConsentingToCookies so that
			// this never generates an oCookieMessage.accepted event for users that have already accepted
			// cookies - which might cause applications to incorrectly initialise tracking twice.
			CookieMessage.setConsentCookieAndHideMessage();
			return true;
		}

		// HACK: Whilst FT.com is still around auto-opt user in if they have accepted over there.
		if (/\bcookieconsent=accepted(?:;|$)/.test(document.cookie)){
			CookieMessage.setConsentCookieAndHideMessage();
			return true;
		}

		// FT.com's bottom banner cookie consent, under test
		if (/\bFTCookieConsentGDPR=true(?:;|$)/.test(document.cookie)){
			CookieMessage.setConsentCookieAndHideMessage();
			return true;
		}

		if (cookieConsent) {

			const consentDate = parseInt(cookieConsent, 10);

			if (this.dateIsWithinLastThreeMonths(consentDate)) {
				return true;
			}
		}
		return false;
	}

	static dateIsWithinLastThreeMonths(startTime) {
		const now = Date.now();
		const threeMonthsInSeconds = 1000 * 60 * 60 * 24 * 90;
		return (startTime > (now - threeMonthsInSeconds));
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const CookieMessageEl = CookieMessage.getMessageElement();

		/* If the cookie message hasn't already been initialised */
		if (!CookieMessageEl.hasAttribute('data-o-cookie-message--js')) {

			/* If the cookie message hasn't specified that it has custom internal HTML
			 add the legal-approved cookie message */
			if (!CookieMessageEl.hasAttribute('data-o-cookie-message-use-custom-html')) {
				CookieMessageEl.innerHTML = CookieMessage.cookieHTML();
			}
			return new CookieMessage(CookieMessageEl);
		}
	}
}

export default CookieMessage;
