/*global describe, it, beforeEach, afterEach*/

const expect = require('expect.js');
const Header = require('./../src/js/header');

describe('Header API', () => {
	it('is defined', () => {
		expect(Header).to.be.a('function');
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
		expect(header).to.be.a(Header);
		expect(header.headerEl).to.equal(headerEl);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);
	});
});
