/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import oCookieMessage from '../main';

describe("oCookieMessage", () => {
	beforeEach(() => {
		fixtures.standardCookieMessage();
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

		it("should create a sinlge oCookieMessage when no element is passed in", () => {
			const cookiemessage = oCookieMessage.init();
			proclaim.equal(cookiemessage instanceof oCookieMessage, true);
		});

		it("should create an oCookieMessage for the element found within the passed in selector", () => {
			const cookiemessage = oCookieMessage.init('.cookie-message-container');
			proclaim.equal(cookiemessage instanceof oCookieMessage, true);
		});
	});
});
