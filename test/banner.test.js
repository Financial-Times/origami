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
				appendTo: document.body,
				closeExistingBanners: true,
				contentLong: '&hellip;',
				contentShort: null,
				buttonLabel: 'OK',
				buttonUrl: '#',
				linkLabel: null,
				linkUrl: '#',
				closeButtonLabel: 'Close',
				theme: null,
				layout: null
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

		describe('when `options.appendTo` is set', () => {

			describe('to an invalid selector', () => {
				it('throws and error', (done) => {
					try {
						banner = new Banner(null, {
							appendTo: '£$%^&*('
						});
					} catch (error) {
						done();
					}
					throw new Error('Did not throw an error.');
				});
			});

			describe('to an object', () => {
				it('throws and error', (done) => {
					try {
						banner = new Banner(null, {
							appendTo: {}
						});
					} catch (error) {
						done();
					}
					throw new Error('Did not throw an error.');
				});
			});

			describe('to a valid selector with a matching element', () => {
				it('appends the banner to that selector', () => {
					// Create div in test area with class .test
					const testDiv = document.createElement('div');
					testDiv.setAttribute('class', 'test');
					testArea.appendChild(testDiv);
					// Append banner to test div.
					banner = new Banner(null, {
						appendTo: '.test'
					});
					assert.equal([].slice.call(testDiv.childNodes).length, 1, 'Did not find the banner within the expected element.');
				});
			});

			describe('to a valid selector which does not have a matching element', () => {
				it('throws and error', (done) => {
					try {
						banner = new Banner(null, {
							appendTo: '.this-does-not-exist-in-the-dom'
						});
					} catch (error) {
						done();
					}
					throw new Error('Did not throw an error.');
				});
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
					assert.calledWithExactly(banner.buildBannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('appends the banner element to the body', () => {
					assert.calledOnce(document.body.appendChild);
					assert.calledWithExactly(document.body.appendChild, mockBannerElement);
				});

			});

			describe('when the `bannerElement` property is an empty HTML element', () => {
				let bannerElement;

				beforeEach(() => {
					bannerElement = banner.bannerElement = document.createElement('div');
					sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					document.body.appendChild.restore();
				});

				it('fully constructs the banner element and stores it on the `bannerElement` property', () => {
					assert.calledOnce(banner.buildBannerElement);
					assert.calledWith(banner.buildBannerElement, bannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					assert.notCalled(document.body.appendChild);
				});

			});

			describe('when the `bannerElement` property is an HTML element with content but no "outer" element', () => {
				let bannerElement;

				beforeEach(() => {
					bannerElement = banner.bannerElement = document.createElement('div');
					bannerElement.innerHTML = 'mock-content';
					banner.options.contentLong = 'mock-content-long-old';
					banner.options.contentShort = 'mock-content-short-old';
					sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					document.body.appendChild.restore();
				});

				it('fully constructs the banner element using the element HTML as content', () => {
					assert.strictEqual(banner.options.contentLong, 'mock-content');
					assert.strictEqual(banner.options.contentShort, null);
					assert.calledOnce(banner.buildBannerElement);
					assert.calledWith(banner.buildBannerElement, bannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					assert.notCalled(document.body.appendChild);
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
				assert.calledWith(bannerElement.classList.remove, "o-banner--closed");
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
				assert.calledWith(bannerElement.classList.add, "o-banner--closed");
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
					<div class="o-banner">
						<div class="o-banner__outer">
							<div class="o-banner__inner" data-o-banner-inner="">
								<div class="o-banner__content o-banner__content--long">
									mockContentLong
								</div>
								<div class="o-banner__content o-banner__content--short">
									mockContentShort
								</div>
								<div class="o-banner__actions">
									<div class="o-banner__action">
										<a href="mockButtonUrl" class="o-banner__button">mockButtonLabel</a>
									</div>
									<div class="o-banner__action o-banner__action--secondary">
										<a href="mockLinkUrl" class="o-banner__link">mockLinkLabel</a>
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
						<div class="o-banner">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content">
										mockContentLong
									</div>
									<div class="o-banner__actions">
										<div class="o-banner__action">
											<a href="mockButtonUrl" class="o-banner__button">mockButtonLabel</a>
										</div>
										<div class="o-banner__action o-banner__action--secondary">
											<a href="mockLinkUrl" class="o-banner__link">mockLinkLabel</a>
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
						<div class="o-banner">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content o-banner__content--long">
										mockContentLong
									</div>
									<div class="o-banner__content o-banner__content--short">
										mockContentShort
									</div>
									<div class="o-banner__actions">
										<div class="o-banner__action">
											<a href="mockButtonUrl" class="o-banner__button">mockButtonLabel</a>
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
					banner.options.theme = 'product';
					returnValue = banner.buildBannerElement();
				});

				it('adds the theme class to the banner element', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="o-banner o-banner--product">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content o-banner__content--long">
										mockContentLong
									</div>
									<div class="o-banner__content o-banner__content--short">
										mockContentShort
									</div>
									<div class="o-banner__actions">
										<div class="o-banner__action">
											<a href="mockButtonUrl" class="o-banner__button">mockButtonLabel</a>
										</div>
										<div class="o-banner__action o-banner__action--secondary">
											<a href="mockLinkUrl" class="o-banner__link">mockLinkLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

			describe('when `options.theme` is defined and is an array', () => {
				it('errors', () => {
					assert.throws(() => {
						banner = new Banner(null, {
							theme: ['marketing', 'product']
						});
					}, '');
				});
			});

			describe('when `options.theme` is an invalid theme', () => {
				it('errors', () => {
					assert.throws(() => {
						banner = new Banner(null, {
							theme: 'not-a-real-theme'
						});
					}, '');
				});
			});

			describe('when `options.layout` is defined and is a string', () => {

				beforeEach(() => {
					banner.options.theme = 'small';
					returnValue = banner.buildBannerElement();
				});

				it('adds the layout class to the banner element', () => {
					assert.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="o-banner o-banner--small">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content o-banner__content--long">
										mockContentLong
									</div>
									<div class="o-banner__content o-banner__content--short">
										mockContentShort
									</div>
									<div class="o-banner__actions">
										<div class="o-banner__action">
											<a href="mockButtonUrl" class="o-banner__button">mockButtonLabel</a>
										</div>
										<div class="o-banner__action o-banner__action--secondary">
											<a href="mockLinkUrl" class="o-banner__link">mockLinkLabel</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					`.replace(/[\t\n]+/g, ''));
				});

			});

			describe('when `options.layout` is an invalid layout', () => {
				it('errors', () => {
					assert.throws(() => {
						banner = new Banner(null, {
							layout: 'not-a-real-layout'
						});
					}, '');
				});
			});

			describe('when `bannerElement` is passed in', () => {
				let bannerElement;

				beforeEach(() => {
					bannerElement = document.createElement('div');
					bannerElement.innerHTML = 'mock-original-content';
					returnValue = banner.buildBannerElement();
				});

				it('strips the banner element HTML before constructing', () => {
					assert.doesNotInclude(returnValue.outerHTML, 'mock-original-content');
				});

				it('returns the passed in banner element', () => {
					assert.deepEqual(returnValue, bannerElement);
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
					<button class="o-banner__close" aria-label="mockCloseButtonLabel" title="mockCloseButtonLabel"></button>
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
