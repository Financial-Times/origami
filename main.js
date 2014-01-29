"use strict";
var $ = require('jquery'),
	Dialog = require('./js/dialog');

require('./js/dialog-presets/modal');
require('./js/dialog-presets/dropdown');
require('./js/dialog-presets/dropup');

$(document).on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
    ev.oDialogTriggerClick = true;
    Dialog.trigger($(this).data('o-dialog__trigger'), this);
});

module.exports = Dialog;
