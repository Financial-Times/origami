import Toggle from './src/js/toggle.js';

const constructAll = () => {
	Toggle.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Toggle;
