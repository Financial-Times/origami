'use strict';

var $ = require('jquery'),
	methods = require('../methods');

methods.unlisten = function () {
	$(document).off('click.o-dialog__trigger');
};

module.exports = methods;