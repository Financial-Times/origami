"use strict";
var $ = require('jquery'),
	Dialog = require('./js/dialog');

Dialog.addPreset('modal', require('./js/dialog-presets/modal'));
Dialog.addPreset('dropdown', require('./js/dialog-presets/dropdown'));
Dialog.addPreset('dropup', require('./js/dialog-presets/dropup'));

$(document).on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
    ev.oDialogTriggerClick = true;
    Dialog.trigger($(this).data('o-dialog__trigger'), this);
});

module.exports = Dialog;
