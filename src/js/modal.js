"use strict";

var Delegate = require('dom-delegate');
var delegate;
var utils = require('./utils');

var setOptions = function (opts, trigger) {
    
    if (typeof opts === 'string') {
        opts = { src: opts };
    } else {
        opts = opts || {};
    }

    // get config from data attributes on trigger
    if (trigger) {
        if (trigger.dataset) {
            Object.keys(trigger.dataset).forEach(function (key) {
                if (key.indexOf('oModal') === 0) {
                    opts[utils.unCapitalise(key.substr(6))] = trigger.dataset[key];
                }
            });            
        } else {
            Array.prototype.forEach.call(trigger.attributes, function (attr) {
                if (attr.name.indexOf('data-o-modal') === 0) {
                    opts[utils.attrToData(attr.name)] = attr.value;
                }                
            });
        }

    }

    if (!opts.src) { return; }

    if (!opts.srcType) {
        if (/^(https?\:\/)?\//.test(opts.src)) {
            opts.srcType = 'url';
        } else {
            try {
                opts.content = document.querySelector(opts.src);
                if (!opts.content) {
                    throw('selector doesn\'t match');
                }
                opts.srcType = 'selector';
                opts.content = utils.copyContent(opts.content);
            } catch (e) {
                opts.srcType = 'string';
                opts.content = opts.src;
            }
        }
    } else if (opts.srcType === 'selector') {
        opts.content = utils.copyContent(document.querySelector(opts.src));
    } else if (opts.srcType === 'string') {
        opts.content = opts.src;
    }

    return require('lodash-node/modern/objects/defaults')(opts, Modal.defaults);
};


var Modal = function (opts, trigger) {
    this.trigger = trigger;
    this.opts = setOptions(opts, trigger);

    if (!this.opts) { return opts.onFail.call(this); }
    
    this.context = this.opts.context || document.body;
    this.globalDelegate = delegate || new Delegate(document.body);
    this.create();
};

Modal.listen = function () {
    delegate = delegate || new Delegate(document.body);

    delegate.on('click', '.o-modal__trigger', function (ev) {
        new Modal(null, ev.target);
        ev.preventDefault();
    });
};

Modal.unlisten = function () {
    delegate && delegate.off('click', '.o-modal__trigger');
};

Modal.defaults = require('./defaults');

var features = document.documentElement.classList;

Modal.prototype = {
    isAnimatable: features.contains('csstransforms') && features.contains('csstransitions'),
    isFlexbox: features.contains('flexbox') || features.contains('flexboxlegacy'),
    create: require('./create'),
    show: require('./show'),
    hide: require('./hide'),
    realign: require('./realign'),
    destroy: function (immediate) {
        this.hide(true, immediate);
    },
    close: function (immediate) {
        this.hide(this.opts.closeAction === 'destroy', immediate === true);
    },
    closeOnExternalClick: function (ev) {
        if (this.isOpen()) {
            if (ev.target === this.overlay) {
                this.close();
            }
        }
    },
    closeOnEscapePress: function (ev) {
        if (ev.keyCode === 27) {
            this.close();
        }
    },
    resizeListener: function (ev) {
        this.respondToWindow(ev.detail.viewport);
    },
    broadcast: function (eventType, namespace, data) {
        namespace = namespace || 'oModal';
        var target = namespace === 'oLayers' ? this.context : this.dom.wrapper;
        
        target.dispatchEvent(new CustomEvent(namespace + '.' + eventType, {
            detail: {
                layer: this,
                data: data || {}
            },
            bubbles: true
        }));
    },
    respondToWindow: function (size) {
        this.opts.onBeforeResize(this);
        this.realign('width', size.width);
        this.realign('height', size.height);
        this.opts.onAfterResize(this);
    },
    isOpen: function () {
        return this.wrapper.classList.contains('is-open');
    },
    getWidth: function () {
        return this.content.clientWidth + utils.getSpacing(this.wrapper, 'left') + utils.getSpacing(this.wrapper, 'right');
    },
    getHeight: function () {
        return this.content.clientHeight + utils.getSpacing(this.wrapper, 'top') + utils.getSpacing(this.wrapper, 'bottom');
    },
    fills: function (dimension) {
        return this.wrapper.classList.contains('o-modal--full-' + dimension);
    },
    adjustBodyHeight: function (fullHeight) {
        if (this.opts.hasHeading) {
            if (fullHeight) {
                this.body.style.height = this.content.clientHeight - this.heading.offsetHeight;
            } else {
                this.body.style.height = '';
            }
        }
    },
    detach: function (destroy) {
        this.delegates.win.off();
        this.delegates.wrap.off();
        if (destroy) {
            this.context.removeChild(this.wrapper);
            this.context.removeChild(this.overlay);
        }
        this.opts.onAfterClose(this);
    }
};

module.exports = Modal;