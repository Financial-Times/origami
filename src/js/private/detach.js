"use strict";

var globals = require('../data/globals'),
    methods = require('../methods');

methods.detach = function (dialog, destroy) {
    dialog.active = false;
    dialog.content.empty();
    dialog.wrapper.detach().attr('style', null);
    if (dialog.opts.hasOverlay) {
        dialog.overlay.detach();
    }
    if (destroy) {
        if (Object.keys) {
            Object.keys(globals).forEach(function (key) {
                delete globals[key];
            });
        }
    }
    dialog.opts.onAfterClose(dialog);
};

module.exports = methods;