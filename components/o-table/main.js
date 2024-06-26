import oTable from './src/js/oTable.js';

const constructAll = function() {
	oTable.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default oTable;
