"use strict";

var $ = require('jquery'),
    globals = require('./data/globals'),
    defaults = require('./data/defaults'),
    methods = require('./public/close');

require('./public/listen');
require('./public/unlisten');
require('./public/trigger');


var Dialog = {
        listen: methods.listen,
        unlisten: methods.unlisten,
        close: methods.close,
        trigger: methods.trigger,
        destroy: function () {
            // called as a method of Dialog to facilitate testing
            methods.close(null, true);
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