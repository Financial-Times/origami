import HeaderServices from './src/js/header.js';

const constructAll = () => {
	HeaderServices.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default HeaderServices;
