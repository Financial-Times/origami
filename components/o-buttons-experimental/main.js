import ButtonsExperimental from './src/js/buttons-experimental.js';

const constructAll = () => {
	ButtonsExperimental.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default ButtonsExperimental;
