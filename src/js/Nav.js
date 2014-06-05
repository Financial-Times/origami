/*global require, module*/

var DomDelegate = require('dom-delegate'),
    oDom = require('o-dom');

function nodeListToArray(nl) {
    "use strict";
    return [].map.call(nl, function(element) {
        return element;
    });
}

function Nav(rootEl) {
    "use strict";

    var bodyDelegate = new DomDelegate(document.body),
        rootDelegate = new DomDelegate(rootEl);

    function isParent(el) {
        return el.classList.contains('nav--parent');
    }

    function isExpanded(el) {
        return el.getAttribute('aria-expanded') === 'true';
    }

    function getLevel(el) {
        return parseInt(el.parentNode.getAttribute('data-nav-level'), 10);
    }

    function collapseAll() {
        nodeListToArray(rootEl.querySelectorAll('[data-nav-level="1"] > li[aria-expanded=true]')).forEach(function(childListItemEl) {
            collapseItem(childListItemEl);
        });
    }

    // Recursive collapse of nav item
    function collapseItem(itemEl) {
        itemEl.setAttribute('aria-expanded', 'false');
        nodeListToArray(itemEl.querySelector('ul').children).forEach(function(childListItemEl) {
            if (isExpanded(childListItemEl)) {
                collapseItem(childListItemEl);
            }
        });
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

    function expandItem(itemEl) {
        itemEl.setAttribute('aria-expanded', 'true');
        var childListEl = itemEl.querySelector('ul');
        if (childListEl) {
            positionChildListEl(itemEl, childListEl);
        }
    }

    function handleClick(ev) {
        ev.preventDefault();
        var itemEl = oDom.getClosestMatch(ev.target, 'li');
        if (!isParent(itemEl)) {
            return;
        }
        if (!isExpanded(itemEl)) {
            if (getLevel(itemEl) === 1) {
                collapseAll();
            }
            expandItem(itemEl);
        } else {
            collapseItem(itemEl);
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

    rootDelegate.on('click', '.nav--parent > a', handleClick);
    bodyDelegate.on('click', null, function(ev) {
        if (!rootEl.contains(ev.target)) {
            collapseAll();
        }
    });

    this.resize = resize;
    this.collapseAll = collapseAll;
    this.destroy = destroy;

}

module.exports = Nav;