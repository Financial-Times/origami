/* eslint-env mocha */
import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import OComments from '../main';

describe("OComments", () => {
	it('is defined', () => {
		proclaim.equal(typeof OComments, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof OComments.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(OComments, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(OComments, 'init');
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
			const boilerplate = OComments.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof OComments, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = OComments.init('#element');
			proclaim.equal(boilerplate instanceof OComments, true);
		});
	});
});
