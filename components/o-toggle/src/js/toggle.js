class Toggle {
	constructor(toggleEl, config) {
		if (!toggleEl) {
			return;
		} else if (!(toggleEl instanceof HTMLElement)) {
			toggleEl = document.querySelector(toggleEl);
		}

		if (toggleEl.hasAttribute('aria-expanded')) {
			return;
		}

		if (!config) {
			config = {};
			// Try to get config set declaratively on the element
			Array.prototype.forEach.call(toggleEl.attributes, attr => {
				if (attr.name.indexOf('data-o-toggle') === 0) {
					// Remove the prefix part of the data attribute name
					const key = attr.name.replace('data-o-toggle-', '');
					try {
						// If it's a JSON, a boolean or a number, we want it stored like that, and not as a string
						// We also replace all ' with " so JSON strings are parsed correctly
						config[key] = JSON.parse(attr.value.replace(/\'/g, '"'));
					} catch (e) {
						config[key] = attr.value;
					}
				}
			});
		}

		// Set the toggle element.
		this.toggleEl = toggleEl;

		this.toggle = this.toggle.bind(this);
		this.toggleEl.addEventListener('click', this.toggle);

		this.toggleEl.setAttribute('aria-expanded', 'false');
		this.toggleEl.setAttribute('aria-controls', config.targetId);
	}

	open() {
		this.toggleEl.setAttribute('aria-expanded', 'true');
	}

	close() {
		this.toggleEl.setAttribute('aria-expanded', 'false');
	}

	// toggle is bound to the Toggle instance in the constructor
	toggle() {
		if (this.toggleEl.getAttribute('aria-expanded') === 'false') {
			this.open();
		} else {
			this.close();
		}
	}

	destroy() {
		this.toggleEl.removeEventListener('click', this.toggle);
		this.toggleEl.removeAttribute('aria-expanded');
		this.toggleEl.removeAttribute('aria-controls');
		this.toggleEl = undefined;
	}

	static init(el, config) {
		if (!el) {
			el = document.body;
		} else if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}
		const toggleEls = el.querySelectorAll('[data-o-component="o-toggle"]');
		const toggles = [];
		for (const toggleEl of toggleEls) {
			if (!toggleEl.hasAttribute('data-o-toggle--js')) {
				toggles.push(new Toggle(toggleEl, config));
			}
		}
		return toggles;
	}
}

export default Toggle;
