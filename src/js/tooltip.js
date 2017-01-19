import Delegate from 'ftdomdelegate';
import viewport from 'o-viewport';


class Tooltip {

	constructor (tooltipEl, opts) {
		this.tooltipEl = tooltipEl;

		this.opts = opts || this.getOptions(tooltipEl);
		this.opts = this.checkOptions(this.opts);

		this.targetEl = document.getElementById(this.opts.target);

		this.delegates = {
			doc: new Delegate(),
			tooltip: new Delegate(),
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
		// event handlers
		this.delegates.doc.root(document.body);
		this.delegates.tooltip.root(this.tooltipEl);

		/* Set up all the ways to close the tooltip */
		this.closeHandler = this.close.bind(this);
		this.delegates.tooltip.on('click', '.o-tooltip-close', this.closeHandler);
		this.delegates.tooltip.on('touchend', '.o-tooltip-close', this.closeHandler);

		this.resizeListenerHandler = this.resizeListener.bind(this);
		this.delegates.doc.on('oViewport.resize', 'body', this.resizeListenerHandler);


		this.closeOnExternalClickHandler = this.closeOnExternalClick.bind(this);
		this.delegates.doc.on('click', 'body', this.closeOnExternalClickHandler);
		this.delegates.doc.on('touchend', 'body', this.closeOnExternalClickHandler);

		this.closeOnKeyUpHandler = this.closeOnKeyUp.bind(this);
		this.delegates.doc.on('keyup', this.closeOnKeyUpHandler);


		// Calculate and position the overlay + arrow
		this.setContainerPosition();
		//setArrowPosition(x);
	};

	destroy() {
	};

	close(e) {
		console.log('close');
		e.preventDefault();
	};

	closeOnExternalClick() {
	};

	closeOnKeyUp() {
	};

	resizeListener() {
	};

	setContainerPosition(){
		let arrowDepth = 10;

		let targetHeight = this.targetEl.offsetHeight;
		let targetOffsetTop = this.targetEl.offsetTop
		let targetWidth = this.targetEl.offsetWidth;
		let targetOffsetLeft = this.targetEl.offsetLeft;
		let targetMiddleX = (targetWidth/2 + targetOffsetLeft);

		this.tooltipEl.style.display = 'block';

		// First pass. Position the tooltip to the [top, bottom, left, right] and then centre align on other axis
		switch (this.opts.arrowPosition) {
			case 'top':

				this.tooltipEl.style.top =  arrowDepth + targetHeight + targetOffsetTop + 'px';
				this.tooltipEl.style.left = targetMiddleX - this.tooltipEl.offsetWidth/2 + 'px';
				break;

			case 'bottom':
				this.tooltipEl.style.top =  targetOffsetTop - (this.tooltipEl.offsetHeight + arrowDepth) + 'px';
				this.tooltipEl.style.left = targetMiddleX - (this.tooltipEl.offsetWidth/2) + 'px';
				break;

			case 'left':
				this.tooltipEl.style.top =  targetOffsetTop + this.tooltipEl.offsetHeight/2 + 'px';
				this.tooltipEl.style.left = targetWidth + targetOffsetLeft + arrowDepth + 'px';
				break;

			case 'right':
				this.tooltipEl.style.top =  targetOffsetTop + this.tooltipEl.offsetHeight/2 + 'px';
				this.tooltipEl.style.left = targetOffsetLeft - (this.tooltipEl.offsetWidth + arrowDepth) + 'px';
				break;
		}
		console.log(this.tooltipEl.style.top);
		console.log(this.tooltipEl.style.left);
		console.log(this.tooltipEl.style.bottom);
		console.log(this.tooltipEl.style.right);

		if (this.tooltipEl.style.top < 0) {
			this.tooltipEl.style.top = "0px";
		}

		// this might have made our tooltip be offscreen!
		// if this is the case, try and redraw with a different arrow position


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
