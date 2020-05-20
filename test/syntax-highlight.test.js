/* eslint-env mocha */
/* global proclaim sinon */

import SyntaxHighlight from '../src/js/syntax-highlight';
import fixtures from './helpers/fixtures';

const flatten = string => string.replace(/\s/g, '');

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe("Syntax Highlight", () => {
	let testArea;
	let syntaxEl;
	let highlight;

	beforeEach(() => {
		document.body.innerHTML += '<div id="test-area"></div>';
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('new instance', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.json;
			syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');
			highlight = new SyntaxHighlight(syntaxEl);
		});

		it('stores `syntaxEl` in a syntaxElement property', () => {
			proclaim.strictEqual(highlight.syntaxElement, syntaxEl);
		});

		it('throws an error if the language is not supported by prism', () => {
			const error = "*** o-syntax-highlight error:\nThe language bob is not supported. Please contact Origami if you would like to have it added.\n***";
			proclaim.throws(() => { new SyntaxHighlight('new bob language', {language: 'bob'}); }, error);
		});

		describe('with an HTML element', () => {
			it('fetches the language to highlight from the element class', () => {
				proclaim.strictEqual(highlight.opts.language, 'json');
			});

			it('logs a warning if the <code> tag does not have a class', () => {
				const warning = `In order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="o-syntax-highlight--html" or class="o-syntax-highlight--js"`;
				testArea.innerHTML = fixtures.classlessJSON;
				syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');

				const warningSpy = sinon.spy(console, 'warn');
				new SyntaxHighlight(syntaxEl);
				proclaim.isTrue(warningSpy.withArgs(warning, sinon.match.any).calledOnce);
				warningSpy.restore();
			});

			it('tokenises string within a <code> tag', () => {
				proclaim.strictEqual(flatten(syntaxEl.innerHTML), flatten(fixtures.tokenisedJSON));
			});

			it('does not throw an error if a pre tag is found with no code block', () => {
				testArea.innerHTML = fixtures.unsemanticJSON;
				syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');
				proclaim.doesNotThrow(() => { new SyntaxHighlight(syntaxEl); });
			});
		});

		describe('with a string', () => {
			it('fetches the language to highlight from the options object', () => {
				highlight = new SyntaxHighlight('<div>HTML</div>', { language: 'html'});
				proclaim.strictEqual(highlight.opts.language, 'html');
			});

			it('throws an error if a language is not provided in the options', () => {
				const error = "*** o-syntax-highlight error:\nA language must be defined in the options object\n***";
				proclaim.throws(() => { new SyntaxHighlight('a string of code'); }, error);
			});
		});
	});
});
