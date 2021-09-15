import Tooltip from './src/js/tooltip.js';

const constructAll = function() {
	Tooltip.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Tooltip;
