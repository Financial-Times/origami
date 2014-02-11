'use strict';

var $ = require('jquery');

module.exports = function () {
	$(document).off('click.o-dialog__trigger');
};