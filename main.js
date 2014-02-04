"use strict";
var $ = require('jquery'),
	Dialog = require('./src/js/dialog');

Dialog.addPreset('modal', require('./src/js/dialog-presets/modal'));
Dialog.addPreset('dropdown', require('./src/js/dialog-presets/dropdown'));
Dialog.addPreset('dropup', require('./src/js/dialog-presets/dropup'));

$(document).on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
	ev.preventDefault();
    ev.oDialogTriggerClick = true;
    Dialog.trigger($(this).data('o-dialog__trigger'), this);
});

module.exports = Dialog;
