import {ComponentStory} from '@storybook/react';
import {useEffect} from 'react';
import {NoticeMessage} from '../../src/tsx/message';
import javascript from '../../main';
import '../message.scss';

export const ComponentDescription = {
	title: 'Maintained/o-message',
	component: NoticeMessage,
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
};

const innerDecorator = Story => (
	<div className="demo-inner-message">{Story()}</div>
);

const NoticeStory = args => {
	useEffect(() => {
		let messages = javascript.init();
		return () => {
			messages = Array.isArray(messages) ? messages : [messages];
			messages.forEach(message => message.destroy());
		};
	}, [args.showCloseButton]);
	return <NoticeMessage {...args} />;
};

export const NoticeInform: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeInform.storyName = 'Notice: Inform';
NoticeInform.args = {
	state: 'inform',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
};

export const NoticeInnerInform: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeInnerInform.decorators = [innerDecorator];
NoticeInnerInform.storyName = 'Notice Inner: Inform';
NoticeInnerInform.args = {
	state: 'inform',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	inner: true,
	showCloseButton: false,
};

export const NoticeWarningLight: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeWarningLight.storyName = 'Notice: Warning Light';
NoticeWarningLight.args = {
	state: 'warning-light',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	primaryAction: undefined,
	secondaryAction: undefined,
};

export const NoticeInnerWarningLight: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeInnerWarningLight.storyName = 'Notice Inner: Warning Light';
NoticeInnerWarningLight.args = {
	state: 'warning-light',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact. There may also be a fox. This is unconfirmed.",
	},
	primaryAction: undefined,
	secondaryAction: undefined,
	inner: true,
};

export const NoticeWarning: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeWarning.storyName = 'Notice: Warning';
NoticeWarning.args = {
	state: 'warning',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	primaryAction: undefined,
	secondaryAction: undefined,
};

export const NoticeInnerWarning: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeInnerWarning.storyName = 'Notice Inner: Warning';
NoticeInnerWarning.args = {
	state: 'warning',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact. There may also be a fox. This is unconfirmed.",
	},
	primaryAction: undefined,
	secondaryAction: undefined,
	inner: true,
};

export const NoticeFeedback: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeFeedback.storyName = 'Notice: Feedback';
NoticeFeedback.args = {
	state: 'feedback',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	secondaryAction: undefined,
};

export const NoticeInnerFeedback: ComponentStory<typeof NoticeMessage> =
	NoticeStory.bind({});
NoticeInnerFeedback.decorators = [innerDecorator];
NoticeInnerFeedback.storyName = 'Notice Inner: Feedback';
NoticeInnerFeedback.args = {
	state: 'feedback',
	content: {
		detail:
			"There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact. There may also be a fox. This is unconfirmed.",
	},
	inner: true,
	secondaryAction: undefined,
};
