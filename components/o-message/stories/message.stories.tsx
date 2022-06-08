import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react'
import { useEffect } from 'react';
import {Message} from '../src/tsx/message';
import javascript from '../main';
import './message.scss'


export default {
	title: 'Components/o-message',
	component: Message,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
  } as ComponentMeta<typeof Message>;

const Story = args => {
	useEffect(() => void javascript.init(null, null), [])
	return <Message {...args} />
};

const defaultButtonActions = {
	primaryAction: {
		copy: 'Button',
		url: '#',
		openInNewWindow: false
	},
	secondaryAction: {
		copy: 'Text link',
		url: '#',
		openInNewWindow:  false
	}
}


export const AlertSuccess: ComponentStory<typeof Message> = Story.bind({});
AlertSuccess.storyName = "Alert: Success"
AlertSuccess.args = {
	type: 'alert',
	state: "success",
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		hightLight: 'Hooray!',
	},
	...defaultButtonActions,
	inner: false,
	showCloseButton: true
};

export const AlertInnerSuccess: ComponentStory<typeof Message> = Story.bind({})
AlertInnerSuccess.storyName = "Alert Inner: Success"
AlertInnerSuccess.args = {
	type: 'alert',
	state: "success",
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		hightLight: 'Hooray!',
		additionalInfo: "Did you know that that sentence uses all of the letters in the alphabet at least once?"
	},
	...defaultButtonActions,
	inner: true,
	showCloseButton: true
}

export const AlertNeutral: ComponentStory<typeof Message> = Story.bind({})
AlertNeutral.storyName = "Alert: Neutral"
AlertNeutral.args = {
	type: 'alert',
	state: "neutral",
	content: {
		detail: "There's a fox, and some lazy dogs. Many lazy dogs. Many, many, many lazy dogs. Only one fox. Many, many, many lazy dogs."
	},
	...defaultButtonActions,
	inner: false,
	showCloseButton: true
}


export const AlertInnerNeutral: ComponentStory<typeof Message> = Story.bind({})
AlertInnerNeutral.storyName = "Alert Inner: Neutral"
AlertInnerNeutral.args = {
	type: 'alert',
	state: "neutral",
	content: {
		detail: 'The quick brown fox did no jump over the lazy dogs!',
		hightLight: 'Meh.',
	},
	...defaultButtonActions,
	inner: true,
	showCloseButton: true
}



export const AlertError: ComponentStory<typeof Message> = Story.bind({})
AlertError.storyName = "Alert: Error"
AlertError.args = {
	type: 'alert',
	state: "error",
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
	},
	...defaultButtonActions,
	inner: false,
	showCloseButton: true
}

export const AlertErrorNeutral: ComponentStory<typeof Message> = Story.bind({})
AlertErrorNeutral.storyName = "Alert Inner: Error"
AlertErrorNeutral.args = {
	type: 'alert',
	state: "error",
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
		hightLight: 'Oops.',
		additionalInfo: 'But that sentence still uses all of the letters in the alphabet at least once!'
	},
	...defaultButtonActions,
	inner: true,
	showCloseButton: true
}



export const NoticeInform: ComponentStory<typeof Message> = Story.bind({})
NoticeInform.storyName = "Notice: Inform"
NoticeInform.args = {
	type: 'notice',
	state: "inform",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	...defaultButtonActions,
	inner: false,
	showCloseButton: true
}

export const NoticeInnerInform: ComponentStory<typeof Message> = Story.bind({})
NoticeInnerInform.storyName = "Notice Inner: Inform"
NoticeInnerInform.args = {
	type: 'notice',
	state: "inform",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	...defaultButtonActions,
	inner: true,
	showCloseButton: false
}

export const NoticeFeedback: ComponentStory<typeof Message> = Story.bind({})
NoticeFeedback.storyName = "Notice: Feedback"
NoticeFeedback.args = {
	type: 'notice',
	state: "feedback",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
	...defaultButtonActions,
	inner: false,
	showCloseButton: true
}

export const NoticeInnerFeedback: ComponentStory<typeof Message> = Story.bind({})
NoticeInnerFeedback.storyName = "Notice Inner: Feedback"
NoticeInnerFeedback.args = {
	type: 'notice',
	state: "feedback",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact. There may also be a fox. This is unconfirmed.",
	},
	...defaultButtonActions,
	inner: true,
	showCloseButton: true
}
