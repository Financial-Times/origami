'use strict';

var Expander = function (el, opts) {
    opts = opts || {};
    opts.shrinkToHeight = el.dataset.shrinkToHeight || opts.shrinkToHeight;
    opts.shrinkToCount = el.dataset.shrinkToCount || opts.shrinkToCount;
    opts.toggleSelector = el.dataset.toggleSelector || opts.toggleSelector;
    opts.countSelector = el.dataset.countSelector || opts.countSelector;
    opts.trackNaturalHeight = el.dataset.trackNaturalHeight || opts.trackNaturalHeight;
    opts.responsive = el.dataset.responsive || opts.responsive;

    if (!opts.shrinkToHeight && ! opts.shrinkToCount) {
        throw('specify whhether you will be shrinking to a number of items or a given height');
    }
    this.el = el;
    this.opts = opts;
    this.toggle = this.el.querySelector(this.opts.toggleSelector);
    if (!this.toggle) {
        throw('this expander needs a toggle button');
    }
    this.displayState();
    this.toggle.addEventListener('click', this.invertState.bind(this));
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
    this.toggle.innerHTML = 'view fewer<i class="icon-arrow-up"></i>';
    this.emit('expand');
}

Expander.prototype.collapse = function () {
    this.el.setAttribute('aria-expanded', false);
    this.toggle.innerHTML = 'view more<i class="icon-arrow-down"></i>';
    this.emit('collapse');
}

Expander.prototype.emit = function (name) {
    this.el.dispatchEvent(new CustomEvent('oExpander.' + name));
}

Expander.prototype.isRequired = function () {
    // work out if there's enough content to require an expander
    // add a js class if there is
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