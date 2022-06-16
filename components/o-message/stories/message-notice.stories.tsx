import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {NoticeMessage} from '../src/tsx/message';
import javascript from '../main';
import './message.scss';

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND || 'core';

const argTypes = brand => {
	const argTypes = {
		state: {
			options: ['inform', 'feedback', 'warning', 'warning-light'],
		},
	};
	if (brand === 'core') {
		argTypes.state.options = ['inform', 'feedback'];
	}

	if (brand === 'whitelabel') {
		argTypes.state.options = ['inform'];
	}
	return argTypes;
};

const determineStoriesToIncludeByBrand = brand => {
	let NoticeStories = [
		'NoticeInform',
		'NoticeInnerInform',
		'NoticeWarningLight',
		'NoticeInnerWarningLight',
		'NoticeWarning',
		'NoticeInnerWarning',
		'NoticeFeedback',
		'NoticeInnerFeedback',
	];
	switch (brand) {
		case 'whitelabel':
			return ['NoticeInform', 'NoticeInnerInform'];
		case 'core':
			return [
				'NoticeInform',
				'NoticeInnerInform',
				'NoticeFeedback',
				'NoticeInnerFeedback',
			];
		default:
			break;
	}
	return NoticeStories;
};

const noticeProps = {
	title: 'Components/o-message',
	component: NoticeMessage,
	includeStories: determineStoriesToIncludeByBrand(Brand),
	decorators: [withDesign, withHtml],
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
	argTypes: argTypes(Brand),
};
// const defaultProps = Brand === 'internal' && noticeProps

export default noticeProps as ComponentMeta<typeof NoticeMessage>;

const innerDecorator = Story => (
	<div style={{margin: 'auto', maxWidth: '400px'}}>{Story()}</div>
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
