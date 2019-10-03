import Expander from './src/js/expander';

const constructAll = function () {
	Expander.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Expander;
