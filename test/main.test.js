/* eslint-env mocha */
/* global proclaim sinon */

import Banner from './../main';
import {default as BannerSrc} from './../src/js/banner';

sinon.assert.expose(proclaim, {
	includeFail: false,
	prefix: ''
});

describe('main', () => {

	beforeEach(() => {
		sinon.stub(Banner, 'init');
		sinon.spy(document, 'removeEventListener');
	});

	afterEach(() => {
		Banner.init.restore();
		document.removeEventListener.restore();
	});

	it('exports the Banner class', () => {
		proclaim.isFunction(Banner);
		proclaim.strictEqual(Banner, BannerSrc);
	});

	it('should auto-initialize banners', done => {
		document.addEventListener('o.DOMContentLoaded', () => {
			proclaim.calledOnce(Banner.init);
			proclaim.calledWithExactly(Banner.init);
			proclaim.calledOnce(document.removeEventListener);
			proclaim.calledWith(document.removeEventListener, 'o.DOMContentLoaded');
			done();
		});
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});

});
