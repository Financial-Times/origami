const coralEventMap = new Map([
	['ready', 'oComments.ready'],
	['mutation.createComment', 'oComments.postComment'],
	['mutation.createCommentReply', 'oComments.replyComment'],
	['mutation.editComment', 'oComments.editComment'],
	['mutation.createCommentReaction', 'oComments.likeComment'],
]);

const coralErrorMap = new Map([
	['COMMENT_IS_TOXIC', 'oComments.toxicComment']
]);

const validEvents = []
	.concat(Array.from(coralEventMap.values()), Array.from(coralErrorMap.values()));

export {
	validEvents,
	coralEventMap,
	coralErrorMap
};
