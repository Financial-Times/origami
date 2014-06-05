/*global require,module*/

var DomDelegate = require('dom-delegate'),
    oViewport = require('o-viewport'),
    ResponsiveNav = require('./ResponsiveNav');

function Header(rootEl) {
    "use strict";

    var bodyDelegate,
        responsiveNavEls = [
            rootEl.querySelector('.o-ft-header__nav--primary-theme'),
            rootEl.querySelector('.o-ft-header__nav--secondary-theme'),
            rootEl.querySelector('.o-ft-header__nav--tools-theme')
        ].filter(function(el) {
            return el && el.nodeType === 1;
        }),
        responsiveNavs = [];

    function resize() {
        for (var c = 0, l = responsiveNavs.length; c < l; c++) {
            if (responsiveNavs[c]) {
                responsiveNavs[c].resize();
            }
        }
    }

    function init() {
        bodyDelegate = new DomDelegate(document.body);
        responsiveNavs = responsiveNavEls.map(function(el) {
            return new ResponsiveNav(el);
        });
        resize();
        oViewport.listenTo('resize');
        bodyDelegate.on('oViewport.resize', resize);
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