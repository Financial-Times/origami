import {NoticeMessage} from '../../src/tsx/message';
import {
	ComponentDescription,
	NoticeInform,
	NoticeInnerInform,
} from '../shared/message-notice';
import '../message.scss';

export default {
	title: 'Maintained/o-message',
	component: NoticeMessage,
	argTypes: {
		state: {
			options: ['inform'],
		},
	},
	...ComponentDescription,
};

export {NoticeInform, NoticeInnerInform};
