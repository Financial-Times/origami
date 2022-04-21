import oDate from './src/js/date.js';
const constructAll = function () {
	oDate.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}
export default oDate;
