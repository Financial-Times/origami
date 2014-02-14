"use strict";
var globals = require('../data/globals'),
    methods = require('../private/detach');

require('../private/do-after-transition');

methods.close = function (dialog, destroy) {

    dialog = dialog || globals.dialogs[0];
    if (!dialog || !dialog.active) {
        return;
    }

    dialog.opts.onBeforeClose(dialog);
    globals.win.off('resize.o-dialog');
    if (dialog.opts.isDismissable) {
        globals.body.off('click.o-dialog');
        globals.doc.off('keyup.o-dialog');
    }
    if (globals.isAnimatable && !destroy) {
        var wrapper = dialog.opts.hasOverlay ? dialog.wrapper.add(dialog.overlay) : dialog.wrapper ;
        methods.doAfterTransition(wrapper, 'is-open', 'remove', wrapper.add(dialog.content), function () {
            methods.detach(dialog);
        });
        
    } else {
        dialog.wrapper.removeClass('is-open');
        methods.detach(dialog, destroy);
    }
    
};

module.exports = methods;