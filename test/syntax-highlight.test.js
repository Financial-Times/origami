/* eslint-env mocha, sinon, proclaim */

import SyntaxHighlight from '../src/js/syntax-highlight';
import loadLanguages from 'prism/components/index.js';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import fixtures from './helpers/fixtures';

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
			testArea.innerHTML = fixtures.html;
			testArea = document.getElementById('test-area');
			syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');
			highlight = new SyntaxHighlight(syntaxEl);
		});

		it('stores `syntaxEl` in a syntaxElement property', () => {
			assert.strictEqual(highlight.syntaxElement, syntaxEl);
		});

		it('fetches the language to highlight from the element class', () => {
			assert.strictEqual(highlight.opts.language, 'json');
		});

		it('loads a new lanugage if it isn\'t bundled in prism', () => {

		});
	});
});
