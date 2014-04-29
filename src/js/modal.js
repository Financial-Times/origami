"use strict";

var Delegate = require('dom-delegate');
var delegate;



    // globals.L = 'left';
    // globals.R = 'right';
    // globals.T = 'top';
    // globals.B = 'bottom';
    // globals.H = 'height';
    // globals.W = 'width';

var _ = require('lodash');

var unCapitalise = function (str) {
    return str.charAt(0).toLowerCase() + str.substr(1);
};

var capitalise = function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
};

var copyContent = function (content) {
    return content.nodeName === 'SCRIPT' ? content.innerHTML: content.cloneNode(true);
};

function getSpacing(el, side) {
    return (parseInt(el.style['padding' + capitalise(side)), 10) || 0) + (parseInt(el.style['margin' + capitalise(side)), 10) || 0);
}

var setOptions = function (opts, trigger) {
    
    if (typeof opts === 'string') {
        opts = { src: opts };
    } else {
        opts = opts || {};
    }

    // get config from data attributes on trigger
    if (trigger) {
        Object.keys(trigger.dataset).forEach(function (key) {
            if (key.indexOf('oModal') === 0) {
                opts[unCapitalise(key.substr(6))] = trigger.dataset[key];
            }
        });
    }

    if (!opts.src) { return; }

    if (!opts.srcType) {
        if (/^(https?\:\/)?\//.test(opts.src)) {
            opts.srcType = 'url';
        } else if ((opts.content = $(opts.src)) && opts.content.length) {
            opts.srcType = 'selector';
            opts.content = copyContent(opts.content);
        } else {
            opts.srcType = 'string';
            opts.content = opts.src;
        }
    } else if (opts.srcType === 'selector') {
        opts.content = copyContent($(opts.src));
    } else if (opts.srcType === 'string') {
        opts.content = opts.src;
    }

    return _.defaults(opts, Modal.defaults);

};


var Modal = function (opts, trigger) {
    this.trigger = trigger;
    this.opts = setOptions(opts, trigger);

    if (!this.opts) { return opts.onFail.call(this); }
    
    this.context = this.opts.context || document.body;
    this.create();
};

Modal.listen = function () {
    delegate = delegate || new Delegate(document.body);

    delegate.on('click', 'o-modal__trigger', function (ev) {
        new Modal(null, ev.target);
        ev.preventDefault();
    });
};

Modal.unlisten = function () {
    delegate && delegate.off('click', 'o-modal__trigger');
};

Modal.defaults = require('./defaults');

var features = document.documentElement.classList;

Modal.prototype = {
    isAnimatable: features.contains('csstransforms') && features.contains('csstransitions'),
    isFlexbox: features.contains('flexbox') || features.contains('flexboxlegacy'),
    create: require('./create'),
    show: require('./show'),
    hide: require('./hide'),
    destroy: function (immediate) {
        this.hide(true, immediate);
    },
    close: function (immediate) {
        this.hide(this.closeAction === 'destroy', immediate);
    },
    closeOnExternalClick: function (ev) {
        if (this.isOpen()) {
            if (!this.content.contains(ev.target) || (this.opts.hasCloseButton && ev.target.classList.contains('o-modal__close'))) {
                this.close();
            }
        }
    },
    broadcast: function (eventType, namespace, data) {
        namespace = namespace || 'oModal';
        var target = namespace === 'oLayers' ? this.context : this.dom.wrapper;
        
        console.log(namespace + '.' + eventType, this, data);
        
        target.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
            detail: {
                layer: this,
                data: data || {}
            },
            bubbles: true
        }));
    },
    isOpen: function () {
        return this.wrapper.classlist.contains('is-open');
    },
    getWidth: function () {
        return this.content.clientWidth + getSpacing(this.wrapper, 'left') + getSpacing(this.wrapper, 'right');
    },
    getHeight: function () {
        return this.content.clientHeight + getSpacing(this.wrapper, 'top') + getSpacing(this.wrapper, 'bottom');
    }
};

module.exports = Modal;