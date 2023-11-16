import {ComponentStory} from '@storybook/react';
import {useEffect} from 'react';
import {ActionMessage} from '../../src/tsx/message';
import javascript from '../../main';
import '../message.scss';

export default {
	title: 'Components/o-message',
	component: ActionMessage,
	parameters: {},
	args: {
		showCloseButton: true,
		inner: false,
		primaryAction: {
			text: 'Button',
			url: '#',
			openInNewWindow: false,
		},
		secondaryAction: {
			text: 'Text link',
			url: '#',
			openInNewWindow: false,
		},
	},
	argTypes: {
		inner: {
			table: {
				disable: true,
			},
		},
	},
};

const ActionStory = args => {
	useEffect(() => {
		let messages = javascript.init();
		return () => {
			messages = Array.isArray(messages) ? messages : [messages];
			messages.forEach(message => message.destroy());
		};
	}, [args.showCloseButton]);

	return <ActionMessage {...args} />;
};

export const ActionInform: ComponentStory<typeof ActionMessage> =
	ActionStory.bind({});
ActionInform.storyName = 'Action: Inform Inverse';
ActionInform.args = {
	state: 'inform-inverse',
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
	},
	secondaryAction: undefined,
};
