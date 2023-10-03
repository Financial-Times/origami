import type {StoryObj, Meta, StoryFn} from "@storybook/react"
import {icons} from "../src/tsx/data"
import {Icon} from "../src/tsx/icon"
import "./icons.scss"

export default {
	title: "Components/o-icons",
	component: Icon,
	argTypes: {
		icon: {
			control: "select",
			options: icons,
		},
	},
} as Meta<typeof Icon>

export const Icons: StoryObj<typeof Icon> = {
	args: {icon: "arrow-down"},
}
