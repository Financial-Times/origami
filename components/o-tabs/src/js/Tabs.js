
class Tabs {

	constructor(rootEl, config) {
		this.rootEl = rootEl;
		this.rootEl.setAttribute('data-o-tabs--js', '');

		this.updateUrl = rootEl.getAttribute('data-o-tabs-update-url') !== null;
		this.selectedTabIndex = -1;


		this.tabEls = this.rootEl.querySelectorAll('[role=tab]');
		this.tabEls = [].slice.call(this.tabEls).filter(this.tabHasValidUrl);
		this.tabpanelEls = this.getTabPanelEls(this.tabEls);

		this.boundClickHandler = this.clickHandler.bind(this);
		this.rootEl.addEventListener('click', this.boundClickHandler, false);
		this.boundKeyPressHandler = this.keyPressHandler.bind(this);
		this.rootEl.addEventListener('keypress', this.boundKeyPressHandler, false);
		this.boundHashChangeHandler = this.hashChangeHandler.bind(this);
		window.addEventListener('hashchange', this.boundHashChangeHandler, false);

		if (!config) {
			config = {};
			Array.prototype.forEach.call(this.rootEl.attributes, function(attr) {
				if (attr.name.includes('data-o-tabs')) {
					// Remove the unnecessary part of the string the first
					// time this is run for each attribute
					const key = attr.name.replace('data-o-tabs-', '');

					try {
						// If it's a JSON, a boolean or a number, we want it stored like that,
						// and not as a string. We also replace all ' with " so JSON strings
						// are parsed correctly
						config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
					} catch (e) {
						config[key] = attr.value;
					}
				}
			});
		}

		this.config = config;
		this.dispatchCustomEvent('ready', {
			tabs: this
		});
		this.selectTab(this.getSelectedTabIndex(), false);
	}

	getTabTargetId(tabEl) { // eslint-disable-line class-methods-use-this
		const linkEls = tabEl.getElementsByTagName('a');
		return linkEls && linkEls[0] ? linkEls[0].getAttribute('href').replace('#','') : '';
	}

	getTabPanelEls(tabEls) {
		const panelEls = [];

		for (const tab of tabEls) {
			const tabTargetId = this.getTabTargetId(tab);
			const targetEl = document.getElementById(tabTargetId);

			if (targetEl) {
				tab.setAttribute('aria-controls', tabTargetId);
				tab.setAttribute('tabindex', '0');

				const label = tab.getElementsByTagName('a')[0];
				const labelId = tabTargetId + '-label';
				label.setAttribute('tabindex', '-1');
				label.id = labelId;
				targetEl.setAttribute('aria-labelledby', labelId);
				targetEl.setAttribute('role', 'tabpanel');
				targetEl.setAttribute('tabindex', '0');
				panelEls.push(targetEl);
			}
		}

		return panelEls;
	}

	getTabElementFromHash() {
		const tabLink = this.rootEl.querySelector(`[href="${location.hash}"]`);
		return tabLink && tabLink.parentNode ? tabLink.parentNode : null;
	}

	getTabIndexFromElement(el) {
		return this.tabEls.indexOf(el);
	}

	getSelectedTabElement() {
		return this.rootEl.querySelector('[aria-selected=true]');
	}

	getSelectedTabIndex() {
		const selectedTabElement = this.updateUrl && location.hash ? this.getTabElementFromHash() : this.getSelectedTabElement();
		return selectedTabElement ? this.getTabIndexFromElement(selectedTabElement) : 0;
	}

	isValidTab(index) {
		return !isNaN(index) && index >= 0 && index < this.tabEls.length;
	}

	hidePanel(panelEl) { // eslint-disable-line class-methods-use-this
		panelEl.setAttribute('aria-expanded', 'false');
		panelEl.setAttribute('aria-hidden', 'true');
	}

	showPanel(panelEl, disableFocus) { // eslint-disable-line class-methods-use-this
		panelEl.setAttribute('aria-expanded', 'true');
		panelEl.setAttribute('aria-hidden', 'false');

		// Remove the focus ring for sighted users
		panelEl.style.outline = 0;

		if (disableFocus) {
			return;
		}

		// Get current scroll position
		const x = window.scrollX || window.pageXOffset;
		const y = window.scrollY || window.pageYOffset;

		// Give focus to the panel for screen readers
		// This might cause the browser to scroll up or down
		panelEl.focus();

		// Scroll back to the original position
		window.scrollTo(x, y);
	}

