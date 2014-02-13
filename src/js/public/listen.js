'use strict';

var $ = require('jquery');

module.exports = function () {
    var Dialog = this;
    $(document).on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
        var conf = $(this).data('o-dialog__trigger');
        Dialog.trigger(conf, this);
        if (!conf.dontPreventDefault) {
            ev.preventDefault();
        }
    });
};