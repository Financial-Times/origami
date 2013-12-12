var Dialog = require('./dialog');

$.fn.oDialogTrigger = function () {
    return this.click(function (ev) {
        ev.originalEvent.oDialogTriggerClick = true;
        Dialog.trigger($(this).data('o-dialog'), this);
    });
};