/* eslint-env mocha */
/* global proclaim sinon */

import Banner from './../src/js/banner.js';
import mainFixture from './fixture/main.js';

sinon.assert.expose(proclaim, {
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
			proclaim.strictEqual(banner.bannerElement, bannerElement);
		});

		it('defaults the options and stores them in an `options` property', () => {
			proclaim.isObject(banner.options);
			proclaim.notStrictEqual(banner.options, options);
			proclaim.deepEqual(banner.options, {
				autoOpen: true,
				suppressCloseButton: false,
				appendTo: document.body,
				closeExistingBanners: true,
				contentLong: '&hellip;',
				contentShort: null,
				buttonLabel: 'OK',
				buttonUrl: '#',
				formAction: null,
				formEncoding: 'application/x-www-form-urlencoded',
				formMethod: 'post',
				linkLabel: null,
				linkUrl: '#',
				closeButtonLabel: 'Close',
				theme: null,
				layout: null
			});
		});

		it('does not extract options from the DOM', () => {
			proclaim.notCalled(bannerGetOptionsFromDomStub);
		});

		it('opens the banner', () => {
			proclaim.calledOnce(bannerOpenStub);
		});

		it('does not close the banner', () => {
			proclaim.notCalled(bannerCloseStub);
		});

		it('renders the banner', () => {
			proclaim.calledOnce(bannerRenderStub);
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
				proclaim.notCalled(bannerOpenStub);
			});

			it('closes the banner', () => {
				proclaim.calledOnce(bannerCloseStub);
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
					proclaim.equal([].slice.call(testDiv.childNodes).length, 1, 'Did not find the banner within the expected element.');
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
				proclaim.calledOnce(bannerGetOptionsFromDomStub);
				proclaim.strictEqual(banner.options.mockOption, 'from dom');
			});

		});

		it('has a render method', () => {
			proclaim.isFunction(banner.render);
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
				proclaim.notCalled(banner.buildBannerElement);
			});

			it('selects the inner element and stores it on the `innerElement` property', () => {
				proclaim.calledWithExactly(bannerElement.querySelector, '[data-o-banner-inner]');
				proclaim.strictEqual(banner.innerElement, mockBannerInnerElement);
			});

			it('builds a close button element and stores it on the `closeButtonElement` property', () => {
				proclaim.calledOnce(banner.buildCloseButtonElement);
				proclaim.strictEqual(banner.closeButtonElement, mockCloseButtonElement);
			});

			it('appends the close button element to the inner element', () => {
				proclaim.calledOnce(mockBannerInnerElement.appendChild);
				proclaim.calledWithExactly(mockBannerInnerElement.appendChild, mockCloseButtonElement);
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
					proclaim.calledOnce(banner.buildBannerElement);
					proclaim.calledWithExactly(banner.buildBannerElement);
					proclaim.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('appends the banner element to the body', () => {
					proclaim.calledOnce(document.body.appendChild);
					proclaim.calledWithExactly(document.body.appendChild, mockBannerElement);
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
					proclaim.calledOnce(banner.buildBannerElement);
					proclaim.calledWith(banner.buildBannerElement, bannerElement);
					proclaim.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					proclaim.notCalled(document.body.appendChild);
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
					proclaim.strictEqual(banner.options.contentLong, 'mock-content');
					proclaim.strictEqual(banner.options.contentShort, null);
					proclaim.calledOnce(banner.buildBannerElement);
					proclaim.calledWith(banner.buildBannerElement, bannerElement);
					proclaim.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					proclaim.notCalled(document.body.appendChild);
				});

			});

			describe('when suppressCloseButton is true', () => {

				beforeEach(() => {
					banner.buildCloseButtonElement.resetHistory();
					banner.options.suppressCloseButton = true;
					banner.render();
				});

				it('does not build the close button', () => {
					proclaim.notCalled(banner.buildCloseButtonElement);
				});
			});

		});

		it('has an open method', () => {
			proclaim.isFunction(banner.open);
		});

		describe('.open()', () => {

			beforeEach(() => {
				sinon.spy(bannerElement.classList, 'remove');
				sinon.spy(bannerElement, 'dispatchEvent');
				banner.open();
			});

			it('removes the banner closed class', () => {
				proclaim.calledOnce(bannerElement.classList.remove);
				proclaim.calledWith(bannerElement.classList.remove, "o-banner--closed");
			});

			it('dispatches an `o.bannerOpened` event', () => {
				proclaim.calledOnce(bannerElement.dispatchEvent);
				proclaim.isInstanceOf(bannerElement.dispatchEvent.firstCall.args[0], CustomEvent);
				proclaim.strictEqual(bannerElement.dispatchEvent.firstCall.args[0].type, 'o.bannerOpened');
			});

		});

		it('has a close method', () => {
			proclaim.isFunction(banner.close);
		});

		describe('.close()', () => {

			beforeEach(() => {
				sinon.spy(bannerElement.classList, 'add');
				sinon.spy(bannerElement, 'dispatchEvent');
				banner.close();
			});

			it('adds the banner closed class', () => {
				proclaim.calledOnce(bannerElement.classList.add);
				proclaim.calledWith(bannerElement.classList.add, "o-banner--closed");
			});

			it('dispatches an `o.bannerClosed` event', () => {
				proclaim.calledOnce(bannerElement.dispatchEvent);
				proclaim.isInstanceOf(bannerElement.dispatchEvent.firstCall.args[0], CustomEvent);
				proclaim.strictEqual(bannerElement.dispatchEvent.firstCall.args[0].type, 'o.bannerClosed');
			});

		});

		it('has a buildBannerElement method', () => {
			proclaim.isFunction(banner.buildBannerElement);
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
				proclaim.isInstanceOf(returnValue, HTMLElement);
			});

			it('constructs the element HTML based on the given options', () => {
				proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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

			describe('when `options.buttonLabel` is not a string', () => {

				beforeEach(() => {
					banner.options.buttonLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include a primary action', () => {
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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

			describe('when `options.buttonLabel` and `options.linkLabel` are not a string', () => {

				beforeEach(() => {
					banner.options.buttonLabel = null;
					banner.options.linkLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include the actions element', () => {
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
						<div class="o-banner">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content o-banner__content--long">
										mockContentLong
									</div>
									<div class="o-banner__content o-banner__content--short">
										mockContentShort
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
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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
					proclaim.throws(() => {
						banner = new Banner(null, {
							theme: ['marketing', 'product']
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
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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
					proclaim.throws(() => {
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
					proclaim.doesNotInclude(returnValue.outerHTML, 'mock-original-content');
				});

				it('returns the passed in banner element', () => {
					proclaim.deepEqual(returnValue, bannerElement);
				});

			});

			describe('when `options.formAction` is not specified', () => {

				it('uses an anchor in place of the form for the primary action when formAction is null', () => {
					banner.options.formAction = null;
					returnValue = banner.buildBannerElement();

					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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

				it('uses an anchor in place of the form for the primary action when formAction is undefined', () => {
					banner.options.formAction = undefined;
					returnValue = banner.buildBannerElement();

					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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

			});

			describe('when `options.formAction` is not null', () => {

				beforeEach(() => {
					banner.options.formAction = 'mock-form-action';
					banner.options.formEncoding = 'mock-form-encoding';
					banner.options.formMethod = 'mock-form-method';
					returnValue = banner.buildBannerElement();
				});

				it('uses a form and submit button in place of an anchor for the primary action', () => {
					proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
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
										<form class="o-banner__action" action="mock-form-action" enctype="mock-form-encoding" method="mock-form-method">
											<input class="o-banner__button" type="submit" value="mockButtonLabel">
										</form>
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

		});

		it('has a buildCloseButtonElement method', () => {
			proclaim.isFunction(banner.buildCloseButtonElement);
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
				proclaim.isInstanceOf(returnValue, HTMLElement);
			});

			it('constructs the element HTML based on the given options', () => {
				proclaim.strictEqual(returnValue.outerHTML.replace(/[\t\n]+/g, ''), `
					<button class="o-banner__close" aria-label="mockCloseButtonLabel" title="mockCloseButtonLabel"></button>
				`.replace(/[\t\n]+/g, ''));
			});

			it('adds a handler for the button click event', () => {
				proclaim.calledOnce(returnValue.addEventListener);
				proclaim.calledWith(returnValue.addEventListener, 'click');
				proclaim.isFunction(returnValue.addEventListener.firstCall.args[1]);
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
					proclaim.calledOnce(banner.close);
				});

				it('prevents the default click behaviour', () => {
					proclaim.calledOnce(event.preventDefault);
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

		it('strips "o-banner" from the key', () => {
			proclaim.isUndefined(returnValue.oBannerFoo);
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

		describe('when `bannerElement` is not an HTML element', () => {
			let returnValue;

			beforeEach(() => {
				returnValue = Banner.getOptionsFromDom(null);
			});

			it('returns an empty object', () => {
				proclaim.isObject(returnValue);
				proclaim.deepEqual(returnValue, {});
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
				proclaim.notCalled(document.querySelector);
			});

			it('creates a new Banner instance with the passed in arguments, and returns it', () => {
				proclaim.isInstanceOf(returnValue, Banner);
				proclaim.strictEqual(returnValue.bannerElement, mockRootElement);
				proclaim.strictEqual(returnValue.options.mockOption, 'test');
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
				proclaim.notCalled(document.querySelector);
			});

			it('queries the `rootElement` for banner elements', () => {
				proclaim.calledOnce(mockRootElement.querySelectorAll);
				proclaim.calledWithExactly(mockRootElement.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `rootElement`, and returns an array of them', () => {
				proclaim.isArray(returnValue);
				proclaim.lengthEquals(returnValue, 2);
				proclaim.isInstanceOf(returnValue[0], Banner);
				proclaim.strictEqual(returnValue[0].bannerElement, mockBanner1);
				proclaim.strictEqual(returnValue[0].options.mockOption, 'test');
				proclaim.isInstanceOf(returnValue[1], Banner);
				proclaim.strictEqual(returnValue[1].bannerElement, mockBanner2);
				proclaim.strictEqual(returnValue[1].options.mockOption, 'test');
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
				proclaim.calledOnce(document.querySelector);
				proclaim.calledWithExactly(document.querySelector, 'mock-selector');
			});

			it('creates a new Banner instance with the found element, and returns it', () => {
				proclaim.isInstanceOf(returnValue, Banner);
				proclaim.strictEqual(returnValue.bannerElement, foundElement);
				proclaim.strictEqual(returnValue.options.mockOption, 'test');
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
				proclaim.notCalled(document.querySelector);
			});

			it('queries `document.body` for banner elements', () => {
				proclaim.calledOnce(document.body.querySelectorAll);
				proclaim.calledWithExactly(document.body.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `document.body`, and returns an array of them', () => {
				proclaim.isArray(returnValue);
				proclaim.lengthEquals(returnValue, 2);
				proclaim.isInstanceOf(returnValue[0], Banner);
				proclaim.strictEqual(returnValue[0].bannerElement, mockBanner1);
				proclaim.strictEqual(returnValue[0].options.mockOption, 'test');
				proclaim.isInstanceOf(returnValue[1], Banner);
				proclaim.strictEqual(returnValue[1].bannerElement, mockBanner2);
				proclaim.strictEqual(returnValue[1].options.mockOption, 'test');
			});
		});

	});

});
