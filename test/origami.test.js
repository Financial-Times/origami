/* eslint-env mocha */
/* global proclaim sinon */

import * as fixtures from './helpers/fixtures';
import Share from './../main';

describe("Share", () => {
	it('is defined', () => {
		proclaim.equal(typeof Share, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof Share.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Share, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(Share, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
			fixtures.insertShareLinks();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = Share.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof Share, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = Share.init('#element');
			proclaim.equal(boilerplate instanceof Share, true);
		});
	});
});