	dispatchCustomEvent(event, data = {}, namespace = 'oTabs') {
		this.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + event, {
			detail: data,
			bubbles: true
		}));
	}

	selectTab(newIndex, updateUrl = this.updateUrl) {
		if (this.isValidTab(newIndex)) {
			// Update the url to match the selected tab.
			if (this.tabpanelEls[newIndex].id && updateUrl) {
				location.href = '#' + this.tabpanelEls[newIndex].id;
			}
			// Display the selected tab.
			if (newIndex !== this.selectedTabIndex) {
				for (let i = 0; i < this.tabEls.length; i++) {
					if (newIndex === i) {
						this.tabEls[i].setAttribute('aria-selected', 'true');
						this.showPanel(this.tabpanelEls[i], this.config.disablefocus);
					} else {
						this.tabEls[i].setAttribute('aria-selected', 'false');
						this.hidePanel(this.tabpanelEls[i]);
					}
				}

				this.dispatchCustomEvent('tabSelect', {
					tabs: this,
					selected: newIndex,
					lastSelected: this.selectedTabIndex
				});

				this.selectedTabIndex = newIndex;
			}
		}
	}

	clickHandler(ev) {
		const tabEl = ev.target.closest('[role=tab]');

		if (tabEl && this.tabHasValidUrl(tabEl)) {
			ev.preventDefault();
			this.updateCurrentTab(tabEl);
		}
	}

	keyPressHandler(ev) {
		const tabEl = ev.target.closest('[role=tab]');
		// Only update if key pressed is enter key
		if (tabEl && ev.keyCode === 13 && this.tabHasValidUrl(tabEl)) {
			ev.preventDefault();
			this.updateCurrentTab(tabEl);
		}
	}

	hashChangeHandler() {
		if (!this.updateUrl) {
			return;
		}

		const tabEl = this.getTabElementFromHash();

		if (tabEl) {
			this.updateCurrentTab(tabEl);
		}
	}

	updateCurrentTab(tabEl) {
		const index = this.getTabIndexFromElement(tabEl);
		this.selectTab(index);
		this.dispatchCustomEvent('event', {
			category: 'tabs',
			action: 'click',
			tab: tabEl.textContent.trim()
		}, 'oTracking');
	}

	tabHasValidUrl(tabEl) { // eslint-disable-line class-methods-use-this
		const linkEls = tabEl.getElementsByTagName('a');
		if (! linkEls || ! linkEls[0].hash) {
			return false;
		}
		return linkEls[0].pathname === location.pathname;
	}

	destroy() {
		this.rootEl.removeEventListener('click', this.boundClickHandler, false);
		this.rootEl.removeEventListener('keypress', this.boundKeyPressHandler, false);
		window.removeEventListener('hashchange', this.boundHashChangeHandler, false);
		this.rootEl.removeAttribute('data-o-tabs--js');

		for (const tabPanelEl of this.tabpanelEls) {
			this.showPanel(tabPanelEl);
		}

		// unset the bound event handlers
		this.boundClickHandler = undefined;
		this.boundKeyPressHandler = undefined;
		this.boundHashChangeHandler = undefined;
		// Destroy ALL the things!
		this.tabEls = undefined;
		this.tabpanelEls = undefined;
		this.updateUrl = undefined;
		this.selectedTabIndex = undefined;
		this.rootEl = undefined;
		this.config = undefined;
	}

	static init(rootEl, config) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && /\bo-tabs\b/.test(rootEl.getAttribute('data-o-component'))) {
			if (!rootEl.matches('[data-o-tabs-autoconstruct=false]') && !rootEl.hasAttribute('data-o-tabs--js')) {
				return new Tabs(rootEl, config);
			}
		}

		if (rootEl.querySelectorAll) {
			const tabElements = rootEl.querySelectorAll(
				'[data-o-component=o-tabs]:not([data-o-tabs-autoconstruct=false]):not([data-o-tabs--js])'
			);

			return Array.from(tabElements, (tabEl) => {
				return new Tabs(tabEl, config);
			});
		}
	}
}

export default Tabs;
