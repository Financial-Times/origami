import oCookieMessage from './src/js/cookie';

const constructAll = function() {
	oCookieMessage.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oCookieMessage;
