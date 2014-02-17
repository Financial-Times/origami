'use strict';

var $ = require('jquery'),
	methods = require('../methods');

methods.unlisten = function () {
	$('body').off('click.o-dialog__trigger');
};

module.exports = methods;