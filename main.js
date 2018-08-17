import LazyLoad from './src/js/o-lazy-load';

const constructAll = function () {
	LazyLoad.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default LazyLoad;
