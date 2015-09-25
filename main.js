/*global require,module*/

const oHeader = require('./src/js/Header');
const constructAll = function() {
	oHeader.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports = oHeader;
