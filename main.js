var Dialog = require('./js/dialog');

$.fn.oDialogTrigger = function () {
    return this.click(function () {
        Dialog.trigger($(this).data('o-dialog'), this);
    });
};


$('.o-dialog--trigger').oDialogTrigger();

module.exports = Dialog;

