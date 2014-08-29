'use strict';

var Delegate = require('dom-delegate');
var viewport = require('o-viewport');
viewport.listenTo('resize');
var oLayers = require('o-layers');
var utils = require('./utils');
var overlays = {};

var checkOptions = function(opts) {
	if (opts.trigger && !(opts.trigger instanceof HTMLElement)) {
		opts.trigger = document.querySelector(opts.trigger);
	}
	// There can't be a heading with an empty title
	if (opts.heading && (!opts.heading.title || !opts.heading.title.trim())) {
		throw new Error('"o-overlay error": To have a heading, a non-empty title needs to be set');
	}

	// Overlays that don't point at anything should be modal by default
	if (!opts.arrow && typeof opts.modal === 'undefined') {
		opts.modal = true;
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
	}

	return opts;
};

var getOptionsFromTrigger = function(trigger) {
	var opts = {};
	// Get config from data attributes set in the trigger if they haven't been passed via JS
	if (trigger instanceof HTMLElement) {		
		Array.prototype.forEach.call(trigger.attributes, function(attr) {
			if (attr.name.indexOf('data-o-overlay') === 0) {
				// Remove the unnecessary part of the string the first time this is run for each attribute
				var key = attr.name.replace('data-o-overlay-', '');
				opts = utils.optionsFromKey(key, attr.value.toLowerCase(), opts);
			}
		});
		opts.trigger = trigger;
	}
	return opts;
};

var triggerClickHandler = function(id) {
	var overlay = overlays[id];
	if (overlay) {
		if (overlay.visible === true) {
			overlay.close();
		} else {
			overlay.open();
		}
	}
};

var Overlay = function(id, opts) {
	this.visible = false;
	this.id = id;

	this.opts = checkOptions(opts);
	if (!this.opts) {
		throw new Error('"o-overlay error": Required options have not been set');
	}
	if (this.opts.trigger) {
		this.opts.trigger.addEventListener('click', triggerClickHandler.bind(this.opts.trigger, id), false);
	}
	this.context = this.opts.arrow ? oLayers.getLayerContext(this.opts.arrow.target) : oLayers.getLayerContext(this.opts.trigger);

	// Add this overlay to the overlays hashmap
	overlays[id] = this;
};

