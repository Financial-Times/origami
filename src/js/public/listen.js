'use strict';

var $ = require('jquery'),
	methods = require('../public/trigger');

methods.listen = function () {
    $('body').on('click.o-dialog__trigger', '[data-o-dialog__trigger]', function (ev) {
        var conf = $(this).data('o-dialog__trigger');
        methods.trigger(conf, this);
        if (!conf.dontPreventDefault) {
            ev.preventDefault();
        }
    });
};

module.exports = methods;