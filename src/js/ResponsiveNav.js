/*global require,module*/

var oPrioritisedContentFilter = require('o-prioritised-content-filter'),
    DomDelegate = require('dom-delegate'),
    Nav = require('./Nav');

function ResponsiveNav(rootEl) {
    "use strict";

    var rootDelegate,
        nav,
        contentFilterEl,
        contentFilter,
        moreEl,
        moreListEl;

    function resize() {
        nav.resize();
        if (contentFilter) {
            contentFilter.filter();
        }
    }

    function emptyMoreList() {
        moreListEl.innerHTML = '';
    }

    function addItemToMoreList(text, href) {
        var itemEl = document.createElement('li'),
            aEl = document.createElement('a');
        aEl.innerText = text;
        aEl.href = href;
        itemEl.appendChild(aEl);
        moreListEl.appendChild(itemEl);
    }

    function hiddenElementsHandler(hiddenEls) {
        // TODO: Update text of more menu (e.g. "More" when some items remain, "Menu" when all items are hidden)
        if (hiddenEls.length > 0) {
            nav.collapseAll();
            if (moreListEl) {
                // TODO: Only do this when the more menu is expanded (no point updating the DOM otherwise)
                emptyMoreList();
                for (var c = 0, l = hiddenEls.length; c < l; c++) {
                    var aEl = hiddenEls[c].querySelector('a');
                    addItemToMoreList(aEl.innerText, aEl.href);
                }
            }
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
        moreEl = rootEl.querySelector('[data-more]');
        if (moreEl) {
            moreListEl = document.createElement('ul');
            moreListEl.setAttribute('data-nav-level', '2');
            moreEl.appendChild(moreListEl);
        }
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