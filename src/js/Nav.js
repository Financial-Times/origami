/*global require, module*/

var DomDelegate = require('dom-delegate'),
    oDom = require('o-dom'),
    utils = require('./utils');

function Nav(rootEl) {
    "use strict";

    var bodyDelegate = new DomDelegate(document.body),
        rootDelegate = new DomDelegate(rootEl);

    function getChildListEl(el) {
        return el.querySelector('ul');
    }

    function hasChildList(el) {
        return !!getChildListEl(el);
    }

    function getMegaDropdownEl(itemEl) {
        if (itemEl.hasAttribute('aria-controls')) {
            return document.getElementById(itemEl.getAttribute('aria-controls'));
        }
    }

    function isControlEl(el) {
        return !!(getChildListEl(el) || getMegaDropdownEl(el));
    }

    function isExpanded(el) {
        return el.getAttribute('aria-expanded') === 'true';
    }

    function isElementInsideNav(el) {
        var l1Els = rootEl.querySelectorAll('[data-nav-level="1"] > li');
        for (var c = 0, l = l1Els.length; c < l; c++) {
            if (l1Els[c].contains(el)) {
                return true;
            }
        }
        return false;
    }

    function getLevel(el) {
        return parseInt(el.parentNode.getAttribute('data-nav-level'), 10);
    }

    function level2ListFitsInWindow(l2El) {
        return l2El.getBoundingClientRect().right < window.innerWidth;
    }

    function elementFitsToRight(el1, el2) {
        return el1.getBoundingClientRect().right + el2.offsetWidth < window.innerWidth;
    }

    function positionChildListEl(parentEl, childEl) {
        parentEl.classList.remove('nav--align-right');
        parentEl.classList.remove('nav--outside-right');
        parentEl.classList.remove('nav--left');
        if (!childEl) {
            return;
        }
        if (getLevel(parentEl) === 1) {
            if (!level2ListFitsInWindow(childEl)) {
                parentEl.classList.add('nav--align-right');
            }
        } else {
            if (elementFitsToRight(parentEl, childEl)) {
                parentEl.classList.add('nav--outside-right');
            }
        }
    }

    function hideEl(el) {
        if (el) {
            el.setAttribute('aria-hidden', 'true');
        }
    }

    function showEl(el) {
        if (el) {
            el.removeAttribute('aria-hidden');
        }
    }

    function collapseAll(nodeList) {
        if (!nodeList) {
            nodeList = rootEl.querySelectorAll('[data-nav-level="1"] > li[aria-expanded=true]');
        }
        utils.nodeListToArray(nodeList).forEach(function(childListItemEl) {
            if (isExpanded(childListItemEl)) {
                collapseItem(childListItemEl);
            }
        });
    }

    function collapseItem(itemEl) {
        itemEl.setAttribute('aria-expanded', 'false');
        if (hasChildList(itemEl)) {
            collapseAll(getChildListEl(itemEl).children);
        }
        hideEl(getMegaDropdownEl(itemEl));
        utils.dispatchCustomEvent(itemEl, 'oFtHeader.collapse');
    }

    function expandItem(itemEl) {
        if (getLevel(itemEl) === 1) {
            collapseAll();
        }
        itemEl.setAttribute('aria-expanded', 'true');
        utils.dispatchCustomEvent(itemEl, 'oFtHeader.expand');
        positionChildListEl(itemEl, getChildListEl(itemEl));
        showEl(getMegaDropdownEl(itemEl));
    }

    function handleClick(ev) {
        var itemEl = oDom.getClosestMatch(ev.target, 'li');
        if (itemEl && isControlEl(itemEl)) {
            ev.preventDefault();
            if (!isExpanded(itemEl)) {
                expandItem(itemEl);
            } else {
                collapseItem(itemEl);
            }
        }
    }

    function positionLevel3s() {
        var openLevel2El = rootEl.querySelector('[data-nav-level="2"] > [aria-expanded="true"]'),
            openLevel3El = rootEl.querySelector('[data-nav-level="2"] > [aria-expanded="true"] > ul');
        if (openLevel2El && openLevel3El) {
            positionChildListEl(openLevel2El, openLevel3El);
        }
    }

    function resize() {
        positionLevel3s();
    }

    function destroy() {
        rootDelegate.destroy();
        bodyDelegate.destroy();
    }

    rootDelegate.on('click', handleClick);
    bodyDelegate.on('click', function(ev) {
        if (!isElementInsideNav(ev.target)) {
            collapseAll();
        }
    });

    this.resize = resize;
    this.collapseAll = collapseAll;
    this.destroy = destroy;

}

module.exports = Nav;