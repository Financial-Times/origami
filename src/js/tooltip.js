import Delegate from 'ftdomdelegate';
import Viewport from 'o-viewport';

import Target from './target';

class Tooltip {

	/**
	 * Represents a tooltip.
	 * @constructor
	 * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
	 * @param {Object} opts - An options object for configuring the tooltip (Optional)
	*/
	constructor (tooltipEl, opts) {

		if (!Tooltip._tooltips) {
			Tooltip._tooltips = new Map();
		}

		this.tooltipEl = tooltipEl;
		Tooltip._tooltips.set(this.tooltipEl, this);

		this.opts = opts || Tooltip.getOptions(tooltipEl);
		this.opts = Tooltip.checkOptions(this.opts);

		this.target = new Tooltip.Target(document.getElementById(this.opts.target));
		this.tooltipPosition = this.opts.position;
		this.tooltipAlignment = null;
		this.visible = false;

		this.delegates = {
			doc: new Delegate(),
			tooltip: new Delegate(),
		};

		Viewport.listenTo('resize');

		this.render();

		// Do you render as soon as possible?
		if (this.opts.showOnConstruction) {
			this.show();
		}
	};

	/**
	 * Get the data attributes from the tooltipEl. If the tooltip is being set up
	 * declaratively, this method is used to extract the data attributes from
	 * the DOM.
	 * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
	 * @todo - refactor this out to smartly iterate over data attributes
	*/
	static getOptions(tooltipEl) {
		let opts = {};
		if (tooltipEl.hasAttribute('data-o-tooltip-position')) {
			opts.position = tooltipEl.getAttribute('data-o-tooltip-position');
		}
		if (tooltipEl.hasAttribute('data-o-tooltip-target')) {
			opts.target = tooltipEl.getAttribute('data-o-tooltip-target');
		}

		if (tooltipEl.hasAttribute('data-o-tooltip-show-on-construction')){
			opts.showOnConstruction = (tooltipEl.getAttribute('data-o-tooltip-show-on-construction') === 'true');
		}

		if (tooltipEl.hasAttribute('data-o-tooltip-z-index')){
			opts.zIndex = tooltipEl.getAttribute('data-o-tooltip-z-index');
		}
		return opts;
	};

	/**
	 * Check the options passed in are valid, and that the required option
	 * (target) is present
	 * @param {Object} opts - An Object with configuration options for the tooltip
	 * @throws o-tooltip error: opts.target is not set
	 * @throws o-tooltip error: opts.tooltipPosition is not one of "above", "below"
	 * "left" or "right"
	*/
	static checkOptions(opts) {

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

	/**
	 * Render the tooltip. Adds markup and attributes to this.tooltipEl in the DOM
	*/
	render() {

		this.tooltipEl.setAttribute('role', 'tooltip');
		this.tooltipEl.classList.add('o-tooltip');

		if (this.opts.zIndex) {
			this.tooltipEl.style.zIndex = this.opts.zIndex;
		}

		// Build and append the close button
		const button = document.createElement('a');
		button.className = 'o-tooltip-close';
		button.setAttribute('role', 'button');
		button.setAttribute('href', '#void');
		button.setAttribute('aria-label', 'Close');
		button.setAttribute('title', 'Close');
		this.tooltipEl.appendChild(button);

	};

	/**
	 * Show the tooltip. Adds event handlers for clicks, touches, keypresses and
	 * viewport resizes. Uses FTDomDelegate to implement the event delegate
	 * pattern. Calls DrawTooltip.
	*/
	show() {
		// Delegate pattern
		this.delegates.doc.root(document.body);
		this.delegates.tooltip.root(this.tooltipEl);

		// Set up all the ways to close the tooltip
		this.closeHandler = this.close.bind(this);
		this.delegates.tooltip.on('click', '.o-tooltip-close', this.closeHandler);
		this.delegates.tooltip.on('touchend', '.o-tooltip-close', this.closeHandler);

		this.closeOnKeyUpHandler = this.closeOnKeyUp.bind(this);
		this.delegates.doc.on('keyup', this.closeOnKeyUpHandler);

		// Resize means we might need to move our tooltip so it is still on screen
		this.resizeListenerHandler = this.resizeListener.bind(this);
		this.delegates.doc.on('oViewport.resize', 'body', this.resizeListenerHandler);

		this.drawTooltip();
		this.visible = true;
	};

	/**
	 * Destroy the tooltip.
	*/
	destroy() {
		if (this.visible === true) {
			this.close();
		}

		Tooltip._tooltips.delete(this.tooltipEl);
		if (Tooltip._tooltips.size === 0) {
			Viewport.stopListeningTo('resize');
			delete Tooltip._tooltips;
		}
	};

	/**
	 * Close the tooltip. (Visually hide it and remove event listeners)
	*/
	close() {
		this.delegates.doc.destroy();
		this.delegates.tooltip.destroy();

		this.visible = false;
		this.tooltipEl.style.display = 'none';
		return false;
	};

	/**
	 * @param {Event} ev - calls close on the tooltip if the key is Esc
	*/
	closeOnKeyUp(ev) {

		/* keyCode 27 is the escape key */
		if (ev.keyCode === 27) {
			this.close();
		}
	};

	/**
	 * Respond to resize events. Re-position the tooltip if its target has moved.
	 * @todo: There are a few optimisations to make here, getRect is being called
	 * by the target more than once. We're checking edge positions we don't care
	 * about, and moving based on them
	*/
	resizeListener() {
		if (this.target.hasMoved()) {
			window.requestAnimationFrame(() => {
				this.target.refreshRect();
				this.drawTooltip();
			});
		}
	};

	/**
	 * Calculates the best place to position the tooltip based on space around the
	 * target and a preference set by the user.
	*/
	drawTooltip(){

		// render the tooltip so we know how big it is
		this.tooltipEl.style.display = 'block';

		// (re) set the arrow alignment to middle
		this.tooltipAlignment = 'middle';

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

		/* Now align the tooltip to the left | right | top | bottom  of the target
			if there's not enough room for it to aligned to the middle of the target
			NB once tooltipRect.top is set, tooltipRect.bottom is no longer correct and should be
			recalculated before use */
		if (this.tooltipPosition === 'above' || this.tooltipPosition === 'below') {
			if (Tooltip._isOutOfBounds(tooltipRect.left, 'x')) {
				tooltipRect.left = this._getLeftFor('left');
				this.tooltipAlignment = 'left';
			}
			if (Tooltip._isOutOfBounds(tooltipRect.right, 'x')) {
				tooltipRect.left = this._getLeftFor('right');
				this.tooltipAlignment = 'right';
			}
		}

		if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
			if (Tooltip._isOutOfBounds(tooltipRect.top, 'y')) {
				tooltipRect.top = this._getTopFor('top');
				this.tooltipAlignment = 'top';
			}
			if (Tooltip._isOutOfBounds(tooltipRect.bottom, 'y')) {
				tooltipRect.top = this._getTopFor('bottom');
				this.tooltipAlignment = 'bottom';
			}
		}

		this._drawTooltip(tooltipRect);
		this._setArrow();
	};

