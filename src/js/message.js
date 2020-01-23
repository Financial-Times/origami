import construct from './construct-element';

class Message {
	/**
	 * Initialises an `o-message` component.
	 *
	 * @access public
	 * @param {HTMLElement} messageElement [undefined] - The `o-message` element (optional).
	 * @param {Object} [options={}] - An options object for configuring the message (see the README for details).
	 *
	 * @example To construct all elements on the page with the `data-o-component="o-message"` attribute.
 	 *      Message.init();
	 *
	 * @example To construct a specifc o-message on the page.
	 * 		const myMessageElement = document.querySelector('.my-message');
 	 *      const myMessage = new Message(myMessageElement, {});
	 *
	 * @example To construct a message which does not already exist on the page.
 	 *      const errorAlert = new Message(null, {
 	 *      	type: 'alert',
 	 *      	state: 'error',
 	 *      	content: {
 	 *      		highlight: 'Something has gone wrong.',
 	 *      		detail: 'The quick brown fox did not jump over the lazy dogs.'
 	 *      	}
 	 *      });
	 */
	constructor(messageElement, options) {
		this.messageElement = messageElement;

		//Default options
		const type = options && options.type ? options.type : null;
		const inner = options && options.inner ? options.inner : false;
		const state = options && options.state ? options.state : null;

		this.opts = Object.assign({}, {
			autoOpen: true,
			type,
			state,
			inner,
			parentElement: null,
			content: {
				highlight: null,
				detail: '&hellip;',
				additionalInfo: false
			},
			actions: {
				primary: {
					text: null,
					url: null,
					openInNewWindow: false
				},
				secondary: {
					text: null,
					url: null,
					openInNewWindow: false
				}
			},
			close: options && options.close ? options.close : true
		}, options || Message.getDataAttributes(messageElement));

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
		if (this.opts.parentElement || !(this.messageElement instanceof HTMLElement)) {
			this.messageElement = construct.message(this.opts);
			// attach oMessage to specified parentElement or default to document body
			const element = this.opts.parentElement ? document.querySelector(this.opts.parentElement) : document.body;
			element.appendChild(this.messageElement);
		}

		const closeButtonExists = this.messageElement.querySelector("[class*='__close']");
		if (this.opts.close && !closeButtonExists) {
			this.closeButton = construct.closeButton();
			// Add event listeners
			this.closeButton.addEventListener('click', event => {
				event.preventDefault();
				this.close();
			});

			this.messageElement.lastElementChild.appendChild(this.closeButton);
		}
	}

	/**
	 * Open the message.
	 */
	open () {
		this.messageElement.classList.remove('o-message--closed');
		this.messageElement.dispatchEvent(new CustomEvent('o.messageOpen'));
	}

	/**
	 * Close the message.
	 */
	close () {
		this.messageElement.classList.add('o-message--closed');
		this.messageElement.dispatchEvent(new CustomEvent('o.messageClosed'));
	}

	/**
	 * Get the data attributes from the messageElement. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} messageElement - The message element in the DOM
	 */
	static getDataAttributes (messageElement) {
		if (!(messageElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(messageElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oMessage(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = messageElement.dataset[key];

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
