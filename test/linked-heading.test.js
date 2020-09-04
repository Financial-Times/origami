/* eslint-env mocha */
/* global proclaim sinon */

import LinkedHeading from '../src/js/linked-heading.js';

sinon.assert.expose(proclaim, {
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
			proclaim.strictEqual(instance.headingElement, headingElement);
		});

		it('has an `id` property set to the heading element ID', () => {
			proclaim.strictEqual(instance.id, 'mock-id');
		});

		it('has an `options` property set to the default options', () => {
			proclaim.deepEqual(instance.options, {
				content: '#',
				title: 'Link directly to this section of the page'
			});
		});

		it('has a `linkElement` property set to a constructed link element', () => {
			proclaim.calledOnce(LinkedHeading.prototype.constructLinkElement);
			proclaim.calledWithExactly(LinkedHeading.prototype.constructLinkElement);
			proclaim.strictEqual(instance.linkElement, 'mock-link-element');
		});

		describe('.constructLinkElement()', () => {
			let returnValue;

			beforeEach(() => {
				instance.options.content = 'mock-content-option';
				instance.options.title = 'mock-title-option';
				returnValue = originalConstructLinkElement.call(instance);
			});

			it('sets the heading element HTML', (done) => {
				const expectedHtml = `
					<h2 id="mock-id" class="o-layout__linked-heading">
						<a href="#mock-id" title="mock-title-option" class="o-layout__linked-heading__link">
							<span class="o-layout__linked-heading__content">Mock Content</span>
							<span class="o-layout__linked-heading__label">mock-content-option</span>
						</a>
					</h2>
				`.replace(/\s+/g, '');

				// allow for request animation frame
				setTimeout(() => {
					const actualHtml = headingElement.outerHTML.replace(/\s+/g, '');
					proclaim.strictEqual(actualHtml, expectedHtml);
					done();
				}, 100);
			});

			it('returns the created link element', (done) => {
				// allow for request animation frame
				setTimeout(() => {
					proclaim.strictEqual(returnValue, headingElement.querySelector('a'));
					done();
				}, 100);
			});

			describe('when the heading does not have an ID', () => {

				beforeEach(() => {
					delete instance.id;
					returnValue = originalConstructLinkElement.call(instance);
				});

				it('returns `null`', () => {
					proclaim.isNull(returnValue);
				});

			});

			describe('when the heading already contains a link element', () => {
				let expectedHtml;
				let existingLinkElement;

				beforeEach(() => {
					expectedHtml = '<a href="/mock-url">Mock Content</a>';
					headingElement.innerHTML = expectedHtml;
					existingLinkElement = headingElement.querySelector('a');
					returnValue = originalConstructLinkElement.call(instance);
				});

				it('returns the existing link element', () => {
					proclaim.strictEqual(returnValue, existingLinkElement);
				});

				it('does nothing to the DOM', () => {
					proclaim.strictEqual(headingElement.innerHTML, expectedHtml);
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
				content: 'mock-content-option',
				title: 'mock-title-option'
			};
			instance = new LinkedHeading(headingElement, options);
		});

		afterEach(() => {
			LinkedHeading.prototype.constructLinkElement.restore();
		});

		it('has an `options` property set to the given options', () => {
			proclaim.deepEqual(instance.options, options);
			proclaim.notStrictEqual(instance.options, options);
		});

	});

});
