const coralEventMap = new Map([
	['ready',
		{
			oComments: 'oComments.ready',
			oTracking: 'ready'
		}
	],
	['loginPrompt',
		{
			oComments: 'oComments.loginPrompt'
		}
	],
	['createComment.success',
		{
			oComments: 'oComments.postComment',
			oTracking: 'post'
		}
	],
	['mutation.createCommentReply',
		{
			oComments: 'oComments.replyComment',
			oTracking: 'reply'
		}
	],
	['createCommentReply.success',
		{
			oComments: 'oComments.editComment',
			oTracking: 'edit'
		}
	],
	['createCommentReaction.success',
		{
			oComments: 'oComments.likeComment',
			oTracking: 'like'
		}
	],
	['reportComment.success',
		{
			oComments: 'oComments.reportComment',
			oTracking: 'report'
		}
	],
	['ignoreUser.success',
		{
			oComments: 'oComments.ignoreUser',
			oTracking: 'ignore-user'
		}
	]
]);

const coralErrorMap = new Map([
	['COMMENT_IS_TOXIC',
		{
			oComments: 'oComments.toxicComment',
			oTracking: 'post-rejected-toxic'
		}
	]
]);

const findValidErrors = (errors = []) => {
	return errors
		.filter(error => coralErrorMap.get(error.translation_key))
		.map(error => coralErrorMap.get(error.translation_key));
};

export {
	coralEventMap,
	findValidErrors
};
