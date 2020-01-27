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
	['createCommentReply.success',
		{
			oComments: 'oComments.replyComment',
			oTracking: 'reply'
		}
	],
	['editComment.success',
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
	['TOXIC_COMMENT',
		{
			oComments: 'oComments.toxicComment',
			oTracking: 'post-rejected-toxic'
		}
	]
]);

export {
	coralEventMap,
	coralErrorMap
};
