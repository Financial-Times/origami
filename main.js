import oLazyLoad from './src/js/o-lazy-load';

const constructAll = function () {
	oLazyLoad.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oLazyLoad;
