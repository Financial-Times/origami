
import SteppedProgress from './src/js/stepped-progress.js';

const constructAll = function () {
	SteppedProgress.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default SteppedProgress;
