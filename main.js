'use strict';

var viewport = require('o-viewport');
var count = 0;

var Expander = function (el, opts) {

	this.opts = opts || {};
	this.el = el;

	this.configure('shrinkTo', 'height');
	this.configure('countSelector', '.o-expander__content > li');
	this.configure('expandedToggleText', this.opts.shrinkTo === 'height' ? 'less' : 'fewer');
	this.configure('collapsedToggleText', 'more');
	this.configure('toggleSelector', 'button.o-expander__toggle');


	if (/^\d+$/.test(this.opts.shrinkTo)) {
		this.opts.shrinkTo = +this.opts.shrinkTo;
	}
	if (typeof this.opts.shrinkTo === 'number' && !this.opts.countSelector) {
		throw('when collapsing to a number of items specify a selector to identify how many items exist');
	}

	this.contentEl = this.el.querySelector('.o-expander__content');

	this.toggle = this.el.querySelector(this.opts.toggleSelector);

	if (!this.toggle) {
		throw('this expander needs a toggle button (use a button not a link)');
	}
	this.ariaToggle();

	if (this.opts.shrinkTo === 'height') {
		viewport.listenTo('resize');
		viewport.listenTo('orientation');
		this.apply = this.apply.bind(this);
		document.body.addEventListener('oViewport.orientation', this.apply);
		document.body.addEventListener('oViewport.resize', this.apply);
	}

	this.invertState = this.invertState.bind(this);
	this.toggle.addEventListener('click', this.invertState);
	this.el.setAttribute('data-o-expander-js', '');
	this.apply(true);
	this.emit('init');
};

Expander.prototype.configure = function (setting, defaultVal) {
	var candidate = this.el.getAttribute('data-o-expander-' + setting.replace(/[A-Z]/g, function ($0) {
		return '-' + $0.toLowerCase();
	}));
	if (typeof candidate === 'undefined' || candidate === null) {
		candidate = this.opts[setting];
	}
	this.opts[setting] = !(typeof candidate === 'undefined' || candidate === null) ? candidate : defaultVal;
};

Expander.prototype.apply = function (isSilent) {
	if (!this.isRequired()) {
		this.el.classList.add('o-expander--inactive');
	} else {
		this.el.classList.remove('o-expander--inactive');
		if (typeof this.opts.shrinkTo === 'number') {
			[].slice.call(this.el.querySelectorAll(this.opts.countSelector), this.opts.shrinkTo).forEach(function (el) {
				el.classList.add('o-expander__collapsible-item');
			});
		}
		if (this.contentEl.getAttribute('aria-expanded')) {
			this.displayState(isSilent);
		} else {
			this.collapse(isSilent);
		}
	}
};

Expander.prototype.destroy = function () {
	if (this.opts.shrinkTo === 'height') {
		document.body.removeEventListener('oViewport.orientation', this.apply);
		document.body.removeEventListener('oViewport.resize', this.apply);
	}
	this.toggle.removeEventListener('click', this.invertState);
	this.toggle.removeAttribute('aria-controls');
	this.toggle.removeAttribute('aria-pressed');
	this.el.removeAttribute('data-o-expander-js');
	this.el.classList.remove('o-expander');
};

Expander.prototype.ariaToggle = function () {
	this.id = this.contentEl.id;

	if (!this.id) {
		while(document.querySelector('#o-expander__toggle--' + count)) {
			count++;
		}
		this.id = this.contentEl.id = 'o-expander__toggle--' + count;
	}
	this.toggle.setAttribute('aria-controls', this.id);
};

Expander.prototype.isCollapsed = function () {
	var attr = this.contentEl.getAttribute('aria-expanded');
	return !attr || attr === 'false';
};

Expander.prototype.invertState = function () {
	this.isCollapsed() ? this.expand() : this.collapse();
};

Expander.prototype.displayState = function (isSilent) {
	this.isCollapsed() ? this.collapse(isSilent) : this.expand(isSilent);
};

Expander.prototype.expand = function (isSilent) {
	this.contentEl.setAttribute('aria-expanded', true);
	this.toggle.innerHTML = this.opts.expandedToggleText + '<i></i>';
	this.toggle.setAttribute('aria-pressed', '');
	if (!isSilent) {
		this.emit('expand');
	}
};

Expander.prototype.collapse = function (isSilent) {
	this.contentEl.setAttribute('aria-expanded', false);
	this.toggle.innerHTML = this.opts.collapsedToggleText + '<i></i>';
	this.toggle.removeAttribute('aria-pressed');
	if (!isSilent) {
		this.emit('collapse');
	}
};

Expander.prototype.emit = function (name) {
	this.el.dispatchEvent(new CustomEvent('oExpander.' + name, {bubbles: true}));
};

Expander.prototype.isRequired = function () {
	var overflows = false;
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
};

var init = function(el, opts) {
	if (!el) {
		el = document.body;
	}
	if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}
	if (/\bo-expander\b/.test(el.getAttribute('data-o-component'))) {
		return new Expander(el, opts);
	}
	return [].map.call(el.querySelectorAll('[data-o-component~="o-expander"]'), function (el) {
		return new Expander(el, opts);
	});
};

var constructAll = function() {
	init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof window !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}


module.exports = {
	init: init
};
