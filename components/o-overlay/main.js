
import Overlay from './src/js/overlay.js';

const constructAll = function() {
	Overlay.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Overlay;
