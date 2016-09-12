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
		//const ComponentBoilerplateEl = rootEl.querySelector('[data-o-component="o-component-boilerplate"]');
		if (rootEl instanceof HTMLElement && /\bo-component-boilerplate\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new ComponentBoilerplate(rootEl, opts);
		}
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-component-boilerplate"]'), rootEl => new ComponentBoilerplate(rootEl, opts));
	}
}

export default ComponentBoilerplate;
