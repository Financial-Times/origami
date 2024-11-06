import PrivateFoundation from './src/js/private-foundation.js';

const constructAll = () => {
	PrivateFoundation.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default PrivateFoundation;
