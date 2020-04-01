import oTable from './src/js/oTable';

const constructAll = function() {
	oTable.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oTable;
