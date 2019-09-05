const coralMap = new Map([
	['ready', 'oComments.ready'],
	['mutation.createComment', 'oComments.postComment'],
	['mutation.createCommentReply', 'oComments.replyComment'],
	['mutation.editComment', 'oComments.editComment'],
	['mutation.createCommentReaction', 'oComments.likeComment'],
]);

const errorMap = new Map([
	['COMMENT_IS_TOXIC', 'oComments.toxicComment']
]);

const validEvents = []
	.concat(Array.from(coralMap.values()), Array.from(errorMap.values()));

export {
	validEvents,
	coralMap,
	errorMap
};
