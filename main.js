
const Tabs = require('./src/js/Tabs');

const constructAll = function() {
	Tabs.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Tabs;
