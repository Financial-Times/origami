const Delegate = require('ftdomdelegate');
const viewport = require('o-viewport');
const oLayers = require('o-layers');
const utils = require('./utils');
const overlays = {};

const checkOptions = function(opts) {
	if (opts.trigger && !(opts.trigger instanceof HTMLElement)) {
		opts.trigger = document.querySelector(opts.trigger);
	}

	// Overlays that don't point at anything should be modal by default
	if (!opts.arrow && typeof opts.modal === 'undefined') {
		opts.modal = true;
	}

	if (opts.compact && opts.heading && opts.heading.shaded) {
		throw new Error('"o-overlay error": Compact overlays can\'t have a shaded header');
	}

	if (opts.arrow) {
		// Default arrow position is 'left'
		if (!opts.arrow.position) {
			opts.arrow.position = 'left';
		}

		// Overlays with arrows can not be modal
		if (opts.modal) {
			opts.modal = false;
		}

		if (opts.arrow.position !== 'left' && opts.arrow.position !== 'right' && opts.arrow.position !== 'top' && opts.arrow.position !== 'bottom') {
			throw new Error('"o-overlay error": The position of the arrow has to be either "top", "bottom", "left" or "right".');
		}

		// If the position of the arrow is 'top' or 'bottom', the heading can't be shaded
		if ((opts.arrow.position === 'top' || opts.arrow.position === 'bottom') && (opts.heading && opts.heading.shaded)) {
			throw new Error('"o-overlay error": The position of the arrow can\'t be set to "top" or "bottom" when the shaded heading option is set to true.');
		}

		// Default target for the arrow will be the trigger
		if (!opts.arrow.target) {
			if (opts.trigger) {
				opts.arrow.target = opts.trigger;
			} else {
				throw new Error('"o-overlay error": For overlays with arrows, if you don\'t set a trigger, you do need to set a target for the overlay.');
			}
		} else if (!(opts.arrow.target instanceof HTMLElement)) {
			opts.arrow.target = document.querySelector(opts.arrow.target);
		}

		// Prevent closing is only available with modal
		if (opts.preventclosing && !opts.modal) {
			opts.preventclosing = false;
		}
	}

	return opts;
};

const getOptionsFromTrigger = function(trigger) {
	let opts = {};
	// Get config from data attributes set in the trigger if they haven't been passed via JS
	if (trigger instanceof HTMLElement) {
		Array.prototype.forEach.call(trigger.attributes, function(attr) {
			if (attr.name.indexOf('data-o-overlay') === 0) {
				// Remove the unnecessary part of the string the first time this is run for each attribute
				const key = attr.name.replace('data-o-overlay-', '');
				opts = utils.optionsFromKey(key, attr.value, opts);
			}
		});
		opts.trigger = trigger;
	}
	return opts;
};

const triggerClickHandler = function(id, ev) {
	ev.stopPropagation();
	const overlay = overlays[id];
	if (overlay) {
		if (overlay.visible === true) {
			overlay.close();
		} else {
			overlay.open();
		}
	}
};

const Overlay = function(id, opts) {
	viewport.listenTo('resize');
	this.visible = false;
	this.id = id;

	try {
		this.opts = checkOptions(opts);
	} catch(e) {
		this.broadcast('log', 'oErrors', {
			error: e
		});
		throw e;
	}

	if (!this.opts) {
		const noOptError = new Error('"o-overlay error": Required options have not been set');
		this.broadcast('log', 'oErrors', {
			error: noOptError
		});
		throw noOptError;
	}
	if (this.opts.trigger) {
		this.opts.trigger.addEventListener('click', triggerClickHandler.bind(this.opts.trigger, id), false);
		this.context = this.opts.arrow ? oLayers.getLayerContext(this.opts.arrow.target) : oLayers.getLayerContext(this.opts.trigger);
	} else {
		this.context = this.opts.arrow ? oLayers.getLayerContext(this.opts.arrow.target) : document.body;
	}

	this.delegates = {
		doc: new Delegate(),
		wrap: new Delegate(),
		context: new Delegate()
	};

	// Add this overlay to the overlays hashmap
	overlays[id] = this;
};

Overlay.prototype.open = function() {
	if (this.opts.trigger) {
		this.opts.trigger.setAttribute('aria-pressed', 'true');
	}

	if (!this.content) {
		const overlay = this;
		this.loadContent(function(html) {
			overlay.opts.html = html;
			if (!overlay.opts.html) {
				throw new Error('"o-overlay error": Content for the overlay needs to be set via the "html" or the "src" option.');
			}
			overlay.render();
		});
	} else {
		this.show();
	}
};

