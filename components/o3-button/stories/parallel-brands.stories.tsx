import {withDesign} from "storybook-addon-designs";
import {Button} from "../src/tsx/buttons";
import "./buttons.scss";
import withHtml from "origami-storybook-addon-html";

export default {
	title: "Components/o3-button",
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

const SubBrandWithinBrand = args => (
		<div>
			<h1>Brands</h1>
			<div className='o-brand-core o-buttons-container'>
				<h2>Core Brand</h2>
				<Button label='Primary' type='primary'/>
				<Button label='Secondary' type='secondary'/>
			</div>
			<div className='o-brand-professional o-buttons-container'>
				<h2>Professional</h2>
				<p>Not a descendant of any other brands. Will not be affected by core brand variables.</p>
				<Button label='Primary' type='primary'/>
				<Button label='Secondary' type='secondary'/>
			</div>
		</div>
	)
;

export const ParallelBrand = SubBrandWithinBrand.bind({});
ParallelBrand.args = {
	label: "Press button",
	type: "primary",
};

// export const SecondaryButton = ButtonStory.bind({});
// SecondaryButton.args = {
// 	label: "Press button",
// 	type: "secondary",
// };