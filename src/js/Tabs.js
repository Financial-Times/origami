/*global module, require*/

var dom = require('./dom'),
    events = require('./events');

function Tabs(el) {
    "use strict";

    var tabsObj = this,
        tabEls,
        contentEls,
        selectedTabIndex = -1,
        hasInit = false;

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
        var selectedTabEl = el.querySelector('[aria-selected=true]');
        return (selectedTabEl) ? getTabIndexFromElement(selectedTabEl) : 0;
    }

    function isValidTab(i) {
        return (!isNaN(i) && i >= 0 && i < tabEls.length);
    }

    function selectTab(i) {
        var c, l;
        if (isValidTab(i) && i !== selectedTabIndex) {
            for (c = 0, l = tabEls.length; c < l; c++) {
                if (i === c) {
                    tabEls[c].setAttribute('aria-selected', 'true');
                    contentEls[c].setAttribute('aria-expanded', 'true');
                    contentEls[c].setAttribute('aria-hidden', 'false');
                } else {
                    tabEls[c].setAttribute('aria-selected', 'false');
                    contentEls[c].setAttribute('aria-expanded', 'false');
                    contentEls[c].setAttribute('aria-hidden', 'true');
                }
            }
            events.trigger(el, 'oTabs.tabSelect', {
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
            selectTab(i);
        }
    }

    function init() {
        if (!hasInit) {
            tabEls = el.querySelectorAll('[role=tab]');
            contentEls = getTabContentEls(tabEls);
            dom.addClass(el, "o-tabs--js");
            events.listen(el, "click", clickHandler);
            events.trigger(el, 'oTabs.ready', {
                tabs: tabsObj
            });
            selectTab(getSelectedTabElement());
            hasInit = true;
        }
    }

    function destroy() {
        events.unlisten(el, "click", clickHandler);
        dom.removeClass(el, "o-tabs--js");
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
            if (!tEls[c].matches('[data-o-tabs-autoconstruct=false]') || !dom.hasClass(tEls[c], 'o-tabs--js')) {
                tabs.push(new Tabs(tEls[c]));
            }
        }
    }
    return tabs;
};

module.exports = Tabs;