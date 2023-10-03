import {Meta} from "@storybook/react"
import "./editorialLayout.scss"
import {EditorialLayoutBody} from "../../src/tsx/editorial-layout-body"

export default {
	title: "Components/o-editorial-layout",
	component: EditorialLayoutBody,
} as Meta<typeof EditorialLayoutBody>

const Template = args => {
	return (
		<EditorialLayoutBody {...args}>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, quaerat!
		</EditorialLayoutBody>
	)
}

export const Body = {
	render: Template,
}
