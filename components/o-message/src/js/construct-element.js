export default {
	/**
	 * An object of options to configure a message instance.
	 *
	 * @typedef {object} MessageOptions
	 * @property {string} type - The o-message type e.g. 'action', 'alert' and 'notice'.
	 * @property {string} state - The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`.
	 * @property {boolean} autoOpen [true] - Whether to show the message automatically.
	 * @property {string} parentElement [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element.
	 * @property {object} content - Configuration for the message copy.
	 * @property {string} content.detail - Copy for of the message e.g "Thing saved to the place you requested.".
	 * @property {string} content.highlight [null] - Highlighted copy to prepend the main message copy "Success!".
	 * @property {string} content.additionalInfo [null] - More copy with additional information – only applies to a message with an `inner` layout.
	 * @property {Object} [actions] - Links to display on the message.
	 * @property {Object} [actions.primary] - Show a link in the style of a primary button within the message.
	 * @property {string} actions.primary.text - The copy for the link.
	 * @property {string} actions.primary.url - The url for the link.
	 * @property {boolean} actions.primary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
	 * @property {Object} [actions.secondary] - Show a link with less emphasis that the primary action.
	 * @property {string} actions.secondary.text - The copy for the link.
	 * @property {string} actions.secondary.url - The url for the link.
	 * @property {boolean} actions.secondary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
	 * @property {boolean} close [true] -  Whether or not to display a close button.
	 */
	/**
	 * Build a full message element. Used when there is no message element in the DOM.
	 *
	 * @param {MessageOptions} opts - An options object for configuring the message.
	 * @returns {HTMLElement} Returns the new message element
	 */
	message: (opts) => {
		const messageElement = document.createElement('div');
		if (!opts.type) {
			throw new Error(`*** o-message error:\nMessages require a type. Available types are:\n- action\n- alert\n- notice\n***`);
		}

		messageElement.classList.add('o-message', `o-message--${opts.type}`, 'o-message--closed');
		if (!opts.close) {
			// when close is disabled add the declarative close attribute
			// which is used to apply style
			messageElement.setAttribute('data-o-message-close', false);
		}

		if (opts.inner) {
			messageElement.classList.add('o-message--inner');
		}

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
	 *
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
