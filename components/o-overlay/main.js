import Overlay from './src/js/overlay.js';

const constructAll = function () {
	Overlay.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default Overlay;
