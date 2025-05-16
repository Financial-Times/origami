import Comments, { auth } from './src/js/comments.js';

const constructAll = function () {
	Comments.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

if (typeof document !== 'undefined') {
	document.addEventListener('o.DOMContentLoaded', constructAll);
}

export default Comments;
export { auth };
