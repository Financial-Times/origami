/* eslint-env mocha */

import {assert} from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';

import Banner from './../src/js/banner.js';
import {bannerWithoutID, bannerWithID} from './fixture/main.js';

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
			testArea.innerHTML = bannerWithoutID;
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
			bannerGetOptionsFromDomStub.restore();
			bannerRenderStub.restore();
			bannerOpenStub.restore();
			bannerCloseStub.restore();

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
				formAction: null,
				formEncoding: 'application/x-www-form-urlencoded',
				formMethod: 'post',
				linkLabel: null,
				linkUrl: '#',
				closeButtonLabel: 'Close banner',
				theme: null,
				layout: null
			});
		});

		it('does not extract options from the DOM', () => {
			assert.isTrue(bannerGetOptionsFromDomStub.notCalled);
		});

		it('opens the banner', () => {
			assert.isTrue(bannerOpenStub.calledOnce);
		});

		it('does not close the banner', () => {
			assert.isTrue(bannerCloseStub.notCalled);
		});

		it('renders the banner', () => {
			assert.isTrue(bannerRenderStub.calledOnce);
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
				bannerRenderStub.restore();
				bannerOpenStub.restore();
				bannerCloseStub.restore();

			});

			it('does not open the banner', () => {
				assert.isTrue(bannerOpenStub.notCalled);
			});

			it('closes the banner', () => {
				assert.isTrue(bannerCloseStub.calledOnce);
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
				bannerGetOptionsFromDomStub.restore();
				bannerRenderStub.restore();
				bannerOpenStub.restore();

			});

			it('extracts the options from the DOM', () => {
				assert.isTrue(bannerGetOptionsFromDomStub.calledOnce);
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
				assert.isTrue(banner.buildBannerElement.notCalled);
			});

			it('selects the inner element and stores it on the `innerElement` property', () => {
				sinon.assert.calledWithExactly(bannerElement.querySelector, '[data-o-banner-inner]');
				assert.strictEqual(banner.innerElement, mockBannerInnerElement);
			});

			it('builds a close button element and stores it on the `closeButtonElement` property', () => {
				assert.isTrue(banner.buildCloseButtonElement.calledOnce);
				assert.strictEqual(banner.closeButtonElement, mockCloseButtonElement);
			});

			it('appends the close button element to the inner element', () => {
				assert.isTrue(mockBannerInnerElement.appendChild.calledOnce);
				sinon.assert.calledWithExactly(mockBannerInnerElement.appendChild, mockCloseButtonElement);
			});

			describe('when the `bannerElement` property is not an HTML element', () => {
				let appendChildStub;
				beforeEach(() => {
					banner.bannerElement = null;
					appendChildStub = sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					appendChildStub.restore();
				});

				it('builds a banner element and stores it on the `bannerElement` property', () => {
					assert.isTrue(banner.buildBannerElement.calledOnce);
					sinon.assert.calledWithExactly(banner.buildBannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('appends the banner element to the body', () => {
					assert.isTrue(appendChildStub.calledOnce);
					sinon.assert.calledWithExactly(document.body.appendChild, mockBannerElement);
				});

			});

			describe('when the `bannerElement` property is an empty HTML element', () => {
				let bannerElement;
				let appendChildStub;

				beforeEach(() => {
					bannerElement = banner.bannerElement = document.createElement('div');
					appendChildStub = sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					appendChildStub.restore();
				});

				it('fully constructs the banner element and stores it on the `bannerElement` property', () => {
					assert.isTrue(banner.buildBannerElement.calledOnce);
					sinon.assert.calledWith(banner.buildBannerElement, bannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					sinon.assert.notCalled(document.body.appendChild);
				});

			});

			describe('when the `bannerElement` property is an HTML element with content but no "outer" element', () => {
				let bannerElement;
				let appendChildStub;

				beforeEach(() => {
					bannerElement = banner.bannerElement = document.createElement('div');
					bannerElement.innerHTML = 'mock-content';
					banner.options.contentLong = 'mock-content-long-old';
					banner.options.contentShort = 'mock-content-short-old';
					appendChildStub = sinon.stub(document.body, 'appendChild');
					banner.render();
				});

				afterEach(() => {
					appendChildStub.restore();
				});

				it('fully constructs the banner element using the element HTML as content', () => {
					assert.strictEqual(banner.options.contentLong, 'mock-content');
					assert.strictEqual(banner.options.contentShort, null);
					assert.isTrue(banner.buildBannerElement.calledOnce);
					sinon.assert.calledWith(banner.buildBannerElement, bannerElement);
					assert.strictEqual(banner.bannerElement, mockBannerElement);
				});

				it('does not append the banner element to the body', () => {
					sinon.assert.notCalled(appendChildStub);
				});

			});

			describe('when suppressCloseButton is true', () => {

				beforeEach(() => {
					banner.buildCloseButtonElement.resetHistory();
					banner.options.suppressCloseButton = true;
					banner.render();
				});

				it('does not build the close button', () => {
					assert.isTrue(banner.buildCloseButtonElement.notCalled);
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
				assert.isTrue(bannerElement.classList.remove.calledOnce);
				sinon.assert.calledWith(bannerElement.classList.remove, "o-banner--closed");
			});

			it('dispatches an `o.bannerOpened` event', () => {
				assert.isTrue(bannerElement.dispatchEvent.calledOnce);
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
				assert.isTrue(bannerElement.classList.add.calledOnce);
				sinon.assert.calledWith(bannerElement.classList.add, "o-banner--closed");
			});

			it('dispatches an `o.bannerClosed` event', () => {
				assert.isTrue(bannerElement.dispatchEvent.calledOnce);
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
				assert.dom.equal(returnValue, `
					<div role="region" class="o-banner">
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
				`);
			});

			describe('when the banner has an ID', () => {

				beforeEach(() => {
					testArea.innerHTML = bannerWithID;
					// Create a banner
					bannerElement = document.querySelector('[data-o-component=o-banner]');
					options = {};
					banner = new Banner(bannerElement, options);

				});

				it('outputs only one content element using `options.contentLong`', () => {
					assert.dom.equal(banner.bannerElement, `
						<div class="o-banner o-banner--small" data-o-component="o-banner" id="o-banner-test">
							<div class="o-banner__outer">
								<div class="o-banner__inner" data-o-banner-inner="">
									<div class="o-banner__content o-banner__content--long">
										<header class="o-banner__heading">
											<h1>Title of banner</h1>
										</header>
										<p>Try the new thing, it's great.</p>
									</div>
									<div class="o-banner__content o-banner__content--short">
										<header class="o-banner__heading">
											<h1>Title of banner</h1>
										</header>
										<p>Try the new thing, it's great.</p>
									</div>
									<div class="o-banner__actions">
										<div class="o-banner__action">
											<a href="#" class="o-banner__button">Try it now</a>
										</div>
										<div class="o-banner__action o-banner__action--secondary">
											<a href="#" class="o-banner__link">Give feedback</a>
										</div>
									</div>
									<button class="o-banner__close" aria-label="Close banner" aria-controls="o-banner-test"></button>
								</div>
							</div>
						</div>`
					);
				});

			});

			describe('when `options.contentShort` is not a string', () => {

				beforeEach(() => {
					banner.options.contentShort = null;
					returnValue = banner.buildBannerElement();
				});

				it('outputs only one content element using `options.contentLong`', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

			});

			describe('when `options.linkLabel` is not a string', () => {

				beforeEach(() => {
					banner.options.linkLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include a secondary action/link', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

			});

			describe('when `options.buttonLabel` is not a string', () => {

				beforeEach(() => {
					banner.options.buttonLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include a primary action', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

			});

			describe('when `options.buttonLabel` and `options.linkLabel` are not a string', () => {

				beforeEach(() => {
					banner.options.buttonLabel = null;
					banner.options.linkLabel = null;
					returnValue = banner.buildBannerElement();
				});

				it('does not include the actions element', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

			});

			describe('when `options.theme` is defined and is a string', () => {

				beforeEach(() => {
					banner.options.theme = 'product';
					returnValue = banner.buildBannerElement();
				});

				it('adds the theme class to the banner element', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner o-banner--product">
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
					`);
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

			describe('when `options.layout` is defined and is a string', () => {

				beforeEach(() => {
					banner.options.theme = 'small';
					returnValue = banner.buildBannerElement();
				});

				it('adds the layout class to the banner element', () => {
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner o-banner--small">
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
					`);
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
					returnValue = banner.buildBannerElement(bannerElement);
				});

				it('strips the banner element HTML before constructing', () => {
					assert.notInclude(returnValue.outerHTML, 'mock-original-content');
				});

				it('returns the passed in banner element', () => {
					assert.strictEqual(returnValue, bannerElement);
				});

			});

			describe('when `options.formAction` is not specified', () => {

				it('uses an anchor in place of the form for the primary action when formAction is null', () => {
					banner.options.formAction = null;
					returnValue = banner.buildBannerElement();

					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

				it('uses an anchor in place of the form for the primary action when formAction is undefined', () => {
					banner.options.formAction = undefined;
					returnValue = banner.buildBannerElement();

					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
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
					assert.dom.equal(returnValue, `
						<div role="region" class="o-banner">
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
					`);
				});

			});

		});

		it('has a buildCloseButtonElement method', () => {
			assert.isFunction(banner.buildCloseButtonElement);
		});

		describe('.buildCloseButtonElement()', () => {
			let returnValue;
			let addEventListenerStub;

			beforeEach(() => {

				// Mock options used to test output HTML
				banner.options.closeButtonLabel = 'mockCloseButtonLabel';

				addEventListenerStub = sinon.stub(HTMLElement.prototype, 'addEventListener');

				returnValue = banner.buildCloseButtonElement();
			});

			afterEach(() => {
				addEventListenerStub.restore();
			});

			it('returns an HTML element', () => {
				assert.instanceOf(returnValue, HTMLElement);
			});

			it('constructs the element HTML based on the given options', () => {
				assert.dom.equal(returnValue, `
					<button class="o-banner__close" aria-label="mockCloseButtonLabel"></button>
				`);
			});

			it('adds a handler for the button click event', () => {
				assert.isTrue(returnValue.addEventListener.calledOnce);
				sinon.assert.calledWith(returnValue.addEventListener, 'click');
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
					assert.isTrue(banner.close.calledOnce);
				});

				it('prevents the default click behaviour', () => {
					assert.isTrue(event.preventDefault.calledOnce);
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
		let querySelectorStub;
		let renderStub;
		let openStub;

		beforeEach(() => {
			querySelectorStub = sinon.stub(document, 'querySelector');
			renderStub = sinon.stub(Banner.prototype, 'render');
			openStub = sinon.stub(Banner.prototype, 'open');
			mockRootElement = document.createElement('div');
			options = {
				mockOption: 'test'
			};
		});

		afterEach(() => {
			querySelectorStub.restore();
			renderStub.restore();
			openStub.restore();
		});

		describe('when `rootElement` is an HTML element with a `data-o-component` attribute set to "o-banner"', () => {

			beforeEach(() => {
				mockRootElement.setAttribute('data-o-component', 'o-banner');
				returnValue = Banner.init(mockRootElement, options);
			});

			it('does not query the the document', () => {
				sinon.assert.notCalled(document.querySelector);
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
				sinon.assert.notCalled(document.querySelector);
			});

			it('queries the `rootElement` for banner elements', () => {
				assert.isTrue(mockRootElement.querySelectorAll.calledOnce);
				sinon.assert.calledWithExactly(mockRootElement.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `rootElement`, and returns an array of them', () => {
				assert.isArray(returnValue);
				assert.lengthOf(returnValue, 2);
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
				querySelectorStub.returns(foundElement);
				returnValue = Banner.init('mock-selector', options);
			});

			it('queries the DOM using `rootElement` as a selector', () => {
				sinon.assert.calledOnce(document.querySelector);
				sinon.assert.calledWithExactly(document.querySelector, 'mock-selector');
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
			let querySelectorAllSpy;

			beforeEach(() => {
				mockBanner1 = document.createElement('div');
				mockBanner1.setAttribute('data-o-component', 'o-banner');
				mockBanner2 = document.createElement('div');
				mockBanner2.setAttribute('data-o-component', 'o-banner');
				testArea.appendChild(mockBanner1);
				testArea.appendChild(mockBanner2);
				querySelectorAllSpy = sinon.spy(document.body, 'querySelectorAll');
				returnValue = Banner.init(null, options);
			});

			afterEach(() => {
				querySelectorAllSpy.restore();
			});

			it('does not query the the document', () => {
				sinon.assert.notCalled(document.querySelector);
			});

			it('queries `document.body` for banner elements', () => {
				sinon.assert.calledOnce(document.body.querySelectorAll);
				sinon.assert.calledWithExactly(document.body.querySelectorAll, '[data-o-component="o-banner"]');
			});

			it('creates a new Banner instance with each banner element in `document.body`, and returns an array of them', () => {
				assert.isArray(returnValue);
				assert.lengthOf(returnValue, 2);
				assert.instanceOf(returnValue[0], Banner);
				assert.strictEqual(returnValue[0].bannerElement, mockBanner1);
				assert.strictEqual(returnValue[0].options.mockOption, 'test');
				assert.instanceOf(returnValue[1], Banner);
				assert.strictEqual(returnValue[1].bannerElement, mockBanner2);
				assert.strictEqual(returnValue[1].options.mockOption, 'test');
			});
		});

	});

	describe('.destroy', () => {

		beforeEach(() => {
			testArea.innerHTML = bannerWithoutID;
		});

		describe('when the banner is initialised with a close button', () => {
			it('removes the close button created on init', () => {
				const banner = Banner.init()[0];
				const closeButtonElement = banner.closeButtonElement;
				assert.isTrue(document.body.contains(closeButtonElement), 'Close button not added to the document as expected.');
				assert.instanceOf(banner.closeButtonElement, HTMLElement, 'Banner does not have a reference to a close button as expected.');
				banner.destroy();
				assert.isUndefined(banner.closeButtonElement, 'The destroy method did not remove the Banner\'s reference to its close button as expected.');
				assert.isFalse(document.body.contains(closeButtonElement), 'The close button created on Banner init is still in the document after calling the destroy method.');

			});
		});
	});
});
