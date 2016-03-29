import oHeader from './src/js/header';

const constructAll = () => {
	oHeader.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oHeader;
