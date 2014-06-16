/*global require,module*/

var SquishyList = require('o-squishy-list'),
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

    function isMegaDropdownControl(el) {
        return el.hasAttribute('aria-controls');
    }

    function resize() {
        nav.resize();
        if (contentFilter) {
            contentFilter.squish();
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

    function populateMoreList(hiddenEls) {
        emptyMoreList();
        for (var c = 0, l = hiddenEls.length; c < l; c++) {
            var aEl = hiddenEls[c].querySelector('a');
            addItemToMoreList(aEl.innerText, aEl.href);
        }
    }

    function setMoreElClass(remainingItems) {
        if (remainingItems === 0) {
            moreEl.classList.add('nav__more--all');
            moreEl.classList.remove('nav__more--some');
        } else {
            moreEl.classList.add('nav__more--some');
            moreEl.classList.remove('nav__more--all');
        }
    }

    function contentFilterChangeHandler(ev) {
        if (ev.target === contentFilterEl && ev.detail.hiddenItems.length > 0) {
            nav.collapseAll();
            setMoreElClass(ev.detail.remainingItems.length);
        }
    }

    function navExpandHandler(ev) {
        if (ev.target === moreEl) {
            populateMoreList(contentFilter.getHiddenItems());
        }
    }

    function init() {
        nav = new Nav(rootEl);
        rootDelegate = new DomDelegate(rootEl);
        contentFilterEl = rootEl.querySelector('ul');
        moreEl = rootEl.querySelector('[data-more]');
        if (moreEl && !isMegaDropdownControl(moreEl)) {
            moreListEl = document.createElement('ul');
            moreListEl.setAttribute('data-nav-level', '2');
            moreEl.appendChild(moreListEl);
            rootDelegate.on('oLayers.New', navExpandHandler);
        }
        if (contentFilterEl) {
            contentFilter = new SquishyList(contentFilterEl, { filterOnResize: false });
        }
        rootDelegate.on('oSquishyList.change', contentFilterChangeHandler);
    }

    function destroy() {
        rootDelegate.destroy();
    }

    init();

    this.resize = resize;
    this.destroy = destroy;

}

module.exports = ResponsiveNav;