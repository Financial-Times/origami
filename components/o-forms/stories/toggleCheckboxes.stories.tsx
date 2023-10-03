import {StoryFn, Meta} from "@storybook/react"
import {useEffect} from "react"
import {Checkbox, Checkboxes} from "../src/tsx/o-forms"
import "./forms.scss"
import javascript from "../main.js"

const hideArg = {
	table: {
		disable: true,
	},
}
export default {
	title: "Components/o-forms/toggle-checkboxes",
	component: Checkboxes,
	argTypes: {
		children: hideArg,
		theme: hideArg,
	},
} as Meta<typeof Checkboxes>

const Template: StoryFn<typeof Checkboxes> = args => {
	useEffect(() => {
		let form = javascript.init()
		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <Checkboxes {...args} />
}

export const CheckboxesStacked = {
	render: Template,

	args: {
		children: [
			<Checkbox name="default" value="Daily" checked />,
			<Checkbox name="default" value="Weekly" />,
			<Checkbox name="default" value="Monthly" checked />,
		],
		title: "Stacked checkboxes",
		description: "Optional description text",
		isOptional: true,
		inputType: "toggle",
	},
}

export const CheckboxesWithDescription = {
	render: Template,

	args: {
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
		inputType: "toggle",
	},
}

export const DisabledCheckboxes = {
	render: Template,

	args: {
		children: [
			<Checkbox name="default" value="Daily" checked disabled />,
			<Checkbox name="default" value="Weekly" disabled />,
		],
		title: "Disabled checkboxes",
		inputType: "toggle",
	},
}

export const ErrorCheckboxes = {
	render: Template,

	args: {
		children: [
			<Checkbox name="default" value="Yes" />,
			<Checkbox name="default" value="No" />,
		],
		title: "Error checkboxes",
		errorMessage: "An example error. Try again.",
		inputType: "toggle",
	},
}

export const InlineFieldAndInputs = {
	render: Template,

	args: {
		children: [
			<Checkbox name="default" value="Daily" checked />,
			<Checkbox name="default" value="Weekly" />,
		],
		title: "Inline field and checkboxes: ",
		inlineInputs: true,
		inlineField: true,
		inputType: "toggle",
	},
}

export const InlineField = {
	render: Template,

	args: {
		children: [
			<Checkbox name="default" value="Daily" />,
			<Checkbox name="default" value="Weekly" checked />,
			<Checkbox name="default" value="Monthly" />,
		],
		title: "Inline field: ",
		inlineField: true,
		description: "with stacked radio buttons",
		inputType: "toggle",
	},
}

export const LabelFirst = {
	render: Template,

	args: {
		children: [<Checkbox name="default" value="Show Password" labelFirst />],
		title: "Label first checkbox",
		inputType: "toggle",
	},
}
