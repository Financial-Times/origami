/*global module, require*/
const oDom = require('o-dom');

function Tabs(rootEl) {

	const tabsObj = this;
	let tabEls;
	let tabpanelEls;
	let selectedTabIndex = -1;
	const myself = this;

	function getTabTargetId(tabEl) {
		const aEls = tabEl.getElementsByTagName('a');
		return (aEls && aEls[0]) ? aEls[0].getAttribute('href').replace('#','') : '';
	}

	function getTabPanelEls(tabEls) {
		const els = [];
		let targetEl;
		let c;
		let l;
		for (c = 0, l = tabEls.length; c < l; c++) {
			const tabTargetId = getTabTargetId(tabEls[c]);
			targetEl = document.getElementById(tabTargetId);

			if (targetEl) {
				tabEls[c].setAttribute('aria-controls', tabTargetId);
				tabEls[c].setAttribute('tabindex', '0');

				const label = tabEls[c].getElementsByTagName('a')[0];
				const labelId = tabTargetId + '-label';
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
		const selectedTabEl = rootEl.querySelector('[aria-selected=true]');
		return (selectedTabEl) ? getTabIndexFromElement(selectedTabEl) : 0;
	}

	function isValidTab(i) {
		return (!isNaN(i) && i >= 0 && i < tabEls.length);
	}

	function hidePanel(panelEl) {
		panelEl.setAttribute('aria-expanded', 'false');
		panelEl.setAttribute('aria-hidden', 'true');
	}

	function showPanel(panelEl, disableFocus) {
		panelEl.setAttribute('aria-expanded', 'true');
		panelEl.setAttribute('aria-hidden', 'false');

		// Remove the focus ring for sighted users
		panelEl.style.outline = 0;

		if(disableFocus){
			return;
		}
		// Get current scroll position
		const x = window.scrollX;
		const y = window.scrollY;

		// Give focus to the panel for screen readers
		// This might cause the browser to scroll up or down
		panelEl.focus();

		// Scroll back to the original position
		window.scrollTo(x, y);
	}

	function dispatchCustomEvent(name, data) {
		if (document.createEvent && rootEl.dispatchEvent) {
			const event = document.createEvent('Event');
			event.initEvent(name, true, true);
			if (data) {
				event.detail = data;
			}
			rootEl.dispatchEvent(event);
		}
	}

	function selectTab(i, disableFocus) {
		let c;
		let l;
		if (isValidTab(i) && i !== selectedTabIndex) {
			for (c = 0, l = tabEls.length; c < l; c++) {
				if (i === c) {
					tabEls[c].setAttribute('aria-selected', 'true');
					showPanel(tabpanelEls[c], disableFocus);
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
		const tabEl = oDom.getClosestMatch(ev.target, '[role=tab]');
		if (tabEl) {
			const i = getTabIndexFromElement(tabEl);
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
		for (let c = 0, l = tabpanelEls.length; c < l; c++) {
			showPanel(tabpanelEls[c]);
		}
	}

	this.selectTab = selectTab;
	this.destroy = destroy;

	init();
}

Tabs.init = function(el) {
	const tabs = [];
	let tEls;
	let c;
	let l;
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
