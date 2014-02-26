"use strict";

var $ = require('jquery'),
    globals = require('../data/globals'),
    methods = require('../methods'),

    bind = function (func, obj) {
        if (Function.prototype.bind) {
            return func.bind(obj);
        } else {
            return function () {
                return func.apply(obj, arguments);
            };
        }
    },

    copyContent = function (content) {
        return content[0].nodeName === 'SCRIPT' ? $(content.html()): content.clone();
    },
    setListeners = function (opts) {
        var eventRX = /^on[A-Z]/,
            listener,
            listenerParent,
            listenerName,
            listenerPath,
            bound;

        for (var key in opts) {
            if (eventRX.test(key)) {
                listener = opts[key];
                if (typeof listener === 'string') {
                    bound = listener.indexOf(':bound') > -1;
                    if (bound) {
                        listener = listener.replace(':bound', '');
                    }
                    if (listener.indexOf('#') > -1) {
                        listener = listener.split('#');
                        listenerParent = require(listener[0]);
                        listenerName = listener[1];
                        listener = listenerParent[listenerName];

                    } else if (listener.indexOf('.') > -1) {
                        listenerPath = listener.split('.');
                        listenerParent = window;
                        while (listenerName = listenerPath.unshift()) {
                            if (typeof listener === 'object') {
                                listenerParent = listener;
                                listener = listenerParent[listenerName];
                            } else {
                                throw ('Event listener ' + key + ' not found');
                            }
                        }
                    } else {
                        listener = window[listener];
                    }

                    if (typeof listener !== 'function') {
                        throw ('Event listener ' + key + ': ' + listener + ' is not a function');
                    }

                    if (bound) {
                        listener = bind(listener, listenerParent);
                    }
                    opts[key] = listener;
                }
            }
        }
        return opts;
    };


methods.handleOptions = function (opts, trigger) {
    

    if (typeof opts === 'string') {
        opts = {
            src: opts
        };
    }

    if (!opts.src) {
        return;
    }

    try {
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

        opts = $.extend({}, require('../data/defaults'), globals.presets[opts.preset] || {}, opts);

        if (opts.isAnchoredToTrigger && !trigger) {
            return;
        }

        return setListeners(opts);
    } catch (e) {}
};

module.exports = methods;