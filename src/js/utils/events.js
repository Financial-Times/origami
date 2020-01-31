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
	['createComment.error',
		{
			oComments: 'oComments.errorComment',
			oTracking: 'post-error'
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

export {
	coralEventMap
};
