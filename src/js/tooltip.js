import Delegate from 'ftdomdelegate';
import viewport from 'o-viewport';
import Target from './target';

class Tooltip {

	constructor (tooltipEl, opts) {
		this.tooltipEl = tooltipEl;

		this.opts = opts || this.getOptions(tooltipEl);
		this.opts = this.checkOptions(this.opts);

		this.target = new Target(document.getElementById(this.opts.target));
		this.tooltipPosition = this.opts.position;

		this.tooltipAlignment = (this.tooltipPosition == 'above' || this.tooltipPosition == 'below') ? 'vertical' : 'horizontal';

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
			const validTooltipPositions = ["above", "below", "left", "right"];
			if (validTooltipPositions.indexOf(opts.tooltipPosition) === -1) {
				Tooltip.throwError("Invalid value for tooltip position. Valid values are:" + validTooltipPositions.toString() +" or nothing which will default to a value of `below`");
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

		// Build arrow
		this.setArrow(this.tooltipPosition);
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
	};

	setContainerPosition(){

		// render the tooltip so we know how big it is
		this.tooltipEl.style.display = 'block';

		// First pass at positioning the tooltip...
		this.positionTooltip(this.tooltipPosition);

		// The arrow is at 'top' but there is no room under the target to render it!
		if (this.tooltipPosition == 'below'){
			if (this.tooltipEl.offsetTop + this.tooltipEl.offsetHeight > document.body.offsetHeight) {
				this.setTooltipPosition('above');
			}
		}

		// the arrow is 'bottom' but there is no room above it to render it!
		if (this.tooltipPosition == 'above'){
			if (this.tooltipEl.offsetTop < 0) {
				this.setTooltipPosition('below');
			}
		}

		// the arrow is 'left' but there is no room at the right it to render it!
		if (this.tooltipPosition == 'right'){
			if (this.tooltipEl.offsetLeft + this.tooltipEl.offsetWidth > document.body.offsetWidth) {
				this.setTooltipPosition('left');
			}
		}

		// the arrow is 'left' but there is no room at the right it to render it!
		if (this.tooltipPosition == 'left'){
			if (this.tooltipEl.offsetLeft < 0) {
				this.setTooltipPosition('right');
			}
		}

		/* Now that the box probably occupies enough space, fix the alignment of the arrow */

		if (this.tooltipAlignment == 'horizontal') {
			if (this.tooltipEl.offsetTop < 0) {
				this.alignWithTarget('top');
			}
			if ((this.tooltipEl.offsetTop + this.tooltipEl.offsetHeight) > document.body.offsetHeight) {
				this.alignWithTarget('bottom');
			}
		}

		if (this.tooltipAlignment == 'vertical') {
			if (this.tooltipEl.offsetLeft < 0) {
				this.alignWithTarget('left');
			}
			if (this.tooltipEl.offsetLeft + this.tooltipEl.offsetwidth > document.body.offsetHeight) {
				this.alignWithTarget('right');
			}
		}

	};

	setTooltipPosition(newPosition){
		this.positionTooltip(newPosition);
		this.setArrow(newPosition);
		this.tooltipPosition = newPosition;
	}

	positionTooltip(position) {
		let arrowDepth = 10;

		switch (position) {
			case 'below':
				this.tooltipEl.style.top =  arrowDepth + this.target.lowerLimit + 'px';
				this.tooltipEl.style.left = this.target.centreX - (this.tooltipEl.offsetWidth/2) + 'px';
				break;

			case 'above':
				this.tooltipEl.style.top =  this.target.upperLimit - (this.tooltipEl.offsetHeight + arrowDepth) + 'px';
				this.tooltipEl.style.left = this.target.centreX - (this.tooltipEl.offsetWidth/2) + 'px';
				break;

			case 'right':
				this.tooltipEl.style.top =  this.target.upperLimit + this.tooltipEl.offsetHeight/2 + 'px';
				this.tooltipEl.style.left = this.target.rightLimit + arrowDepth + 'px';
				break;

			case 'left':
				this.tooltipEl.style.top =  this.target.upperLimit + this.tooltipEl.offsetHeight/2 + 'px';
				this.tooltipEl.style.left = this.target.leftLimit - (this.tooltipEl.offsetWidth + arrowDepth) + 'px';
				break;
		}
	}

	setArrow(tooltipPosition) {
		this.tooltipEl.classList.remove('o-tooltip--arrow-down');
		this.tooltipEl.classList.remove('o-tooltip--arrow-up');
		this.tooltipEl.classList.remove('o-tooltip--arrow-left');
		this.tooltipEl.classList.remove('o-tooltip--arrow-right');

		switch (tooltipPosition) {
			case "above":
				this.tooltipEl.classList.add('o-tooltip--arrow-down');
				break;
			case "below":
				this.tooltipEl.classList.add('o-tooltip--arrow-up');
				break;
			case "left":
				this.tooltipEl.classList.add('o-tooltip--arrow-right');
				break;
			case "right":
				this.tooltipEl.classList.add('o-tooltip--arrow-left');
				break;
		}
	}

	alignWithTarget(alignment) {
		switch (alignment) {
			case "top":
				this.tooltipEl.style.top = this.target.upperLimit +'px';
				this.tooltipEl.classList.add('extreme--top');
				break;
			case "bottom":
				this.tooltipEl.style.top = this.target.lowerlimit +'px';
				this.tooltipEl.classList.add('extreme--bottom');
				break;
			case "left":
				this.tooltipEl.style.left = this.target.leftLimit +'px';
				this.tooltipEl.classList.add('extreme--left');
				break;
			case "right":
				this.tooltipEl.style.left = this.target.rightlimit +'px';
				this.tooltipEl.classList.add('extreme--right');
				break;
		}
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

export default Tooltip;
