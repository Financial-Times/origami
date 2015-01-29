'use strict';

var toggleSelector = 'button.o-expander__toggle';
var viewport = require('o-viewport');

var Expander = function (el, opts) {
    viewport.listenTo('resize');
    viewport.listenTo('orientation');
    opts = opts || {};
    opts.shrinkTo = el.dataset.shrinkTo || opts.shrinkTo || 'height'; //height or number
    opts.countSelector = el.dataset.countSelector || opts.countSelector;
    opts.expandedToggleText = el.dataset.expandedToggleText || opts.expandedToggleText || 'less';
    opts.collapsedToggleText = el.dataset.collapsedToggleText || opts.collapsedToggleText || 'more';

    if (typeof opts.shrinkTo === 'number' && !opts.countSelector) {
        throw('when collapsing to a number of items specify a selector to identify how many items exist');
    }
    this.el = el;
    this.opts = opts;
    this.toggle = this.el.querySelector(toggleSelector);
    if (!this.toggle) {
        throw('this expander needs a toggle button (use a button not a link');
    }

    if (this.opts.shrinkTo === 'height') {
        this.init = this.init.bind(this);
        document.body.addEventListener('oViewport.orientation', this.init);
        document.body.addEventListener('oViewport.resize', this.init);
    }
}

Expander.prototype.init = function () {
    if (!this.isRequired()) {
        this.el.classList.add('o-expander--inactive');
    } else {
        if (typeof this.opts.shrinkTo === 'number') {
            this.el.querySelectorAll(this.opts.countSelector)[this.opts.shrinkTo - 1].classList.add('o-expander__last-permanent-item');
        }
        this.displayState();
        this.toggle.addEventListener('click', this.invertState.bind(this));
    }
}

Expander.prototype.isCollapsed = function () {
    var attr = this.el.getAttribute('aria-expanded');
    return !attr || attr === 'false';
}

Expander.prototype.invertState = function () {
    this.isCollapsed() ? this.expand() : this.collapse();
}

Expander.prototype.displayState = function (state) {
    this.isCollapsed() ? this.collapse() : this.expand();
}

Expander.prototype.expand = function () {
    this.el.setAttribute('aria-expanded', true);
    this.toggle.innerHTML = this.opts.expandedToggleText + '<i></i>';
    this.emit('expand');
}

Expander.prototype.collapse = function () {
    this.el.setAttribute('aria-expanded', false);
    this.toggle.innerHTML = this.opts.collapsedToggleText + '<i></i>';
    this.emit('collapse');
}

Expander.prototype.emit = function (name) {
    this.el.dispatchEvent(new CustomEvent('oExpander.' + name));
}

Expander.prototype.isRequired = function () {
    var overflows = false;
    if (typeof this.opts.shrinkTo === 'number') {
        if (this.el.querySelectorAll(this.opts.countSelector).length > this.opts.shrinkTo) {
            overflows = true;
        }
    } else {
        if (this.isCollapsed()) {
            overflows = this.el.clientHeight < this.el.scrollHeight;
        } else {
            this.collapse();
            overflows = this.el.clientHeight < this.el.scrollHeight;
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


    // this can all be event driven, outside the module
    // if (!card.classList.contains('next-card--expanded')) {
    //     if (setNaturalHeight) {
    //         card.style.height = card.offsetHeight + 'px';
    //     }
    // }

    // if (card.classList.contains('next-card--expanded')) {
    //     if (setNaturalHeight) {
    //         card.style.height = '';
    //     }
    // }