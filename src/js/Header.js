/*global require,module*/

var DomDelegate = require('ftdomdelegate'),
    oHierarchicalNav = require('o-hierarchical-nav');

function Header(rootEl) {
    "use strict";

    var bodyDelegate,
        hierarchicalNavEls = [
            rootEl.querySelector('.o-ft-header__nav--primary-theme'),
            rootEl.querySelector('.o-ft-header__nav--secondary-theme'),
            rootEl.querySelector('.o-ft-header__nav--tools-theme')
        ].filter(function(el) {
            return el && el.nodeType === 1;
        }),
        hierarchicalNavs = [];

    function init() {
        rootEl.setAttribute('data-o-ft-header--js', '');
        bodyDelegate = new DomDelegate(document.body);
        hierarchicalNavs = hierarchicalNavEls.map(function(el) {
            return new oHierarchicalNav(el);
        });
    }

    function destroy() {
        bodyDelegate.destroy();
        for (var c = 0, l = hierarchicalNavs.length; c < l; c++) {
            if (hierarchicalNavs[c]) {
                hierarchicalNavs[c].destroy();
            }
        }
        rootEl.removeAttribute('data-o-ft-header--js');
    }

    init();

    this.destroy = destroy;

}

Header.prototype.createAllIn = function(el) {
    'use strict';
    if (!el) {
        el = document.body;
    }
    var headerEls = el.querySelectorAll('[data-o-component="o-ft-header"]:not([data-o-ft-header--js])'),
        headers = [];
    for (var c = 0, l = headerEls.length; c < l; c++) {
        headers.push(new Header(headerEls[c]));
    }
    return headers;
};

module.exports = Header;
