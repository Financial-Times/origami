import {NoticeMessage} from '../../src/tsx/message';
import {
	ComponentDescription,
	NoticeInform,
	NoticeInnerInform,
	NoticeFeedback,
	NoticeInnerFeedback,
} from '../shared/message-notice';
import '../message.scss';

export default {
	title: 'Maintained/o-message',
	component: NoticeMessage,
	argTypes: {
		state: {
			options: ['inform', 'feedback'],
		},
	},
	...ComponentDescription,
};

export {NoticeInform, NoticeInnerInform, NoticeFeedback, NoticeInnerFeedback};
