class Tooltip {

	constructor (tooltipEl, opts) {
		this.opts = opts || this.getOptions(tooltipEl);
		this.tooltipEl = tooltipEl;
		this.opts = this.checkOptions(this.opts);
		this.delegates = {
			//doc: new Delegate(),
			//wrap: new Delegate(),
			//context: new Delegate()
		};
		// Do you render as soon as possible?
		if (this.opts.renderOnConstruction) {
			this.render();
			this.show();
		}

	};

	getOptions(tooltipEl) {
		let opts = {};
		if (tooltipEl.hasAttribute('data-o-tooltip-arrow-position')) {
			opts.arrowPosition = tooltipEl.getAttribute('data-o-tooltip-arrow-position');
		}
		if (tooltipEl.hasAttribute('data-o-tooltip-target')) {
			opts.target = tooltipEl.getAttribute('data-o-tooltip-target');
		}

		if (tooltipEl.hasAttribute('data-o-tooltip-render-on-construction')){
			opts.renderOnConstruction = (tooltipEl.getAttribute('data-o-tooltip-render-on-construction') === 'true');
		}
		return opts;
	};

	// Check the options passed in
	checkOptions(opts) {

		if(!opts.target) {
			Tooltip.throwError("tooltip.target is not set. An target for the tooltip to point at must be provided");
		}

		// Check that the value of arrow position is valid. Default to up.
		if (opts.arrowPosition) {
			const validArrowPositions = ["top", "bottom", "left", "right"];
			if (validArrowPositions.indexOf(opts.arrowPosition) === -1) {
				Tooltip.throwError("Invalid value for arrow position. Valid values are:" + validArrowPositions.toString() +" or nothing which will default to a value of `top`");
			}
		} else {
			opts.arrowPosition = "top";
		}

		return opts;
	};

	// Build the tooltip
	render() {

		this.tooltipEl.setAttribute('role', 'tooltip');
		this.tooltipEl.classList.add('o-tooltip');

		if (this.opts.zindex) {
			this.tooltipEl.style.zIndex = this.opts.zindex;
		}

		// Build and append the close button
		const button = document.createElement('a');
		button.className = 'o-tooltip-close';
		button.setAttribute('role', 'button');
		//button.setAttribute('tabindex', '0');
		button.setAttribute('href', '#void');
		button.setAttribute('aria-label', 'Close');
		button.setAttribute('title', 'Close');
		this.tooltipEl.appendChild(button);

		// Build and append content
		const content = document.createElement('section');
		content.className = 'o-tooltip-content';
		this.tooltipEl.appendChild(content);

		// Build arrow
		if(this.opts.arrowPosition) {
			this.tooltipEl.classList.add('o-tooltip--arrow-'+this.opts.arrowPosition);
		}
	};

	show() {
	};

	destroy() {
	};


	static throwError(message) {
		throw new Error('"o-tooltip error": '+ message);
	};

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
			return new Tooltip(rootEl, opts);
		}

		// If the rootEl wasn't itself a tooltip, then find ALL of the child things that have the data-o-component=oTooltip set
		return [].map.call(rootEl.querySelectorAll('[data-o-component="o-tooltip"]'), rootEl => new Tooltip(rootEl, opts));
	};
}

export default Tooltip;
