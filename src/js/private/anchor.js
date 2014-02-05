"use strict";
var globals = require('../data/globals');

module.exports = function (dialog) {
    if (dialog.opts.isAnchoredToTrigger) {

        var align,
            offset,
            trigger = dialog.trigger,
            triggerRightEdge = trigger.offsetLeft + trigger.offsetWidth;

        if (dialog.width > globals.win.width() || triggerRightEdge - dialog.width < 0) {
            align = 'l';
        } else {
            align = 'r';
        }

        // Pseudo code of how this needs to work
        // P = preferred edge to align to
        // O = opposite edge of dropdown
        // Pw, Ow = edges of window
        // if (O is too close to Ow) {
        //     swap P and O
        //     if (O is too close to Ow) {
        //         go to full width mode
        //          // need to implement a way that something other than the basic window width test can force full width
        //     }
        // } else {
        //     no problemo
        // }

        if (dialog.isFullWidth) {
            offset = 0;
        } else if (align === 'l') {
            offset = trigger.offsetLeft;
        } else {
            offset = trigger.offsetParent.offsetWidth - triggerRightEdge;
        }

        if (align === 'l') {
            dialog.wrapper.css('left', offset).addClass('o-dialog--dropdown--left').removeClass('o-dialog--dropdown--right');
        } else {
            dialog.wrapper.css('right', offset).addClass('o-dialog--dropdown--right').removeClass('o-dialog--dropdown--left');
        }

        if (dialog.opts.preset === 'dropdown') {
            dialog.wrapper.css('top', trigger.offsetTop + trigger.offsetHeight);
        } else {
            dialog.wrapper.css('bottom', trigger.offsetParent.offsetHeight - trigger.offsetTop);
        }
    }
};