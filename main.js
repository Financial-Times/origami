'use strict';

var toggleSelector = 'button.o-expander__toggle';
var contentSelector = '.o-expander__content';
var viewport = require('o-viewport');
var count = 0;

var Expander = function (el, opts) {
    viewport.listenTo('resize');
    viewport.listenTo('orientation');
    this.opts = opts || {};
    this.el = el;

    this.configure('shrinkTo', 'height');
    this.configure('countSelector', 'li');
    this.configure('expandedToggleText', this.opts.shrinkTo === 'height' ? 'less' : 'fewer');
    this.configure('collapsedToggleText', 'more');


    if (/^\d+$/.test(this.opts.shrinkTo)) {
        this.opts.shrinkTo = +this.opts.shrinkTo;
    }
    if (typeof this.opts.shrinkTo === 'number' && !this.opts.countSelector) {
        throw('when collapsing to a number of items specify a selector to identify how many items exist');
    }

    this.contentEl = this.el.querySelector(contentSelector);

    this.toggle = this.el.querySelector(toggleSelector);

    if (!this.toggle) {
        throw('this expander needs a toggle button (use a button not a link');
    }
    this.ariaToggle();

    if (this.opts.shrinkTo === 'height') {
        this.apply = this.apply.bind(this);
        document.body.addEventListener('oViewport.orientation', this.apply);
        document.body.addEventListener('oViewport.resize', this.apply);
    }

    this.toggle.addEventListener('click', this.invertState.bind(this));

    this.apply(true);
    this.emit('init');
}

Expander.prototype.configure = function (setting, defaultVal) {
    this.opts[setting] = this.el.getAttribute('data-o-expander-' + setting.replace(/[A-Z]/g, function ($0) {
        return '-' + $0.toLowerCase();
    })) || this.opts[setting] || defaultVal;
}

Expander.prototype.apply = function (isSilent) {
    if (!this.isRequired()) {
        this.el.classList.add('o-expander--inactive');
    } else {
        this.el.classList.remove('o-expander--inactive');
        if (typeof this.opts.shrinkTo === 'number') {
            this.el.querySelectorAll(this.opts.countSelector)[this.opts.shrinkTo].classList.add('o-expander__first-collapsible-item');
        }
        if (this.el.getAttribute('aria-expanded')) {
            this.displayState(isSilent);
        } else {
            this.collapse(isSilent);
        }
    }
}

Expander.prototype.ariaToggle = function () {
    this.id = this.contentEl.id;

    if (!this.id) {
        while(document.querySelector('#o-expander-' + count)) {
            count++;
        }
        this.id = this.contentEl.id = 'o-expander-' + count;
    }
    this.toggle.setAttribute('aria-controls', this.id);
}

Expander.prototype.isCollapsed = function () {
    var attr = this.contentEl.getAttribute('aria-expanded');
    return !attr || attr === 'false';
}

Expander.prototype.invertState = function () {
    this.isCollapsed() ? this.expand() : this.collapse();
}

Expander.prototype.displayState = function (isSilent) {
    this.isCollapsed() ? this.collapse(isSilent) : this.expand(isSilent);
}

Expander.prototype.expand = function (isSilent) {
    this.contentEl.setAttribute('aria-expanded', true);
    this.toggle.innerHTML = this.opts.expandedToggleText + '<i></i>';
    this.toggle.classList.add('o-expander__toggle--expanded');
    this.toggle.classList.remove('o-expander__toggle--collapsed');
    if (!isSilent) {
        this.emit('expand');
    }
}

Expander.prototype.collapse = function (isSilent) {
    this.contentEl.setAttribute('aria-expanded', false);
    this.toggle.innerHTML = this.opts.collapsedToggleText + '<i></i>';
    this.toggle.classList.remove('o-expander__toggle--expanded');
    this.toggle.classList.add('o-expander__toggle--collapsed');
    if (!isSilent) {
        this.emit('collapse');
    }
}

Expander.prototype.emit = function (name) {
    this.el.dispatchEvent(new CustomEvent('oExpander.' + name, {bubbles: true}));
}

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
}

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