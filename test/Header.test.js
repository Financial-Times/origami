/*global describe, it, before, afterEach*/
'use strict';

var expect = require('expect.js');

var Header = require('./../src/js/Header');

describe('Header', function() {

	it('should initialise', function() {
		var container = document.createElement('div');

		var headerEl = document.createElement('header');
		headerEl.setAttribute('data-o-component', 'o-header');
		headerEl.classList.add('o-header');
		container.appendChild(headerEl);

		var headers = Header.init(container);
		expect(headers.length).to.be(1);
		expect(headerEl.getAttribute('data-o-header--js')).to.not.be(null);

		var anotherHeaderEl = document.createElement('header');
		anotherHeaderEl.setAttribute('data-o-component', 'o-header');
		anotherHeaderEl.classList.add('o-header');

		var primaryNav = document.createElement('nav');
		primaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		primaryNav.classList.add('o-header__nav--primary-theme');
		anotherHeaderEl.appendChild(primaryNav);

		var secondaryNav = document.createElement('nav');
		secondaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		secondaryNav.classList.add('o-header__nav--secondary-theme');
		anotherHeaderEl.appendChild(secondaryNav);

		var toolsNav = document.createElement('nav');
		toolsNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		toolsNav.classList.add('o-header__nav--tools-theme');
		anotherHeaderEl.appendChild(toolsNav);

		var myHeader = new Header(anotherHeaderEl);
		expect(anotherHeaderEl.getAttribute('data-o-header--js')).to.not.be(null);
		expect(primaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(secondaryNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
		expect(toolsNav.getAttribute('data-o-hierarchical-nav--js')).to.not.be(null);
	});

	it('should destroy', function() {
		var yetAnotherHeaderEl = document.createElement('header');
		yetAnotherHeaderEl.setAttribute('data-o-component', 'o-header');
		yetAnotherHeaderEl.classList.add('o-header');

		var primaryNav = document.createElement('nav');
		primaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		primaryNav.classList.add('o-header__nav--primary-theme');
		yetAnotherHeaderEl.appendChild(primaryNav);

		var secondaryNav = document.createElement('nav');
		secondaryNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		secondaryNav.classList.add('o-header__nav--secondary-theme');
		yetAnotherHeaderEl.appendChild(secondaryNav);

		var toolsNav = document.createElement('nav');
		toolsNav.setAttribute('data-o-component', 'o-hierarchical-nav');
		toolsNav.classList.add('o-header__nav--tools-theme');
		yetAnotherHeaderEl.appendChild(toolsNav);

		var testHeader = new Header(yetAnotherHeaderEl);
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
