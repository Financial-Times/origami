'use strict';

var assignClasses = function (dialog) {
    dialog.wrapper[0].className = 'o-dialog o-dialog--' + dialog.opts.preset + ' ' + dialog.opts.outerClasses + (dialog.opts.hasCloseButton ? ' o-dialog--closable' : '');
    dialog.overlay[0].className = 'o-dialog__overlay o-dialog--' + dialog.opts.preset + '__overlay';
    dialog.content[0].className = 'o-dialog__content o-dialog--' + dialog.opts.preset + '__content' + ' ' + dialog.opts.innerClasses + (dialog.opts.hasHeading ? '' : ' o-dialog__body');
};

module.exports = function (dialog) {
    dialog.content.html(dialog.opts.content);

    if (dialog.opts.hasCloseButton) {
        dialog.content.append('<button class="o-dialog__close">close</button>');
    }

    dialog.body = dialog.content.is(dialog.opts.bodySelector) ? dialog.content : dialog.content.find(dialog.opts.bodySelector);
    dialog.heading = dialog.content.find(dialog.opts.headingSelector);

    dialog.opts.hasHeading = !!dialog.heading.length;
    assignClasses(dialog);
};