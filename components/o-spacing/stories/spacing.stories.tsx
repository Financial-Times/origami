import "./spacing.scss"
import {SpacingDemo} from "./spacing-demo"

export default {
	title: "Components/o-spacing",
	component: SpacingDemo,
	parameters: {
		guidelines: {},
		html: {},
	},
}

export const Spacing = {
	render: SpacingDemo,

	args: {
		name: "m12",
	},
}
