import Header from './src/js/header.js';

const constructAll = () => {
	Header.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Header;
