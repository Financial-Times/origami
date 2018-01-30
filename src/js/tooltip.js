import Delegate from 'ftdomdelegate';
import Viewport from 'o-viewport';
import oGrid from 'o-grid';

import Target from './target';

class Tooltip {

	static _getCurrentLayout() {
		return oGrid.getCurrentLayout();
	}

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

		this.opts = opts || Tooltip.getOptions(tooltipEl);
		this.opts = Tooltip.checkOptions(this.opts);

		if (opts && opts.content) {
			this.tooltipEl = Tooltip.constructElement(tooltipEl, opts);
		} else {
			this.tooltipEl = tooltipEl;
		}

		Tooltip._tooltips.set(this.tooltipEl, this);

		this.targetNode = document.getElementById(this.opts.target);
		this.target = new Tooltip.Target(this.targetNode);
		this.tooltipPosition = this._getTooltipPosition();
		this.tooltipAlignment = null;
		this.visible = false;

		this.delegates = {
			target: new Delegate(this.target.targetEl),
			doc: new Delegate(),
			tooltip: new Delegate(),
		};

		if (this.opts.showOnClick) {
			this.delegates.target.on('click', this.show.bind(this));
		}

		if (this.opts.toggleOnClick) {
			this.delegates.target.on('click', this.toggle.bind(this));
		}

		if (this.opts.showOnHover) {
			this.delegates.target.on('mouseover', this.show.bind(this));
			this.delegates.target.on('mouseout', this.close.bind(this));
		}

		Viewport.listenTo('resize');

		this.render();

