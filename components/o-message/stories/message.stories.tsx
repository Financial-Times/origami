import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react'
import { useEffect } from 'react';
import {Message} from '../src/tsx/message';
import javascript from '../main';
import './message.scss';

export default {
	title: 'Components/o-message',
	component: Message,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {
		showCloseButton: true,
		inner: false,
		primaryAction: {
			text: 'Button',
			url: '#',
			openInNewWindow: false
		},
		secondaryAction: {
			text: 'Text link',
			url: '#',
			openInNewWindow:  false
		}
	},
  } as ComponentMeta<typeof Message>;


const innerDecorator = (Story) => <div style={{ margin: "auto", maxWidth: "400px" }}>{Story()}</div>

const Story = args => {
	useEffect(() => void javascript.init(), [])
	return <Message {...args} />
};



export const AlertSuccess: ComponentStory<typeof Message> = Story.bind({});
AlertSuccess.storyName = "Alert: Success"
AlertSuccess.args = {
	type: 'alert',
	state: "success",
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
	},
};

export const AlertInnerSuccess: ComponentStory<typeof Message> = Story.bind({})
AlertInnerSuccess.decorators = [innerDecorator]
AlertInnerSuccess.storyName = "Alert Inner: Success"
AlertInnerSuccess.args = {
	type: 'alert',
	state: "success",
	content: {
		detail: 'The quick brown fox jumped over the lazy dogs!',
		highlight: 'Hooray!',
		additionalInfo: "Did you know that that sentence uses all of the letters in the alphabet at least once?"
	},
	inner: true,
}

export const AlertNeutral: ComponentStory<typeof Message> = Story.bind({})
AlertNeutral.storyName = "Alert: Neutral"
AlertNeutral.args = {
	type: 'alert',
	state: "neutral",
	content: {
		detail: "There's a fox, and some lazy dogs. Many lazy dogs. Many, many, many lazy dogs. Only one fox. Many, many, many lazy dogs."
	},
}

export const AlertInnerNeutral: ComponentStory<typeof Message> = Story.bind({})
AlertInnerNeutral.decorators = [innerDecorator]
AlertInnerNeutral.storyName = "Alert Inner: Neutral"
AlertInnerNeutral.args = {
	type: 'alert',
	state: "neutral",
	content: {
		detail: 'The quick brown fox did no jump over the lazy dogs!',
		highlight: 'Meh.',
	},
	inner: true,
}


export const AlertError: ComponentStory<typeof Message> = Story.bind({})
AlertError.storyName = "Alert: Error"
AlertError.args = {
	type: 'alert',
	state: "error",
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
	},
}

export const AlertInnerError: ComponentStory<typeof Message> = Story.bind({})
AlertInnerError.decorators = [innerDecorator]
AlertInnerError.storyName = "Alert Inner: Error"
AlertInnerError.args = {
	type: 'alert',
	state: "error",
	content: {
		detail: 'The quick brown fox did not jump over the lazy dogs.',
		highlight: 'Oops.',
		additionalInfo: 'But that sentence still uses all of the letters in the alphabet at least once!'
	},
	inner: true,
}

export const NoticeInform: ComponentStory<typeof Message> = Story.bind({})
NoticeInform.storyName = "Notice: Inform"
NoticeInform.args = {
	type: 'notice',
	state: "inform",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
}

export const NoticeInnerInform: ComponentStory<typeof Message> = Story.bind({})
NoticeInnerInform.decorators = [innerDecorator]
NoticeInnerInform.storyName = "Notice Inner: Inform"
NoticeInnerInform.args = {
	type: 'notice',
	state: "inform",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact.",
	},
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
}

export const NoticeInnerFeedback: ComponentStory<typeof Message> = Story.bind({})
NoticeInnerFeedback.decorators = [innerDecorator]
NoticeInnerFeedback.storyName = "Notice Inner: Feedback"
NoticeInnerFeedback.args = {
	type: 'notice',
	state: "feedback",
	content: {
		detail: "There are lazy dogs, maybe in a field, maybe not. It's important that you are informed of this fact. There may also be a fox. This is unconfirmed.",
	},
	inner: true,
}
