
import Banner from './src/js/banner.js';

function constructAll () {
	Banner.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
}

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Banner;
