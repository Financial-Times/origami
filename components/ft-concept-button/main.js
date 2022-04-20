import button from './src/js/ft-concept-button.js';

function constructAll() {
	button.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
}

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default button;
