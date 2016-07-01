import Footer from './src/js/footer';

const constructAll = () => {
	Footer.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Footer;
