/*global describe, it*/

const expect = require('expect.js');

const Header = require('./../src/js/Header');

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

		const primaryNav = document.createElement('nav');
		primaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		primaryNav.classList.add('o-header__nav--primary-theme');
		anotherHeaderEl.appendChild(primaryNav);

		const secondaryNav = document.createElement('nav');
		secondaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		secondaryNav.classList.add('o-header__nav--secondary-theme');
		anotherHeaderEl.appendChild(secondaryNav);

		const toolsNav = document.createElement('nav');
		toolsNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		toolsNav.classList.add('o-header__nav--tools-theme');
		anotherHeaderEl.appendChild(toolsNav);

		const myHeader = new Header(anotherHeaderEl);
		expect(myHeader.destroy).to.not.be(undefined);
		expect(anotherHeaderEl.getAttribute('data-o-header--js')).to.not.be(null);
		expect(primaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(secondaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(toolsNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
	});

	it('should destroy', function() {
		const yetAnotherHeaderEl = document.createElement('header');
		yetAnotherHeaderEl.setAttribute('data-o-component', 'o-header');
		yetAnotherHeaderEl.classList.add('o-header');

		const primaryNav = document.createElement('nav');
		primaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		primaryNav.classList.add('o-header__nav--primary-theme');
		yetAnotherHeaderEl.appendChild(primaryNav);

		const secondaryNav = document.createElement('nav');
		secondaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		secondaryNav.classList.add('o-header__nav--secondary-theme');
		yetAnotherHeaderEl.appendChild(secondaryNav);

		const toolsNav = document.createElement('nav');
		toolsNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		toolsNav.classList.add('o-header__nav--tools-theme');
		yetAnotherHeaderEl.appendChild(toolsNav);

		const testHeader = new Header(yetAnotherHeaderEl);
		expect(yetAnotherHeaderEl.getAttribute('data-o-header--js')).to.not.be(null);
		expect(primaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(secondaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(toolsNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);

		testHeader.destroy();
		expect(yetAnotherHeaderEl.getAttribute('data-o-header--js')).to.be(null);
		expect(primaryNav.getAttribute('data-o-hierarchical-nav--js')).to.be(null);
		expect(secondaryNav.getAttribute('data-o-hierarchical-nav--js')).to.be(null);
		expect(toolsNav.getAttribute('data-o-hierarchical-nav--js')).to.be(null);
	});
});
