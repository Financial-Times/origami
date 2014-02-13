"use strict";
var globals = require('../data/globals'),
    privates = require('../private'),
    detach = privates.detach;

module.exports = function (dialog, destroy) {
    dialog.opts.onBeforeClose(dialog);
    dialog = dialog || globals.dialogs[0];
    if (!dialog.active) {
        return;
    }

    globals.win.off('resize.o-dialog');
    if (dialog.opts.isDismissable) {
        globals.body.off('click.o-dialog');
        globals.doc.off('keyup.o-dialog');
    }
    if (globals.isAnimatable && !destroy) {
        var wrapper = dialog.opts.hasOverlay ? dialog.wrapper.add(dialog.overlay) : dialog.wrapper ;
        privates.doAfterTransition(wrapper, 'is-open', 'remove', wrapper.add(dialog.content), function () {
            detach(dialog);
        });
        
    } else {
        dialog.wrapper.removeClass('is-open');
        detach(dialog, destroy);
    }
    
};