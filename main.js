import oComments from './src/js/comments';

const constructAll = function() {
	oComments.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default oComments;
