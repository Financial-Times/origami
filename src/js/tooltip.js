class Tooltip {

	constructor (TooltipEl, opts) {
		this.opts = opts || this.getOptions(TooltipEl);

		this.delegates = {
			//doc: new Delegate(),
			//wrap: new Delegate(),
			//context: new Delegate()
		}
	};

	// Check the options passed in
	checkOptions(opts) {

		if(!opts.target) {
			Tooltip.throwError("tooltip.target is not set. An target for the tooltip to point at must be provided");
		}

		// Check that the value of arrow position is valid. Default to up.
		if (!opts.arrowPosition) {
			if (!validArrowPositions.contains(opts.arrowPosition)) {
				Tooltip.throwError("Invalid value for arrow position. Valid values are:" + validArrowPositions.toString() +" or nothing which will default to a value of `top`");
			}
		} else {
			opts.arrowPosition = "top";
		}

		return opts;
	};

	getOptions(tooltipEl) {
		let opts = {};
		opts.arrowPosition = tooltipEl.getAttribute('o-tooltip-arrow-position');
		opts.target = tooltipEl.getAttribute('o-tooltip-target');
		return opts;
	};

	// Build the tooltip
	render() {
		const wrapperEl = document.createElement('div');
		wrapperEl.className = 'o-tooltip';
		wrapperEl.setAttribute('role', 'tooltip');

		if (this.opts.zindex) {
			wrapperEl.style.zIndex = this.opts.zindex;
		}
		this.wrapper = wrapperEl;

		// Build and append the close button
		const button = document.createElement('a');
		button.className = 'o-tooltip__close';
		button.setAttribute('role', 'button');
		//button.setAttribute('tabindex', '0');
		button.setAttribute('href', '#void');
		button.setAttribute('aria-label', 'Close');
		button.setAttribute('title', 'Close');
		wrapperEl.appendChild(button);

		// Build and append content
		const content = document.createElement('section');
		content.className = 'o-tooltip__content';
		wrapperEl.appendChild(content);

		// Build arrow
		if(this.opts.arrow.position) {
			if (this.opts.arrow.position == "top") {
				wrapperEl.classList.add('o-tooltip--arrow-top');
			} else if (this.opts.arrow.position == "left") {
				wrapperEl.classList.add('o-tooltip--arrow-left');
			} else if (this.opts.arrow.position == "bottom") {
				wrapperEl.classList.add('o-tooltip--arrow-bottom');
			} else if (this.opts.arrow.position == "right") {
				wrapperEl.classList.add('o-tooltip--arrow-right');
			} else {
				throw new Error('"o-tooltip error": Invalid value for arrow position. Valid values are: top, bottom, left, right');
			}
		} else {
			// default to a top arrow
			wrapperEl.classList.add('o-tooltip--arrow-top');
		}
	};

	show() {
	};

	destroy() {
	};


	static throwError(message) {
		throw new Error('"o-tooltip error":'+ message);
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
