'use strict';

var oErrors = require('../../main');

document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent("o.DOMContentLoaded"));
});

document.addEventListener("o.DOMContentLoaded", function() {
	oErrors.init();
});
