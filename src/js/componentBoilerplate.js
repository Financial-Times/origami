class ComponentBoilerplate {

	constructor (ComponentBoilerplateEl, opts) {
		this.ComponentBoilerplateEl = ComponentBoilerplateEl;
		this.opts = opts || {values: "default"};
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-component-boilerplate]')) {
			return new ComponentBoilerplate(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-component-boilerplate"]'), rootEl => new ComponentBoilerplate(rootEl, opts));
	}
}

export default ComponentBoilerplate;
