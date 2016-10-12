/* eslint-env mocha, sinon, proclaim */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

const Teaser = require('./../main');

describe("Teaser", () => {
	it('is defined', () => {
		proclaim.equal(typeof Teaser, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Teaser.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Teaser, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Teaser, 'init');
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
			const teaser = Teaser.init();
			proclaim.equal(teaser instanceof Array, true);
			proclaim.equal(teaser[0] instanceof Teaser, true);
		});

		it("single component when initialized with a root element", () => {
			const teaser = Teaser.init('#element');
			proclaim.equal(teaser instanceof Teaser, true);
		});
	});
});
