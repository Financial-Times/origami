import {Button} from "../src/tsx/button"
import {ButtonGroup} from "../src/tsx/group"
import "./button.scss"

export default {
	title: "Components/o-buttons",
	component: ButtonGroup,
	args: {},
	parameters: {
		guidelines: {},
		html: {},
	},
}

const ButtonGroupStory = args => (
	<ButtonGroup>
		{args.buttons.map((buttonProps, index) => (
			<Button {...buttonProps} key={index} />
		))}
	</ButtonGroup>
)

export const GroupedButtons = {
	render: ButtonGroupStory,

	args: {
		buttons: [
			{
				label: "button one",
				type: "secondary",
			},
			{
				label: "button two",
				type: "secondary",
			},
			{
				label: "button three",
				type: "secondary",
			},
		],
	},
}
