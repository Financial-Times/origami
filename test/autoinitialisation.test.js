/* eslint-env mocha */
/* global proclaim sinon */

import fixtures from './helpers/fixtures.js';
import Header from '../main.js.js';

let pcfEl;

describe("o-header autoinitialization", () => {
	beforeEach(() => {
		fixtures.insertOne();
		pcfEl = document.querySelector('.test-el');
	});

	afterEach(() => {
		pcfEl = null;
		fixtures.reset();
	});

	it("should have an init function", () => {
		proclaim.equal(typeof Header.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Header, 'init');

		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function () {
			proclaim.equal(initSpy.calledOnce, true);
			Header.init.restore();
			done();
		}, 200);
	});

	it("should not autoinitialize  when the event is not dispached", () => {
		const initSpy = sinon.spy(Header, 'init');
		proclaim.equal(initSpy.called, false);
	});

	it("should create a Header", () => {
		const oHeader = Header.init();
		proclaim.isInstanceOf(oHeader, Array);
		proclaim.isInstanceOf(oHeader[0], Header);
		proclaim.equal(oHeader.length, 1);
	});

	it("should create an empty Header when initialized if no Header html present", () => {
		fixtures.reset();
		const oHeader = Header.init();
		proclaim.deepEqual(oHeader, []);
		proclaim.isTypeOf(oHeader, 'object');
	});

	it("should create a Header inside certain html element", () => {
		const headerEl = document.querySelector('header');
		const oHeader = Header.init(headerEl);
		proclaim.isInstanceOf(oHeader, Header);
		proclaim.isTypeOf(oHeader, 'object');
	});

	it("should create several Headers inside certain html element", () => {
		fixtures.reset();
		fixtures.insertTwo();
		pcfEl = document.querySelector('.sandbox');
		const oHeader = Header.init(pcfEl);
		proclaim.equal(oHeader.length, 2);
		proclaim.isInstanceOf(oHeader[0], Header);
		proclaim.isInstanceOf(oHeader[1], Header);
	});

	it("should create several Headers using a css selector", () => {
		fixtures.reset();
		fixtures.insertTwo();
		const oHeader = Header.init('.sandbox');
		proclaim.equal(oHeader.length, 2);
		proclaim.isInstanceOf(oHeader[0], Header);
		proclaim.isInstanceOf(oHeader[1], Header);
	});
});
