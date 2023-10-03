import "./visual-effects.scss"
import {TransitionDemo} from "./transition-demo"

export default {
	title: "Components/o-visual-effects",
	component: TransitionDemo,
	parameters: {
		guidelines: {},
		html: {},
	},
}

export const Expand = {
	render: TransitionDemo,

	args: {
		transition: "expand",
		timing: 0.3,
	},
}

export const Slide = {
	render: TransitionDemo,

	args: {
		transition: "slide",
		timing: 0.3,
	},
}

export const Fade = {
	render: TransitionDemo,

	args: {
		transition: "fade",
		timing: 0.3,
	},
}
