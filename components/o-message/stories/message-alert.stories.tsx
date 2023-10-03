import {StoryObj, Meta} from "@storybook/react"
import {useEffect} from "react"
import {AlertMessage} from "../src/tsx/message"
import javascript from "../main"
import "./message.scss"

export default {
	title: "Components/o-message",
	component: AlertMessage,
	parameters: {},
	args: {
		showCloseButton: true,
		inner: false,
		primaryAction: {
			text: "Button",
			url: "#",
			openInNewWindow: false,
		},
		secondaryAction: {
			text: "Text link",
			url: "#",
			openInNewWindow: false,
		},
	},
} as Meta<typeof AlertMessage>

const innerDecorator = Story => (
	<div className="demo-inner-message">{Story()}</div>
)

const AlertStory = args => {
	useEffect(() => {
		let messages = javascript.init()
		return () => {
			messages = Array.isArray(messages) ? messages : [messages]
			messages.forEach(message => message.destroy())
		}
	}, [args.showCloseButton])
	return <AlertMessage {...args} />
}

export const AlertSuccess: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	name: "Alert: Success",

	args: {
		state: "success",
		content: {
			detail: "The quick brown fox jumped over the lazy dogs!",
			highlight: "Hooray!",
		},
	},
}

export const AlertInnerSuccess: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	decorators: [innerDecorator],
	name: "Alert Inner: Success",

	args: {
		state: "success",
		content: {
			detail: "The quick brown fox jumped over the lazy dogs!",
			highlight: "Hooray!",
			additionalInfo:
				"Did you know that that sentence uses all of the letters in the alphabet at least once?",
		},
		inner: true,
	},
}

export const AlertNeutral: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	name: "Alert: Neutral",

	args: {
		state: "neutral",
		content: {
			detail:
				"There's a fox, and some lazy dogs. Many lazy dogs. Many, many, many lazy dogs. Only one fox. Many, many, many lazy dogs.",
		},
	},
}

export const AlertInnerNeutral: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	decorators: [innerDecorator],
	name: "Alert Inner: Neutral",

	args: {
		state: "neutral",
		content: {
			detail: "The quick brown fox did no jump over the lazy dogs!",
			highlight: "Meh.",
		},
		inner: true,
	},
}

export const AlertError: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	name: "Alert: Error",

	args: {
		state: "error",
		content: {
			detail: "The quick brown fox did not jump over the lazy dogs.",
		},
	},
}

export const AlertInnerError: StoryObj<typeof AlertMessage> = {
	render: AlertStory,
	decorators: [innerDecorator],
	name: "Alert Inner: Error",

	args: {
		state: "error",
		content: {
			detail: "The quick brown fox did not jump over the lazy dogs.",
			highlight: "Oops.",
			additionalInfo:
				"But that sentence still uses all of the letters in the alphabet at least once!",
		},
		inner: true,
	},
}
