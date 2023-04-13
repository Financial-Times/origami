import withHtml from "origami-storybook-addon-html";
import { withDesign } from "storybook-addon-designs";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { useEffect } from "react";
import { Checkbox, Checkboxes } from "../src/tsx/o-forms";
import "./forms.scss";
import javascript from "../main.js";

const hideArg = {
	table: {
		disable: true,
	},
};

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const themeControl =
	Brand === "core"
		? {
				control: {
					type: "select",
					labels: {
						"": "default",
						professional: "professional",
					},
				},
				options: ["", "professional"],
		  }
		: hideArg;


export default {
	title: "Components/o-forms/checkboxes",
	component: Checkboxes,
	decorators: [withDesign, withHtml],
	argTypes: {
		children: hideArg,
		theme: themeControl,
	},
} as ComponentMeta<typeof Checkboxes>;

const Template: ComponentStory<typeof Checkboxes> = args => {
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <Checkboxes {...args} />;
};

export const CheckboxesStacked = Template.bind({});
export const CheckboxesWithDescription = Template.bind({});
export const DisabledCheckboxes = Template.bind({});
export const ErrorCheckboxes = Template.bind({});
export const InlineFieldAndInputs = Template.bind({});
export const InlineField = Template.bind({});
export const LabelFirst = Template.bind({});

CheckboxesStacked.args = {
	children: [
		<Checkbox name="default" value="Daily" checked />,
		<Checkbox name="default" value="Weekly" />,
		<Checkbox name="default" value="Monthly" checked />,
	],
	title: "Stacked checkboxes",
	description: "Optional description text",
	isOptional: true,
};
CheckboxesWithDescription.args = {
	children: [
		<Checkbox
			name="default"
			value="Lorem ipsum dolor sit amet"
			checked
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad earum magnam vel possimus harum suscipit."
		/>,
		<Checkbox
			name="default"
			value="Lorem ipsum dolor"
			description="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam numquam aspernatur error voluptas dolorem ab."
		/>,
	],
	title: "Checkbox inputs with description",
	description: "Optional description text",
};

DisabledCheckboxes.args = {
	children: [
		<Checkbox name="default" value="Daily" checked disabled />,
		<Checkbox name="default" value="Weekly" disabled />,
	],
	title: "Disabled checkboxes",
};
ErrorCheckboxes.args = {
	children: [
		<Checkbox name="default" value="Yes" />,
		<Checkbox name="default" value="No" />,
	],
	title: "Error checkboxes",
	errorMessage: "An example error. Try again.",
};

InlineField.args = {
	children: [
		<Checkbox name="default" value="Daily" />,
		<Checkbox name="default" value="Weekly" checked />,
		<Checkbox name="default" value="Monthly" />,
	],
	title: "Inline field: ",
	inlineField: true,
	description: "with stacked radio buttons",
};

LabelFirst.args = {
	children: [<Checkbox name="default" value="Show Password" labelFirst />],
	title: "Label first checkbox",
};

InlineFieldAndInputs.args = {
	children: [
		<Checkbox name="default" value="Daily" checked />,
		<Checkbox name="default" value="Weekly" />,
	],
	title: "Inline field and checkboxes: ",
	inlineInputs: true,
	inlineField: true,
};
