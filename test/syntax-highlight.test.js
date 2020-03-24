/* eslint-env mocha, sinon, proclaim */

import SyntaxHighlight from '../src/js/syntax-highlight';
import assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

const flatten = string => string.replace(/\s/g, '');

sinon.assert.expose(assert, {
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
			assert.strictEqual(highlight.syntaxElement, syntaxEl);
		});

		it('throws an error if the language is not supported by prism', () => {
			const error = "*** o-syntax-highlight error:\nThe language bob is not supported. Please contact Origami if you would like to have it added.\n***";
			assert.throws(() => { new SyntaxHighlight('new bob language', {language: 'bob'}); }, error);
		});

		describe('with an HTML element', () => {
			it('fetches the language to highlight from the element class', () => {
				assert.strictEqual(highlight.opts.language, 'json');
			});

			it('throws an error if the <code> tag does not have a class', () => {
				const error = `*** o-syntax-highlight error:\nIn order to highlight a codeblock, the '<code>' requires a specific class to define a language. E.g. class="o-syntax-highlight--html" or class="o-syntax-highlight--js"\n***`;
				testArea.innerHTML = fixtures.classlessJSON;
				syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');

				assert.throws(() => { new SyntaxHighlight(syntaxEl); }, error);
			});

			it('tokenises string within a <code> tag', () => {
				assert.strictEqual(flatten(syntaxEl.innerHTML), flatten(fixtures.tokenisedJSON));
			});

			it('throws an error if code block is not built semantically', () => {
				const error = "*** o-syntax-highlight error:\nNo '<code>' tag found. In order to highlight a codeblock semantically, a '<pre>' tag must wrap a '<code>' tag.\n***";
				testArea.innerHTML = fixtures.unsemanticJSON;
				syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');

				assert.throws(() => { new SyntaxHighlight(syntaxEl); }, error);
			});
		});

		describe('with a string', () => {
			it('fetches the language to highlight from the options object', () => {
				highlight = new SyntaxHighlight('<div>HTML</div>', { language: 'html'});
				assert.strictEqual(highlight.opts.language, 'html');
			});

			it('throws an error if a language is not provided in the options', () => {
				const error = "*** o-syntax-highlight error:\nA language must be defined in the options object\n***";
				assert.throws(() => { new SyntaxHighlight('a string of code'); }, error);
			});
		});
	});
});
