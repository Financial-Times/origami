/*global describe, it*/
'use strict';

var expect = require('expect.js');

var oViewport = require('./../main.js');

describe('o-viewport', function() {

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
});