Overlay.prototype = {

	open: function() {
		if (!this.content) {
			var self = this;
			this.loadContent(function(html) {
				self.opts.html = html;
				if (!self.opts.html) {
					throw new Error('"o-overlay error": Content for the overlay needs to be set via the "html" or the "src" option.');
				}
				self.render();
			});
		} else {
			this.show();
		}
	},

	loadContent: function(callback) {
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
		
	},

	render: function() {
		var wrapperEl = document.createElement('div');
		wrapperEl.className = 'o-overlay';
		this.wrapper = wrapperEl;

		if (this.opts.heading) {
			var heading = document.createElement('header');
			heading.classList.add('o-overlay__heading');

			if (this.opts.heading.shaded) {
				heading.classList.add('o-overlay__heading--shaded');
			}

			var button = document.createElement('button');
			button.className = 'o-overlay__close';
			var buttonIcon = document.createElement('div');
			buttonIcon.className = 'o-overlay__close-icon';
			button.appendChild(buttonIcon);

			var title = document.createElement('span');
			title.setAttribute('role', 'heading');
			title.className = 'o-overlay__title';
			title.innerHTML = this.opts.heading.title;

			heading.appendChild(button);
			heading.appendChild(title);
			wrapperEl.appendChild(heading);
		}

		var content = document.createElement('section');
		content.className = 'o-overlay__content';
		wrapperEl.appendChild(content);

		this.content = content;

		if (typeof this.opts.html === 'string') {
			this.content.innerHTML = this.opts.html;
		} else {
			this.content.appendChild(this.opts.html);
		}

		this.show();
	},

	show: function() {
		if (this.opts.modal) {
			this.wrapper.classList.add('o-overlay--modal');
			var shadow = document.createElement('div');
			shadow.className = 'o-overlay-shadow';
			this.shadow = shadow;
			document.body.appendChild(shadow);
		}

		this.content.focus();

		this.delegates = {
			doc: new Delegate(document.body),
			wrap: new Delegate(this.wrapper),
			context: new Delegate(this.context)
		};
			
		this.close = this.close.bind(this);
		this.resizeListener = this.resizeListener.bind(this);
		this.delegates.doc.on('oViewport.resize', 'body', this.resizeListener);
		this.closeOnNewLayer = this.closeOnNewLayer.bind(this);
		this.delegates.context.on('oLayers.new', this.closeOnNewLayer);

		if (this.opts.heading) {
			this.delegates.wrap.on('click', '.o-overlay__close', this.close);
		}

		this.closeOnExternalClick = this.closeOnExternalClick.bind(this);
		this.delegates.doc.on('click', 'body', this.closeOnExternalClick);

		this.closeOnEscapePress = this.closeOnEscapePress.bind(this);
		this.delegates.doc.on('keyup', this.closeOnEscapePress);

		this.broadcast('new', 'oLayers');
		this.context.appendChild(this.wrapper);
		this.visible = true;
		this.width = this.getWidth();
		this.height = this.getHeight();
		this.respondToWindow(viewport.getSize());
	},

	realign: function(dimension, size) {
		var edge = dimension === 'width' ? 'left' : 'top';

		if (size <= this[dimension]) {
			this.wrapper.classList.add('o-overlay--full-' + dimension);
			this.wrapper.style['margin' + utils.capitalise(edge)] = 0;
		} else {
			this.wrapper.classList.remove('o-overlay--full-' + dimension);
			if (!this.opts.arrow) {
				this.wrapper.style['margin' + utils.capitalise(edge)] = -(this.wrapper['offset' + utils.capitalise(dimension)]/2) + 'px';
			}
		}
	},

	close: function() {
		this.delegates.doc.off();
		this.delegates.wrap.off();
		this.delegates.context.off();
		this.context.removeChild(this.wrapper);
		if (this.opts.modal) {
			this.shadow.parentNode.removeChild(this.shadow);
		}
		this.visible = false;
	},

	closeOnExternalClick: function(ev) {

		// Close the overlay if it's not modal and the click wasn't made on the actual overlay
		if (!this.wrapper.contains(ev.target) && !this.opts.trigger.contains(ev.target)) {
			if (!this.opts.modal) {
				this.close();
			}
		}
	},

	closeOnEscapePress: function(ev) {
		if (ev.keyCode === 27) {
			this.close();
		}
	},

	closeOnNewLayer: function(ev) {
		if (!ev.detail || ev.detail.el !== this) {
			this.close();
		}
	},

	resizeListener: function(ev) {
		if (!this.wrapper.contains(ev.target)) {
			this.respondToWindow(ev.detail.viewport);
		}
	},

	broadcast: function(eventType, namespace, data) {
		namespace = namespace || 'oOverlay';
		var target = namespace === 'oLayers' ? this.context : this.wrapper;
		target.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
			detail: {
				el: this,
				data: data || {}
			},
			// Don't bubble above the overlay's layer context otherwise we risk triggering a listener on a parent context
			bubbles: namespace !== 'oLayers' ? true : false
		}));
	},

	respondToWindow: function(size) {
		this.realign('width', size.width);
		this.realign('height', size.height);

		if (this.opts.arrow && !this.fills()) {
			this.opts.arrow.currentposition = this.getCurrentArrowposition(this.opts.arrow.position);
			this.wrapper.classList.add('o-overlay__arrow-' + this.opts.arrow.currentposition);

			var offset = 0;
			// Protrusion distance for the arrow. It's 13 due to the border around it
			var arrowSize = 13;
			var targetClientRect = this.opts.arrow.target.getBoundingClientRect();
			switch (this.opts.arrow.currentposition) {
				case 'left':
					offset = targetClientRect.right + arrowSize;
					break;
				case 'right':
					offset = targetClientRect.left - this.width - arrowSize;
					break;
				case 'top':
					offset = targetClientRect.bottom + arrowSize;
					break;
				case 'bottom':
					offset = targetClientRect.top - this.height - arrowSize;
					break;
			}

			var edge = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'left' : 'top';
			var oppositeEdge = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'top' : 'left';
			var dimension = (this.opts.arrow.currentposition === 'left' || this.opts.arrow.currentposition === 'right') ? 'height' : 'width';
			this.wrapper.style[edge] = offset + 'px';
			// 1. Get where the element is positioned
			// 2. Add its width or height divided by two to get its center
			// 3. Substract the width or height divided by two of the overlay so the arrow, which is in the center, points to the center of the side of the target
			this.wrapper.style[oppositeEdge] = targetClientRect[oppositeEdge] + (targetClientRect[dimension] / 2) - (this[dimension] / 2) + 'px'; 
		} else {
			this.wrapper.classList.remove('o-overlay__arrow-top', 
											'o-overlay__arrow-bottom',
											'o-overlay__arrow-left',
											'o-overlay__arrow-right');
		}
	},

	getCurrentArrowposition: function(position) {
		var targetClientRect = this.opts.arrow.target.getBoundingClientRect();
		// Protrusion distance for the arrow. It's 13 due to the border around it
		var arrowSize = 13;
		var wrapperWidth = this.wrapper.getBoundingClientRect().width + arrowSize;
		var wrapperHeight = this.wrapper.getBoundingClientRect().height + arrowSize;
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
	},

	getWidth: function() {
		return this.wrapper.offsetWidth + utils.getSpacing(this.wrapper, 'left') + utils.getSpacing(this.wrapper, 'right');
	},

	getHeight: function() {
		return this.wrapper.offsetHeight + utils.getSpacing(this.wrapper, 'top') + utils.getSpacing(this.wrapper, 'bottom');
	},

	fills: function(dimension) {
		return this.wrapper.classList.contains('o-overlay--full-' + dimension);
	},

	destroy: function() {
		if (this.opts.trigger) {
			this.opts.trigger.removeEventListener('click', triggerClickHandler);
		}
		delete overlays[this.id];
	}
};

Overlay.init = function(el) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	var triggers = el.querySelectorAll('.o-overlay-trigger');
	for (var t = 0; t < triggers.length; t++) {
		// There can only be one overlay per trigger when set declaratively, so the first trigger found for a given overlay will be the one used to create the overlay
		if (!overlays[triggers[t].getAttribute('data-o-overlay-id')]) {
			new Overlay(triggers[t].getAttribute('data-o-overlay-id'), getOptionsFromTrigger(triggers[t]));
		}
	}
};

Overlay.destroy = function() {
	var overlayIds = Object.keys(overlays);
	overlayIds.forEach(function(id) { 
		overlays[id].destroy(); 
	});
};

Overlay.getOverlays = function() {
	return overlays;
};

module.exports = Overlay;