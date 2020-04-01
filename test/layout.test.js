/* eslint-env mocha */
/* global sinon, proclaim */

import Layout from '../src/js/layout';
import { docs, docsWithSubHeading, query } from './helpers/fixtures';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('Layout', () => {
	let documentationLayoutElement;
	let queryLayoutElement;

	beforeEach(() => {
		document.body.innerHTML = docs + query;
		documentationLayoutElement = document.querySelector('.o-layout--docs');
		queryLayoutElement = document.querySelector('.o-layout--query');
	});

	afterEach(() => {
		document.body.innerHTML = '';
	});

	describe('.init()', () => {

		it('stores `documentationLayoutElement` in a `layoutEl` property', () => {
			const layout = new Layout(documentationLayoutElement);
			proclaim.strictEqual(layout.layoutEl, documentationLayoutElement);
		});

		it('has default options and stores them in an `options` property', () => {
			const layout = new Layout(documentationLayoutElement);
			proclaim.isObject(layout.options);
			proclaim.deepEqual(layout.options, {
				constructNav: true,
				navHeadingSelector: 'h1, h2, h3',
				linkHeadings: true,
				linkedHeadingSelector: 'h1, h2, h3, h4, h5, h6'
			});
		});

		it('constructs the documentation layout navigation by default', () => {
			const layout = new Layout(documentationLayoutElement);
			proclaim.strictEqual(layout.navHeadings.length, 2, `Expected to find two navigation headings but found ${layout.navHeadings.length}.`);
		});

		it('constructs a nested navigation when a h3 (or lower) follows a h2', (done) => {
			document.body.innerHTML = docsWithSubHeading;
			documentationLayoutElement = document.querySelector('.o-layout--docs');
			new Layout(documentationLayoutElement, {
				navHeadingSelector: 'h1, h2, h3, h4, h5, h6'
			});
			setTimeout(() => {
				proclaim.strictEqual(
					documentationLayoutElement.querySelector('.o-layout__sidebar').innerHTML.replace(/[\n\t]/g, ''),
					'<nav class="o-layout__navigation"><ol class="o-layout__unstyled-element"><li class="o-layout__unstyled-element o-layout__navigation-title"><a class="o-layout__unstyled-element" href="#this-is-a-h1" aria-current="location">This is a heading level 1</a></li><li class="o-layout__unstyled-element "><a class="o-layout__unstyled-element" href="#this-is-a-h2" aria-current="false">This is a heading level 2</a><ol><li><a class="o-layout__unstyled-element" href="#sub-heading-1" aria-current="false">Sub heading 1</a></li><li><a class="o-layout__unstyled-element" href="#sub-heading-1b" aria-current="false">Sub heading 1b</a></li><li><a class="o-layout__unstyled-element" href="#sub-heading-2" aria-current="false">Sub heading 2</a></li></ol></li><li class="o-layout__unstyled-element "><a class="o-layout__unstyled-element" href="#this-is-a-second-h2" aria-current="false">This is a second heading level 2</a><ol><li><a class="o-layout__unstyled-element" href="#sub-heading-a" aria-current="false">Sub heading a</a></li></ol></li></ol></nav>'
				);
				done();
			}, 100);
		});

		it('does not construct the navigation by default for the query layout', () => {
			new Layout(queryLayoutElement);
			proclaim.strictEqual(queryLayoutElement.querySelector('.o-layout__query-sidebar').innerHTML, '', 'Expected to find no navigation HTML within the query layout sidebar.');
		});

		it('constructs the navigation for the query layout when "constructNav" is explicit', (done) => {
			new Layout(queryLayoutElement, {
				constructNav: true
			});
			setTimeout(() => {
				proclaim.ok(queryLayoutElement.querySelector('.o-layout__query-sidebar').innerHTML, 'Expected to find navigation HTML within the query layout sidebar.');
				done();
			}, 100);
		});

		it('constructs the navigation headings with a custom selector set by the "navHeadingSelector" option', (done) => {
			new Layout(documentationLayoutElement, { navHeadingSelector: 'h1' });
			// allow for request animation frame
			setTimeout(() => {
				proclaim.ok(document.querySelector('.o-layout__navigation'), 'Expected to find a navigation element.');
				done();
			}, 100);
		});

		it('does not construct navigation when "constructNav" is set to false', (done) => {
			new Layout(documentationLayoutElement, { constructNav: false });
			// allow for request animation frame
			setTimeout(() => {
				proclaim.notOk(document.querySelector('.o-layout__navigation'), null, 'Did not expect to find a navigation element.');
				done();
			}, 100);
		});

		it('updates `aria-current` on init for manually constructed navigation markup', (done) => {
			// manually construct nav
			const navMarkup = `
				<nav class="o-layout__navigation">
					<ol class="o-layout__unstyled-element">
						<li class="o-layout__unstyled-element o-layout__navigation-title">
							<a class="o-layout__unstyled-element" href="#this-is-a-h1">This is a heading level 1</a>
						</li>
						<li class="o-layout__unstyled-element ">
							<a id="second-nav-link" class="o-layout__unstyled-element" aria-current="location" href="#this-is-a-h2">This is a heading level 2</a>
						</li>
					</ol>
				</nav>
			`;
			const layoutSidebarElement = document.querySelector('.o-layout__sidebar');
			layoutSidebarElement.innerHTML = navMarkup;
			// the second nav link in the current location in our markup,
			// although it's not actually when the page loads
			const navLink = document.getElementById('second-nav-link');
			proclaim.equal(navLink.getAttribute('aria-current'), 'location');
			// init layout, with `constructNav: false` as we created our own
			new Layout(documentationLayoutElement, { constructNav: false });
			// allow for request animation frame
			setTimeout(() => {
				// assert the current location has been updated on init
				proclaim.equal(navLink.getAttribute('aria-current'), 'false');
				done();
			}, 100);
		});

		it('constructs linkable headings by default', () => {
			const layout = new Layout(documentationLayoutElement);
			proclaim.strictEqual(layout.linkedHeadings.length, 2, 'Expected to find two linked heading.');
		});

		it('does not construct linkable headings when "linkHeadings" is set to false', () => {
			const layout = new Layout(documentationLayoutElement, { linkHeadings: false });
			proclaim.strictEqual(layout.linkedHeadings.length, 0, 'Expected to find no linked headings.');
		});

		it('constructs linkable headings with a custom selector set by the "linkedHeadingSelector" option', () => {
			const layout = new Layout(documentationLayoutElement, { linkedHeadingSelector: 'h1' });
			proclaim.strictEqual(layout.linkedHeadings.length, 1, 'Expected to find one "h1" linked heading.');
		});

		it('constructs the navigation independently of linked headings', () => {
			const layout = new Layout(documentationLayoutElement, { navHeadingSelector: 'h1', linkedHeadingSelector: 'h2' });
			proclaim.strictEqual(layout.linkedHeadings.length, 1, 'Expected to find only one "h2" linked heading.');
			proclaim.strictEqual(layout.navHeadings.length, 1, 'Expected to find only one "h1" nav heading.');
		});

		it('extracts options from the DOM', () => {
			const getDataAttributesSpie = sinon.stub(Layout, 'getDataAttributes');
			new Layout(documentationLayoutElement);
			proclaim.calledOnce(getDataAttributesSpie);
			Layout.getDataAttributes.restore();
		});
	});

	describe('.constructNavFromDOM()', () => {
		it('extracts headings from main content to construct sidebar navigation', (done) => {
			const layout = new Layout(documentationLayoutElement, { constructNav: false });
			const headingOneId = document.body.querySelector('h1').id;
			const headingTwoId = document.body.querySelector('h2').id;
			layout.constructNavFromDOM();
			// allow for request animation frame
			setTimeout(() => {
				const navItems = document.body.querySelectorAll('a');
				proclaim.strictEqual(navItems[0].hash, `#${headingOneId}`);
				proclaim.strictEqual(navItems[1].hash, `#${headingTwoId}`);
				done();
			}, 100);
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
			proclaim.isObject(returnValue);
		});

		it('extracts values from data attributes and returns them as object keys', () => {
			proclaim.strictEqual(returnValue.key, 'value');
		});

		it('converts the keys to camel-case', () => {
			proclaim.isUndefined(returnValue['another-key']);
			proclaim.strictEqual(returnValue.anotherKey, 'value');
		});

		it('ignores the `data-o-component` attribute', () => {
			proclaim.isUndefined(returnValue.oComponent);
		});

		it('strips "o-layout" from the key', () => {
			proclaim.isUndefined(returnValue.oLayoutFoo);
			proclaim.strictEqual(returnValue.foo, 'bar');
		});

		it('parses the key as JSON if it\'s valid', () => {
			proclaim.isObject(returnValue.json);
			proclaim.deepEqual(returnValue.json, {
				foo: 'bar'
			});
		});

		it('parses the key as JSON even if single quotes are used', () => {
			proclaim.isObject(returnValue.jsonSingle);
			proclaim.deepEqual(returnValue.jsonSingle, {
				foo: 'bar'
			});
		});
	});
});