Overlay.prototype.loadContent = function(callback) {
	if (!this.opts.html && this.opts.src) {
		if (/^(https?\:\/)?\//.test(this.opts.src)) {
			utils.copyContentFromUrl(this.opts.src, function(html) {
				callback(html);
			});
		} else {
			utils.copyContentFromElement(document.querySelector(this.opts.src), function(html) {
				callback(html);
			});
		}
	} else {
		callback(this.opts.html);
	}
};

Overlay.prototype.render = function() {
	const wrapperEl = document.createElement('div');
	wrapperEl.className = 'o-overlay';
	wrapperEl.classList.add('o-overlay--' + this.id.replace(' ', '-'));
	wrapperEl.setAttribute('role', 'dialog');
	if (this.opts.zindex) {
		wrapperEl.style.zIndex = this.opts.zindex;
	}
	this.wrapper = wrapperEl;

	if (this.opts.heading) {
		const heading = document.createElement('header');
		heading.classList.add('o-overlay__heading');

		if (this.opts.heading.title && this.opts.heading.title.trim()) {
			const headingId = this.opts.heading.title.replace(' ', '-').toLowerCase();
			heading.setAttribute('id', headingId);
			wrapperEl.setAttribute('aria-labelledby', headingId);
			const title = document.createElement('span');
			title.setAttribute('role', 'heading');
			title.className = 'o-overlay__title';
			title.innerHTML = this.opts.heading.title;
			heading.appendChild(title);
		}

		if (this.opts.heading.shaded) {
			heading.classList.add('o-overlay__heading--shaded');
		}

		if (!this.opts.preventclosing) {
			const button = document.createElement('a');
			button.className = 'o-overlay__close';
			button.setAttribute('role', 'button');
			button.setAttribute('tabindex', '0');
			button.setAttribute('href', '#void');
			button.setAttribute('aria-label', 'Close');
			button.setAttribute('title', 'Close');
			heading.appendChild(button);
		}

		wrapperEl.appendChild(heading);
	}

	if (this.opts.tooltip) {
		const button = document.createElement('a');
		button.className = 'o-overlay__close';
		button.setAttribute('role', 'button');
		button.setAttribute('tabindex', '0');
		button.setAttribute('href', '#void');
		button.setAttribute('aria-label', 'Close');
		button.setAttribute('title', 'Close');
		wrapperEl.appendChild(button);
		wrapperEl.classList.add('o-overlay--compact');
	}

	const content = document.createElement('section');
	content.className = 'o-overlay__content';
	wrapperEl.appendChild(content);

	this.content = content;

	if (this.opts.compact) {
		wrapperEl.classList.add('o-overlay--compact');
	}

	this.show();
};

Overlay.prototype.show = function() {
	if (this.opts.modal) {
		this.wrapper.classList.add('o-overlay--modal');
		const shadow = document.createElement('div');
		shadow.className = 'o-overlay-shadow';
		this.shadow = shadow;
		document.body.appendChild(shadow);
	}

	this.delegates.doc.root(document.body);
	this.delegates.wrap.root(this.wrapper);
	this.delegates.context.root(this.context);

	this.closeHandler = this.close.bind(this);
	this.resizeListenerHandler = this.resizeListener.bind(this);
	this.delegates.doc.on('oViewport.resize', 'body', this.resizeListenerHandler);
	this.closeOnNewLayerHandler = this.closeOnNewLayer.bind(this);
	this.delegates.context.on('oLayers.new', this.closeOnNewLayerHandler);

	if (this.opts.heading || this.opts.tooltip) {
		this.delegates.wrap.on('click', '.o-overlay__close', this.closeHandler);
		this.delegates.wrap.on('touchend', '.o-overlay__close', this.closeHandler);
	}

	this.closeOnExternalClickHandler = this.closeOnExternalClick.bind(this);
	this.delegates.doc.on('click', 'body', this.closeOnExternalClickHandler);
	this.delegates.doc.on('touchend', 'body', this.closeOnExternalClickHandler);

	this.closeOnEscapePressHandler = this.closeOnEscapePress.bind(this);
	this.delegates.doc.on('keyup', this.closeOnEscapePressHandler);

	this.broadcast('new', 'oLayers');
	this.context.appendChild(this.wrapper);

	// Give the overlay focus
	this.wrapper.setAttribute('tabindex', '0');
	this.wrapper.style.outline = 0;


	// Renders content after overlay has been added so css is applied before that
	// Thay way if an element has autofocus, the window won't scroll to the bottom
	// in Safari as the overlay is already in position
	const overlay = this;
	window.requestAnimationFrame(function() {
		if (!overlay.content.innerHTML) {
			// overlay.respondToWindow(viewport.getSize());
			if (typeof overlay.opts.html === 'string') {
				overlay.content.innerHTML = overlay.opts.html;
			} else {
				overlay.content.appendChild(overlay.opts.html);
			}
		}
		overlay.width = overlay.getWidth();
		overlay.height = overlay.getHeight();
		overlay.respondToWindow(viewport.getSize());
		overlay.visible = true;
		overlay.wrapper.focus();
		overlay.broadcast('ready');

		// Add o-tracking integration
		overlay.broadcast('event', 'oTracking', {
			category: 'overlay',
			action: 'show',
			overlay_id: overlay.id
		});
	});
};

