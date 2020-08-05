export default {
	/**
	* Build a full message element. Used when there is no message element in the DOM.
	* @param {MessageOptions} opts - An options object for configuring the message.
	* @returns {HTMLElement} Returns the new message element
	*/
	message: (opts) => {
		const messageElement = document.createElement('div');
		if (!opts.type) {
			throw new Error(`*** o-message error:\nMessages require a type. Available types are:\n- action\n- alert\n- notice\n***`);
		}

		messageElement.classList.add('o-message', `o-message--${opts.type}`, 'o-message--closed');
		if (opts.inner) { messageElement.classList.add('o-message--inner'); }

		if (!opts.state) {
			throw new Error(`*** o-message error:\nMessages require a state.\n***`);
		} else {
			messageElement.classList.add(`o-message--${opts.state}`);
		}

		opts.content.detail = opts.content.detail ? opts.content.detail : '';

		let content = '';
		let additionalContent = '';
		let actions = '';


		if (opts.content.highlight) {
			content = `
				<span class="o-message__content-highlight">${opts.content.highlight}</span>
				<span class="o-message__content-detail">${opts.content.detail}</span>
			`;
		} else {
			content = opts.content.detail;
		}

		if (opts.inner && opts.content.additionalInfo) {
			additionalContent = `<p class="o-message__content-additional">${opts.content.additionalInfo}</p>`;
		}

		const actionEl = (config, type) => `<a href="${config.url ? config.url : ''}" class="o-message__actions__${type}" ${config.openInNewWindow ? `target="_blank" aria-label="${config.text} (opens in new window)"` : ''}>${config.text}</a>`;

		if (opts.actions) {
			actions = `
				<div class="o-message__actions">
					${opts.actions.primary && opts.actions.primary.text ? actionEl(opts.actions.primary, 'primary') : ''}
					${opts.actions.secondary && opts.actions.secondary.text ? actionEl(opts.actions.secondary, 'secondary') : ''}
				</div>
			`;
		}

		messageElement.innerHTML = `
			<div class="o-message__container">
				<div class="o-message__content">
					<p class="o-message__content-main">
						${content}
					</p>
					${additionalContent}
					${actions}
				</div>
			</div>
		`;


		return messageElement;
	},
	/**
	* Build a close button
	* @returns {HTMLElement} Returns a new element to close the message
	*/
	closeButton: () => {
		const closeButton = document.createElement('button');
		closeButton.classList.add(`o-message__close`);
		closeButton.setAttribute('aria-label', 'close');
		closeButton.setAttribute('title', 'Close');

		return closeButton;
	}
};
