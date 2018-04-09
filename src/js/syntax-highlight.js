import { throwError } from './helpers';
const prism = require('prismjs');

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

	highlightLanguage (code) {
		let className = code.className;
		let language;
		if (className.includes('syntax-')) {
			language = className.replace('syntax-', '');
		} else {
			throwError(`In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="syntax-html" or class="syntax-js"`);
		}

		let syntax = code.innerHTML;
		code.innerHTML = prism.highlight(syntax, prism.languages[language]);
	}

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
