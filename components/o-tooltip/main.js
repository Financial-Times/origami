import Tooltip from './src/js/tooltip.js';

const constructAll = function() {
	Tooltip.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default Tooltip;
