import HeaderServices from './src/js/header';

const constructAll = () => {
	HeaderServices.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default HeaderServices;
