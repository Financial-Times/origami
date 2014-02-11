'use strict';

var $ = require('jquery');

module.exports = function () {
	var Dialog = this;
	$(document).on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
		ev.preventDefault();
	    Dialog.trigger($(this).data('o-dialog__trigger'), this);
	});
};