Overlay.prototype.close = function() {
	this.delegates.doc.destroy();
	this.delegates.wrap.destroy();
	this.delegates.context.destroy();

	viewport.stopListeningTo('resize');

	this.broadcast('destroy');
	this.broadcast('event', 'oTracking', {
		category: 'overlay',
		action: 'close',
		overlay_id: this.id
	});

	this.context.removeChild(this.wrapper);
	if (this.opts.modal) {
		this.shadow.parentNode.removeChild(this.shadow);
	}

	// Put focus back on the triggering element
	if (this.opts.trigger) {
		this.opts.trigger.focus();
		this.opts.trigger.setAttribute('aria-pressed', 'false');
	}
	this.visible = false;
	this.broadcast('close', 'oLayers');
	return false;
};

Overlay.prototype.closeOnExternalClick = function(ev) {
	if (!this.wrapper.contains(ev.target) && !this.opts.modal && (this.opts.trigger && !this.opts.trigger.contains(ev.target))) {
		this.close();
	}
};

Overlay.prototype.closeOnEscapePress = function(ev) {
	if (!this.opts.preventclosing && ev.keyCode === 27) {
		this.close();
	}
};

Overlay.prototype.closeOnNewLayer = function(ev) {
	if (!ev.detail || ev.detail.el !== this) {
		this.close();
	}
};

Overlay.prototype.resizeListener = function(ev) {
	if (!this.wrapper.contains(ev.target)) {
		this.respondToWindow(ev.detail.viewport);
	}
};

Overlay.prototype.broadcast = function(eventType, namespace, detail) {
	namespace = namespace || 'oOverlay';
	const target = namespace === 'oLayers' ? this.context : this.wrapper || document.body;

	detail = detail || {};

	if (namespace !== 'oTracking') {
		detail.el = this;
	}

	target.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
		detail: detail,
		// Don't bubble above the overlay's layer context otherwise we risk triggering a listener on a parent context
		bubbles: namespace !== 'oLayers' ? true : false
	}));
};

Overlay.prototype.realign = function(dimension, size) {
	const edge = dimension === 'width' ? 'left' : 'top';

	if (size <= this[dimension]) {
		this.wrapper.classList.add('o-overlay--full-' + dimension);
		this.wrapper.style[edge] = '0';
		this.wrapper.style['margin' + utils.capitalise(edge)] = 0;
		if (dimension === 'height') {
			// Set the exact height that the content of the overlay will have which is the total
			// height of the overlay minus the heading if there is one. If height = 100%, the
			// heading is part of that 100%, so some content is truncated.
			const borderHeight = this.wrapper.offsetHeight - this.wrapper.clientHeight;
			this.content.style.height = this.wrapper.offsetHeight - (this.opts.heading ? this.wrapper.querySelector('header').offsetHeight : 0) - borderHeight + 'px';
		}
	} else {
		if (dimension === 'height') {
			// Remove the property and let the overlay extend to its content
			this.content.style.height = null;
		}
		this.wrapper.classList.remove('o-overlay--full-' + dimension);
		if (!this.opts.arrow) {
			this.wrapper.style['margin' + utils.capitalise(edge)] = -(this.wrapper['offset' + utils.capitalise(dimension)]/2) + 'px';
		}
		// Set alignment in JavaScript (not via CSS) after all other styles have been applied
		// so that browsers compute it properly. If it's applied earlier, when the negative
		// margin is calculated, the overlay might not fit, so it shrinks and the negative
		// margin would be incorrect
		this.wrapper.style[edge] = '50%';
	}
};

