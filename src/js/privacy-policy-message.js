//TODO: remove file when time is up — https://github.com/Financial-Times/o-cookie-message/issues/65
import * as store from 'superstore-sync';
import oViewport from 'o-viewport';

class PrivacyPolicyMessage {
	constructor (cookieMessageElement, baseClass, position) {
		this.cookieMessageEl = cookieMessageElement;
		this.options = {
			position,
			baseClass
		};

		if (!store.local.get('PRIVACY_POLICY_DISMISSED')) {
			this.policyMessageEl = this.buildElement();
			this.render();
		}
	}

	buildElement () {
		let policyMessageEl = document.createElement('div');
		policyMessageEl.classList.add('privacy-policy-message', `${this.options.baseClass}__inner`);
		policyMessageEl.innerHTML = `
			<h5>Privacy</h5>
			<p>
				We take your privacy as seriously as we take our journalism. Please review our updated
				<a href="https://help.ft.com/help/legal-privacy/privacy/" class="${this.options.baseClass}__link ${this.options.baseClass}__link--external" target="_blank" rel="noopener">privacy</a> and
				<a href="https://help.ft.com/help/legal-privacy/cookies/" class="${this.options.baseClass}__link ${this.options.baseClass}__link--external" target="_blank" rel="noopener">cookie</a> policies.
			</p>
		`;

		policyMessageEl.append(this.buildCloseButtonElement());

		return policyMessageEl;
	}

	buildCloseButtonElement () {
		const closeButton = document.createElement('button');
		closeButton.className = `${this.options.baseClass}__close`;
		closeButton.setAttribute('role', 'button');
		closeButton.setAttribute('aria-label', 'Close');
		closeButton.setAttribute('title', 'Close');

		// Add event listeners
		closeButton.addEventListener('click', event => {
			store.local.set('PRIVACY_POLICY_DISMISSED', true);
			this.removePrivacyPolicyMessage();
			event.preventDefault();
		});

		return closeButton;
	}

	removePrivacyPolicyMessage () {
		this.policyMessageEl.parentNode.removeChild(this.policyMessageEl);
	}

	repositionOnResize () {
		oViewport.listenTo('resize');

		document.body.addEventListener('oViewport.resize', () => {
			this.policyMessageEl.style.bottom = this.cookieMessageEl.clientHeight + 20 +'px';// 20px is the cookie banner margin.
		});
	}

	render () {
		if (this.options.position === 'top') {
			this.repositionOnResize();

			this.policyMessageEl.style.bottom = this.cookieMessageEl.clientHeight + 'px';
			document.body.insertBefore(this.policyMessageEl, this.cookieMessageEl);
		} else {
			this.policyMessageEl.style.bottom = 0;
			document.body.append(this.policyMessageEl);
		}

		this.policyMessageEl.classList.add(`privacy-policy-message__${this.options.position}`);
	}
}

export default PrivacyPolicyMessage;
