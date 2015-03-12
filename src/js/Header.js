/*global require,module*/
"use strict";

var DomDelegate = require('ftdomdelegate');
var oHierarchicalNav = require('o-hierarchical-nav');

function Header(rootEl) {

	var bodyDelegate;
	// Gets all nav elements in the header
	var hierarchicalNavEls = [
			rootEl.querySelector('.o-header__nav--primary-theme'),
			rootEl.querySelector('.o-header__nav--secondary-theme'),
			rootEl.querySelector('.o-header__nav--tools-theme')
		].filter(function(el) {
			/**
			 * Overflow is hidden by default on the tools and primary theme for it to resize properly on core experience
			 * where level 2 and 3 menus won't appear anyway, but in primary experience they do need to appear. We do this
			 * here instead of the map function in init because this needs to be applied regardless of the nav having been
			 * initialized previously, like when the o.DOMContententLoaded event is dispatched
			 */
			if (el) {
				el.style.overflow = 'visible';
			}
			return el && el.nodeType === 1 && !el.hasAttribute('data-o-hierarchical-nav--js');
		});
	var hierarchicalNavs = [];

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		rootEl.setAttribute('data-o-header--js', '');
		bodyDelegate = new DomDelegate(document.body);
		hierarchicalNavs = hierarchicalNavEls.map(function(el) {
			return new oHierarchicalNav(el);
		});
	}

	// Release header and all its navs from memory
	function destroy() {
		bodyDelegate.destroy();
		for (var c = 0, l = hierarchicalNavs.length; c < l; c++) {
			if (hierarchicalNavs[c]) {
				hierarchicalNavs[c].destroy();
			}
		}
		rootEl.removeAttribute('data-o-header--js');
	}

	init();

	this.destroy = destroy;

}

// Initializes all header elements in the page or whatever element is passed to it
Header.init = function(el) {
	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	var headerEls = el.querySelectorAll('[data-o-component="o-header"]');
	var headers = [];
	for (var c = 0, l = headerEls.length; c < l; c++) {
		if (!headerEls[c].hasAttribute('data-o-header--js')) {
			headers.push(new Header(headerEls[c]));
		}
	}
	return headers;
};

module.exports = Header;
