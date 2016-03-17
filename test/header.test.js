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

	beforeEach(() => {
		headerEl = document.createElement('header');
		headerEl.outerHTML = `
			<header class="o-header" data-o-component="o-header"></header>
		`;
	});

	it('should initialise', () => {
		const container = document.createElement('div');

		const headerEl = document.createElement('header');
		headerEl.setAttribute('data-o-component', 'o-header');
		headerEl.classList.add('o-header');
		container.appendChild(headerEl);

		const headers = Header.init(container);
		expect(headers.length).to.be(1);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);

		const anotherHeaderEl = document.createElement('header');
		anotherHeaderEl.setAttribute('data-o-component', 'o-header');
		anotherHeaderEl.classList.add('o-header');
		new Header(anotherHeaderEl);
		expect(anotherHeaderEl.getAttribute('data-o-header--js')).to.not.be(null);
	});
});