Overlay.prototype.respondToWindow = function(size) {
	this.realign('width', size.width);
	this.realign('height', size.height);

	this.wrapper.classList.remove('o-overlay__arrow-top');
	this.wrapper.classList.remove('o-overlay__arrow-bottom');
	this.wrapper.classList.remove('o-overlay__arrow-left');
	this.wrapper.classList.remove('o-overlay__arrow-right');

	if (this.opts.arrow && !this.fills()) {
		this.opts.arrow.currentposition = this.getCurrentArrowPosition(this.opts.arrow.position);
		this.wrapper.classList.add('o-overlay__arrow-' + this.opts.arrow.currentposition);

		const edge = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'left' : 'top';
		const oppositeEdge = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'top' : 'left';
		const dimension = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'height' : 'width';

		let offset = 0;
		// Protrusion distance for the arrow. It's 13 due to the border around it
		const arrowSize = 13;
		const targetClientRect = utils.getOffsetRect(this.opts.arrow.target);
		const dimensionValue = targetClientRect[dimension];
		switch (this.opts.arrow.currentposition) {
			case 'left':
				offset = targetClientRect.left + targetClientRect.width + arrowSize;
				break;
			case 'right':
				offset = targetClientRect.left - this.width - arrowSize;
				break;
			case 'top':
				offset = targetClientRect.top + targetClientRect.height + arrowSize;
				break;
			case 'bottom':
				offset = targetClientRect.top - this.height - arrowSize;
				break;
		}

		this.wrapper.style[edge] = offset + 'px';
		// 1. Get where the element is positioned
		// 2. Add its width or height divided by two to get its center
		// 3. Substract the width or height divided by two of the overlay so the arrow, which is in the center, points to the center of the side of the target
		this.wrapper.style[oppositeEdge] = targetClientRect[oppositeEdge] + (dimensionValue / 2) - (this[dimension] / 2) + 'px';
	}
};

Overlay.prototype.getCurrentArrowPosition = function(position) {
	const targetClientRect = this.opts.arrow.target.getBoundingClientRect();
	// Protrusion distance for the arrow. It's 13 due to the border around it
	const arrowSize = 13;
	const wrapperWidth = this.wrapper.getBoundingClientRect().width + arrowSize;
	const wrapperHeight = this.wrapper.getBoundingClientRect().height + arrowSize;
	// Check if the overlay won't fit on the side set in the options and that it will on the opposite side.
	// In that case, use the opposite side
	switch (this.opts.arrow.position) {
		case 'left':
			if (targetClientRect.right + wrapperWidth >= window.innerWidth &&
					targetClientRect.left - wrapperWidth > 0) {

				position = 'right';
			}
			break;
		case 'right':
			if (targetClientRect.left - wrapperWidth <= 0 &&
					targetClientRect.right + wrapperWidth < window.innerWidth) {

				position = 'left';
			}
			break;
		case 'top':
			if (targetClientRect.bottom + wrapperHeight >= window.innerHeight &&
					targetClientRect.top - wrapperHeight + arrowSize > 0) {

				position = 'bottom';
			}
			break;
		case 'bottom':
			if (targetClientRect.top - wrapperHeight <= 0 &&
					targetClientRect.bottom + wrapperHeight < window.innerHeight) {

				position = 'top';
			}
			break;
	}
	return position;
};

Overlay.prototype.fills = function(dimension) {
	return this.wrapper.classList.contains('o-overlay--full-' + dimension);
};

Overlay.prototype.destroy = function() {
	if (this.visible === true) {
		this.close();
	}
	if (this.opts.trigger) {
		this.opts.trigger.removeEventListener('click', triggerClickHandler);
	}
	delete overlays[this.id];
};

Overlay.prototype.getHeight = function() {
	const borderHeight = this.wrapper.offsetHeight - this.wrapper.clientHeight;
	return this.content.scrollHeight + (this.opts.heading ? this.wrapper.querySelector('header').offsetHeight : 0) + borderHeight;
};

Overlay.prototype.getWidth = function() {
	const borderWidth = this.wrapper.offsetWidth - this.wrapper.clientWidth;
	return this.content.scrollWidth + borderWidth;
};

Overlay.init = function(el) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	const triggers = el.querySelectorAll('.o-overlay-trigger');
	const overlaysArray = [];
	for (let t = 0; t < triggers.length; t++) {
		// There can only be one overlay per trigger when set declaratively, so the first trigger found for a given overlay will be the one used to create the overlay
		if (!overlays[triggers[t].getAttribute('data-o-overlay-id')]) {
			overlaysArray.push(new Overlay(triggers[t].getAttribute('data-o-overlay-id'), getOptionsFromTrigger(triggers[t])));
		}
	}

	return overlaysArray;
};

Overlay.destroy = function() {
	const overlayIds = Object.keys(overlays);
	overlayIds.forEach(function(id) {
		overlays[id].destroy();
	});
};

Overlay.getOverlays = function() {
	return overlays;
};

module.exports = Overlay;
