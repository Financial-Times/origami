class oTooltip {

	constructor (TooltipTargetEl, opts) {
		this.TooltipTargetEl = TooltipTargetEl;
		this.opts = opts || { values: "default" };

		this.delegates = {
			//doc: new Delegate(),
			//wrap: new Delegate(),
			//context: new Delegate()
		}
	}

	// Build the tooltip
	render() {

	};

	show() {
	}

	destroy() {
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		// If the rootEl isnt an HTMLElement, treat it as a selector
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		// If the rootEl is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootEl has the data-o-component=o-tooltip then initialise just 1 tooltip (this one)
		if (rootEl instanceof HTMLElement && /\bo-tooltip\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new oTooltip(rootEl, opts);
		}

		// If the rootEl wasn't itself a tooltip, then find ALL of the child things that have the data-o-component=oTooltip set
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-tooltip"]'), rootEl => new oTooltip(rootEl, opts));
	}
}

export default oTooltip;
