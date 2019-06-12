import oComments from './src/js/comments';
import oCommentsCount from './src/js/count';

const constructAll = function () {
	Comments.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export {oComments, oCommentsCount};
