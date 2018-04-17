import throwError from './helpers';

const prism = require('prismjs/prism.js');
const loadLanguages = require('prismjs/components/index.js');

class SyntaxHighlight {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor (syntaxEl, options) {
		this.syntaxEl = syntaxEl
		this.opts = Object.assign({ 
			language: '',
			syntaxString: ''
		}, options);

		if (typeof this.syntaxEl === 'string') {
			this.opts.syntaxString = this.syntaxEl;
			this._checkPresence();
		} else {
			this.fetchCodeBlocks()
		}
	}

	/**
 * Fetch <code> on the page
 */
	fetchCodeBlocks () {
		const codeBlocks = Array.from(this.syntaxEl.querySelectorAll('PRE'), pre => {
			if (pre.firstElementChild.tagName === 'CODE') {
				return pre.firstElementChild;
			} else {
				throwError(`No '<code>' tag found. In order to highlight a codeblock semantically, a '<pre>' tag must wrap a '<code>' tag.`);
			};
		})

		codeBlocks.forEach(this._highlightBlocks);
	}

	/**
 * Prepares syntax for highlighting based on the language provided in the element classname (class="syntax-html")
 * @param {String} - The <code> that holds the syntax to highlight
 */
	_highlightBlocks (code) {
		let className = code.className;
		let language;

		if (className.includes('syntax-')) {
			this.opts.language = className.replace('syntax-', '');
		} else {
			throwError(`In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="syntax-html" or class="syntax-js"`);
		}

		this.opts.syntaxString = code.textContent;
		this._checkPresence(language);

		code.innerHTML = this.tokenise();
	}

	/**
	 * Check if language is present for tokenising, add if not load it here (e.g.scss, json);
	 * @param {String} - The language to verify
	 */
	_checkPresence () {
		if (this.opts.language && !prism.languages.hasOwnProperty(this.opts.language)) {
			loadLanguages([this.opts.language]);
		}
	}

	/**
	 * Tokenise string for highlighting
	 */
	tokenise () {
		return prism.highlight(this.opts.syntaxString, prism.languages[this.opts.language]);
	}

	/**
	 * Initialise syntax highlighting.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a message in, or a CSS selector for the root element
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-syntax-highlight]')) {
			return new SyntaxHighlight(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-syntax-highlight"]'), rootEl => new SyntaxHighlight(rootEl, opts));
	}
}

export default SyntaxHighlight;
