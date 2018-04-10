import { throwError } from './helpers';

const prism = require('prism');
const loadLanguages = require('prism/components/index.js');

class SyntaxHighlight {
	/**
 * Class constructor.
 * @param {HTMLElement} [messageElement] - The message element in the DOM
 * @param {Object} [options={}] - An options object for configuring the message
 */
	constructor (syntaxEl) {
		this.syntaxEl = syntaxEl
		this.fetchCodeBlocks();
	}

	/**
 * Fetch <code> on the page
 */
	fetchCodeBlocks () {
		const codeBlocks = Array.from(this.syntaxEl.querySelectorAll('PRE'), pre => {
			if (pre.firstElementChild.tagName === 'CODE') {
				return pre.firstElementChild;
			} else {
				throwError(`A '<pre>' must be wrap a '<code>' for semantically correct syntax highlighting.`);
			};
		})

		codeBlocks.forEach(this.highlightLanguage);
	}

	/**
 * Prepares syntax for highlighting based on the language provided in the element classname (class="syntax-html")
 * @param {HTMLElement} - The <code> that holds the syntax to highlighter
 */
	highlightLanguage (code) {
		let className = code.className;
		let language;

		if (className.includes('syntax-')) {
			language = className.replace('syntax-', '');
		} else {
			throwError(`In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="syntax-html" or class="syntax-js"`);
		}

		let syntax = code.textContent;

		console.log(syntax);
		// if there is a language that is not bundled into default prism languages,
		// load it here (e.g.scss, json);
		if (!prism.languages.hasOwnProperty(language)) {
			loadLanguages([language]);
		}

		code.innerHTML = prism.highlight(syntax, prism.languages[language]);

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
