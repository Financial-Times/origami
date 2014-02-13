"use strict";

var globals = require('../data/globals'),
    Dialog = require('../Dialog'),
    privates = require('../private');



module.exports = function (opts, trigger) {

    var lastDialog;

    if (globals.dialogs[0] && globals.dialogs[0].active) {
        
        lastDialog = globals.dialogs[0];
        Dialog.close(lastDialog);

        if (trigger === lastDialog.trigger) {
            return;
        }
    }

    var dialog = privates.getDialog();
    dialog.trigger = trigger;
    dialog.opts = privates.handleOptions(opts, trigger);
    
    if (!dialog.opts) {
        opts.onFail(dialog);
        return;
    }
    dialog.opts.onTrigger(dialog);
    privates.injectContent(dialog);
    dialog.opts.onBeforeRender(dialog);
    privates.attach(dialog);
    dialog.opts.onAfterRender(dialog);
};