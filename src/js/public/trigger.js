"use strict";

var globals = require('../data/globals'),
    methods = require('../private/handle-options');

require('../private/attach');
require('../private/inject-content');
require('../private/get-dialog');
require('../public/close');

methods.trigger = function (opts, trigger) {

    var lastDialog;

    if (globals.dialogs[0] && globals.dialogs[0].active) {
        
        lastDialog = globals.dialogs[0];
        methods.close(lastDialog);

        if (trigger && trigger === lastDialog.trigger) {
            return;
        }
    }

    var dialog = methods.getDialog();
    dialog.trigger = trigger;
    dialog.opts = methods.handleOptions(opts, trigger);
    
    if (!dialog.opts) {
        opts.onFail(dialog);
        return;
    }
    dialog.opts.onTrigger(dialog);
    methods.injectContent(dialog);
    dialog.opts.onBeforeRender(dialog);
    methods.attach(dialog);
    dialog.opts.onAfterRender(dialog);
};

module.exports = methods;