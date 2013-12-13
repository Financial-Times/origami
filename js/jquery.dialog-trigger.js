"use strict";

var Dialog = require('./dialog');

$.fn.oDialogTrigger = function () {
    return this.click(function (ev) {
        Dialog.trigger($(this).data('o-dialog'), this);
    });
};