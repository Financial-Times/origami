/* eslint-env mocha, sinon, proclaim */

import Layout from '../src/js/layout';
import fixtures from './helpers/fixtures';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe('Layout', () => {
	let testArea;
	let layout;
	let layoutElement;
	let stubs = {};
	let options;

	beforeEach(() => {
		document.body.innerHTML += `<div id="test-area"></div>`;
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('.init()', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.main;
			stubs.constructNavFromDOM = sinon.stub(Layout.prototype, 'constructNavFromDOM');
			stubs.highlightNavItems = sinon.stub(Layout.prototype, 'highlightNavItems');
			stubs.getDataAttributes = sinon.stub(Layout, 'getDataAttributes');

			options = {};
			layoutElement = document.querySelector('[data-o-component=o-layout]');
			layout = new Layout(layoutElement);

			Layout.prototype.constructNavFromDOM.restore();
			Layout.prototype.highlightNavItems.restore();
			Layout.getDataAttributes.restore();
		});

		it('stores `layoutElement` in a `layoutEl` property', () => {
			assert.strictEqual(layout.layoutEl, layoutElement);
		});

		it('has default options and stores them in an `options` property', () => {
			assert.isObject(layout.options);
			assert.notStrictEqual(layout.options, options);
			assert.deepEqual(layout.options, {
				constructNav: true,
				baseClass: 'o-layout',
				navHeadingSelector: 'h2, h3'
			});
		});

		it('constructs the navigation by default', () => {
			assert.calledOnce(stubs.constructNavFromDOM);
		});

		it('does not construct navigation by default', () => {
			layoutElement = document.querySelector('[data-o-component=o-layout]');
			layout = new Layout(layoutElement, {constructNav: false});
			assert.calledOnce(stubs.constructNavFromDOM);
		});

		it('extracts options from the DOM', () => {
			assert.calledOnce(stubs.getDataAttributes);
		});
	});

	describe('.constructNavFromDOM()', () => {
		beforeEach(() => {
			testArea.innerHTML = fixtures.constructNav;
			stubs.highlightNavItems = sinon.stub(Layout.prototype, 'highlightNavItems');
			stubs.getDataAttributes = sinon.stub(Layout, 'getDataAttributes');

			layoutElement = document.querySelector('[data-o-component=o-layout]');
			layout = new Layout(layoutElement);

			Layout.prototype.highlightNavItems.restore();
			Layout.getDataAttributes.restore();
		});

		it('extracts headings from main content to construct sidebar navigation', () => {
			let headingId = testArea.querySelector('h2').id;
			let navItemHash = testArea.querySelector('a').hash;
			assert.strictEqual(navItemHash, `#${headingId}`);
		});
	});

	describe('.getDataAttributes', () => {
		let mockLayoutEl;
		let returnValue;

		beforeEach(() => {
			mockLayoutEl = document.createElement('div');
			mockLayoutEl.setAttribute('data-o-component', 'o-banner');
			mockLayoutEl.setAttribute('data-key', 'value');
			mockLayoutEl.setAttribute('data-another-key', 'value');
			mockLayoutEl.setAttribute('data-o-layout-foo', 'bar');
			mockLayoutEl.setAttribute('data-o-layout-json', '{"foo": "bar"}');
			mockLayoutEl.setAttribute('data-o-layout-json-single', '{\'foo\': \'bar\'}');
			returnValue = Layout.getDataAttributes(mockLayoutEl);
		});

		it('returns an object', () => {
			assert.isObject(returnValue);
		});

		it('extracts values from data attributes and returns them as object keys', () => {
			assert.strictEqual(returnValue.key, 'value');
		});

		it('converts the keys to camel-case', () => {
			assert.isUndefined(returnValue['another-key']);
			assert.strictEqual(returnValue.anotherKey, 'value');
		});

		it('ignores the `data-o-component` attribute', () => {
			assert.isUndefined(returnValue.oComponent);
		});

		it('strips "o-layout" from the key', () => {
			assert.isUndefined(returnValue.oLayoutFoo);
			assert.strictEqual(returnValue.foo, 'bar');
		});

		it('parses the key as JSON if it\'s valid', () => {
			assert.isObject(returnValue.json);
			assert.deepEqual(returnValue.json, {
				foo: 'bar'
			});
		});

		it('parses the key as JSON even if single quotes are used', () => {
			assert.isObject(returnValue.jsonSingle);
			assert.deepEqual(returnValue.jsonSingle, {
				foo: 'bar'
			});
		});
	});
});
