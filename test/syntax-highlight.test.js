/* eslint-env mocha, sinon, proclaim */

import SyntaxHighlight from '../src/js/syntax-highlight';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

const flatten = string => string.replace(/\s/g, '');

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe("Syntax Highlight", () => {
	let testArea;
	let stubs = {};
	let syntaxEl;
	let highlight;

	beforeEach(() => {
		document.body.innerHTML += '<div id="test-area"></div>';
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('new syntax highlighter initialised declaratively', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.json;

			syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');
			highlight = new SyntaxHighlight(syntaxEl);
		});

		it('stores `syntaxEl` in a syntaxElement property', () => {
			assert.strictEqual(highlight.syntaxElement, syntaxEl);
		});

		it('fetches the language to highlight from the element class', () => {
			assert.strictEqual(highlight.opts.language, 'json');
		});

		it('tokenises string within a <code> tag', () => {
			assert.strictEqual(flatten(syntaxEl.innerHTML), flatten(fixtures.tokenisedJSON));
		});

		it('throws an error if the language is not supported by prism', () => {
			let error = "*** o-syntax-highlight error:\nThe language bob is not supported. Please contact Origami if you would like to have it added.\n***"
			assert.throws(() => { new SyntaxHighlight('new bob language', {language: 'bob'}) }, error);
		});
	});
});
