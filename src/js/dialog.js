"use strict";

var $ = require('jquery'),
    globals = require('./data/globals'),
    defaults = require('./data/defaults'),
    closeDialog = require('./public/close-dialog'),
    trigger = require('./public/trigger');


module.exports = {
    close: closeDialog,
    trigger: trigger,
    destroy: function () {
        closeDialog(null, true);
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
