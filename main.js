/*global require, module*/
import oShare from './src/js/share';

const constructAll = function() {
	oShare.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oShare;