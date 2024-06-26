import {SubsCard} from './src/js/subsCard.js';

const constructAll = function() {
	SubsCard.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export {SubsCard} from './src/js/subsCard.js';
