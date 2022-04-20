import Toggle from './src/js/toggle.js';

const constructAll = () => {
	Toggle.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') document.addEventListener('o.DOMContentLoaded', constructAll);

export default Toggle;
