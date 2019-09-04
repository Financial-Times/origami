/* eslint-env mocha */
import proclaim from 'proclaim';

import oViewport from './../main.js';
import utils from './../src/utils.js';

function isPhantom() {
	return /PhantomJS/.test(navigator.userAgent);
}

describe('o-viewport utils', function () {

	it('throttle should be exposed', function() {
		proclaim.isTypeOf(utils.throttle, 'function');
	});

	it('debounce should be exposed', function() {
		proclaim.isTypeOf(utils.debounce, 'function');
	});
});

describe('o-viewport', function() {

	before(function() {
		if (isPhantom()) {
			// hack to make test run in PhantomJS
			// it doesn't support visibilitychange
			document.hidden = false;
		}
	});

	after(function() {
		if (isPhantom()) {
			// hack to make test run in PhantomJS
			// it doesn't support visibilitychange
			delete document.hidden;
		}
	});

	it('should listen to orientationchange event', function(done) {
		oViewport.listenTo('orientation');
		document.body.addEventListener('oViewport.orientation', function(ev) {
			proclaim.equal(ev.type, 'oViewport.orientation');
			proclaim.notEqual(ev.detail.viewport, undefined);
			proclaim.notEqual(ev.detail.orientation, undefined);
			proclaim.notEqual(ev.detail.originalEvent, undefined);
			done();
		});
		window.dispatchEvent(new Event('orientationchange'));
	});

	it('should listen to visibilitychange event', function(done) {
		oViewport.listenTo('visibility');
		document.body.addEventListener('oViewport.visibility', function(ev) {
			proclaim.equal(ev.type, 'oViewport.visibility');
			proclaim.notEqual(ev.detail.hidden, undefined);
			proclaim.notEqual(ev.detail.originalEvent, undefined);
			done();
		});
		window.dispatchEvent(new Event('visibilitychange'));
	});

	it('should listen to resize event', function(done) {
		oViewport.listenTo('resize');
		document.body.addEventListener('oViewport.resize', function(ev) {
			proclaim.equal(ev.type, 'oViewport.resize');
			proclaim.notEqual(ev.detail.viewport, undefined);
			proclaim.notEqual(ev.detail.originalEvent, undefined);
			done();
		});
		window.dispatchEvent(new Event('resize'));
	});

	it('should listen to scroll event', function(done) {
		oViewport.listenTo('scroll');
		document.body.addEventListener('oViewport.scroll', function(ev) {
			proclaim.equal(ev.type, 'oViewport.scroll');
			proclaim.notEqual(ev.detail.viewport, undefined);
			proclaim.notEqual(ev.detail.scrollTop, undefined);
			proclaim.notEqual(ev.detail.scrollLeft, undefined);
			proclaim.notEqual(ev.detail.scrollWidth, undefined);
			proclaim.notEqual(ev.detail.scrollHeight, undefined);
			proclaim.notEqual(ev.detail.originalEvent, undefined);
			done();
		});
		window.dispatchEvent(new Event('scroll'));
	});

	it('should get size the size of the viewport', function() {
		const viewportSize = oViewport.getSize();
		proclaim.isTypeOf(viewportSize.width, 'number');
		proclaim.isTypeOf(viewportSize.height, 'number');
	});

	it('should get the orientation of the viewport', function() {
		proclaim.isTrue(oViewport.getOrientation() === 'portrait' || oViewport.getOrientation() === 'landscape');
	});

	it('should be able to get the visibility of the viewport', function() {
		proclaim.isTypeOf(oViewport.getVisibility(), 'boolean');
	});

	it('should stop listening to scroll event', function(done) {
		oViewport.stopListeningTo('scroll');
		document.body.addEventListener('oViewport.scroll', function() {
			done(new Error('scroll event still ran!'));
		});

		setTimeout(function () {
			done();
		}, 1000);

		window.dispatchEvent(new Event('scroll'));
	});

	it('should stop listening to all events', function(done) {
		oViewport.stopListeningTo('all');
		document.body.addEventListener('oViewport.resize', function() {
			done(new Error('resize event still ran!'));
		});

		document.body.addEventListener('oViewport.orientationchange', function() {
			done(new Error('orientationchange event still ran!'));
		});

		document.body.addEventListener('oViewport.visibilitychange', function() {
			done(new Error('visibilitychange event still ran!'));
		});

		setTimeout(function() {
			done();
		}, 1500);

		window.dispatchEvent(new Event('resize'));
		window.dispatchEvent(new Event('orientationchange'));
		window.dispatchEvent(new Event('visibilitychange'));
	});
});