		// Do you render as soon as possible?
		if (this.opts.showOnConstruction) {
			this.show();

			if(this.opts.closeAfter) {
				this.closeAfter(this.opts.closeAfter);
			}
		}
		else {
			if (this.opts.showAfter) {
				this.showAfter(this.opts.showAfter);
			}
		}
	}


	/**
	 * Get the data attributes from the tooltipEl. If the tooltip is being set up
	 * declaratively, this method is used to extract the data attributes from
	 * the DOM.
	 * @param {HTMLElement} tooltipEl - The tooltip element in the DOM (Required)
	*/
	static getOptions(tooltipEl) {
		const dataset = tooltipEl.dataset;
		return Object.keys(dataset).reduce((col, key) => { // Phantom doesn't like Object.entries :sob:
			if (key === 'oComponent') {
				return col; // Bail on data-o-component
			}
			const shortKey = key.replace(/^oTooltip(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);

			try {
				col[shortKey] = JSON.parse(dataset[key].replace(/\'/g, '"'));
			} catch (e) {
				col[shortKey] = dataset[key];
			}

			return col;
		}, {});
	}

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
		if (opts.position) {
			if (Tooltip.validTooltipPositions.indexOf(opts.position) === -1) {
				Tooltip.throwError("Invalid value for tooltip position. Valid values are:" + Tooltip.validTooltipPositions.toString() +" or nothing which will default to a value of `below`");
			}
		} else {
			opts.position = "below";
		}

		return opts;
	}

	static constructElement(targetEl, opts) {
		const element = document.createElement('div');
		targetEl.setAttribute('id', opts.target);
		element.setAttribute('data-o-component', 'o-tooltip');
		element.insertAdjacentHTML('afterbegin', `<div class='o-tooltip-content'>${opts.content}</div>`);
		return element;
	}

	/**
	 * Render the tooltip. Adds markup and attributes to this.tooltipEl in the DOM
	*/
	render() {
		// make sure the tooltip is the next sibling of the target and (in the case of generated tooltip el)
		// is attached to the DOM
		if (this.targetNode && this.targetNode.nextSibling !== this.tooltipEl) {
			if (this.targetNode.nextSibling) {
				this.targetNode.parentNode.insertBefore(this.tooltipEl, this.targetNode.nextSibling);
			} else {
				this.targetNode.parentNode.appendChild(this.tooltipEl);
			}
		}

		this.tooltipEl.setAttribute('role', 'tooltip');
		this.tooltipEl.classList.add('o-tooltip');

		if (this.opts.zIndex) {
			this.tooltipEl.style.zIndex = this.opts.zIndex;
		}

		// Build and append the close button
		const button = document.createElement('button');
		button.className = 'o-tooltip-close';
		button.setAttribute('aria-label', 'Close tooltip');
		button.setAttribute('title', 'Close tooltip');
		this.tooltipEl.appendChild(button);
	}

	/**
	 * Show the tooltip. Adds event handlers for clicks, touches, keypresses and
	 * viewport resizes. Uses FTDomDelegate to implement the event delegate
	 * pattern. Calls DrawTooltip.
	*/
	show() {
		// Delegate pattern
		this.delegates.doc.root(document.body);
		this.delegates.tooltip.root(this.tooltipEl);

		this.tooltipEl.dispatchEvent(new CustomEvent('oTooltip.show'));

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
		clearTimeout(this.showTimeout);

		// Run show tooltip transition
		this.tooltipEl.style.display = 'block';
		this.tooltipEl.style.opacity = 1;
		this.tooltipEl.classList.add('visible');
	}


	/**
	 * Toggle the tooltip open and close
	 */
	toggle() {
		if(this.visible) {
			this.close();
		}
		else {
			this.show();
		}
	}


	/**
	 * Close the tooltip after set time
	 * @param seconds
	 */
	closeAfter(seconds) {
		this.closeTimeout = setTimeout(() => {
			this.close();
		}, seconds*1000);
	}


	/**
	 * Show the tooltip after set time
	 * @param seconds
	 */
	showAfter(seconds) {
		this.showTimeout = setTimeout(() => {
			this.show();
		}, seconds*1000);
	}

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
	}

	/**
	 * Close the tooltip. (Visually hide it and remove event listeners)
	*/
	close(event, target, fireCloseEvent = true) {

		if(fireCloseEvent) {
			this.tooltipEl.dispatchEvent(new CustomEvent('oTooltip.close'));
		}

		this.delegates.doc.destroy();
		this.delegates.tooltip.destroy();

		clearTimeout(this.closeTimeout);
		this.visible = false;

		// Run close tooltip transition
		this.tooltipEl.style.opacity = 0;
		this.tooltipEl.classList.remove('visible');

		// Set `display: none` after animation & remove listener
		this.tooltipEl.addEventListener('transitionend', () => {
			// Check this is still false and that the tooltip hasn't reappeared
			// in the transition period
			if (this.visible === false) {
				this.tooltipEl.style.display = 'none';
			}
		}, {once: true});

		if (this.opts.showOnClick) {
			this.delegates.target.on('click', null, this.show.bind(this)); // Re-attach click handler
		}

		return false;
	}

	/**
	 * @param {Event} ev - calls close on the tooltip if the key is Esc
	*/
	closeOnKeyUp(ev) {

		/* keyCode 27 is the escape key */
		if (ev.keyCode === 27) {
			this.close();
		}
	}


	/**
	 * Respond to resize events. Redraw the tooltip in case the target has moved.
	 * @todo: There are many optimisations to make here- we're redrawing even if
	 * the target hasn't moved.
	*/
	resizeListener() {
		if (this.visible) {
			window.requestAnimationFrame(() => {
				this.drawTooltip();
			});
		}
	}

	/**
	 * Calculates the best place to position the tooltip based on space around the
	 * target and a preference set by the user.
	 * @throws {Error} if Tooltip can't be drawn in the client window
	*/
	drawTooltip(){
		// render the tooltip so we know how big it is
		this.tooltipEl.style.display = 'block';

		// (re) set the arrow alignment to middle
		this.tooltipAlignment = 'middle';
		this.tooltipPosition = this._getTooltipPosition();

		// First pass at positioning the tooltip...
		this.calculateTooltipRect(this.tooltipPosition);

		// check bounds for every position (4 counts)
		// if chosen position cannot fit the toolip.
		let count = 0;
		let tooltipSet = false;

		while (count < 5 && !tooltipSet) {
			count++;
			switch(this.tooltipPosition) {
				case 'above':
					[tooltipSet, this.tooltipPosition] = this.resetPosition(this.tooltipRect.top, 'y');
					break;
				case 'right':
					[tooltipSet, this.tooltipPosition] = this.resetPosition(this.tooltipRect.right, 'x');
					break;
				case 'below':
					[tooltipSet, this.tooltipPosition] = this.resetPosition(this.tooltipRect.bottom, 'y');
					break;
				case 'left':
					[tooltipSet, this.tooltipPosition] = this.resetPosition(this.tooltipRect.left, 'x');
					break;
				default:
					throw new Error('drawTooltip entered the default case, which is not expected.');
			}
		}

		if (count >= 5) {
			Tooltip.throwError("There is not enough space in the client window to draw the tooltip.");
		}

		/* Now align the tooltip to the left | right | top | bottom  of the target
			if there's not enough room for it to aligned to the middle of the target
			NB once this.tooltipRect.top is set, this.tooltipRect.bottom is no longer correct and should be
			recalculated before use */
		if (this.tooltipPosition === 'above' || this.tooltipPosition === 'below') {
			if (Tooltip._isOutOfBounds(this.tooltipRect.left, 'x', this.opts)) {
				this.tooltipRect.left = this._getLeftFor('left');
				this.tooltipAlignment = 'left';
			}
			if (Tooltip._isOutOfBounds(this.tooltipRect.right, 'x', this.opts)) {
				this.tooltipRect.left = this._getLeftFor('right');
				this.tooltipAlignment = 'right';
			}
		}

		if (this.tooltipPosition === 'left' || this.tooltipPosition === 'right') {
			if (Tooltip._isOutOfBounds(this.tooltipRect.top, 'y', this.opts)) {
				this.tooltipRect.top = this._getTopFor('top');
				this.tooltipAlignment = 'top';
			}
			if (Tooltip._isOutOfBounds(this.tooltipRect.bottom, 'y', this.opts)) {
				this.tooltipRect.top = this._getTopFor('bottom');
				this.tooltipAlignment = 'bottom';
			}
		}

		this._drawTooltip(this.tooltipRect);
		this._setArrow();
	}

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
	 * @returns {Array} dependant on the tooltip being in bounds or not —
	 * if not, position of the tooltip is not set (false) and a new position is returned
	 * if it is, position of the tooltip is set (true) and maintains position
	*/
	resetPosition(side, axis) {
		if (Tooltip._isOutOfBounds(side, axis, this.opts)) {
			let position = Tooltip._rotateOrientation(this.tooltipPosition);
			this.calculateTooltipRect(position);
			return [false, position];
		} else {
			return [true, this.tooltipPosition];
		}
	}

	/**
	 * @returns {Object} sets this.tooltipRect to `left`, `right`, `top` and `bottom`
	 * representing the bounding box of the tooltip (including the arrow)
	*/
	calculateTooltipRect(position) {
		const rect = {};
		const width = this.width();
		const height = this.height();
		switch (position) {
			case 'above':
				rect.top = this.target.top - height - Tooltip.arrowDepth;
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
				rect.left = this.target.left - width - Tooltip.arrowDepth;
				rect.top = this._getTopFor('middle');
				break;

			default:
				throw new Error('drawTooltip entered the default case, which is not expected.');
		}

		rect.right = rect.left + width;
		rect.bottom = rect.top + height;

		this.tooltipRect = rect;
	}

	_getTooltipPosition() {
		const { position, positionS, positionM, positionL, positionXl } = this.opts;
		const currentBreakpoint = Tooltip._getCurrentLayout();
		switch (currentBreakpoint) {
			case 'S':
				return positionS || position;
			case 'M':
				return positionM || positionS || position;
			case 'L':
				return positionL || positionM || positionS || position;
			case 'XL':
				return positionXl || positionL || positionM || positionS || position;
			default:
				return position;
		}
	}

	_getScrollPosition() { // eslint-disable-line class-methods-use-this
		return {
			left: document.body.scrollLeft || document.documentElement.scrollLeft,
			top: document.body.scrollTop || document.documentElement.scrollTop
		};
	}

	_getLeftFor(alignment) {
		if (alignment === "middle") {
			return this.target.centrePoint.x - this.width()/2;
		} else if (alignment === "left") {
			return this.target.left;
		} else if (alignment === "right") {
			return this.target.right - this.width();
		}
	}

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

		let classesToRemove = [
			"o-tooltip--arrow-left",
			"o-tooltip--arrow-right",
			"o-tooltip--arrow-above",
			"o-tooltip--arrow-below",
			"o-tooltip-arrow--align-top",
			"o-tooltip-arrow--align-bottom",
			"o-tooltip-arrow--align-left",
			"o-tooltip-arrow--align-right"
		];

		this.tooltipEl.classList.remove(...classesToRemove);
		this.tooltipEl.classList.add(arrowClassRoot + Tooltip.positionToArrowPositionMap[this.tooltipPosition]);
		this.tooltipEl.classList.add(alignmentClassRoot + this.tooltipAlignment);
	}

	_drawTooltip(rect) {
		this.tooltipEl.style.top = rect.top + 'px';
		this.tooltipEl.style.left = rect.left + 'px';
	}

	/*
		this measures the boundaries in which the tooltip will realistically fit.
		if it is shown on construction, the size of the document body will be consulted
		in all other cases, it will be the size of the viewport.
	*/
	static _isOutOfBounds(point, axis, opts) {

		if (point < 0) {
			return true;
		}

		if (opts.showOnConstruction) {
			if (axis === 'y' && point > document.body.clientHeight) {
				return true;
			} else if (axis === 'x' && point > document.body.clientWidth) {
				return true;
			}
		} else {
			if (axis === 'y' && (point > (document.documentElement.clientHeight + window.pageYOffset) || point < window.pageYOffset)) {
				return true;
			} else if (axis === 'x' && (point > (document.documentElement.clientWidth + window.pageXOffset) || point < window.pageXOffset)) {
				return true;
			}
		}

		return false;
	}

	static _rotateOrientation(orientation) {
		const rotate = {
			"above": "right",
			"right": "below",
			"below": "left",
			"left": "above"
		};

		return rotate[orientation];
	}

	static throwError(message) {
		throw new Error('"o-tooltip error": '+ message);
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
			return new Tooltip(rootEl, opts);
		}

		// If the rootEl wasn't itself a tooltip, then find ALL of the child things that have the data-o-component=oTooltip set
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-tooltip"]'), rootEl => new Tooltip(rootEl, opts));
	}
}

Tooltip.arrowDepth = 10;
Tooltip.positionToArrowPositionMap = {
	"above": "below",
	"below": "above",
	"left": "right",
	"right": "left"
};

Tooltip.validArrowAlignments = ["top", "bottom", "left", "right"];
Tooltip.validTooltipPositions = ["above", "below", "left", "right"];

Tooltip.Target = Target;

export default Tooltip;