	/**
	 * @returns: the offset width of the tooltip element
	*/
	width() {
		return this.tooltipEl.offsetWidth;
	}

	/**
	 * @returns {Integer}: the offset height of the tooltip element
	*/
	height() {
		return this.tooltipEl.offsetHeight;
	}

	/**
	 * @returns {Object} An object with values `left`, `right`, `top` and `bottom`
	 * representing the bounding box of the tooltip (including the arrow)
	*/
	calculateTooltipRect() {
		const rect = {};
		const width = this.width();
		const height = this.height();

		switch (this.tooltipPosition) {
			case 'above':
				rect.top = this.target.top - (height + Tooltip.arrowDepth);
				rect.left = this._getLeftFor('middle');
				break;

			case 'below':
				rect.top = this.target.bottom + Tooltip.arrowDepth;
				rect.left = this._getLeftFor('middle');
				break;

			case 'right':
				rect.left = this.target.right + Tooltip.arrowDepth;
				rect.top = this._getTopFor('middle');
				break;

			case 'left':
				rect.left = this.target.left - (width + Tooltip.arrowDepth);
				rect.top = this._getTopFor('middle');
				break;
		};

		rect.right = rect.left + width;
		rect.bottom = rect.top + height;

		return rect;
	}

	_getLeftFor(alignment) {
		if (alignment === "middle") {
			return this.target.centrePoint.x - this.width()/2;
		} else if (alignment === "left") {
			return this.target.left;
		} else if (alignment === "right") {
			return this.target.right - this.width();
		}
	};

	_getTopFor(alignment) {
		if (alignment === "middle") {
			return this.target.centrePoint.y - this.height()/2;
		} else if (alignment === "top") {
			return this.target.top;
		} else if (alignment === "bottom") {
			return this.target.bottom - this.height();
		}
	}

	_setArrow() {
		const arrowClassRoot = 'o-tooltip--arrow-';
		const alignmentClassRoot = 'o-tooltip-arrow--align-';

		let classesToRemove = ["o-tooltip--arrow-left",
		"o-tooltip--arrow-right",
		"o-tooltip--arrow-above",
		"o-tooltip--arrow-below",
		"o-tooltip-arrow--align-top",
		"o-tooltip-arrow--align-bottom",
		"o-tooltip-arrow--align-left",
		"o-tooltip-arrow--align-right"];

		this.tooltipEl.classList.remove(...classesToRemove);
		this.tooltipEl.classList.add(arrowClassRoot + Tooltip.positionToArrowPositionMap[this.tooltipPosition]);
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
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-tooltip"]'), rootEl => new Tooltip(rootEl, opts));
	};
}

Tooltip.arrowDepth = 10;
Tooltip.positionToArrowPositionMap = {"above": "below",
																			"below": "above",
																			"left": "right",
																			"right": "left"};

Tooltip.validArrowAlignments = ["top", "bottom", "left", "right"];
Tooltip.validTooltipPositions = ["above", "below", "left", "right"];

Tooltip.Target = Target;

export default Tooltip;
