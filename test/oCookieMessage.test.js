/* eslint-env mocha */
/* global proclaim */

import * as fixtures from './helpers/fixtures.js';
import CookieMessage from './../src/js/cookie-message.js';

const flatten = string => string.replace(/\s/g, '');

describe("Cookie Message", () => {
	let cookieMessage;

	describe('new cookie banner', () => {

		beforeEach(() => {
			document.cookie = `FTCookieConsentGDPR=; Max-Age=-9999999999;; Path=/`;
			fixtures.generateHTML('standard');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('initialises with default options', () => {
			cookieMessage = CookieMessage.init();
			proclaim.deepStrictEqual(cookieMessage.options, CookieMessage.defaultOptions);
		});

		it('initialises with custom options', () => {
			const customOpts = {
				cookieMessageClass: 'my-cookie-message',
				FTCookieConsentGDPR: 'COOKIE'
			};
			cookieMessage = CookieMessage.init(null, customOpts);
			proclaim.deepStrictEqual(cookieMessage.options, Object.assign({}, CookieMessage.defaultOptions, customOpts));
		});

		it('initialises with dom attributes', () => {
			fixtures.generateHTML('domAttributes');
			const domAttributes = {
				acceptUrl: 'example.com'
			};

			cookieMessage = CookieMessage.init();
			proclaim.deepStrictEqual(cookieMessage.options, Object.assign({}, CookieMessage.defaultOptions, domAttributes));
		});

		it('sets theme to `alternative` if theme option provided', () => {
			cookieMessage = CookieMessage.init(null, { theme: 'surprise-cookie'});
			proclaim.deepEqual(cookieMessage.options.theme, 'alternative');
		});
	});

	describe('HTML', () => {
		describe('is initialised imperatively', () => {
			it('with standard theme', () => {
				fixtures.generateHTML('standard');
				cookieMessage = CookieMessage.init();
				proclaim.deepEqual(flatten(cookieMessage.cookieMessageElement.outerHTML), flatten(fixtures.html.imperativeCookieMessage));
			});

			it('with alternative theme', () => {
				fixtures.generateHTML('standard');
				cookieMessage = CookieMessage.init(null, { theme: 'alternative'});
				proclaim.deepEqual(flatten(cookieMessage.cookieMessageElement.outerHTML), flatten(fixtures.html.imperativeAltCookieMessage));
			});
		});
	});

	describe('event', () => {
		describe('when consent cookies are set', () => {
			beforeEach(() => {
				document.cookie = 'FTCookieConsentGDPR=true; Max-Age=500;';
				fixtures.generateHTML('standard');
			});

			afterEach(() => {
				document.cookie = 'FTCookieConsentGDPR=; Max-Age=-9999999999;';
				fixtures.reset();
			});

			it('does not emit `oCookieMessage.view`', () => {
				let isVisible = false;
				document.body.addEventListener('oCookieMessage.view', () => {
					isVisible = true;
				});
				CookieMessage.init();
				proclaim.isFalse(isVisible, 'Expected the `oCookieMessage.view` event not to be emitted.');
			});

			it('emits `oCookieMessage.close`', () => {
				let hasClosed = false;
				document.body.addEventListener('oCookieMessage.close', () => {
					hasClosed = true;
				});
				CookieMessage.init();
				proclaim.isTrue(hasClosed, 'Expected the `oCookieMessage.close` to be emitted but it was not.');
			});
		});

		describe('when consent cookies are not set', () => {
			beforeEach(() => {
				document.cookie = 'FTCookieConsentGDPR=; Max-Age=-9999999999;';
				fixtures.generateHTML('standard');
			});

			afterEach(() => {
				document.cookie = 'FTCookieConsentGDPR=true; Max-Age=500;';
				fixtures.reset();
			});

			it('emits `oCookieMessage.view` if consent cookies are not already set', () => {
				let isVisible = false;
				document.body.addEventListener('oCookieMessage.view', () => {
					isVisible = true;
				});
				CookieMessage.init();
				proclaim.isTrue(isVisible, 'Expected the `oCookieMessage.view` event to be emitted but it was not.');
			});

			it('emits `oCookieMessage.act` when consent is given', () => {
				let consentGiven = false;
				document.body.addEventListener('oCookieMessage.act', () => {
					consentGiven = true;
				});
				cookieMessage = CookieMessage.init();
				const button = cookieMessage.cookieMessageElement.querySelector('.o-cookie-message__button');
				button.click();
				proclaim.isTrue(consentGiven, 'Expected `oCookieMessage.act` event to be emitted but it was not.');
			});

			it('emits `oCookieMessage.close` when consent is given', () => {
				let consentGiven = false;
				document.body.addEventListener('oCookieMessage.close', () => {
					consentGiven = true;
				});
				cookieMessage = CookieMessage.init();
				const button = cookieMessage.cookieMessageElement.querySelector('.o-cookie-message__button');
				button.click();
				proclaim.isTrue(consentGiven, 'Expected `oCookieMessage.close` event to be emitted but it was not.');
			});
		});
	});
});
