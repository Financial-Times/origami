/*global require, module*/
'use strict';

var Tabs = require('./src/js/Tabs');
var constructAll = function() {
	Tabs.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = Tabs;
