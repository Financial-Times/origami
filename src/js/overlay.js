const Delegate = require('ftdomdelegate');
const viewport = require('o-viewport');
const oLayers = require('o-layers');
const utils = require('./utils');
const overlays = {};

const checkOptions = function(opts) {
	if (opts.trigger && !(opts.trigger instanceof HTMLElement)) {
		opts.trigger = document.querySelector(opts.trigger);
	}

	if (opts.heading && (!opts.heading.title || !opts.heading.title.trim())) {
		throw new Error('"o-overlay error": To have a heading, a non-empty title needs to be set');
	}

	// Overlays should be modal and layers by default
	if (typeof opts.modal === 'undefined') {
		opts.modal = true;
	}
	if (typeof opts.layer === 'undefined') {
		opts.layer = true;
	}

	if (opts.compact && opts.heading && opts.heading.shaded) {
		throw new Error('"o-overlay error": Compact overlays can\'t have a shaded header');
	}

	// Map old names for options
	if (opts.parentNode) {
		console.warn('Please change the instantation of o-overlay to use the `parentnode` option instead of `parentNode`. `parentNode` will be removed in a future major version.');
		opts.parentnode = opts.parentNode;
	}
	if (opts.noFocus) {
		console.warn('Please change the instantation of o-overlay to use the `nofocus` option instead of `noFocus`. `noFocus` will be removed in a future major version.');
		opts.nofocus = opts.noFocus;
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


/**
 * Represents an Overlay.
 * @constructor
 * @param {HTMLElement} id - String. A unique identifier for the overlay within the page. (Required)
 * @param {Object} opts - An options object for configuring the Overlay. This object MUST have either `src` or `html` set. (Required)
 * @param {String} opts.heading.title - Your overlay's title
 * @param {Boolean} opts.heading.visuallyHideTitle - If you want to provide a different title style, this option will prevent the title span from being added to the overlay. (In this case the title is only used for aria labelling) Default: false.
 * @param {Boolean} opts.heading.shaded - Whether to shade the background of the header. Default: to false
 * @param {Boolean} opts.modal - Whether the overlay should have modal behaviour or not. Setting this as true will add a translucent shadow between the page and the overlay
 * @param {Boolean} opts.compact - If true, the .o-overlay--compact class will be added to the overlay that reduces heading font-size and paddings in the content.
 * @param {String} opts.src - Either a url from which HTML to populate the overlay can be loaded, or a querySelector string identifying an element from which the textContent should be extracted.
 * @param {String} opts.html - String or HTMLElement. Raw HTML (cannot be set declaratively)
 * @param {String} opts.trigger - querySelector expression or HTMLElement. When there's a trigger set, a click event handler will be added to it that will open or close the overlay accordingly. (cannot be set declaratively)
 * @param {String} opts.zindex - Value of the CSS z-index property of the overlay. Default set via CSS: '10'
 * @param {Boolean} opts.preventclosing - Prevents closure of overlay via standard x button or escape key. For use when you are directing the user to somewhere else. Only valid with modal set to true.
 * @param {Boolean} opts.customclose - If you do not use the heading, but want to provide a close button in your html / src (with a class of o-overlay__close), setting customclose to true will attach o-overlay's close handler function to that button.
 * @param {String} opts.parentnode - Should be a query selector for a DOM element. If set, the overlay will be appended as a child of this rather than the document body or target. If multiple nodes are matched, it will use the first. If nothing matches this selector, the body will be used.
 * @param {Boolean} opts.nested - If set to true, the resize, escape, and layer listeners will not be set up. This boolean should be used in conjunction with the parentnode setting to allow an overlay to be positioned within a DOM element rather than overlaid on top of everything. Default: false.
 * @param {Boolean} opts.nofocus - If set to true, the tabindex will not be set on the wrapper element. Useful in conjunction with the nested and parentnode options. Default: false.
 * @param {Boolean} opts.fullscreen - If set to true, the overlay will display full screen. This overlay disables scroll on the underlying document and is dismissible with the back button.
*/
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
		this.context = oLayers.getLayerContext(this.opts.trigger);
	} else {
		if (document.querySelector(this.opts.parentnode)) {
			this.context = document.querySelector(this.opts.parentnode);
		} else {
			this.context = document.body;
		}
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

	// A full screen overlay can look like a new page so add to history.
	// The browser back button can then be used to close a full-screen overlay.
	if (window.history.pushState && this.opts.fullscreen) {
		this.popstateHandler = this.close.bind(this);
		this.originalOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		window.addEventListener("popstate", this.popstateHandler);
		window.history.pushState({ 'overlay': 'fullscreen' }, window.location.href);
	}

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

	// Add custom classes to the newly created overlay wrapper.
	try {
		wrapperEl.classList.add(...this.opts.class.split(' '));
	} catch (error) {
		console.warn(`Could not add the classes: ${this.opts.class}`);
	}

	if (this.opts.fullscreen) {
		wrapperEl.classList.add('o-overlay--full-screen');
	}

	wrapperEl.setAttribute('role', 'dialog');
	if (this.opts.zindex) {
		wrapperEl.style.zIndex = this.opts.zindex;
	}
	this.wrapper = wrapperEl;

	if (this.opts.heading) {
		const heading = document.createElement('header');
		const headingId = this.opts.heading.title.replace(' ', '-').toLowerCase();
		heading.classList.add('o-overlay__heading');
		heading.setAttribute('id', headingId);
		wrapperEl.setAttribute('aria-labelledby', headingId);

		if (this.opts.heading.shaded) {
			heading.classList.add('o-overlay__heading--shaded');
		}

		if (!this.opts.preventclosing) {
			const button = document.createElement('a');
			button.className = 'o-overlay__close';
			button.setAttribute('role', 'button');
			button.setAttribute('href', '#void');
			button.setAttribute('aria-label', 'Close');
			button.setAttribute('title', 'Close');
			if (!this.opts.nofocus) {
				button.setAttribute('tabindex', '0');
			}
			heading.appendChild(button);
		}

		const title = document.createElement('span');
		title.setAttribute('role', 'heading');
		title.className = 'o-overlay__title';

		if (!this.opts.heading.visuallyHideTitle) {
			title.innerHTML = this.opts.heading.title;
		}

		heading.appendChild(title);
		wrapperEl.appendChild(heading);
	}

	if (this.opts.tooltip) {
		const button = document.createElement('a');
		button.className = 'o-overlay__close';
		button.setAttribute('role', 'button');
		button.setAttribute('href', '#void');
		button.setAttribute('aria-label', 'Close');
		button.setAttribute('title', 'Close');
		if (!this.opts.nofocus) {
			button.setAttribute('tabindex', '0');
		}

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

	if (!this.opts.nested) {
		this.resizeListenerHandler = this.resizeListener.bind(this);
		this.delegates.doc.on('oViewport.resize', 'body', this.resizeListenerHandler);

		this.closeOnEscapePressHandler = this.closeOnEscapePress.bind(this);
		this.delegates.doc.on('keyup', this.closeOnEscapePressHandler);
	}

	if (this.opts.layer) {
		this.closeOnNewLayerHandler = this.closeOnNewLayer.bind(this);
		this.delegates.context.on('oLayers.new', this.closeOnNewLayerHandler);

		this.broadcast('new', 'oLayers');
	}

	if (this.opts.heading || this.opts.tooltip || this.opts.customclose) {
		this.delegates.wrap.on('click', '.o-overlay__close', this.closeHandler);
		this.delegates.wrap.on('touchend', '.o-overlay__close', this.closeHandler);
	}

	this.closeOnExternalClickHandler = this.closeOnExternalClick.bind(this);
	this.delegates.doc.on('click', 'body', this.closeOnExternalClickHandler);
	this.delegates.doc.on('touchend', 'body', this.closeOnExternalClickHandler);

	this.context.appendChild(this.wrapper);

	// Give the overlay focus
	if (!this.opts.nofocus) {
		this.wrapper.setAttribute('tabindex', '0');
		this.wrapper.style.outline = 0;
	}

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

		// If the overlay is nested within a DOM element don't attach the viewport resize listeners
		if (!overlay.opts.nested) {
			overlay.respondToWindow(viewport.getSize());
		}
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

	// Remove fullscreen popstate handler and re-enable document scroll.
	if (this.opts.fullscreen) {
		window.removeEventListener("popstate", this.popstateHandler);
		document.body.style.overflow = this.originalOverflow;
	}
	// Remove state from history if fullscreen state is still in history.
	// E.g.The close button was clicked directly rather than the browser back button.
	if (window.history.pushState &&
		window.history.state &&
		window.history.state.overlay === 'fullscreen'
	) {
		window.history.back();
	}

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

	if (this.opts.layer) {
		this.broadcast('close', 'oLayers');
	}

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
		this.wrapper.style['margin' + utils.capitalise(edge)] = -(this.wrapper['offset' + utils.capitalise(dimension)]/2) + 'px';

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
