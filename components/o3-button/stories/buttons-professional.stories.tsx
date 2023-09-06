import { withDesign } from "storybook-addon-designs";
import { Button } from "../src/tsx/buttons";
import "./buttons.scss";
import withHtml from "origami-storybook-addon-html";

export default {
	title: "Components/o3-button/professional",
	component: Button,
	decorators: [withDesign, withHtml],
	args: {
		onClick: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=29%3A1131",
		},
		guidelines: {
			notion: "448d914df4fd4bb68fdf5bc5e85c4b46",
		},
		html: {},
	},
	argTypes: {
		icon: {
			control: "select",
			options: [
				"arrow-left",
				"arrow-right",
				"upload",
				"tick",
				"plus",
				"warning",
				"arrow-down",
				"arrow-up",
				"grid",
				"list",
				"edit",
				"download",
				"search",
				"refresh",
				"cross",
			],
		},
	},
};

const ButtonStory = args => (<div className='o-brand-professional'><Button {...args} /></div>);

export const PrimaryButton = ButtonStory.bind({});
PrimaryButton.args = {
	label: "Press button",
	type: "primary",
};

export const SecondaryButton = ButtonStory.bind({});
SecondaryButton.args = {
	label: "Press button",
	type: "secondary",
};

export const HypoButton = ButtonStory.bind({});
HypoButton.args = {
	label: "Hypo button",
	type: "primary",
};

