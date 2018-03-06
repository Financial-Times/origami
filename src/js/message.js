import construct from './construct-element';
import { throwError } from './helpers';

class Message {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor(messageElement, options) {
		this.messageElement = messageElement;

		//Default options
		const messageClass = options && options.messageClass ? options.messageClass : 'o-message';
		const type = options && options.type ? options.type : 'alert';
		const status = options && options.status ? options.status : null;

		this.opts = Object.assign({}, {
			autoOpen: true,
			messageClass,
			type,
			typeClass: `${messageClass}--${type}`,
			status,
			statusClass: options && options.status ? `${messageClass}--${options.status}` : null,
			parentElement: null,
			content: {
				highlight: null,
				detail: '&hellip;',
				additionalInfo: false
			},
			actions: {
				primary: {
					text: null,
					url: '#'
				},
				secondary: {
					text: null,
					url: '#'
				}
			},
			close: true
		}, options);

		this.render();

		if (this.opts.autoOpen) {
			this.open();
		} else {
			this.close();
		}
	}

	/**
	 * Render the message.
	 */
	render () {
		// If the message element is not an HTML Element, or if a parent element has been specified, build a new message element
		if (!(this.messageElement instanceof HTMLElement) || this.opts.parentElement) {
			this.messageElement = this.constructMessageElement();

			// attach oMessage to specified parentElement or default to document body
			let element = this.opts.parentElement ? document.querySelector(this.opts.parentElement) : document.body;
			element.appendChild(this.messageElement);
		}

		// if the message is 'alert-inner' it shouldn't be close-able
		if (this.messageElement.matches("[class*='-inner']")) {
			this.opts.close = false;
		}

		if (this.opts.close) {
			let closeButton = construct.closeButton(this.opts);

			// Add event listeners
			closeButton.addEventListener('click', event => {
				event.preventDefault();
				this.close();
			});

			this.messageElement.lastElementChild.appendChild(closeButton);
		}
	}

	/**
	* Constructs a type of message based on provided options (alert for now)
	* @returns {HTMLElement} Returns the type specific message element
	*/
	constructMessageElement () {
		if (this.opts.type === 'alert' || this.opts.type === 'alert-bleed' || this.opts.type === 'alert-inner') {
			if (!this.opts.content.highlight) {
				throwError(`An ${this.opts.type} message element requires options.content.highlight`);
			} else {
				return construct.alertMessage(this.opts);
			}
		} else {
			throwError(`'${this.opts.type}' is not a supported message type. The available options are 'alert', 'alert-bleed' or 'alert-inner'`);
		}
	}

	/**
	 * Open the message.
	 */
	open () {
		this.messageElement.classList.remove(`${this.opts.messageClass}--closed`);
		this.messageElement.dispatchEvent(new CustomEvent('o.messageOpen'));
	}

	/**
	 * Close the message.
	 */
	close () {
		this.messageElement.classList.add(`${this.opts.messageClass}--closed`);
		this.messageElement.dispatchEvent(new CustomEvent('o.messageClosed'));
	}

	/**
	 * Initialise message component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a message in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the banners
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-message]')) {
			return new Message(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-message"]'), rootEl => new Message(rootEl, opts));
	}
}

export default Message;
