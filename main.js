/*global require, module*/
'use strict';

var ShareLinks = require('./src/js/ShareLinks');

var constructAll = function() {
	ShareLinks.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = ShareLinks;
