
import Banner from './src/js/banner';

const constructAll = function() {
	Banner.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Banner;
