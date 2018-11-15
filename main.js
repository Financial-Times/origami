import ProgressIndicator from './src/js/progress-indicator';

const constructAll = function () {
	ProgressIndicator.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default ProgressIndicator;
