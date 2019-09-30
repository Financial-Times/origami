
import Overlay from './src/js/overlay';

const constructAll = function() {
	Overlay.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Overlay;
