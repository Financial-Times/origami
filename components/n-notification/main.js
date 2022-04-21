import nNotification from './src/js/n-notification';

const constructAll = function() {
	nNotification.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default nNotification;
