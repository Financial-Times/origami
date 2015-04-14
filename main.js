/*global require, module*/
'use strict';

var oShare = require('./src/js/share');

var constructAll = function() {
	oShare.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = oShare;
