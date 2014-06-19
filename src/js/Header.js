/*global require,module*/

var DomDelegate = require('dom-delegate'),
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
    }

    init();

    this.destroy = destroy;

}

module.exports = Header;