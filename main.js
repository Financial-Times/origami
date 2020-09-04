import oDate from './src/js/date.js';
const constructAll = function () {
	oDate.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default oDate;
