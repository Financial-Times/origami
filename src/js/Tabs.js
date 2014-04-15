/*global module, require*/

var dom = require('./dom');

function Tabs(rootEl) {
    "use strict";

    var tabsObj = this,
        tabEls,
        contentEls,
        selectedTabIndex = -1,
        hasInit = false,
        myself = this;

    function getTabTargetId(tabEl) {
        var aEls = tabEl.getElementsByTagName('a');
        return (aEls && aEls[0]) ? aEls[0].getAttribute('href').replace('#','') : '';
    }

    function getTabContentEls(tabEls) {
        var els = [], targetEl, c, l;
        for (c = 0, l = tabEls.length; c < l; c++) {
            var tabTargetId = getTabTargetId(tabEls[c]);
            targetEl = document.getElementById(tabTargetId);
            if (targetEl) {
                tabEls[c].setAttribute('aria-controls', tabTargetId);
                els[c] = targetEl;
            }
        }
        return els;
    }

    function getTabIndexFromElement(el) {
        return dom.getElementIndex(el);
    }

    function getSelectedTabElement() {
        var selectedTabEl = rootEl.querySelector('[aria-selected=true]');
        return (selectedTabEl) ? getTabIndexFromElement(selectedTabEl) : 0;
    }

    function isValidTab(i) {
        return (!isNaN(i) && i >= 0 && i < tabEls.length);
    }

    function hidePanel(panelEl) {
        panelEl.setAttribute('aria-expanded', 'false');
        panelEl.setAttribute('aria-hidden', 'true');
    }

    function showPanel(panelEl) {
        panelEl.setAttribute('aria-expanded', 'true');
        panelEl.setAttribute('aria-hidden', 'false');
    }

    function dispatchCustomEvent(name, data) {
        if (document.createEvent && rootEl.dispatchEvent) {
            var event = document.createEvent('Event');
            event.initEvent(name, true, true);
            if (data) {
                event.detail = data;
            }
            rootEl.dispatchEvent(event);
        }
    }

    function selectTab(i) {
        var c, l;
        if (hasInit && isValidTab(i) && i !== selectedTabIndex) {
            for (c = 0, l = tabEls.length; c < l; c++) {
                if (i === c) {
                    tabEls[c].setAttribute('aria-selected', 'true');
                    showPanel(contentEls[c]);
                } else {
                    tabEls[c].setAttribute('aria-selected', 'false');
                    hidePanel(contentEls[c]);
                }
            }
            dispatchCustomEvent('oTabs.tabSelect', {
                tabs: tabsObj,
                selected: i,
                lastSelected: selectedTabIndex
            });
            selectedTabIndex = i;
        }
    }

    function clickHandler(ev) {
        ev.preventDefault();
        var tabEl = dom.getClosest(ev.target, '[role=tab]');
        if (tabEl) {
            var i = getTabIndexFromElement(tabEl);
            myself.selectTab(i);
        }
    }

    function init() {
        if (!hasInit) {
            tabEls = rootEl.querySelectorAll('[role=tab]');
            contentEls = getTabContentEls(tabEls);
            rootEl.classList.add("o-tabs--js");
            rootEl.addEventListener("click", clickHandler, false);
            dispatchCustomEvent('oTabs.ready', {
                tabs: tabsObj
            });
            hasInit = true;
            myself.selectTab(getSelectedTabElement());
        }
    }

    function destroy() {
        rootEl.removeEventListener("click", clickHandler, false);
        rootEl.classList.remove("o-tabs--js");
        for (var c = 0, l = contentEls.length; c < l; c++) {
            showPanel(contentEls[c]);
        }
        hasInit = false;
    }

    this.init = init;
    this.selectTab = selectTab;
    this.destroy = destroy;

    init();
}

Tabs.prototype.createAllIn = function(el) {
    "use strict";
    var tabs = [], tEls, c, l;
    el = el || document.body;
    if (el.querySelectorAll) {
        tEls = el.querySelectorAll('[data-o-component=o-tabs]');
        for (c = 0, l = tEls.length; c < l; c++) {
            if (!tEls[c].matches('[data-o-tabs-autoconstruct=false]') || !tEls[c].classList.contains('o-tabs--js')) {
                tabs.push(new Tabs(tEls[c]));
            }
        }
    }
    return tabs;
};

module.exports = Tabs;