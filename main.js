import Comments from './src/js/comments';
import CommentCount from './src/js/count';

const constructAll = function () {
	Comments.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export default Comments;
export const Count = CommentCount;
