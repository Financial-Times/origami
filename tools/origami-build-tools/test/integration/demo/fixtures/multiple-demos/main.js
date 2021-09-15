import oMultipleDemos from './src/js/o-multiple-demos.js';
const constructAll = function () {
	oMultipleDemos.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default oMultipleDemos;