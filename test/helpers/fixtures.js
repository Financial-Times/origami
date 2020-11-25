let sandboxEl;

function createSandbox() {
	if (document.querySelector('.sandbox')) {
		sandboxEl = document.querySelector('.sandbox');
	} else {
		sandboxEl = document.createElement('div');
		sandboxEl.setAttribute('class', 'sandbox');
		document.body.appendChild(sandboxEl);
	}
}

export function reset() {
	sandboxEl.innerHTML = '';
}

function insert(html) {
	createSandbox();
	sandboxEl.innerHTML = html;
}

export function generateHTML(type) { insert(html[type]); }

export const html = {
	standard: `<div role="dialog" data-o-component="o-cookie-message" class='o-cookie-message'></div>`,
	domAttributes: `<div role="dialog" data-o-component="o-cookie-message" data-o-cookie-message-accept-url="example.com" class='o-cookie-message'></div>`,
	customCookieMessage: `<div role="dialog" data-o-component="o-cookie-message" data-o-cookie-message-use-custom-html="true" class='o-cookie-message'>
		Custom cookie message!
		<div class="o-cookie-message__close-btn-container">
			<button class="o-cookie-message__close-btn" data-o-component="o-cookie-message-close">
				<span class="o-cookie-message__close-btn-label">Close</span>
			</button>
		</div>
	</div>`,
	imperativeCookieMessage: `<div role="dialog" data-o-component="o-cookie-message" class="o-cookie-message o-cookie-message--active" aria-labelledby="o-cookie-message-label" aria-describedby="o-cookie-message-description">
		<div class="o-cookie-message__outer">
			<div class="o-cookie-message__inner">

			<div class="o-cookie-message__content">

			<div class="o-cookie-message__heading">
				<h2 id="o-cookie-message-label">Cookies on the FT</h2>
			</div>
			<p id="o-cookie-message-description">
				We use <a href="http://help.ft.com/help/legal-privacy/cookies/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a>
				for a number of reasons, such as keeping FT Sites reliable and secure, personalising
				content and ads, providing social media features and to analyse how our Sites are used.
			</p>

			</div>

				<div class="o-cookie-message__actions">
					<div class="o-cookie-message__action">
						<a href="https://consent.localhost/__consent/consent-record-cookie?redirect=http://localhost:9876/context.html&amp;cookieDomain=.localhost" class="o-cookie-message__button">Accept &amp; continue</a>
					</div>

			<div class="o-cookie-message__action o-cookie-message__action--secondary">
				<a href="https://cookies.localhost/preferences/cookies?redirect=http://localhost:9876/context.html&amp;cookieDomain=.localhost" class="o-cookie-message__link">Manage cookies</a>
			</div>

				</div>
			</div>
		</div>
	</div>`,
	imperativeAltCookieMessage: `<div role="dialog" data-o-component="o-cookie-message" class="o-cookie-message o-cookie-message--active o-cookie-message--alternative" aria-labelledby="o-cookie-message-label" aria-describedby="o-cookie-message-description">
		<div class="o-cookie-message__outer">
			<div class="o-cookie-message__inner">

			<div class="o-cookie-message__content">

			<div class="o-cookie-message__heading">
				<h2 id="o-cookie-message-label">Cookies on the FT</h2>
			</div>
			<p id="o-cookie-message-description">
				We use <a href="http://help.ft.com/help/legal-privacy/cookies/" class="o-cookie-message__link o-cookie-message__link--external" target="_blank" rel="noopener">cookies</a>
				for a number of reasons, such as keeping FT Sites reliable and secure, personalising
				content and ads, providing social media features and to analyse how our Sites are used.
			</p>

			</div>

				<div class="o-cookie-message__actions">
					<div class="o-cookie-message__action">
						<a href="https://consent.localhost/__consent/consent-record-cookie?redirect=http://localhost:9876/context.html&amp;cookieDomain=.localhost" class="o-cookie-message__button">Accept &amp; continue</a>
					</div>

			<div class="o-cookie-message__action o-cookie-message__action--secondary">
				<a href="https://cookies.localhost/preferences/cookies?redirect=http://localhost:9876/context.html&amp;cookieDomain=.localhost" class="o-cookie-message__link">Manage cookies</a>
			</div>

				</div>
			</div>
		</div>
	</div>`
};
