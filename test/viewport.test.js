/*global describe, it, before, after*/

const expect = require('expect.js');
const sinon = require('sinon/pkg/sinon');

const oViewport = require('./../main.js');
const utils = require('./../src/utils.js');

function isPhantom() {
	return /PhantomJS/.test(navigator.userAgent);
}

describe('o-viewport utils', function () {

	it('throttle should be exposed', function() {
		expect(utils.throttle).to.be.a('function');
	});

	it('debounce should be exposed', function() {
		expect(utils.debounce).to.be.a('function');
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
			expect(ev.type).to.be('oViewport.orientation');
			expect(ev.detail.viewport).to.not.be(undefined);
			expect(ev.detail.orientation).to.not.be(undefined);
			expect(ev.detail.originalEvent).to.not.be(undefined);
			done();
		});
		window.dispatchEvent(new Event('orientationchange'));
	});

	it('should listen to visibilitychange event', function(done) {
		oViewport.listenTo('visibility');
		document.body.addEventListener('oViewport.visibility', function(ev) {
			expect(ev.type).to.be('oViewport.visibility');
			expect(ev.detail.hidden).to.not.be(undefined);
			expect(ev.detail.originalEvent).to.not.be(undefined);
			done();
		});
		window.dispatchEvent(new Event('visibilitychange'));
	});

	it('should listen to resize event', function(done) {
		oViewport.listenTo('resize');
		document.body.addEventListener('oViewport.resize', function(ev) {
			expect(ev.type).to.be('oViewport.resize');
			expect(ev.detail.viewport).to.not.be(undefined);
			expect(ev.detail.originalEvent).to.not.be(undefined);
			done();
		});
		window.dispatchEvent(new Event('resize'));
	});

	it('should listen to scroll event', function(done) {
		oViewport.listenTo('scroll');
		document.body.addEventListener('oViewport.scroll', function(ev) {
			expect(ev.type).to.be('oViewport.scroll');
			expect(ev.detail.viewport).to.not.be(undefined);
			expect(ev.detail.scrollTop).to.not.be(undefined);
			expect(ev.detail.scrollLeft).to.not.be(undefined);
			expect(ev.detail.scrollWidth).to.not.be(undefined);
			expect(ev.detail.scrollHeight).to.not.be(undefined);
			expect(ev.detail.originalEvent).to.not.be(undefined);
			done();
		});
		window.dispatchEvent(new Event('scroll'));
	});

	it('should get size the size of the viewport', function() {
		const viewportSize = oViewport.getSize();
		expect(typeof viewportSize.width).to.be('number');
		expect(typeof viewportSize.height).to.be('number');
	});

	it('should pass the flag to get width of the viewport without srollbars', function() {
		let widthSpy = sinon.spy(utils, 'getWidth');
		let heightSpy = sinon.spy(utils, 'getHeight');

		const viewportSizeNoScrollbars = oViewport.getSize(true);
		expect(typeof viewportSizeNoScrollbars.width).to.be('number');
		expect(typeof viewportSizeNoScrollbars.height).to.be('number');
		expect(widthSpy.calledWith(true)).to.be(true);
		expect(heightSpy.calledWith(true)).to.be(true);
		expect(widthSpy.calledWith(undefined)).to.be(false);
		expect(heightSpy.calledWith(undefined)).to.be(false);
		expect(widthSpy.callCount).to.be(1);
		expect(heightSpy.callCount).to.be(1);

		const viewportSize = oViewport.getSize();
		expect(typeof viewportSize.width).to.be('number');
		expect(typeof viewportSize.height).to.be('number');
		expect(widthSpy.calledWith(undefined)).to.be(true);
		expect(heightSpy.calledWith(undefined)).to.be(true);
		expect(widthSpy.callCount).to.be(2);
		expect(heightSpy.callCount).to.be(2);


		widthSpy.restore();
		heightSpy.restore();
	});

	it('should get the orientation of the viewport', function() {
		expect(oViewport.getOrientation() === 'portrait' || oViewport.getOrientation() === 'landscape').to.be(true);
	});

	it('should be able to get the visibility of the viewport', function() {
		expect(oViewport.getVisibility()).to.be.a('boolean');
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
