import Delegate from 'ftdomdelegate';
import Viewport from 'o-viewport';

import Target from './target';

class Tooltip {

	constructor (tooltipEl, opts) {

		if (!Tooltip._tooltips) {
			Tooltip._tooltips = new Map();
		}

		this.tooltipEl = tooltipEl;
		Tooltip._tooltips.set(this.tooltipEl, this);

		this.opts = opts || this.getOptions(tooltipEl);
		this.opts = this.checkOptions(this.opts);

		this.target = new Tooltip.Target(document.getElementById(this.opts.target));
		this.tooltipPosition = this.opts.position;
		this.tooltipAlignment = "middle";

		this.delegates = {
			doc: new Delegate(),
			tooltip: new Delegate(),
		};

		Viewport.listenTo('resize');


		// Do you render as soon as possible?
		if (this.opts.renderOnConstruction) {
			this.render();
			this.show();
		}
	};

	getOptions(tooltipEl) {
		let opts = {};
		if (tooltipEl.hasAttribute('data-o-tooltip-position')) {
			opts.position = tooltipEl.getAttribute('data-o-tooltip-position');
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

		// Check that the value of tooltip position is valid. Default to below.
		if (opts.tooltipPosition) {
			if (Tooltip.validTooltipPositions.indexOf(opts.tooltipPosition) === -1) {
				Tooltip.throwError("Invalid value for tooltip position. Valid values are:" + Tooltip.validTooltipPositions.toString() +" or nothing which will default to a value of `below`");
			}
		} else {
			opts.tooltipPosition = "below";
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
		this.drawTooltip();
	};

	destroy() {
	};

	close(e) {
		e.preventDefault();
	};

	closeOnExternalClick() {
	};

	closeOnKeyUp() {
	};

	resizeListener() {
		console.log(this.target.rectObject)
		console.log(this.target.targetEl.getBoundingClientRect())

		if (this.target.rectObject != this.target.targetEl.getBoundingClientRect()) {
			console.log("bang")
			this.target.rectObject =this.target.targetEl.getBoundingClientRect();
			this.drawTooltip();

		}
	};

	drawTooltip(){

		// render the tooltip so we know how big it is
		this.tooltipEl.style.display = 'block';

		// First pass at positioning the tooltip...
		let tooltipRect = this.calculateTooltipRect();

		// Check there's enough room above / below / to the left / right to draw the tooltip
		if (this.tooltipPosition === 'above' || this.tooltipPosition === 'below') {
			if ((Tooltip._isOutOfBounds(tooltipRect.top, "y") || Tooltip._isOutOfBounds(tooltipRect.bottom, "y"))) {
				this.tooltipPosition = Tooltip._flipOrientation(this.tooltipPosition);
				tooltipRect = this.calculateTooltipRect();
			}
		}

		if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
			if ((Tooltip._isOutOfBounds(tooltipRect.left, "x") || Tooltip._isOutOfBounds(tooltipRect.right, "x"))) {
				this.tooltipPosition = Tooltip._flipOrientation(this.tooltipPosition);
				tooltipRect = this.calculateTooltipRect();
			}
		}

		if (this.tooltipPosition === 'above' || this.tooltipPosition === 'below') {
			if (Tooltip._isOutOfBounds(tooltipRect.left, 'x')) {
				tooltipRect.left = this._getEdgeLimitFor('left');
				this.tooltipAlignment = 'left';
			}
			if (Tooltip._isOutOfBounds(tooltipRect.right, 'x')) {
				tooltipRect.left = this._getEdgeLimitFor('right');
				this.tooltipAlignment = 'right';
			}
		}

		// Now align the tooltip to the left | right | top | bottom if there's not enough room for it to be centre aligned
		if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
			if (Tooltip._isOutOfBounds(tooltipRect.top, 'y')) {
				tooltipRect.top = this._getEdgeLimitFor('top');
				this.tooltipAlignment = 'top';
			}
			if (Tooltip._isOutOfBounds(tooltipRect.bottom, 'y')) {
				tooltipRect.top = this._getEdgeLimitFor('bottom');
				this.tooltipAlignment = 'bottom';
			}
		}

		this._drawTooltip(tooltipRect);
		this._setArrow();
	};

	calculateTooltipRect() {
		const arrowDepth = 10;
		const rect = {};
		const width = this.tooltipEl.offsetWidth;
		const height = this.tooltipEl.offsetHeight;

		switch (this.tooltipPosition) {
			case 'above':
				rect.top = this.target.top - (height + arrowDepth);
				rect.left = this._getEdgeLimitFor('middle', 'x');
				break;

			case 'below':
				rect.top = this.target.bottom + arrowDepth;
				rect.left = this._getEdgeLimitFor('middle', 'x');
				break;


			case 'right':
				rect.left = this.target.right + arrowDepth;
				rect.top = this._getEdgeLimitFor('middle', 'y');
				break;

			case 'left':
				rect.left = this.target.left - (width + arrowDepth);
				rect.top = this._getEdgeLimitFor('middle', 'y');
				break;
		}
		rect.right = rect.left + width;
		rect.bottom = rect.top + height;

		return rect;
	}

	_getEdgeLimitFor(alignment, axis) {
		let value;
		if (alignment === "middle") {
			if (axis === 'x') {
				value = this.target.centrePoint.x - this.tooltipEl.offsetWidth/2;
			} else if (axis === 'y') {
				value = this.target.centrePoint.y - this.tooltipEl.offsetHeight/2;
			}
		} else {
			value = this.target.getEdge(alignment);
		}
		return value;
	}

	_setArrow() {
		const arrowClassRoot = 'o-tooltip--arrow-';
		const alignmentClassRoot = 'o-tooltip-arrow--align-';
		const arrowDirection = {"above": "down",
														"below": "up",
														"left": "right",
														"right": "left" };

		for (const modifier of Object.values(arrowDirection)) {
			this.tooltipEl.classList.remove(arrowClassRoot + modifier);
		};

		Tooltip.validTooltipPositions.forEach((position)=> {
			this.tooltipEl.classList.remove(alignmentClassRoot + position);
		});

		this.tooltipEl.classList.add(arrowClassRoot + arrowDirection[this.tooltipPosition]);
		this.tooltipEl.classList.add(alignmentClassRoot + this.tooltipAlignment);
	};

	_drawTooltip(rect) {
		this.tooltipEl.style.top = rect.top + 'px';
		this.tooltipEl.style.left = rect.left + 'px';
	};


	static _isOutOfBounds(point, axis) {
		if (point < 0) {
			return true;
		}
		if (axis === 'y' && point > document.body.offsetHeight) {
			return true;
		} else if (axis === 'x' && point > document.body.offsetWidth) {
			return true;
		}
		return false;
	}

	static _flipOrientation(orientation) {
		const flip = {
			"above": "below",
			"below": "above",
			"left": "right",
			"right": "left"
		};

		return flip[orientation];
	}

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

Tooltip.validTooltipPositions = ["above", "below", "left", "right"];
Tooltip.Target = Target;

export default Tooltip;
