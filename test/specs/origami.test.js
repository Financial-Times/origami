/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from '../helpers/fixtures';

import Overlay from './../../main';

describe("Overlay", () => {
	it('is defined', () => {
		proclaim.equal(typeof Overlay, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Overlay.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Overlay, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Overlay, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
			Overlay.destroy();
		});

		it("component array when initialized", () => {
			const overlays = Overlay.init();
			proclaim.equal(overlays instanceof Array, true);
			proclaim.equal(overlays.length, 2);
			proclaim.equal(overlays[0] instanceof Overlay, true);
		});

		it("component array of overlays found in the element passed in", () => {
			const overlays = Overlay.init('#element');
			proclaim.equal(overlays instanceof Array, true);
			proclaim.equal(overlays.length, 1);
			proclaim.equal(overlays[0] instanceof Overlay, true);
		});
	});
});
