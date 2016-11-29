/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const oFooter = require('./../main');

describe("oFooter", () => {
	it('is defined', () => {
		proclaim.equal(typeof oFooter, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof oFooter.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(oFooter, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(oFooter, 'init');
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
		//	const footer = oFooter.init();
		//	proclaim.equal(footer instanceof Array, true);
		//	proclaim.equal(footer[0] instanceof oFooter, true);
		});

		it("single component when initialized with a root element", () => {
		//	const footer = oFooter.init('#element');
		//	proclaim.equal(footer instanceof oFooter, true);
		});
	});
});
