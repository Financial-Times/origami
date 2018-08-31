/* eslint-env mocha */

import LinkedHeading from '../src/js/linked-heading';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe('LinkedHeading', () => {
	let testArea;

	beforeEach(() => {
		document.body.innerHTML = `<div id="test-area"></div>`;
		testArea = document.querySelector('#test-area');
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	describe('new LinkedHeading(element)', () => {
		let headingElement;
		let instance;
		let originalConstructLinkElement;

		beforeEach(() => {
			originalConstructLinkElement = LinkedHeading.prototype.constructLinkElement;
			sinon.stub(LinkedHeading.prototype, 'constructLinkElement').returns('mock-link-element');
			testArea.innerHTML = '<h2 id="mock-id">Mock Content</h2>';
			headingElement = testArea.querySelector('h2');
			instance = new LinkedHeading(headingElement);
		});

		afterEach(() => {
			LinkedHeading.prototype.constructLinkElement.restore();
		});

		it('has a `headingElement` property set to the passed in element', () => {
			assert.strictEqual(instance.headingElement, headingElement);
		});

		it('has an `id` property set to the heading element ID', () => {
			assert.strictEqual(instance.id, 'mock-id');
		});

		it('has an `options` property set to the default options', () => {
			assert.deepEqual(instance.options, {
				baseClass: 'o-layout__linked-heading',
				content: '#',
				title: 'Link directly to this section of the page'
			});
		});

		it('has a `linkElement` property set to a constructed link element', () => {
			assert.calledOnce(LinkedHeading.prototype.constructLinkElement);
			assert.calledWithExactly(LinkedHeading.prototype.constructLinkElement);
			assert.strictEqual(instance.linkElement, 'mock-link-element');
		});

		describe('.constructLinkElement()', () => {
			let returnValue;

			beforeEach(() => {
				instance.options.baseClass = 'mock-base-class-option';
				instance.options.content = 'mock-content-option';
				instance.options.title = 'mock-title-option';
				returnValue = originalConstructLinkElement.call(instance);
			});

			it('sets the heading element HTML', () => {
				const actualHtml = headingElement.outerHTML.trim().replace(/\s+/g, ' ');
				const expectedHtml = `
					<h2 id="mock-id" class="mock-base-class-option">
						<a href="#mock-id" title="mock-title-option" class="mock-base-class-option__link">
							<span class="mock-base-class-option__content">Mock Content</span>
							<span class="mock-base-class-option__label">mock-content-option</span>
						</a>
					</h2>
				`.trim().replace(/\s+/g, ' ');
				assert.strictEqual(actualHtml, expectedHtml);
			});

			it('returns the created link element', () => {
				assert.strictEqual(returnValue, headingElement.querySelector('a'));
			});

			describe('when the heading does not have an ID', () => {

				beforeEach(() => {
					delete instance.id;
					returnValue = originalConstructLinkElement.call(instance);
				});

				it('returns `null`', () => {
					assert.isNull(returnValue);
				});

			});

		});

	});

	describe('new LinkedHeading(element, options)', () => {
		let headingElement;
		let instance;
		let options;

		beforeEach(() => {
			sinon.stub(LinkedHeading.prototype, 'constructLinkElement').returns('mock-link-element');
			testArea.innerHTML = '<h2 id="mock-id">Mock Content</h2>';
			headingElement = testArea.querySelector('h2');
			options = {
				baseClass: 'mock-base-class-option',
				content: 'mock-content-option',
				title: 'mock-title-option'
			};
			instance = new LinkedHeading(headingElement, options);
		});

		afterEach(() => {
			LinkedHeading.prototype.constructLinkElement.restore();
		});

		it('has an `options` property set to the given options', () => {
			assert.deepEqual(instance.options, options);
			assert.notStrictEqual(instance.options, options);
		});

	});

});
