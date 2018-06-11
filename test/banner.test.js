/* eslint-env mocha, sinon, proclaim */

import Banner from './../src/js/banner';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import mainFixture from './fixture/main';

sinon.assert.expose(assert, {
	includeFail: false,
	prefix: ''
});

describe('Banner', () => {
	let testArea;

	before(() => {
		document.body.innerHTML += '<div id="test-area"></div>';
		testArea = document.getElementById('test-area');
	});

	afterEach(() => {
		testArea.innerHTML = '';
	});

	describe('new Banner(bannerElement, options)', () => {
		let banner;
		let bannerCloseStub;
		let bannerElement;
		let bannerGetOptionsFromDomStub;
		let bannerOpenStub;
		let bannerRenderStub;
		let options;

		beforeEach(() => {
			testArea.innerHTML = mainFixture;
			Banner._bannerInstances = [];

			// Stub out methods called in constructor
			bannerGetOptionsFromDomStub = sinon.stub(Banner, 'getOptionsFromDom');
			bannerRenderStub = sinon.stub(Banner.prototype, 'render');
			bannerOpenStub = sinon.stub(Banner.prototype, 'open');
			bannerCloseStub = sinon.stub(Banner.prototype, 'close');

			// Create a banner
			bannerElement = document.querySelector('[data-o-component=o-banner]');
			options = {};
			banner = new Banner(bannerElement, options);

			// Restore constructor stubs
			Banner.getOptionsFromDom.restore();
			Banner.prototype.render.restore();
			Banner.prototype.open.restore();
			Banner.prototype.close.restore();

		});

		it('stores `bannerElement` in a `bannerElement` property', () => {
			assert.strictEqual(banner.bannerElement, bannerElement);
		});

		it('defaults the options and stores them in an `options` property', () => {
			assert.isObject(banner.options);
			assert.notStrictEqual(banner.options, options);
			assert.deepEqual(banner.options, {
				autoOpen: true,
				suppressCloseButton: false,
				closeExistingBanners: true,
				bannerClass: 'o-banner',
				bannerClosedClass: 'o-banner--closed',
				outerClass: 'o-banner__outer',
				innerClass: 'o-banner__inner',
				contentClass: 'o-banner__content',
				contentLongClass: 'o-banner__content--long',
				contentShortClass: 'o-banner__content--short',
				actionsClass: 'o-banner__actions',
				actionClass: 'o-banner__action',
				actionSecondaryClass: 'o-banner__action--secondary',
				buttonClass: 'o-banner__button',
				linkClass: 'o-banner__link',
				closeButtonClass: 'o-banner__close',
				contentLong: '&hellip;',
				contentShort: null,
				buttonLabel: 'OK',
				buttonUrl: '#',
				linkLabel: null,
				linkUrl: '#',
				closeButtonLabel: 'Close',
				theme: null
			});
		});

		it('does not extract options from the DOM', () => {
			assert.notCalled(bannerGetOptionsFromDomStub);
		});

		it('opens the banner', () => {
			assert.calledOnce(bannerOpenStub);
		});

		it('does not close the banner', () => {
			assert.notCalled(bannerCloseStub);
		});

		it('renders the banner', () => {
			assert.calledOnce(bannerRenderStub);
		});

		describe('when `options.autoOpen` is `false`', () => {

			beforeEach(() => {
				Banner._bannerInstances = [];

				// Stub out methods called in constructor
				bannerRenderStub = sinon.stub(Banner.prototype, 'render');
				bannerOpenStub = sinon.stub(Banner.prototype, 'open');
				bannerCloseStub = sinon.stub(Banner.prototype, 'close');

				// Create a banner
				options.autoOpen = false;
				banner = new Banner(bannerElement, options);

				// Restore constructor stubs
				Banner.prototype.render.restore();
				Banner.prototype.open.restore();
				Banner.prototype.close.restore();

			});

			it('does not open the banner', () => {
				assert.notCalled(bannerOpenStub);
			});

			it('closes the banner', () => {
				assert.calledOnce(bannerCloseStub);
			});

		});

		describe('when `options.bannerClass` is specified but no other classes are', () => {

			beforeEach(() => {

				// Stub out methods called in constructor
				bannerRenderStub = sinon.stub(Banner.prototype, 'render');
				bannerOpenStub = sinon.stub(Banner.prototype, 'open');

				// Create a banner
				options.bannerClass = 'bruce-banner';
				banner = new Banner(bannerElement, options);

				// Restore constructor stubs
				Banner.prototype.render.restore();
				Banner.prototype.open.restore();

			});

			it('defaults the other class options based on the banner class', () => {
				assert.strictEqual(banner.options.bannerClosedClass, 'bruce-banner--closed');
				assert.strictEqual(banner.options.outerClass, 'bruce-banner__outer');
				assert.strictEqual(banner.options.innerClass, 'bruce-banner__inner');
				assert.strictEqual(banner.options.contentClass, 'bruce-banner__content');
				assert.strictEqual(banner.options.contentLongClass, 'bruce-banner__content--long');
				assert.strictEqual(banner.options.contentShortClass, 'bruce-banner__content--short');
				assert.strictEqual(banner.options.actionsClass, 'bruce-banner__actions');
				assert.strictEqual(banner.options.actionClass, 'bruce-banner__action');
				assert.strictEqual(banner.options.actionSecondaryClass, 'bruce-banner__action--secondary');
				assert.strictEqual(banner.options.buttonClass, 'bruce-banner__button');
				assert.strictEqual(banner.options.linkClass, 'bruce-banner__link');
			});

		});

		describe('when `options` is not defined', () => {

			beforeEach(() => {

				// Stub out methods called in constructor
				bannerGetOptionsFromDomStub = sinon.stub(Banner, 'getOptionsFromDom');
				bannerRenderStub = sinon.stub(Banner.prototype, 'render');
				bannerOpenStub = sinon.stub(Banner.prototype, 'open');

				bannerGetOptionsFromDomStub.returns({
					mockOption: 'from dom'
				});

				// Create a banner
				banner = new Banner(bannerElement);

				// Restore constructor stubs
				Banner.getOptionsFromDom.restore();
				Banner.prototype.render.restore();
				Banner.prototype.open.restore();

			});

			it('extracts the options from the DOM', () => {
				assert.calledOnce(bannerGetOptionsFromDomStub);
				assert.strictEqual(banner.options.mockOption, 'from dom');
			});

		});

		it('has a render method', () => {
			assert.isFunction(banner.render);
		});

		describe('.render()', () => {
			let mockBannerElement;
			let mockBannerInnerElement;
			let mockCloseButtonElement;

			beforeEach(() => {
				mockBannerElement = document.createElement('div');
				mockBannerInnerElement = document.createElement('div');
				mockCloseButtonElement = document.createElement('a');

				sinon.stub(banner, 'buildBannerElement').returns(mockBannerElement);
				sinon.stub(bannerElement, 'querySelector').returns(mockBannerInnerElement);
				sinon.stub(mockBannerElement, 'querySelector').returns(mockBannerInnerElement);
				sinon.stub(banner, 'buildCloseButtonElement').returns(mockCloseButtonElement);
				sinon.stub(mockBannerInnerElement, 'appendChild');

				banner.render();
			});

			it('does not build a banner element', () => {
				assert.notCalled(banner.buildBannerElement);
			});

			it('selects the inner element and stores it on the `innerElement` property', () => {
				assert.calledOnce(bannerElement.querySelector);
				assert.calledWithExactly(bannerElement.querySelector, '[data-o-banner-inner]');
				assert.strictEqual(banner.innerElement, mockBannerInnerElement);
			});

			it('builds a close button element and stores it on the `closeButtonElement` property', () => {
				assert.calledOnce(banner.buildCloseButtonElement);
				assert.strictEqual(banner.closeButtonElement, mockCloseButtonElement);
			});

			it('appends the close button element to the inner element', () => {
				assert.calledOnce(mockBannerInnerElement.appendChild);
				assert.calledWithExactly(mockBannerInnerElement.appendChild, mockCloseButtonElement);
			});

			describe('when the `bannerElement` property is not an HTML element', () => {

				beforeEach(() => {
					banner.bannerElement = null;
					sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					document.body.appendChild.restore();
				});

				it('builds a banner element and stores it on the `bannerElement` property', () => {
					assert.calledOnce(banner.buildBannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('appends the banner element to the body', () => {
					assert.calledOnce(document.body.appendChild);
					assert.calledWithExactly(document.body.appendChild, mockBannerElement);
				});

			});

			describe('when suppressCloseButton is true', () => {

				beforeEach(() => {
					banner.buildCloseButtonElement.resetHistory();
					banner.options.suppressCloseButton = true;
					banner.render();
				});

				it('does not build the close button', () => {
					assert.notCalled(banner.buildCloseButtonElement);
				});
			});

		});

		it('has an open method', () => {
			assert.isFunction(banner.open);
		});

		describe('.open()', () => {

			beforeEach(() => {
				sinon.spy(bannerElement.classList, 'remove');
				sinon.spy(bannerElement, 'dispatchEvent');
				banner.open();
			});

			it('removes the banner closed class', () => {
				assert.calledOnce(bannerElement.classList.remove);
				assert.calledWith(bannerElement.classList.remove, banner.options.bannerClosedClass);
			});

			it('dispatches an `o.bannerOpened` event', () => {
				assert.calledOnce(bannerElement.dispatchEvent);
				assert.instanceOf(bannerElement.dispatchEvent.firstCall.args[0], CustomEvent);
				assert.strictEqual(bannerElement.dispatchEvent.firstCall.args[0].type, 'o.bannerOpened');
			});

		});

		it('has a close method', () => {
			assert.isFunction(banner.close);
		});

		describe('.close()', () => {

			beforeEach(() => {
				sinon.spy(bannerElement.classList, 'add');
				sinon.spy(bannerElement, 'dispatchEvent');
				banner.close();
			});

			it('adds the banner closed class', () => {
				assert.calledOnce(bannerElement.classList.add);
				assert.calledWith(bannerElement.classList.add, banner.options.bannerClosedClass);
			});

			it('dispatches an `o.bannerClosed` event', () => {
				assert.calledOnce(bannerElement.dispatchEvent);
				assert.instanceOf(bannerElement.dispatchEvent.firstCall.args[0], CustomEvent);
				assert.strictEqual(bannerElement.dispatchEvent.firstCall.args[0].type, 'o.bannerClosed');
			});

		});

		it('has a buildBannerElement method', () => {
			assert.isFunction(banner.buildBannerElement);
		});

		describe('.buildBannerElement()', () => {
			let returnValue;

			beforeEach(() => {

				// Mock options used to test output HTML
				banner.options.bannerClass = 'mockBannerClass';
				banner.options.bannerClosedClass = 'mockBannerClosedClass';
				banner.options.outerClass = 'mockOuterClass';
				banner.options.innerClass = 'mockInnerClass';
				banner.options.contentClass = 'mockContentClass';
				banner.options.contentLongClass = 'mockContentLongClass';
				banner.options.contentShortClass = 'mockContentShortClass';
				banner.options.actionsClass = 'mockActionsClass';
				banner.options.actionClass = 'mockActionClass';
				banner.options.actionSecondaryClass = 'mockActionSecondaryClass';
				banner.options.buttonClass = 'mockButtonClass';
				banner.options.linkClass = 'mockLinkClass';
				banner.options.contentLong = 'mockContentLong';
				banner.options.contentShort = 'mockContentShort';
				banner.options.buttonLabel = 'mockButtonLabel';
				banner.options.buttonUrl = 'mockButtonUrl';
				banner.options.linkLabel = 'mockLinkLabel';
				banner.options.linkUrl = 'mockLinkUrl';

				returnValue = banner.buildBannerElement();
			});

			it('returns an HTML element', () => {
				assert.instanceOf(returnValue, HTMLElement);
			});

			it('constructs the element HTML based on the given options', () => {
				assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
					<div class="mockBannerClass" data-o-component="o-banner">
						<div class="mockOuterClass">
							<div class="mockInnerClass" data-o-banner-inner="">
								<div class="mockContentClass mockContentLongClass">
									mockContentLong
								</div>
								<div class="mockContentClass mockContentShortClass">
									mockContentShort
								</div>
								<div class="mockActionsClass">
									<div class="mockActionClass">
										<a href="mockButtonUrl" class="mockButtonClass">mockButtonLabel</a>
									</div>
									<div class="mockActionClass mockActionSecondaryClass">
										<a href="mockLinkUrl" class="mockLinkClass">mockLinkLabel</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				`.replace(/[\t\n]+/g, ''));
			});

			describe('when `options.contentShort` is not a string', () => {

				beforeEach(() => {
					banner.options.contentShort = null;
					returnValue = banner.buildBannerElement();
				});

				it('outputs only one content element using `options.contentLong`', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="mockBannerClass" data-o-component="o-banner">
							<div class="mockOuterClass">
								<div class="mockInnerClass" data-o-banner-inner="">
									<div class="mockContentClass">
										mockContentLong
									</div>
									<div class="mockActionsClass">
										<div class="mockActionClass">
											<a href="mockButtonUrl" class="mockButtonClass">mockButtonLabel</a>
										</div>
										<div class="mockActionClass mockActionSecondaryClass">
											<a href="mockLinkUrl" class="mockLinkClass">mockLinkLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

			describe('when `options.linkLabel` is not a string', () => {

				beforeEach(() => {
					banner.options.linkLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include a secondary action/link', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="mockBannerClass" data-o-component="o-banner">
							<div class="mockOuterClass">
								<div class="mockInnerClass" data-o-banner-inner="">
									<div class="mockContentClass mockContentLongClass">
										mockContentLong
									</div>
									<div class="mockContentClass mockContentShortClass">
										mockContentShort
									</div>
									<div class="mockActionsClass">
										<div class="mockActionClass">
											<a href="mockButtonUrl" class="mockButtonClass">mockButtonLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

			describe('when `options.theme` is defined and is a string', () => {

				beforeEach(() => {
					banner.options.theme = 'mock-theme';
					returnValue = banner.buildBannerElement();
				});

				it('adds the theme class to the banner element', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="mockBannerClass mockBannerClass--mock-theme" data-o-component="o-banner">
							<div class="mockOuterClass">
								<div class="mockInnerClass" data-o-banner-inner="">
									<div class="mockContentClass mockContentLongClass">
										mockContentLong
									</div>
									<div class="mockContentClass mockContentShortClass">
										mockContentShort
									</div>
									<div class="mockActionsClass">
										<div class="mockActionClass">
											<a href="mockButtonUrl" class="mockButtonClass">mockButtonLabel</a>
										</div>
										<div class="mockActionClass mockActionSecondaryClass">
											<a href="mockLinkUrl" class="mockLinkClass">mockLinkLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

			describe('when `options.theme` is defined and is an array', () => {

				beforeEach(() => {
					banner.options.theme = [
						'mock-theme',
						'test-theme'
					];
					returnValue = banner.buildBannerElement();
				});

				it('adds all of the theme classes to the banner element', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="mockBannerClass mockBannerClass--mock-theme mockBannerClass--test-theme" data-o-component="o-banner">
							<div class="mockOuterClass">
								<div class="mockInnerClass" data-o-banner-inner="">
									<div class="mockContentClass mockContentLongClass">
										mockContentLong
									</div>
									<div class="mockContentClass mockContentShortClass">
										mockContentShort
									</div>
									<div class="mockActionsClass">
										<div class="mockActionClass">
											<a href="mockButtonUrl" class="mockButtonClass">mockButtonLabel</a>
										</div>
										<div class="mockActionClass mockActionSecondaryClass">
											<a href="mockLinkUrl" class="mockLinkClass">mockLinkLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

		});

		it('has a buildCloseButtonElement method', () => {
			assert.isFunction(banner.buildCloseButtonElement);
		});

		describe('.buildCloseButtonElement()', () => {
			let returnValue;

			beforeEach(() => {

				// Mock options used to test output HTML
				banner.options.closeButtonClass = 'mockCloseButtonClass';
				banner.options.closeButtonLabel = 'mockCloseButtonLabel';

				sinon.stub(HTMLElement.prototype, 'addEventListener');

				returnValue = banner.buildCloseButtonElement();
			});

			afterEach(() => {
				HTMLElement.prototype.addEventListener.restore();
			});

			it('returns an HTML element', () => {
				assert.instanceOf(returnValue, HTMLElement);
			});

			it('constructs the element HTML based on the given options', () => {
				assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
					<a class="mockCloseButtonClass" role="button" href="#void" aria-label="mockCloseButtonLabel" title="mockCloseButtonLabel"></a>
				`.replace(/[\t\n]+/g, ''));
			});

			it('adds a handler for the button click event', () => {
				assert.calledOnce(returnValue.addEventListener);
				assert.calledWith(returnValue.addEventListener, 'click');
				assert.isFunction(returnValue.addEventListener.firstCall.args[1]);
			});

			describe('click handler', () => {
				let event;

				beforeEach(() => {
					const clickHandler = returnValue.addEventListener.firstCall.args[1];
					event = {
						preventDefault: sinon.stub()
					};
					sinon.stub(banner, 'close');
					clickHandler(event);
				});

				it('closes the banner', () => {
					assert.calledOnce(banner.close);
				});

				it('prevents the default click behaviour', () => {
					assert.calledOnce(event.preventDefault);
				});

			});

		});

	});

	describe('.getOptionsFromDom(bannerElement)', () => {
		let mockBannerElement;
		let returnValue;

		beforeEach(() => {
			mockBannerElement = document.createElement('div');
			mockBannerElement.setAttribute('data-o-component', 'o-banner');
			mockBannerElement.setAttribute('data-key', 'value');
			mockBannerElement.setAttribute('data-another-key', 'value');
			mockBannerElement.setAttribute('data-o-banner-foo', 'bar');
			mockBannerElement.setAttribute('data-o-banner-json', '{"foo": "bar"}');
			mockBannerElement.setAttribute('data-o-banner-json-single', '{\'foo\': \'bar\'}');
			returnValue = Banner.getOptionsFromDom(mockBannerElement);
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

		it('strips "o-banner" from the key', () => {
			assert.isUndefined(returnValue.oBannerFoo);
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

		describe('when `bannerElement` is not an HTML element', () => {
			let returnValue;

			beforeEach(() => {
				returnValue = Banner.getOptionsFromDom(null);
			});

			it('returns an empty object', () => {
				assert.isObject(returnValue);
				assert.deepEqual(returnValue, {});
			});

		});

	});

	describe('.init(rootElement, options)', () => {
		let mockRootElement;
		let options;
		let returnValue;

		beforeEach(() => {
			sinon.stub(document, 'querySelector');
			sinon.stub(Banner.prototype, 'render');
			sinon.stub(Banner.prototype, 'open');
			mockRootElement = document.createElement('div');
			options = {
				mockOption: 'test'
			};
		});

		afterEach(() => {
			document.querySelector.restore();
			Banner.prototype.render.restore();
			Banner.prototype.open.restore();
		});

		describe('when `rootElement` is an HTML element with a `data-o-component` attribute set to "o-banner"', () => {

			beforeEach(() => {
				mockRootElement.setAttribute('data-o-component', 'o-banner');
				returnValue = Banner.init(mockRootElement, options);
			});

			it('does not query the the document', () => {
				assert.notCalled(document.querySelector);
			});

			it('creates a new Banner instance with the passed in arguments, and returns it', () => {
				assert.instanceOf(returnValue, Banner);
				assert.strictEqual(returnValue.bannerElement, mockRootElement);
				assert.strictEqual(returnValue.options.mockOption, 'test');
			});

		});

		describe('when `rootElement` is an HTML element with no `data-o-component` attribute', () => {
			let mockBanner1;
			let mockBanner2;
			let mockNotBanner;

			beforeEach(() => {
				mockBanner1 = document.createElement('div');
				mockBanner1.setAttribute('data-o-component', 'o-banner');
				mockBanner2 = document.createElement('div');
				mockBanner2.setAttribute('data-o-component', 'o-banner');
				mockNotBanner = document.createElement('div');
				mockRootElement.appendChild(mockBanner1);
				mockRootElement.appendChild(mockBanner2);
				mockRootElement.appendChild(mockNotBanner);
				sinon.spy(mockRootElement, 'querySelectorAll');
				returnValue = Banner.init(mockRootElement, options);
			});

			it('does not query the the document', () => {
				assert.notCalled(document.querySelector);
			});

			it('queries the `rootElement` for banner elements', () => {
				assert.calledOnce(mockRootElement.querySelectorAll);
				assert.calledWithExactly(mockRootElement.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `rootElement`, and returns an array of them', () => {
				assert.isArray(returnValue);
				assert.lengthEquals(returnValue, 2);
				assert.instanceOf(returnValue[0], Banner);
				assert.strictEqual(returnValue[0].bannerElement, mockBanner1);
				assert.strictEqual(returnValue[0].options.mockOption, 'test');
				assert.instanceOf(returnValue[1], Banner);
				assert.strictEqual(returnValue[1].bannerElement, mockBanner2);
				assert.strictEqual(returnValue[1].options.mockOption, 'test');
			});

		});

		describe('when `rootElement` is defined, but is not an HTML element', () => {
			let foundElement;

			beforeEach(() => {
				foundElement = document.createElement('div');
				foundElement.setAttribute('data-o-component', 'o-banner');
				document.querySelector.returns(foundElement);
				returnValue = Banner.init('mock-selector', options);
			});

			it('queries the DOM using `rootElement` as a selector', () => {
				assert.calledOnce(document.querySelector);
				assert.calledWithExactly(document.querySelector, 'mock-selector');
			});

			it('creates a new Banner instance with the found element, and returns it', () => {
				assert.instanceOf(returnValue, Banner);
				assert.strictEqual(returnValue.bannerElement, foundElement);
				assert.strictEqual(returnValue.options.mockOption, 'test');
			});

		});

		describe('when `rootElement` is not defined', () => {
			let mockBanner1;
			let mockBanner2;

			beforeEach(() => {
				mockBanner1 = document.createElement('div');
				mockBanner1.setAttribute('data-o-component', 'o-banner');
				mockBanner2 = document.createElement('div');
				mockBanner2.setAttribute('data-o-component', 'o-banner');
				testArea.appendChild(mockBanner1);
				testArea.appendChild(mockBanner2);
				sinon.spy(document.body, 'querySelectorAll');
				returnValue = Banner.init(null, options);
			});

			afterEach(() => {
				document.body.querySelectorAll.restore();
			});

			it('does not query the the document', () => {
				assert.notCalled(document.querySelector);
			});

			it('queries `document.body` for banner elements', () => {
				assert.calledOnce(document.body.querySelectorAll);
				assert.calledWithExactly(document.body.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `document.body`, and returns an array of them', () => {
				assert.isArray(returnValue);
				assert.lengthEquals(returnValue, 2);
				assert.instanceOf(returnValue[0], Banner);
				assert.strictEqual(returnValue[0].bannerElement, mockBanner1);
				assert.strictEqual(returnValue[0].options.mockOption, 'test');
				assert.instanceOf(returnValue[1], Banner);
				assert.strictEqual(returnValue[1].bannerElement, mockBanner2);
				assert.strictEqual(returnValue[1].options.mockOption, 'test');
			});
		});

	});

});
