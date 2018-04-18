/* eslint-env mocha, sinon, proclaim */

import SyntaxHighlight from '../src/js/syntax-highlight';
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
			stubs._checkLanguage = sinon.stub(SyntaxHighlight.prototype, '_checkLanguage');

			testArea = document.getElementById('test-area');
			syntaxEl = document.querySelector('[data-o-component=o-syntax-highlight]');
			highlight = new SyntaxHighlight(syntaxEl);


			SyntaxHighlight.prototype.restore();
		});

		it('stores `syntaxEl` in a syntaxElement property', () => {
			assert.strictEqual(highlight.syntaxElement, syntaxEl);
		});

		it('fetches the language to highlight from the element class', () => {
			assert.strictEqual(highlight.opts.language, 'json');
		});

		it('checks if languages is bundled in prism', () => {
			assert.calledOnce(stubs._checkLanguage);
		});
	});
});
