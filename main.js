
import Tabs from './src/js/Tabs.js';

const constructAll = function() {
	Tabs.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Tabs;
