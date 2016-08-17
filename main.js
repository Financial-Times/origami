import CookieMessage from './src/js/cookieMessage';

const constructAll = function() {
	CookieMessage.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default CookieMessage;
