/*global describe, it*/

const expect = require('expect.js');

const Header = require('./../src/js/header');

describe('Header', function() {

	it('should initialise', function() {
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
