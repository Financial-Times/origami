class CookieMessage {
	static get defaultOptions() {
		let domain = 'ft.com';
		let manageCookiesPath = 'manage-cookies';
		if (!/\.ft\.com$/i.test(window.location.hostname)) {
			// replace www or subdomain
			domain = window.location.hostname.replace(/^(.*?)\./, '');
			manageCookiesPath = 'cookies';
		}
		const redirect = window.location.href;
		return {
			theme: null,
			acceptUrl: `https://consent.${domain}/__consent/consent-record-cookie?cookieDomain=.${domain}`,
			acceptUrlFallback: `https://consent.${domain}/__consent/consent-record-cookie?redirect=${redirect}&cookieDomain=.${domain}`,
			manageCookiesUrl: `https://cookies.${domain}/preferences/${manageCookiesPath}?redirect=${redirect}&cookieDomain=.${domain}`,
			consentCookieName: 'FTCookieConsentGDPR'
		};
	}

	constructor(cookieMessageElement, options) {
		this.cookieMessageElement = cookieMessageElement || document.createElement("div");

		// Set cookie message options
		this.options = Object.assign(
			{},
			CookieMessage.defaultOptions,
			options || CookieMessage.getOptionsFromDom(cookieMessageElement)
		);

		this.options.theme = this.options.theme ? 'alternative' : null;

		if (this.shouldShowCookieMessage()) {
			this.createCookieMessage();
			this.showCookieMessage();
		} else {
			this.removeCookieMessage();
		}
	}

	createCookieMessage() {
		const wrapContent = content => `
<div class="o-cookie-message__outer">
	<div class="o-cookie-message__inner">
		<div class="o-cookie-message__content">
				${content}
		</div>
		<div class="o-cookie-message__actions">

			<div class="o-cookie-message__action">
				<a href="${this.options.acceptUrlFallback}" class="o-cookie-message__button">
					Accept &amp; continue
				</a>
			</div>

			<div class="o-cookie-message__action o-cookie-message__action--secondary">
				<a href="${this.options.manageCookiesUrl}" class="o-cookie-message__link">Manage cookies</a>
			</div>
		</div>
	</div>
</div>`;

		const defaultContent = `
<header class="o-cookie-message__heading">
	<h1>Cookies on the FT</h1>
</header>
<p>
	We use <a href="http://help.ft.com/help/legal-privacy/cookies/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a> for a number of reasons, such as keeping FT Sites reliable and secure, personalising content and ads, providing social media features and to analyse how our Sites are used.
</p>`;

		const child = this.cookieMessageElement.firstElementChild;
		const html = this.cookieMessageElement.innerHTML;
		if (child && child.classList.contains("o-cookie-message__outer")) {
			// full custom html, leave it alone
		} else if (html.trim() === "") {
			// empty, provide default content
			this.cookieMessageElement.innerHTML = wrapContent(defaultContent);
		} else {
			// some custom html, wrap it up
			this.cookieMessageElement.innerHTML = wrapContent(html);
		}
	}

	/**
	 * Enables cookie setting behaviour from the FT consent service
	 * https://github.com/Financial-Times/next-consent-proxy/tree/master/src
	 */
	updateConsent() {
		const button = document.querySelector(
			`.o-cookie-message__button`
		);
		if (button) {
			button.addEventListener('click', e => {
				e.preventDefault();
				this.dispatchEvent('oCookieMessage.act');
				this.removeCookieMessage();
				return fetch(this.options.acceptUrl, {
					method: 'get',
					credentials: 'include'
				});
			});
		}
	}

	/**
	 * Checks whether cookie is set
	 */
	shouldShowCookieMessage() {
		return !document.cookie.includes(`${this.options.consentCookieName}`);
	}

	/**
	 * Displays cookie message banner, based on existing cookies.
	 */
	showCookieMessage() {
		this.cookieMessageElement.classList.add(
			'o-cookie-message',
			'o-cookie-message--active'
		);

		if (this.options.theme) {
			this.cookieMessageElement.classList.add(
				`o-cookie-message--${this.options.theme}`
			);
		}

		this.dispatchEvent('oCookieMessage.view');
		this.updateConsent();
	}

	/**
	 * Removes cookie message banner.
	 */
	removeCookieMessage() {
		this.dispatchEvent('oCookieMessage.close');
		this.cookieMessageElement.parentNode.removeChild(this.cookieMessageElement);
	}

	dispatchEvent(eventName) {
		const e = new CustomEvent(eventName, { bubbles: true });
		this.cookieMessageElement.dispatchEvent(e);
	}

	/**
	 * Get the data attributes from the cookieMessageElement. If the cookie message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} cookieMessageElement - The cookie message element in the DOM
	 */
	static getOptionsFromDom(cookieMessageElement) {
		if (!(cookieMessageElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(cookieMessageElement.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(
				/^oCookieMessage(\w)(\w+)$/,
				(m, m1, m2) => m1.toLowerCase() + m2
			);
			const value = cookieMessageElement.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Initialise cookie message components.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise cookie messages in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the cookie messages
	 */
	static init(rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}

		// If the rootElement isnt an HTMLElement, treat it as a selector
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}

		// If the rootElement is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootElement has the data-o-component=o-cookie-message then initialise just 1 cookie message (this one)
		if (
			rootElement instanceof HTMLElement &&
			/\bo-cookie-message\b/.test(rootElement.getAttribute('data-o-component'))
		) {
			return new CookieMessage(rootElement, options);
		}

		// If the rootElement wasn't itself a cookie message, then find the first child that has the data-o-component=o-cookie-message set
		const cookieMessageElement = rootElement.querySelector(
			'[data-o-component="o-cookie-message"]'
		);
		return new CookieMessage(cookieMessageElement, options);
	}
}

export default CookieMessage;
