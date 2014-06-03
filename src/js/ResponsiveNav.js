/*global require,module*/

var oPrioritisedContentFilter = require('o-prioritised-content-filter'),
    DomDelegate = require('dom-delegate'),
    Nav = require('./Nav');

function ResponsiveNav(rootEl) {
    "use strict";

    var rootDelegate,
        nav,
        contentFilterEl,
        contentFilter;

    function resize() {
        nav.resize();
        if (contentFilter) {
            contentFilter.filter();
        }
    }

    function hiddenElementsHandler(hiddenEls) {
        if (hiddenEls.length > 0) {
            nav.collapseAll();
            console.group('Hidden elements:');
            for (var c = 0, l = hiddenEls.length; c < l; c++) {
                console.log(hiddenEls[c]);
            }
            console.groupEnd();
        }
    }

    function pcfChangeHandler(ev) {
        if (!ev.detail || !ev.detail.hiddenItems) {
            return;
        }
        if (ev.target === contentFilterEl) {
            hiddenElementsHandler(ev.detail.hiddenItems);
        }
    }

    function init() {
        nav = new Nav(rootEl);
        rootDelegate = new DomDelegate(rootEl);
        contentFilterEl = rootEl.querySelector('ul');
        if (contentFilterEl) {
            contentFilter = new oPrioritisedContentFilter(contentFilterEl, { filterOnResize: false });
        }
        rootDelegate.on('oPrioritisedContentFilter.change', pcfChangeHandler);
    }

    function destroy() {
        rootDelegate.destroy();
    }

    init();

    this.resize = resize;
    this.destroy = destroy;

}

module.exports = ResponsiveNav;