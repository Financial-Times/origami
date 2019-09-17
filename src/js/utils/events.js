const coralEventMap = new Map([
	['ready',
		{
			oComments: 'oComments.ready',
			oTracking: 'ready'
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
