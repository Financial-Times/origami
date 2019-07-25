const coralMap = new Map([
	['ready', 'o-comments.ready'],
	['mutation.createComment', 'o-comments.comment.posted'],
	['mutation.createCommentReply', 'o-comments.comment.replied'],
	['mutation.editComment', 'o-comments.comment.edited'],
	['mutation.createCommentReaction', 'o-comments.comment.liked'],
]);

const errorMap = new Map([
	['COMMENT_IS_TOXIC', 'o-comments.comment.toxic']
]);

const validEvents = []
	.concat(Array.from(coralMap.values()), Array.from(errorMap.values()));

export {
	validEvents,
	coralMap,
	errorMap
};
