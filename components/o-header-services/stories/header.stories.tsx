import {withDesign} from "storybook-addon-designs"
import {useEffect} from "react"
import {Header} from "../src/tsx/header"
import javascript from "../main"
import "./header.scss"

export default {
	title: "Service Header",
	component: Header,
	decorators: [withDesign],
	args: {
		title: "Cool app",
		tagline: "Welcome to the chill out zone",
	},
	parameters: {
		layout: "fullscreen",
	},
}

const Story = args => {
	useEffect(() => void javascript.init(document.body), [])
	return <Header {...args} />
}

export const WithNavigation = Story.bind({})
WithNavigation.args = {
	nav: [
		{label: "chill out tutorials", url: "#"},
		{
			label: "cool people database",
			items: [
				{label: "radical jim", url: "#"},
				{label: "steel-eyed carol", url: "#"},
			],
		},
	],
	subnav: {
		ancestors: [
			{label: "chill out tutorials", url: "#"},
			{label: "being sick", url: "#"},
		],
		children: [
			{label: "getting started", url: "#"},
			{label: "getting cosy", url: "#", current: true},
			{label: "finding parties", url: "#"},
		],
	},
}
