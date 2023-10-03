import {StoryObj, StoryFn, Meta} from "@storybook/react"

import {Share} from "../src/tsx/share"
import {ShareIcon, UrlProps} from "../src/tsx/shareIcon"
import {useEffect, ComponentProps} from "react"
import javascript from "../main"
import "./share.scss"

export default {
	title: "Components/o-share",
	component: Share,
	args: {
		title: "US drugs",
		url: "http://on.ft.com/1mUdgA2",
		titleExtra: "FT.com | Pharmaceuticals",
		summary: "US drugs group vows to maintain big British presence",
		relatedXAccounts: "ftcompanies",
		small: false,
		inverse: false,
		vertical: false,
	},
} as Meta<typeof Share>

type ShareProps = ComponentProps<typeof Share> & UrlProps

const StoryTemplate: StoryFn<ShareProps> = args => {
	useEffect(() => void javascript.init(), [])
	const shareProps = {
		small: args.small,
		vertical: args.vertical,
		inverse: args.inverse,
	}
	const shareIconProps = {
		url: args.url,
		title: args.title,
		titleExtra: args.titleExtra,
		summary: args.summary,
		relatedXAccounts: args.relatedXAccounts,
	}
	return (
		<Share {...shareProps}>
			<ShareIcon icon="x" urlProps={shareIconProps} />
			<ShareIcon icon="facebook" urlProps={shareIconProps} />
			<ShareIcon icon="linkedin" urlProps={shareIconProps} />
			<ShareIcon icon="whatsapp" urlProps={shareIconProps} />
		</Share>
	)
}

export const Horizontal: StoryObj<ShareProps> = {
	render: StoryTemplate,
}

export const Small: StoryObj<ShareProps> = {
	render: StoryTemplate,

	args: {
		small: true,
	},
}

export const Inverse: StoryObj<ShareProps> = {
	render: StoryTemplate,

	args: {
		inverse: true,
	},

	parameters: {
		origamiBackground: "slate",
	},
}

export const Vertical: StoryObj<ShareProps> = {
	render: StoryTemplate,

	args: {
		vertical: true,
	},
}
