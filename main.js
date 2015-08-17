/*global require, module*/
import * as oShare from './src/js/share';
// const oShare = require('./src/js/share');

const constructAll = function() {
	oShare.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

// module.exports = oShare;
export let oShare;