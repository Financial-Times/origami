/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');

const Header = require('./../src/js/header');

describe('Header API', () => {

	it("is defined", () => {
		expect(Header).to.be.a('function');
	});

	it('has a static init method', () => {
		expect(Header.init).to.be.a('function');
	});

	it('has a destroy instance method', () => {
		expect(Header.prototype.destroy).to.be.a('function');
	});
});

describe('Header instance', () => {
	let headerEl;
	let containerEl;

	beforeEach(() => {
		containerEl = document.createElement('div');
		document.body.appendChild(containerEl);
		containerEl.innerHTML = `
			<header class="o-header" data-o-component="o-header"></header>
		`;
		headerEl = containerEl.querySelector('.o-header');
	});

	afterEach(() => {
		containerEl.removeChild(headerEl);
		headerEl = null;
		containerEl = null;
	});

	it('constructor', () => {
		const header = new Header(headerEl);
		expect(header).to.be.a('object');
		expect(Object.getPrototypeOf(header)).to.equal(Header.prototype);
		expect(header.headerEl).to.be(headerEl);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);
	});

	it('#destroy', () => {
		const header = new Header(headerEl);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);
		header.destroy();
		expect(headerEl.getAttribute('data-o-header--js')).to.be(null);
		expect(header.headerEl).to.be(undefined);
	});

	it('#init()', () => {
		const headers = Header.init();
		expect(headers.length).to.be(1);
		expect(Object.getPrototypeOf(headers[0])).to.equal(Header.prototype);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);
	});
});
