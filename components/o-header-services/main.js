import HeaderServices from './src/js/header.js';

const constructAll = () => {
	HeaderServices.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default HeaderServices;
