"use strict";
var Dialog = require('./js/dialog');

$('body').on('click.o-dialog--trigger', '.o-dialog--trigger', function (ev) {
    Dialog.trigger($(this).data('o-dialog'), this);
});