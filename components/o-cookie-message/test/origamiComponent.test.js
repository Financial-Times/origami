/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures.js';
import oCookieMessage from '../main.js';

describe("oCookieMessage", () => {
	beforeEach(() => {
		fixtures.generateHTML('standard');
	});

	afterEach(() => {
		fixtures.reset();
	});

	it('is defined', () => {
		proclaim.isFunction(oCookieMessage);
	});

	it('has a static init method', () => {
		proclaim.isFunction(oCookieMessage.init);
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(oCookieMessage, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.isTrue(initSpy.called);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(oCookieMessage, 'init');
		proclaim.isFalse(initSpy.called);
	});

	describe("init", () => {
		it("should create a single oCookieMessage when no element is passed in", () => {
			const cookiemessage = oCookieMessage.init();
			proclaim.isInstanceOf(cookiemessage, oCookieMessage);
		});

		it("should create an oCookieMessage for the element found within the passed in selector", () => {
			const cookiemessage = oCookieMessage.init('.o-cookie-message');
			proclaim.isInstanceOf(cookiemessage, oCookieMessage);
		});
	});
});
