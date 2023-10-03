import {StoryObj, Meta} from "@storybook/react"
import {TopBanner} from "../src/tsx/top-banner"
import "./top-banner.scss"

export default {
	title: "Components/o-top-banner",
	component: TopBanner,
	parameters: {},
	args: {},
} as Meta<typeof TopBanner>

export const NewWorldTopBanner: StoryObj<typeof TopBanner> = {
	args: {
		heading: "Make sense of it all.",
		content: "Become an FT subscriber. Pay annually and save 20%",
		primaryAction: {
			copy: "Subscribe now",
			url: "#",
		},
		theme: "new-world",
	},
}

export const InverseProfessionalTopBanner: StoryObj<typeof TopBanner> = {
	args: {
		heading: "You can now access Workspace",
		content: "Only available with your FT Professional subscription",
		primaryAction: {
			copy: "Visit Workspace",
			url: "#",
		},
		theme: "professional-inverse",
	},
}
