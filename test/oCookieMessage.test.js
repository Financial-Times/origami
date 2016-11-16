/*global mocha, proclaim, sinon */
import sinon from 'sinon/pkg/sinon';
import proclaim from 'proclaim';

import CookieMessage from './../src/js/cookieMessage';

describe("CookieMessage", () => {
	it('is defined', () => {
		proclaim.isFunction(CookieMessage);
	});
	it('has a static init method', () => {
		proclaim.isFunction(CookieMessage.init);
	});
});
