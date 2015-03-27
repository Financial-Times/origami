/*global module, require*/
'use strict';
var oDom = require('o-dom');

function Tabs(rootEl) {

	var tabsObj = this;
	var tabEls;
	var tabpanelEls;
	var selectedTabIndex = -1;
	var myself = this;

	function getTabTargetId(tabEl) {
		var aEls = tabEl.getElementsByTagName('a');
		return (aEls && aEls[0]) ? aEls[0].getAttribute('href').replace('#','') : '';
	}

	function getTabPanelEls(tabEls) {
		var els = [], targetEl, c, l;
		for (c = 0, l = tabEls.length; c < l; c++) {
			var tabTargetId = getTabTargetId(tabEls[c]);
			targetEl = document.getElementById(tabTargetId);

			if (targetEl) {
				tabEls[c].setAttribute('aria-controls', tabTargetId);
				tabEls[c].setAttribute('tabindex', '0');

				var label = tabEls[c].getElementsByTagName('a')[0];
				var labelId = tabTargetId + '-label';
				label.setAttribute('tabindex', '-1');
				label.id = labelId;
				targetEl.setAttribute('aria-labelledby', labelId);
				targetEl.setAttribute('role', 'tabpanel');
				targetEl.setAttribute('tabindex', '0');
				els[c] = targetEl;
			}
		}
		return els;
	}

	function getTabIndexFromElement(el) {
		return oDom.getIndex(el);
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
		var x = window.scrollX, y = window.scrollY;
		panelEl.setAttribute('aria-expanded', 'true');
		panelEl.setAttribute('aria-hidden', 'false');
		panelEl.style.outline = 0; // Remove the focus ring for sighted users
		panelEl.focus(); // Give focus to the panel for screen readers
		window.scrollTo(x, y);

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
		if (isValidTab(i) && i !== selectedTabIndex) {
			for (c = 0, l = tabEls.length; c < l; c++) {
				if (i === c) {
					tabEls[c].setAttribute('aria-selected', 'true');
					showPanel(tabpanelEls[c]);
				} else {
					tabEls[c].setAttribute('aria-selected', 'false');
					hidePanel(tabpanelEls[c]);
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
		var tabEl = oDom.getClosestMatch(ev.target, '[role=tab]');
		if (tabEl) {
			var i = getTabIndexFromElement(tabEl);
			myself.selectTab(i);
		}
	}

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		tabEls = rootEl.querySelectorAll('[role=tab]');
		tabpanelEls = getTabPanelEls(tabEls);
		rootEl.setAttribute('data-o-tabs--js', '');
		rootEl.addEventListener("click", clickHandler, false);
		dispatchCustomEvent('oTabs.ready', {
			tabs: tabsObj
		});
		myself.selectTab(getSelectedTabElement());
	}

	function destroy() {
		rootEl.removeEventListener("click", clickHandler, false);
		rootEl.removeAttribute('data-o-tabs--js');
		for (var c = 0, l = tabpanelEls.length; c < l; c++) {
			showPanel(tabpanelEls[c]);
		}
	}

	this.selectTab = selectTab;
	this.destroy = destroy;

	init();
}

Tabs.init = function(el) {
	var tabs = [], tEls, c, l;
	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (el.querySelectorAll) {
		tEls = el.querySelectorAll('[data-o-component=o-tabs]');
		for (c = 0, l = tEls.length; c < l; c++) {
			if (!tEls[c].matches('[data-o-tabs-autoconstruct=false]') || !tEls[c].hasAttribute('data-o-tabs--js')) {
				tabs.push(new Tabs(tEls[c]));
			}
		}
	}
	return tabs;
};

module.exports = Tabs;
