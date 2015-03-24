/*global describe, it, before, after*/
'use strict';

var expect = require('expect.js');

var oViewport = require('./../main.js');

function isPhantom(){
	return /PhantomJS/.test(navigator.userAgent);
}

describe('o-viewport', function() {
	before(function(){
		if(isPhantom()) {
			// hack to make test run in PhantomJS
			// it doesn't support visibilitychange
			document.hidden = false;
		}
	});

	after(function(){
		if(isPhantom()) {
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
			expect(ev.detail.visible).to.not.be(undefined);
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
		var viewportSize = oViewport.getSize();
		expect(typeof viewportSize.width).to.be('number');
		expect(typeof viewportSize.height).to.be('number');
	});

	it('should get the orientation of the viewport', function() {
		expect(oViewport.getOrientation() === 'portrait' || oViewport.getOrientation() === 'landscape').to.be(true);
	});

	it('should stop listening to scroll event', function(done) {
		oViewport.stopListeningTo('scroll');
		document.body.addEventListener('oViewport.scroll', function(ev) {
			expect(false).to.be.true;
			done();
		});

		setTimeout(function () {
			expect(true).to.be.true;
			done();
		}, 1000);

		window.dispatchEvent(new Event('scroll'));
	});
});
