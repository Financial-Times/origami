const oComponentBoilerplate = require('./src/js/componentBoilerplate');

document.addEventListener("DOMContentLoaded", function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});
module.exports = oComponentBoilerplate;
