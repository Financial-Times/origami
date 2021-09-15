import construct from './construct-element.js';

/**
 * An object of options to configure a message instance.
 * @typedef {Object} MessageOptions
 * @property {String} type - The o-message type e.g. 'action', 'alert' and 'notice'.
 * @property {String} state - The o-message state e.g. `success`, `neutral`, `error`, `inform-inverse`.
 * @property {Boolean} autoOpen [true] - Whether to show the message automatically.
 * @property {String} parentElement [null] - The element to append the message to. If none is declared it will leave any existing message elements in place or append to the body when creating a new message element.
 * @property {Object} content - Configuration for the message copy.
 * @property {String} content.detail - Copy for of the message e.g "Thing saved to the place you requested.".
 * @property {String} content.highlight [null] - Highlighted copy to prepend the main message copy "Success!".
 * @property {String} content.additionalInfo [null] - More copy with additional information – only applies to a message with an `inner` layout.
 * @property {Object} [actions] - Links to display on the message.
 * @property {Object} [actions.primary] - Show a link in the style of a primary button within the message.
 * @property {String} actions.primary.text - The copy for the link.
 * @property {String} actions.primary.url - The url for the link.
 * @property {Boolean} actions.primary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
 * @property {Object} [actions.secondary] - Show a link with less emphasis that the primary action.
 * @property {String} actions.secondary.text - The copy for the link.
 * @property {String} actions.secondary.url - The url for the link.
 * @property {Boolean} actions.secondary.openInNewWindow [false] - Opens in a new tab/window when set to `true`.
 * @property {Boolean} close [true] -  Whether or not to display a close button.
 */

class Message {
	/**
	 * Initialises an `o-message` component.
	 *
	 * @access public
	 * @param {HTMLElement} messageElement [undefined] - The `o-message` element (optional).
	 * @param {MessageOptions} options - An options object for configuring the message.
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
	 * @returns {void}
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
	 * @returns {void}
	 */
	open () {
		this.messageElement.classList.remove('o-message--closed');
		this.messageElement.dispatchEvent(new CustomEvent('o.messageOpen'));
	}

	/**
	 * Close the message.
	 * @returns {void}
	 */
	close () {
		this.messageElement.classList.add('o-message--closed');
		this.messageElement.dispatchEvent(new CustomEvent('o.messageClosed'));
	}

	/**
	 * Get the data attributes from the messageElement. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} messageElement - The message element in the DOM
	 * @returns {Object} - An object of options defined via data attributes on the message element
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
	 * @typedef {Object} MessageOptions - An options object for configuring the messages
	 * @returns {Message|Message[]} The newly constructed message components
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
