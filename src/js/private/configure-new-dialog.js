"use strict";

var $ = require('jquery'),
    globals = require('../data/globals'),
    copyContent = function (content) {
        return content[0].nodeName === 'SCRIPT' ? $(content.html()): content.clone();
    };


module.exports = function (opts, trigger) {
    var dialog = require('./get-empty-dialog')();

    if (typeof opts === 'string') {
        opts = {
            src: opts
        };
    }

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
        opts.content = $(opts.src);
        opts.content = copyContent(opts.content);
    }

    opts = $.extend({}, require('../data/defaults'), globals.presets[opts.preset] || {}, opts);

    if (opts.isAnchoredToTrigger && !trigger) {
        return;
    }

    dialog.trigger = trigger;

    dialog.opts = opts;

    return dialog;
};