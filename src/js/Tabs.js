/*global module, require*/

var dom = require('./dom'),
    events = require('./events');

function Tabs(el) {
    "use strict";

    var tabsObj = this,
        tabEls,
        contentEls,
        selectedTabIndex = -1,
        selectedTabClass = "o-tabs__tab--selected",
        selectedContentClass = "o-tabs--selected",
        unselectedContentClass = "o-tabs--hidden";

    function getTabTargetId(tabEl) {
        var aEls = tabEl.getElementsByTagName('a');
        return (aEls && aEls[0]) ? aEls[0].getAttribute('href').replace('#','') : '';
    }

    function getTabContentEls(tabEls) {
        var els = [], targetEl, c, l;
        for (c = 0, l = tabEls.length; c < l; c++) {
            targetEl = document.getElementById(getTabTargetId(tabEls[c]));
            if (targetEl) {
                els[c] = targetEl;
            }
        }
        return els;
    }

    function getTabIndexFromElement(el) {
        return dom.getElementIndex(el);
    }

    function getSelectedTabElement() {
        var selectedTabEl = el.querySelector('.o-tabs__tab--selected');
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
                    dom.addClass(tabEls[c], selectedTabClass);
                    dom.addClass(contentEls[c], selectedContentClass);
                    dom.removeClass(contentEls[c], unselectedContentClass);
                } else {
                    dom.removeClass(tabEls[c], selectedTabClass);
                    dom.removeClass(contentEls[c], selectedContentClass);
                    dom.addClass(contentEls[c], unselectedContentClass);
                }
            }
            events.trigger(el, 'oTabsTabSelected', {
                tabs: tabsObj,
                selected: i,
                lastSelected: selectedTabIndex
            });
            selectedTabIndex = i;
        }
    }

    function clickHandler(ev) {
        ev.preventDefault();
        var tabEl = dom.getClosest(ev.target, '[data-o-tabs-tab]');
        if (tabEl) {
            var i = getTabIndexFromElement(tabEl);
            selectTab(i);
        }
    }

    function destroy() {
        events.unlisten(el, "click", clickHandler);
        dom.removeClass(el, "o-tabs--js");
    }

    tabEls = el.querySelectorAll('[data-o-tabs-tab]');
    contentEls = getTabContentEls(tabEls);
    dom.addClass(el, "o-tabs--js");
    events.listen(el, "click", clickHandler);

    this.selectTab = selectTab;
    this.destroy = destroy;

    events.trigger(el, 'oTabsReady', {
        tabs: tabsObj
    });
    selectTab(getSelectedTabElement());
}

Tabs.prototype.createAllIn = function(el) {
    "use strict";
    var tabs = [], tEls, c, l;
    el = el || document.body;
    if (el.querySelectorAll) {
        tEls = el.querySelectorAll('[data-o-component=o-tabs');
        for (c = 0, l = tEls.length; c < l; c++) {
            if (!dom.matchesSelector(tEls[c], '[data-o-tabs-autoconstruct=false]')) {
                tabs.push(new Tabs(tEls[c]));
            }
        }
    }
    return tabs;
};

Tabs.prototype.createAllIn();

module.exports = Tabs;