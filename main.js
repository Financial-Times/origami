const viewport = require('o-viewport');

const rootClassName = 'o-expander';
let count = 0;


const expandMethods = {
	toggleContent: function (state) {
		if (state === 'expand') {
			this.contentEl.classList.add(this.contentClassName + '--expanded');
			this.contentEl.classList.remove(this.contentClassName + '--collapsed');
		} else {
			this.contentEl.classList.remove(this.contentClassName + '--expanded');
			this.contentEl.classList.add(this.contentClassName + '--collapsed');
		}
	},
	hasStateDefined: function () {
		return this.contentEl.classList.contains(this.contentClassName + '--expanded') || this.contentEl.classList.contains(this.contentClassName + '--collapsed');
	},
	isRequired: function () {
		let overflows = false;
		if (typeof this.opts.shrinkTo === 'number') {
			if (this.el.querySelectorAll(this.opts.countSelector).length > this.opts.shrinkTo) {
				overflows = true;
			}
		} else {
			if (this.isCollapsed()) {
				overflows = this.contentEl.clientHeight < this.contentEl.scrollHeight;
			} else {
				this.collapse();
				overflows = this.contentEl.clientHeight < this.contentEl.scrollHeight;
				this.expand();
			}
		}
		return overflows;
	},
	isCollapsed: function () {
		return !this.contentEl.classList.contains(this.contentClassName + '--expanded');
	}
};

const hiderMethods = {
	toggleContent: function (state) {
		if (state === 'expand') {
			this.contentEl.setAttribute('aria-hidden', 'false');
		} else {
			this.contentEl.setAttribute('aria-hidden', 'true');
		}
	},
	hasStateDefined: function () {
		return this.contentEl.hasAttribute('aria-hidden');
	},
	isRequired: function () {
		return true;
	},
	isCollapsed: function () {
		return this.contentEl.getAttribute('aria-hidden') === 'true';
	}
};


function mixin(target, methods) {
	Object.keys(methods).forEach(function (key) {
		target[key] = methods[key];
	});
}

const Expander = function (el, opts) {
	this.opts = opts || {};
	this.el = el;

	this.className = this.opts.className || rootClassName;
	this.contentClassName = this.opts.contentClassName || rootClassName + '__content';
	this.toggleClassName = this.opts.toggleClassName || rootClassName + '__toggle';

	this.configure('shrinkTo', 'height');
	this.configure('countSelector', '.' + this.contentClassName + ' > li');
	this.configure('expandedToggleText', this.opts.shrinkTo === 'hidden' ? 'hide' : this.opts.shrinkTo === 'height' ? 'less' : 'fewer');
	this.configure('collapsedToggleText', this.opts.shrinkTo === 'hidden' ? 'show' : 'more');
	this.configure('toggleSelector', '.' + this.toggleClassName);
	this.configure('toggleState', 'all');


	if (/^\d+$/.test(this.opts.shrinkTo)) {
		this.opts.shrinkTo = +this.opts.shrinkTo;
	}

	if (this.opts.shrinkTo === 'hidden') {
		mixin(this, hiderMethods);
	} else {
		mixin(this, expandMethods);
	}

	if (typeof this.opts.shrinkTo === 'number' && !this.opts.countSelector) {
		throw new Error('when collapsing to a number of items specify a selector to identify how many items exist');
	}

	this.contentEl = this.el.querySelector('.' + this.contentClassName);

	this.toggles = [].slice.apply(this.el.querySelectorAll(this.opts.toggleSelector));

	if (!this.toggles.length) {
		throw new Error('o-expander needs a toggle link or button');
	}
	this.ariaToggles();

	if (this.opts.shrinkTo === 'height') {
		viewport.listenTo('resize');
		viewport.listenTo('orientation');
		document.body.addEventListener('oViewport.orientation', () => this.apply());
		document.body.addEventListener('oViewport.resize', () => this.apply());
	}

	this.toggles.forEach(toggle => {
		toggle.addEventListener('click', () => this.invertState());
	});
	this.el.setAttribute('data-o-expander-js', '');
	this.apply(true);
	this.emit('init');
};

