import Share from './src/js/share.js';

const constructAll = function() {
	Share.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Share;
