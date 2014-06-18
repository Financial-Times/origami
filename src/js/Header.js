/*global require,module*/

var DomDelegate = require('dom-delegate'),
    ResponsiveNav = require('o-hierarchical-nav');

function Header(rootEl) {
    "use strict";

    var bodyDelegate,
        responsiveNavEls = [
            rootEl.querySelector('.o-hierarchical-nav__primary-theme'),
            rootEl.querySelector('.o-hierarchical-nav__secondary-theme'),
            rootEl.querySelector('.o-hierarchical-nav__tools-theme')
        ].filter(function(el) {
            return el && el.nodeType === 1;
        }),
        responsiveNavs = [];

    function init() {
        bodyDelegate = new DomDelegate(document.body);
        responsiveNavs = responsiveNavEls.map(function(el) {
            return new ResponsiveNav(el);
        });
    }

    function destroy() {
        bodyDelegate.destroy();
        for (var c = 0, l = responsiveNavs.length; c < l; c++) {
            if (responsiveNavs[c]) {
                responsiveNavs[c].destroy();
            }
        }
    }

    init();

    this.destroy = destroy;

}

module.exports = Header;