"use strict";

var $ = require('jquery'),
    globals = require('./data/globals'),
    defaults = require('./data/defaults'),
    close = require('./public/close'),
    trigger = require('./public/trigger');


module.exports = {
    close: close,
    trigger: trigger,
    destroy: function () {
        close(null, true);
    },
    addPreset: function (name, conf) {
        globals.presets[name] = $.extend({}, defaults, conf);
    },
    addTemplate: function (name, tpl) {
        globals.templates[name] = tpl;
    },
    removeTemplate: function (name) {
        globals.templates[name] = undefined;
    }
};
