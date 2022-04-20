
import Banner from './src/js/banner.js';

function constructAll () {
	Banner.init();

	document.removeEventListener('o.DOMContentLoaded', constructAll);
}

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default Banner;
