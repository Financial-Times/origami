/*global require, module*/
const oShare = require('./src/js/share');

const constructAll = function() {
	oShare.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = oShare;