import Banner from './../main';
import {default as BannerSrc} from './../src/js/banner';
import * as assert from 'proclaim';
import sinon from 'sinon/pkg/sinon';

sinon.assert.expose(assert, {
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
		assert.isFunction(Banner);
		assert.strictEqual(Banner, BannerSrc);
	});

	it('should auto-initialize banners', done => {
		document.addEventListener('o.DOMContentLoaded', () => {
			assert.calledOnce(Banner.init);
			assert.calledWithExactly(Banner.init);
			assert.calledOnce(document.removeEventListener);
			assert.calledWith(document.removeEventListener, 'o.DOMContentLoaded');
			done();
		});
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
	});

});
