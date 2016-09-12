class ComponentBoilerplate {

	constructor (ComponentBoilerplateEl, opts) {
		this.ComponentBoilerplateEl = ComponentBoilerplateEl;
		this.opts = opts || {values: "default"};
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		const ComponentBoilerplateEl = rootEl.querySelector('[data-o-component="o-component-boilerplate"]');
		if (ComponentBoilerplateEl !== null && !ComponentBoilerplateEl.hasAttribute('data-o-component-boilerplate--js')) {
			return new ComponentBoilerplate(ComponentBoilerplateEl);
		}
	}
}

export default ComponentBoilerplate;
