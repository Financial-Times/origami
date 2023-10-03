import "./big-number.scss"
import {BigNumber} from "../src/tsx/big-number"

export default {
	title: "Components/o-big-number",
	component: BigNumber,
	args: {},
	parameters: {
		html: {},
	},
}

export const Example = {
	args: {
		title: "£13.7m",
		content: "Cost expected to increase by £13.7m a year.",
	},
}
