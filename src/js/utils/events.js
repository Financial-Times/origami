const validEvents = [
	'component.render.successful',
	'comment.posted.successful',
	'comment.liked.successful',
	'actions.comment.liked',
	'auth.login.successful',
	'auth.login.required'
];

const coralMap = new Map([
	['query.CoralEmbedStream_Embed.ready', 'component.render.successful'],
	['mutation.PostComment.success', 'comment.posted.successful'],
	['mutation.CreateLikeAction.success', 'comment.liked.successful'],
	['action.TALK_FRAMEWORK_CHECK_LOGIN_SUCCESS', 'auth.login.successful'],
	['action.SHOW_SIGNIN_DIALOG', 'auth.login.required']
]);

export {
	validEvents,
	coralMap
};
