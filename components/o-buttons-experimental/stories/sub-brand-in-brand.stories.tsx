import {withDesign} from "storybook-addon-designs";
import {Button, LinkButton} from "../src/tsx/buttons-experimental";
import "./buttons-experimental.scss";
import withHtml from "origami-storybook-addon-html";
import {Sub} from "@financial-times/o-typography/src/tsx/typography";

export default {
	title: "Components/o-tokens-experimental",
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
		<>
			<h1>Brands</h1>
			<div className='o-brand-core o-buttons-container'>
				<h2>Core Brand</h2>
				<Button label='Primary' type='primary'/>
				<Button label='Secondary' type='secondary'/>
				<Button label='Ghost' type='ghost'/>
				<div className='o-brand-professional o-buttons-container'>
					<h2>Professional Sub Brand</h2>
					<Button label='Primary' type='primary'/>
					<Button label='Secondary' type='secondary'/>
					<Button label='Ghost' type='ghost'/>
				</div>
				<div className='o-brand-whitelabel o-buttons-container'>
					<h2>Whitelabel</h2>
					<Button label='Primary' type='primary'/>
					<Button label='Secondary' type='secondary'/>
					<Button label='Ghost' type='ghost'/>
				</div>
			</div>
		</>
	)
;
const LinkButtonStory = args => <LinkButton {...args} />;

export const SubBrand = SubBrandWithinBrand.bind({});
SubBrand.args = {
	label: "Press button",
	type: "primary",
};

// export const SecondaryButton = ButtonStory.bind({});
// SecondaryButton.args = {
// 	label: "Press button",
// 	type: "secondary",
// };
