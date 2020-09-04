import Delegate from 'ftdomdelegate';
import Viewport from 'o-viewport';
import oGrid from 'o-grid';
import Target from './target.js';

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
	constructor(tooltipEl, opts) {
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
		this.tooltipPosition = this._getConfiguredTooltipPosition();
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

		if(this.opts.showOnFocus) {
			this.delegates.target.on('focusin', this.show.bind(this));
			this.delegates.target.on('focusout', this.close.bind(this));
		}

		Viewport.listenTo('resize');

		this.render();

		// Do you render as soon as possible?
		if (this.opts.showOnConstruction) {
			this.show();

			if (this.opts.closeAfter) {
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

		if (!opts.target) {
			Tooltip.throwError("tooltip.target is not set. An target for the tooltip to point at must be provided");
		}

		// Check that the value of tooltip position is valid. Default to below.
		if (opts.position) {
			if (Tooltip.validTooltipPositions.indexOf(opts.position) === -1) {
				Tooltip.throwError("Invalid value for tooltip position. Valid values are:" + Tooltip.validTooltipPositions.toString() + " or nothing which will default to a value of `below`");
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
		// Make sure the tooltip is attached to the DOM
		if (this.opts.appendToBody) {
			// either appended directly into the body
			if (!document.getElementById(this.opts.target + Tooltip.idSuffix)) {
				document.body.appendChild(this.tooltipEl);
			}
		} else if (this.targetNode && this.targetNode.nextSibling !== this.tooltipEl) {
			// or is the next sibling of the target
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
		if (this.visible) {
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
		}, seconds * 1000);
	}


	/**
	 * Show the tooltip after set time
	 * @param seconds
	 */
	showAfter(seconds) {
		this.showTimeout = setTimeout(() => {
			this.show();
		}, seconds * 1000);
	}

	/**
	 * Destroy the tooltip.
	*/
	destroy() {
		if (this.visible === true) {
			this.close();
		}
		if (this.tooltipEl && this.tooltipEl.parentElement && this.opts && this.opts.content) {
			this.tooltipEl.parentElement.removeChild(this.tooltipEl);
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

		if (fireCloseEvent) {
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
		}, { once: true });

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
	drawTooltip() {
		// render the tooltip so we know how big it is
		this.tooltipEl.style.display = 'block';
		// don't increase in size, i.e due to inline content, after positioning
		this.tooltipEl.style['max-width'] = `${this.width()}px`;
		// check bounds for every position (4 counts)
		// if chosen position cannot fit flip the toolip.
		let count = 0;
		let tooltipRect = {};
		let position = this._getConfiguredTooltipPosition();
		let alignment = 'middle';
		// Assume out of bounds until tooltipRect is calculated.
		let isOutOfBounds = true;
		while (count < 5 && isOutOfBounds) {
			count++;
			switch (position) {
				case 'above':
					({tooltipRect, alignment, isOutOfBounds} = this._evaulateTooltip('above'));
					break;
				case 'right':
					({tooltipRect, alignment, isOutOfBounds} = this._evaulateTooltip('right'));
					break;
				case 'below':
					({tooltipRect, alignment, isOutOfBounds} = this._evaulateTooltip('below'));
					break;
				case 'left':
					({tooltipRect, alignment, isOutOfBounds} = this._evaulateTooltip('left'));
					break;
				default:
					throw Tooltip.throwError('drawTooltip entered the default case, which is not expected.');
			}
			if (isOutOfBounds && count < 5) {
				position = Tooltip._rotateOrientation(position);
			}
		}

		// Draw tooltip with latest alignment and position.
		this.tooltipRect = tooltipRect;
		this.tooltipAlignment = alignment;
		this.tooltipPosition = position;
		const targetLeftOffset = this.target.targetEl.offsetParent && this.target.targetEl.offsetParent.getBoundingClientRect().left;
		const targetTopOffset = this.target.targetEl.offsetParent && this.target.targetEl.offsetParent.getBoundingClientRect().top;

		const startWidth = this.tooltipEl.getBoundingClientRect().width;
		if (this.opts.appendToBody) {
			// If the tooltip will be apended directly to body:
			// set an ID in order to be identified
			this.tooltipEl.id = this.opts.target + Tooltip.idSuffix;
			this.tooltipEl.style.top = this.tooltipRect.top + document.documentElement.scrollTop + 'px';
			this.tooltipEl.style.left = this.tooltipRect.left + document.documentElement.scrollLeft + 'px';
		} else {
			this.tooltipEl.style.top = this.tooltipRect.top - targetTopOffset + 'px';
			this.tooltipEl.style.left = this.tooltipRect.left - targetLeftOffset + 'px';
		}
		const endWidth = this.tooltipEl.getBoundingClientRect().width;

		// The tooltip size changed when it was placed, e.g. because inline
		// content overflowed a container and wrapped to more lines.
		// Redraw with the new tooltip dimensions.
		if (startWidth !== endWidth) {
			return this.drawTooltip();
		}

		// Set Tooltip arrow.
		this._setArrow();

		// Warn all positions were tried and the tooltip is sill out of bounds.
		if (count >= 5) {
			console.warn("There is not enough space in the client window to draw the tooltip.");
		}
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
	 * @returns {Boolean} If the set position is out of bounds.
	*/
	_evaulateTooltip(position) {
		const axis = position === 'above' || position === 'below' ? 'y' : 'x';
		const alignments = axis === 'y' ? ['middle', 'right', 'left'] : ['middle', 'top', 'bottom'];

		// Attempt all position alignments.
		let isOutOfBounds = true;
		let tooltipRect;
		let alignment;
		for (let index = 0; index < alignments.length && isOutOfBounds === true; index++) {
			alignment = alignments[index];
			tooltipRect = this._calculateTooltipRectangle(position, alignment);
			isOutOfBounds = this._tooltipIsOutOfBounds(tooltipRect);
		}

		// If all alignments fail to fit in bounds default to the middle alignment.
		if (isOutOfBounds) {
			alignment = 'middle';
			tooltipRect = this._calculateTooltipRectangle(position, alignment);
		}

		return { tooltipRect, alignment, isOutOfBounds };
	}

	/**
	 * @returns {Object} sets this.tooltipRect to `left`, `right`, `top` and `bottom`
	 * representing the bounding box of the tooltip (including the arrow)
	*/
	_calculateTooltipRectangle(position, alignment) {
		const rect = {};
		const axis = position === 'above' || position === 'below' ? 'y' : 'x';

		// Calculate for position above/below.
		if (axis === 'y') {
			// the arrow is placed 10% along the body of the tooltip
			const arrowPosition = this.width() / 10;

			if (alignment === 'left') {
				rect.left = this.target.centrePoint.x - this.width() + arrowPosition;
			}
			if (alignment === 'right') {
				rect.left = this.target.centrePoint.x - arrowPosition;
			}
			if (alignment === 'middle') {
				rect.left = this.target.centrePoint.x - this.width() / 2;
			}
			if (position === 'above') {
				rect.top = this.target.top - this.height() - Tooltip.arrowDepth;
			}
			if (position === 'below') {
				rect.top = this.target.bottom + Tooltip.arrowDepth;
			}
		}

		// Calculate for position right/left.
		if (axis === 'x') {
			if (alignment === 'top') {
				rect.top = this.target.top;
			}
			if (alignment === 'bottom') {
				rect.top = this.target.bottom - this.height();
			}
			if (alignment === 'middle') {
				rect.top = this.target.centrePoint.y - this.height() / 2;
			}
			if (position === 'right') {
				rect.left = this.target.right + Tooltip.arrowDepth;
			}
			if (position === 'left') {
				rect.left = this.target.left - this.width() - Tooltip.arrowDepth;
			}
		}

		rect.right = rect.left + this.width();
		rect.bottom = rect.top + this.height();

		return rect;
	}

	calculateTooltipRect(position) {
		console.warn('`calculateTooltipRect` is deprecated.');
		return this._calculateTooltipRectangle(position, 'middle');
	}

	_getConfiguredTooltipPosition() {
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

	_setArrow() {
		const arrowClassRoot = 'o-tooltip--arrow-';
		const alignmentClassRoot = 'o-tooltip-arrow--align-';

		const classesToRemove = [
			"o-tooltip--arrow-left",
			"o-tooltip--arrow-right",
			"o-tooltip--arrow-above",
			"o-tooltip--arrow-below",
			"o-tooltip-arrow--align-top",
			"o-tooltip-arrow--align-bottom",
			"o-tooltip-arrow--align-left",
			"o-tooltip-arrow--align-right",
			"o-tooltip-arrow--align-middle"
		];

		this.tooltipEl.classList.remove(...classesToRemove);
		this.tooltipEl.classList.add(arrowClassRoot + Tooltip.positionToArrowPositionMap[this.tooltipPosition]);
		this.tooltipEl.classList.add(alignmentClassRoot + Tooltip.alignmentToArrowAlignmentMap[this.tooltipAlignment]);
	}

	/**
	 * Checkes is a hypothetical tooltip is in bounds on all sides.
	 * @param {Object} tooltipRect - An object which represents a hypothetical tooltip position.
	*/
	_tooltipIsOutOfBounds(tooltipRect) {
		const topOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.top, 'y', this.opts);
		const bottomOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.bottom, 'y', this.opts);
		const leftOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.left, 'x', this.opts);
		const rightOutofBounds = Tooltip._pointIsOutOfBounds(tooltipRect.right, 'x', this.opts);
		return topOutofBounds || bottomOutofBounds || leftOutofBounds || rightOutofBounds;
	}

	/*
		this measures the boundaries in which the tooltip will realistically fit.
		if it is shown on construction, the size of the document body will be consulted
		in all other cases, it will be the size of the viewport.
	*/
	static _pointIsOutOfBounds(point, axis, opts) {
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
			if (axis === 'y' && point > document.documentElement.clientHeight) {
				return true;
			} else if (axis === 'x' && point > document.documentElement.clientWidth) {
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
		throw new Error('"o-tooltip error": ' + message);
	}

	static init(rootEl, opts) {
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

Tooltip.idSuffix = '-tooltip';

Tooltip.arrowDepth = 10;
Tooltip.positionToArrowPositionMap = {
	"above": "below",
	"below": "above",
	"left": "right",
	"right": "left"
};
Tooltip.alignmentToArrowAlignmentMap = {
	"top": "top",
	"bottom": "bottom",
	"right": "left",
	"left": "right",
	"middle": "middle"
};

Tooltip.validArrowAlignments = ["top", "bottom", "left", "right"];
Tooltip.validTooltipPositions = ["above", "below", "left", "right"];

Tooltip.Target = Target;

export default Tooltip;
