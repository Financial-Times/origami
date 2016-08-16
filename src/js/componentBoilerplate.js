class ComponentBoilerplate {

	constructor (ComponentBoilerplateEl) {
		this.ComponentBoilerplateEl = ComponentBoilerplateEl;
	}

	static init (rootEl) {
		if (!rootEl) {
			rootEl = document.body;
		} else if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const ComponentBoilerplateEl = rootEl.querySelector('[data-o-component="o-component-boilerplate"]');
		if (!ComponentBoilerplateEl.hasAttribute('data-o-component-boilerplate--js')) {
			return new ComponentBoilerplate(ComponentBoilerplateEl);
		}
	}
}

export default ComponentBoilerplate;
