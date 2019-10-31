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
	['mutation.createComment',
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
	['mutation.editComment',
		{
			oComments: 'oComments.editComment',
			oTracking: 'edit'
		}
	],
	['mutation.createCommentReaction',
		{
			oComments: 'oComments.likeComment',
			oTracking: 'like'
		}
	],
	['mutation.createCommentFlag',
		{
			oComments: 'oComments.reportComment',
			oTracking: 'report'
		}
	],
	['mutation.removeUserIgnore',
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
