import {NoticeMessage} from '../../src/tsx/message';
import {
	ComponentDescription,
	NoticeInform,
	NoticeInnerInform,
	NoticeWarningLight,
	NoticeInnerWarningLight,
	NoticeWarning,
	NoticeInnerWarning,
	NoticeFeedback,
	NoticeInnerFeedback,
} from '../shared/message-notice';
import '../message.scss';

export default {
	title: 'Maintained/o-message',
	component: NoticeMessage,
	argTypes: {
		state: {
			options: ['inform', 'feedback', 'warning', 'warning-light'],
		},
	},
	...ComponentDescription,
};

export {
	NoticeInform,
	NoticeInnerInform,
	NoticeWarningLight,
	NoticeInnerWarningLight,
	NoticeWarning,
	NoticeInnerWarning,
	NoticeFeedback,
	NoticeInnerFeedback,
};
