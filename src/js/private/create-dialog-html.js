"use strict";

var $ = require('jquery'),
    
    globalListenersApplied = false,

    globalListeners = function () {
        $(document).on('close.o-dialog', close);

        globalListenersApplied = true;
    };

module.exports = function () {
    var wrapper = $('<div class="o-dialog"></div>'),
        content = $('<section class="o-dialog__content"></section>'),
        overlay = $('<div class="o-dialog__overlay"></div>'),
        dialog = {
            wrapper: wrapper,
            content: content,
            overlay: overlay
        };

    wrapper.append(content);

    globalListenersApplied || globalListeners();

    content.on('click.o-dialog', function (ev) {
        ev.oDialogContentClick = true;
    });

    return dialog;
};    