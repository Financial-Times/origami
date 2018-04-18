import throwError from './helpers';

import prism from 'prism/prism.js';
import loadLanguages from 'prism/components/index.js';

class SyntaxHighlight {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor (syntaxEl, options) {
		this.syntaxElement = syntaxEl;
		this.opts = Object.assign({
			language: '',
			syntaxString: ''
	 	}, options);

		if (typeof this.syntaxElement === 'string') {
			this.opts.syntaxString = this.syntaxElement;
			this._checkLanguage();
		} else {
			this._tokeniseCodeBlocks();
		}
	}

	/**
	* Get language from HTML element
	* @param {HTMLElement} - The element with a language-relevant class name
	*/
	_getLanguage (element) {
		let className = element.className;

		if (className.includes('syntax-')) {
			this.opts.language = className.replace('syntax-', '');
		} else {
			throwError(`In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="syntax-html" or class="syntax-js"`);
		}

		this._checkLanguage();
	}

	/**
	* Check if language is present for tokenising, add if not load it here (e.g.scss, json);
	*/
	_checkLanguage () {
		if (this.opts.language && !prism.languages.hasOwnProperty(this.opts.language)) {
			try {
				loadLanguages([this.opts.language]);
			} catch (err) {
				throwError(`The language ${this.opts.language} is not supported. Please contact Origami if you would like to have it added.`)
			}
		}
	}

	/**
 * Fetch and tokenise every <code> tag's content under the syntaxEl
 */
	_tokeniseCodeBlocks () {
		const codeBlocks = Array.from(this.syntaxElement.querySelectorAll('PRE'), pre => {
			if (pre.firstElementChild.tagName === 'CODE') {
				return pre.firstElementChild;
			} else {
				throwError(`No '<code>' tag found. In order to highlight a codeblock semantically, a '<pre>' tag must wrap a '<code>' tag.`);
			}
		});

		codeBlocks.forEach(this._tokeniseBlock.bind(this));
	}

	/**
 * Prepares syntax for highlighting based on the language provided in the element classname (class="syntax-html")
 * @param {HTMLElement} - The html element that holds the syntax to highlight
 */
	_tokeniseBlock (element) {
		this._getLanguage(element);
		this.opts.syntaxString = element.textContent;
		element.innerHTML = this.tokenise();
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
