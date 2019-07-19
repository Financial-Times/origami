import throwError from './helpers';

import prism from 'prism/components/prism-core.js';
// Adds to Prism global object which we remove https://github.com/PrismJS/prism/blob/v1.15.0/prism.js#L6
import 'prism/components/prism-markup.js';
import 'prism/components/prism-css.js';
import 'prism/components/prism-clike.js';
import 'prism/components/prism-javascript.js';
import 'prism/components/prism-bash.js';
import 'prism/components/prism-json.js';
import 'prism/components/prism-scss.js';
import 'prism/components/prism-yaml.js';
import diff from './languages/prism-diff.js';

class SyntaxHighlight {
	/**
	 * Class constructor.
	 * @param {HTMLElement|String} [messageElement] - The message element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the message
	 * @param {String} options.language - The language to tokenise the code for
	 */
	constructor (syntaxEl, options) {
		delete window.Prism; // Remove Prism global https://github.com/PrismJS/prism/blob/v1.15.0/prism.js#L6
		prism.languages.diff = diff; // Assign custom diff language
		this.syntaxElement = syntaxEl;
		this.opts = Object.assign({
			language: '',
			syntaxString: ''
	 	}, options);

		if (typeof this.syntaxElement === 'string') {
			this._setLanguage();
		} else {
			this._tokeniseCodeBlocks();
		}
	}

	/**
	* Set language for syntax highlighting
	*/
	_setLanguage () {
		if (this.opts.language) {
			this.opts.syntaxString = this.syntaxElement;
			this._checkLanguage();
		} else {
			throwError('A language must be defined in the options object');
		}
	}

	/**
	* Get language from HTML element
	* @param {HTMLElement} - The element with a language-relevant class name
	*/
	_getLanguage (element) {
		let className = element.className;

		if (className.includes('o-syntax-highlight--')) {
			this.opts.language = className.replace('o-syntax-highlight--', '');
		} else {
			throwError(`In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="o-syntax-highlight--html" or class="o-syntax-highlight--js"`);
		}

		this._checkLanguage();
	}

	/**
	* Check if language is present for tokenising, add if not load it here (e.g.scss, json);
	*/
	_checkLanguage () {
		if (this.opts.language && !prism.languages.hasOwnProperty(this.opts.language)) {
			throwError(`The language ${this.opts.language} is not supported. Please contact Origami if you would like to have it added.`);
		}
	}

	/**
 * Fetch and tokenise every <code> tag's content under the syntaxEl
 */
	_tokeniseCodeBlocks () {
		/* eslint-disable array-callback-return */
		const codeBlocks = Array.from(this.syntaxElement.querySelectorAll('PRE'), pre => {
			if (pre.firstElementChild && pre.firstElementChild.tagName === 'CODE') {
				return pre.firstElementChild;
			} else {
				throwError(`No '<code>' tag found. In order to highlight a codeblock semantically, a '<pre>' tag must wrap a '<code>' tag.`);
			}
		});
		/* eslint-enable array-callback-return */

		codeBlocks.forEach(this._tokeniseBlock.bind(this));
	}

	/**
 * Prepares syntax for highlighting based on the language provided in the element classname (class="syntax-html")
 * @param {HTMLElement} - The html element that holds the syntax to highlight
 */
	_tokeniseBlock (element) {
		this._getLanguage(element);
		this.opts.syntaxString = element.innerText;
		element.innerHTML = this.tokenise();
	}

	/**
	 * Tokenise string for highlighting
	 @returns {HTMLElement} tokenised code in the form of HTML elements
	 */
	tokenise () {
		return prism.highlight(this.opts.syntaxString, prism.languages[this.opts.language]);
	}

	/**
	 * Initialise syntax highlighting.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise a message in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the syntax highlighting
	 *
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
