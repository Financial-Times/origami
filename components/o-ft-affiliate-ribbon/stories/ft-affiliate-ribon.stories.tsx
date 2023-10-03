import {StoryObj, Meta} from "@storybook/react"
import "./ft-affiliate-ribbon.scss"

import {FtAffiliateRibbon} from "../src/tsx/ft-affiliate-ribbon"

export default {
	title: "Components/o-ft-affiliate-ribbon",
	component: FtAffiliateRibbon,
	parameters: {
		layout: "fullscreen",
	},
} as Meta<typeof FtAffiliateRibbon>

export const FtAffiliateRibbonStory: StoryObj<typeof FtAffiliateRibbon> = {
	render: () => {
		return <FtAffiliateRibbon />
	},

	name: "Default FT Affiliate Ribbon",
}
