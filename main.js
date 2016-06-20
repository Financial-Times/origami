class Toggle {

	constructor(toggleEl, config) {
		if (!toggleEl) {
			return;
		} else if (!(toggleEl instanceof HTMLElement)) {
			toggleEl = document.querySelector(toggleEl);
		}

		if (!config) {
			config = {};
			// Try to get config set declaratively on the element
			Array.prototype.forEach.call(toggleEl.attributes, (attr) => {
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

		this.callback = config.callback;
		if (typeof this.callback === 'string') {
			this.callback = new Function(this.callback);
		}

		this.targetEl = config.target;
		if (!(this.targetEl instanceof HTMLElement)) {
			this.targetEl = document.querySelector(this.targetEl);
		}

		this.toggleEl = toggleEl;

		if (typeof Toggle._toggles[this.targetEl] === 'undefined') {
			Toggle._toggles[this.targetEl] = [this];
		} else {
			Toggle._toggles[this.targetEl].push(this);
		}

		if (this.toggleEl.nodeName === 'A') {
			this.toggleEl.setAttribute('role', 'button');
		}

		this.toggleEl.setAttribute('aria-expanded', 'false');
		this.toggle = this.toggle.bind(this);
		this.toggleEl.addEventListener('click', this.toggle);

		this.targetEl.setAttribute('aria-hidden', 'true');
		this.toggleEl.setAttribute('data-o-toggle--js', 'true');
	}

	toggle(e) {
		// Toggle returns true if class is not present and needs to be added
		const state = this.targetEl.classList.toggle('o-toggle--active');

		Toggle._toggles[this.targetEl].forEach((toggle) => {
			toggle.toggleEl.setAttribute('aria-expanded', state);
		});

		this.targetEl.setAttribute('aria-hidden', !state);

		e && e.preventDefault();
		this.callback && this.callback(state ? 'open' : 'close', e);
	}

	destroy() {
		this.toggleEl.removeEventListener('click', this.toggle);
		this.toggleEl.removeAttribute('aria-expanded');
		this.toggleEl.removeAttribute('role');
		this.toggleEl.removeAttribute('data-o-toggle--js');
		this.targetEl.removeAttribute('aria-hidden');

		const targetArray = Toggle._toggles[this.targetEl];
		const togglePosition = targetArray.indexOf(this);
		// Generates a new array removing the current toggle from the list
		Toggle._toggles[this.targetEl] = targetArray.slice(0, togglePosition)
													.join(targetArray.slice(togglePosition + 1));

		this.targetEl = undefined;
		this.toggleEl = undefined;
		this.callback = undefined;
	}

	static init(el, config) {
		if (!el) {
			el = document.body;
		} else if (!(el instanceof HTMLElement)) {
			el = document.querySelector(el);
		}
		const toggleEls = el.querySelectorAll('[data-o-component="o-toggle"]');
		const toggles = [];
		for (let toggleEl of toggleEls) {
			if (!toggleEl.hasAttribute('data-o-toggle--js')) {
				toggles.push(new Toggle(toggleEl, config));
			}
		}
		return toggles;
	}
};

Toggle._toggles = {};

const constructAll = () => {
	Toggle.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Toggle;
