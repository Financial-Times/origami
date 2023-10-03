import {Meta} from "@storybook/react"
import {EditorialLayoutHeading} from "../../src/tsx/editorial-layout-heading"
import "./editorialLayout.scss"

export default {
	title: "Components/o-editorial-layout",
	component: EditorialLayoutHeading,
	args: {
		title: "What I learnt in my days on the mountain in Davos",
	},
} as Meta<typeof EditorialLayoutHeading>

const Template = args => {
	const {title, ...headingArgs} = args
	return (
		<EditorialLayoutHeading {...headingArgs}>{title}</EditorialLayoutHeading>
	)
}

export const Heading = {
	render: Template,

	args: {
		headingLevel: "1",
	},
}
