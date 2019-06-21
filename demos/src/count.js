const oCommentsCount = require('../../src/count/main');

document.addEventListener('DOMContentLoaded', function() {
	document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
});

window.oCommentsCount = oCommentsCount;
