/* eslint-env mocha, jasmine */

const fixtures = require('./helpers/fixtures');
const sinon = require('sinon/pkg/sinon');
const expect = require('expect.js');
const Header = require('./../main.js');

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
		expect(typeof Header.init).to.equal('function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(Header, 'init');

		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			expect(initSpy.calledOnce).to.be(true);
			Header.init.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize  when the event is not dispached", () => {
		const initSpy = sinon.spy(Header, 'init');
		expect(initSpy.called).to.be(false);
	});

	it("should create a Header", () => {
		const oHeader = Header.init();
		expect(oHeader instanceof Array).to.be(true);
		expect(oHeader[0] instanceof Header).to.be(true);
		expect(oHeader.length).to.be(1);
	});

	it("should create an empty Header when initialized if no Header html present", () => {
		fixtures.reset();
		const oHeader = Header.init();
		expect(oHeader).to.eql([]);
		expect(typeof oHeader).to.be('object');
	});

	it("should create a Header inside certain html element", () => {
		const headerEl = document.querySelector('header');
		const oHeader = Header.init(headerEl);
		expect(oHeader instanceof Header).to.be(true);
		expect(typeof oHeader).to.be('object');
	});

	it("should create several Headers inside certain html element", () => {
		fixtures.reset();
		fixtures.insertTwo();
		pcfEl = document.querySelector('.sandbox');
		const oHeader = Header.init(pcfEl);
		expect(oHeader.length).to.equal(2);
		expect(oHeader[0] instanceof Header).to.be(true);
		expect(oHeader[1] instanceof Header).to.be(true);
	});

	it("should create several Headers using a css selector", () => {
		fixtures.reset();
		fixtures.insertTwo();
		const oHeader = Header.init('.sandbox');
		expect(oHeader.length).to.equal(2);
		expect(oHeader[0] instanceof Header).to.be(true);
		expect(oHeader[1] instanceof Header).to.be(true);
	});
});
