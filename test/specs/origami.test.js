/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from '../helpers/fixtures';

const Overlay = require('./../../main');

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
		});

		it("component array when initialized", () => {
			const overlay = Overlay.init();
			proclaim.equal(overlay instanceof Array, true);
			proclaim.equal(overlay[0] instanceof Overlay, true);
		});

		it("single component when initialized with a root element", () => {
			const overlay = Overlay.init('#element');
			proclaim.equal(overlay instanceof Overlay, true);
		});
	});
});
