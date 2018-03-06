import { throwError } from './helpers';
export default {

	/**
	* Build a full alert message element. Used when there is no message element in the DOM.
	* @returns {HTMLElement} Returns the new alert type message element
	*/
	alertMessage: (opts) => {
		const alertMessageEl = document.createElement('div');
		alertMessageEl.setAttribute('data-o-component', 'o-message');
		alertMessageEl.classList.add(opts.messageClass, opts.typeClass, `${opts.messageClass}--closed`);

		if (!opts.status) {
			throwError("Alert messages require a status. The options are 'success', 'error', or 'neutral'");
		} else {
			alertMessageEl.classList.add(`${opts.statusClass}`);
		}

		let primaryActionHTML;
		if (opts.actions.primary.text) {
			primaryActionHTML = `<a href="${opts.actions.primary.url}" class="${opts.messageClass}__action--primary">${opts.actions.primary.text}</a>`;
		}

		let secondaryActionHTML;
		if (opts.actions.secondary.text) {
			secondaryActionHTML = `<a href="${opts.actions.secondary.url}" class="${opts.messageClass}__action--secondary">${opts.actions.secondary.text}</a>`;
		}

		let actions = `<div class="${opts.messageClass}__actions">
			${primaryActionHTML}
			${secondaryActionHTML}
			</div>
		`;

		let contentHTML;
		if (!opts.content.detail) {
			opts.content.detail = '';
		}

		if (opts.type === 'alert-inner' && opts.content.additionalInfo) {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__highlight">${opts.content.highlight}<span class="${opts.messageClass}__detail">${opts.content.detail}</span></p>
					<p class="${opts.messageClass}__additional-info">${opts.content.additionalInfo}</p>
					${actions}
				</div>
			`;
		} else {
			contentHTML = `
				<div class="${opts.messageClass}__content">
					<p class="${opts.messageClass}__highlight">${opts.content.highlight}<span class="${opts.messageClass}__detail">${opts.content.detail}</span></p>
					${actions}
				</div>
			`;
		}

		if (opts.type === 'alert-inner') {
			opts.close = false;
		}

		alertMessageEl.innerHTML = `
			<div class="${opts.messageClass}__container">
				${contentHTML}
			</div>
		`;

		return alertMessageEl;
	},

	/**
	* Build a close button
	* @returns {HTMLElement} Returns a new element to close the message
	*/
	closeButton: (opts) => {
		const closeButton = document.createElement('a');
		closeButton.classList.add(`${opts.messageClass}__close`);
		closeButton.setAttribute('role', 'button');
		closeButton.setAttribute('href', '#void');
		closeButton.setAttribute('aria-label', 'close');
		closeButton.setAttribute('title', 'Close');

		return closeButton;
	}
};
