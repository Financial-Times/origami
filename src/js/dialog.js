"use strict";

var $ = require('jquery'),
    globals = require('./data/globals'),
    defaults = require('./data/defaults'),
    close = require('./public/close'),
    listen = require('./public/listen'),
    unlisten = require('./public/unlisten'),
    trigger = require('./public/trigger'),


    Dialog = {
        listen: listen,
        unlisten: unlisten,
        close: close,
        trigger: trigger,
        destroy: function () {
            // called as a method of Dialog to facilitate testing
            Dialog.close(null, true);
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

// Dialog.listen();

module.exports = Dialog;