"use strict";

var $ = require('jquery'),
    Dialog = require('../dialog'),
    
    globalListenersApplied = false,

    globalListeners = function () {
        $(document).on('close.o-dialog', Dialog.close);

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

    return dialog;
};