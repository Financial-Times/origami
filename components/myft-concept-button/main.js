import button from './src/js/myft-concept-button.js';

function constructAll() {
	button.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
}

document.addEventListener('o.DOMContentLoaded', constructAll);

export default button;
