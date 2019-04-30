const coralMap = new Map([
	['query.CoralEmbedStream_Embed.loading', 'component.render.loading'],
	['query.CoralEmbedStream_Embed.ready', 'component.render.successful'],
	['mutation.PostComment.success', 'comment.posted.successful'],
	['mutation.EditComment.success', 'comment.edited.successful'],
	['mutation.CreateLikeAction.success', 'comment.liked.successful'],
	['action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS', 'auth.login.successful'],
	['action.SHOW_SIGNIN_DIALOG', 'auth.login.required']
]);

const errorMap = new Map([
	['COMMENT_IS_TOXIC', 'comment.posted.toxic']
]);

const validEvents = []
	.concat(Array.from(coralMap.values()), Array.from(errorMap.values()));

export {
	validEvents,
	coralMap,
	errorMap
};
