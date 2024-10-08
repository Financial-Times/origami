/* eslint-env mocha */

import proclaim from 'proclaim';

import * as fixtures from './helpers/fixtures.js';
import CookieMessage from './../src/js/cookie-message.js';

const flatten = (string) => string.replace(/\s/g, '');

describe('Cookie Message', () => {
	let cookieMessage;

	describe('new cookie banner', () => {
		beforeEach(() => {
			document.cookie = `FTCookieConsentGDPR=; Max-Age=-9999999999;; Path=/`;
			fixtures.generateHTML('standard');
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('sets theme to `alternative` if theme option provided', () => {
			cookieMessage = CookieMessage.init(null, { theme: 'surprise-cookie' });
			proclaim.deepEqual(cookieMessage.options.theme, 'alternative');
		});
	});

	describe('HTML', () => {
		describe('is initialised imperatively', () => {
			it('with standard theme', () => {
				fixtures.generateHTML('standard');
				cookieMessage = CookieMessage.init();
				proclaim.deepEqual(flatten(cookieMessage.cookieMessageElement.outerHTML).replaceAll(window.location.toString(), 'http://example.com'), flatten(fixtures.html.imperativeCookieMessage));
			});

			it('with alternative theme', () => {
				fixtures.generateHTML('standard');
				cookieMessage = CookieMessage.init(null, { theme: 'alternative' });
				proclaim.deepEqual(flatten(cookieMessage.cookieMessageElement.outerHTML).replaceAll(window.location.toString(), 'http://example.com'), flatten(fixtures.html.imperativeAltCookieMessage));
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

			it('emits `oCookieMessage.view` if consent cookies are not already set', (done) => {
				let isVisible = false;
				document.body.addEventListener('oCookieMessage.view', function view () {
					isVisible = true;
					document.body.removeEventListener('oCookieMessage.view', view);
					done();
				});
				CookieMessage.init();
				proclaim.isTrue(isVisible, 'Expected the `oCookieMessage.view` event to be emitted but it was not.');
			});

			it('emits `oCookieMessage.act` when consent is given', (done) => {
				let consentGiven = false;
				document.body.addEventListener('oCookieMessage.act', function act (){
					consentGiven = true;
					document.body.removeEventListener('oCookieMessage.act', act);
					done();
				});
				cookieMessage = CookieMessage.init();
				const button = cookieMessage.cookieMessageElement.querySelector('.o-cookie-message__button');
				button.click();
				proclaim.isTrue(consentGiven, 'Expected `oCookieMessage.act` event to be emitted but it was not.');
			});

			it('emits `oCookieMessage.close` when consent is given', (done) => {
				let consentGiven = false;
				document.body.addEventListener('oCookieMessage.close', function close() {
					consentGiven = true;
					document.body.removeEventListener('oCookieMessage.close', close);
					done();
				});
				cookieMessage = CookieMessage.init();
				const button = cookieMessage.cookieMessageElement.querySelector('.o-cookie-message__button');
				button.click();
				proclaim.isTrue(consentGiven, 'Expected `oCookieMessage.close` event to be emitted but it was not.');
			});
		});

		describe('destroy', () => {
			beforeEach(() => {
				document.cookie = `FTCookieConsentGDPR=; Max-Age=-9999999999;; Path=/`;
				fixtures.generateHTML('standard');
			});

			afterEach(() => {
				fixtures.reset();
			});

			it('removes the theme set via an option', () => {
				cookieMessage = CookieMessage.init(null, { theme: 'alternative' });

				proclaim.ok(document.querySelector('.o-cookie-message--alternative'), 'Did not find theme class before calling destroy');
				cookieMessage.destroy();
				proclaim.notOk(document.querySelector('.o-cookie-message--alternative'), 'Found theme class after calling destroy');
			});

			it('removes the button click event listener', () => {
				document.body.addEventListener('oCookieMessage.act', function act (){
					throw new Error('The click event listener was actioned after calling the `destroy` method.');
				});
				cookieMessage = CookieMessage.init();
				cookieMessage.destroy();
				const button = cookieMessage.cookieMessageElement.querySelector('.o-cookie-message__button');
				button.click();
			});
		});

		describe('bfcache behaviour', () => {
			let hasClosed;

			/**
			 * @typedef PageTransitionEventInit
			 * @type {object}
			 * @property {boolean} bubbles - can it bubble?
			 * @property {boolean} cancelable - can it be canceled?
			 * @property {boolean} composed - was it composed?
			 * @property {boolean} persisted - is the document loading from a cache?
			 */

			/**
			 * @param {"pageshow"|"pagehide"} type - event type
			 * @param {PageTransitionEventInit} [props] - event options
			 * @returns {void}
			 */
			function firePageTransitionEvent(type, props) {
				const evt = new PageTransitionEvent(type, props);
				evt.initEvent(type);
				window.dispatchEvent(evt);
			}

			beforeEach(() => {
				hasClosed = false;
				document.cookie = 'FTCookieConsentGDPR=; Max-Age=-9999999999;';
				document.body.addEventListener('oCookieMessage.close', () => {
					hasClosed = true;
				});
				fixtures.generateHTML('standard');
			});

			afterEach(() => {
				fixtures.reset();
			});

			it('The pageshow event is not responded to unless swiping back', () => {
				cookieMessage = CookieMessage.init();
				firePageTransitionEvent('pageshow');
				proclaim.deepEqual(flatten(cookieMessage.cookieMessageElement.outerHTML).replaceAll(window.location.toString(), 'http://example.com'), flatten(fixtures.html.imperativeCookieMessage));
			});

			it('emits `oCookieMessage.close` when swiping back with consent granted', () => {
				cookieMessage = CookieMessage.init();

				document.cookie = 'FTCookieConsentGDPR=true; Max-Age=500;';
				firePageTransitionEvent('pageshow', { persisted: true });

				proclaim.isTrue(hasClosed, 'Expected the `oCookieMessage.close` to be emitted but it was not.');
			});

			it('Remains open when when swiping back and consent has not been given', () => {
				cookieMessage = CookieMessage.init();
				firePageTransitionEvent('pageshow', { persisted: true });

				proclaim.isFalse(hasClosed, 'Expected the banner to remain open.');
			});
		});
	});
});
