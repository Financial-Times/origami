import Meter from './src/js/meter';

const constructAll = function () {
	Meter.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Meter;
