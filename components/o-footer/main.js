import Footer from './src/js/footer.js';

const constructAll = () => {
	Footer.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Footer;
