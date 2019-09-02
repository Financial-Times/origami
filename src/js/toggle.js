import Target from './target';

class Toggle {

	constructor(toggleEl, config) {
		if (!Toggle._targets) {
			Toggle._targets = new Map();
		}

		if (!toggleEl) {
			return;
		} else if (!(toggleEl instanceof HTMLElement)) {
			toggleEl = document.querySelector(toggleEl);
		}

		if (toggleEl.hasAttribute('data-o-toggle--js')) {
			return;
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

		// Set the toggle callback if its a string.
		if (config.callback && typeof config.callback === 'string') {
			// Error if the callback is a string and a global function of that name does not exist.
			if (typeof window[config.callback] !== 'function') {
				throw new Error(`Could not find o-toggle callback "${config.callback}".`);
			}
			this.callback = window[config.callback];
		}
		// Set the toggle callback if its a funciton.
		if (config.callback && typeof config.callback === 'function') {
			this.callback = config.callback;
		}
		// Error if some callback value has been given but has not been set.
		if (config.callback && !this.callback) {
			throw new Error(`The o-toggle callback must be a string or function.`);
		}

		// Set the toggle element.
		this.toggleEl = toggleEl;

		if (this.toggleEl.nodeName === 'A') {
			this.toggleEl.setAttribute('role', 'button');
		}

		this.toggle = this.toggle.bind(this);
		this.toggleEl.addEventListener('click', this.toggle);

		this.toggleEl.setAttribute('data-o-toggle--js', 'true');

		this.targetEl = config.target;
		if (!(this.targetEl instanceof HTMLElement)) {
			this.targetEl = document.querySelector(this.targetEl);
		}

		if (Toggle._targets.get(this.targetEl) === undefined) {
			this.target = new Toggle.Target(this);
			Toggle._targets.set(this.targetEl, this.target);
		} else {
			this.target = Toggle._targets.get(this.targetEl);
		}

		this.target.addToggle(this);
		this.target.close();
	}

	open() {
		this.toggleEl.setAttribute('aria-expanded', 'true');
	}

	close() {
		this.toggleEl.setAttribute('aria-expanded', 'false');
	}

	// toggle is bound to the Toggle instance in the constructor
	toggle(e) {

		this.target.toggle();

		if(e) {
			e.preventDefault();
		}

		if (this.callback){
			let stateName = (this.target.isOpen() ? 'open' : 'close');
			this.callback(stateName, e);
		}
	}

	destroy() {
		this.toggleEl.removeEventListener('click', this.toggle);
		this.toggleEl.removeAttribute('aria-expanded');
		this.toggleEl.removeAttribute('role');
		this.toggleEl.removeAttribute('data-o-toggle--js');

		this.target.removeToggle(this);

		this.target = undefined;
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
}

Toggle.Target = Target;
export default Toggle;
