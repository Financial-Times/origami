"use strict";

var globals = require('../data/globals'),
    close = require('../public/close'),
    handleOptions = require('../private/handle-options'),
    attach = require('../private/attach'),
    injectContent = require('../private/inject-content');



module.exports = function (opts, trigger) {

    var lastDialog;

    if (globals.dialogs[0] && globals.dialogs[0].active) {
        
        lastDialog = globals.dialogs[0];
        close(lastDialog);

        if (trigger === lastDialog.trigger) {
            return;
        }
    }

    var dialog = require('../private/get-dialog')();
    dialog.trigger = trigger;
    dialog.opts = handleOptions(opts, trigger);
    
    if (!dialog.opts) {
        opts.onFail(dialog);
        return;
    }
    dialog.opts.onTrigger(dialog);
    injectContent(dialog);
    dialog.opts.onBeforeRender(dialog);
    attach(dialog);
    dialog.opts.onAfterRender(dialog);
};