Expander.prototype.configure = function (setting, defaultVal) {
	let candidate = this.el.getAttribute('data-o-expander-' + setting.replace(/[A-Z]/g, function ($0) {
		return '-' + $0.toLowerCase();
	}));
	if (typeof candidate === 'undefined' || candidate === null) {
		candidate = this.opts[setting];
	}
	this.opts[setting] = !(typeof candidate === 'undefined' || candidate === null) ? candidate : defaultVal;
};

Expander.prototype.apply = function (isSilent) {
	if (!this.isRequired()) {
		this.el.classList.add(this.className + '--inactive');
	} else {
		this.el.classList.remove(this.className + '--inactive');
		if (typeof this.opts.shrinkTo === 'number') {
			[].slice.call(this.el.querySelectorAll(this.opts.countSelector), this.opts.shrinkTo)
				// The class is added via JS, so it can use the default name
				.forEach(el => el.classList.add('o-expander__collapsible-item'));
		}
		if (this.hasStateDefined()) {
			this.displayState(isSilent);
		} else {
			this.collapse(isSilent);
		}
	}
};

Expander.prototype.destroy = function () {
	if (this.opts.shrinkTo === 'height') {
		document.body.removeEventListener('oViewport.orientation', () => this.apply());
		document.body.removeEventListener('oViewport.resize', () => this.apply());
	}
	this.toggles.forEach(toggle => {
		toggle.removeEventListener('click', this.invertState);
		toggle.removeAttribute('aria-controls');
		toggle.removeAttribute('aria-expanded');
	});
	this.contentEl.removeAttribute('aria-hidden');
	this.contentEl.classList.remove(this.contentClassName + '--expanded');
	this.contentEl.classList.remove(this.contentClassName + '--collapsed');
	this.el.removeAttribute('data-o-expander-js');
};

Expander.prototype.ariaToggles = function () {
	this.id = this.contentEl.id;

	if (!this.id) {
		while(document.querySelector('#o-expander__toggle--' + count)) {
			count++;
		}
		this.id = this.contentEl.id = 'o-expander__toggle--' + count;
	}

	const id = this.id;
	this.toggles.forEach(toggle => toggle.setAttribute('aria-controls', id));
};

Expander.prototype.invertState = function () {
	if (this.isCollapsed()) {
		this.expand();
	} else {
		this.collapse();
	}
};

Expander.prototype.displayState = function (isSilent) {
	if (this.isCollapsed()) {
		this.collapse(isSilent);
	} else {
		this.expand(isSilent);
	}
};


Expander.prototype.expand = function (isSilent) {
	this.toggleExpander('expand', isSilent);
};

Expander.prototype.collapse = function (isSilent) {
	this.toggleExpander('collapse', isSilent);
};

Expander.prototype.emit = function (name) {
	this.el.dispatchEvent(new CustomEvent('oExpander.' + name, {bubbles: true}));
};

Expander.prototype.toggleExpander = function (state, isSilent) {
	this.toggleContent(state);
	if (this.opts.toggleState !== 'none') {
		this.toggles.forEach(toggle => {
			if (this.opts.toggleState !== 'aria') {
				toggle.innerHTML = this.opts[state === 'expand' ? 'expandedToggleText' : 'collapsedToggleText'] + '<i></i>';
			}
			toggle.setAttribute('aria-expanded', state === 'expand' ? 'true' : 'false');
		});
	}
	if (!isSilent) {
		this.emit(state);
	}
};

const construct = function (el, opts) {
	return el.hasAttribute('data-o-expander-js') ? undefined : new Expander(el, opts);
};

Expander.init = function(el, opts) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (el instanceof HTMLElement && /\bo-expander\b/.test(el.getAttribute('data-o-component'))) {
		return construct(el, opts);
	}
	return [].map.call(el.querySelectorAll('[data-o-component~="o-expander"]'), el => construct(el, opts));
};

const constructAll = function() {
	Expander.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);


module.exports = Expander;
