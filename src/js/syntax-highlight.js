const prism = require('prismjs');

class SyntaxHighlight {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */

	constructor (syntaxEl, opts) {
		this.syntaxEl = syntaxEl;
		this.opts = opts || {values: "default"};
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-component-boilerplate]')) {
			return new SyntaxHighlight(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-component-boilerplate"]'), rootEl => new SyntaxHighlight(rootEl, opts));
	}
}

export default SyntaxHighlight;
