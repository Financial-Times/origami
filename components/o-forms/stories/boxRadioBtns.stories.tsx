import {StoryFn, Meta} from "@storybook/react"
import {useEffect} from "react"
import {RadioBtn, RadioBtnsBox} from "../src/tsx/o-forms"
import "./forms.scss"
import javascript from "../main.js"

const hideArg = {
	table: {
		disable: true,
	},
}

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND
const themeControl =
	Brand === "core"
		? {
				control: {
					type: "select",
				},
				options: [undefined, "professional", "professional-inverse", "ft-live"],
		  }
		: hideArg

export default {
	title: "Components/o-forms/box-radio-buttons",
	component: RadioBtnsBox,
	args: {},
	argTypes: {
		children: hideArg,
		theme: themeControl,
	},
} as Meta<typeof RadioBtnsBox>

const Template: StoryFn<typeof RadioBtnsBox> = args => {
	useEffect(() => {
		let form = javascript.init()
		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <RadioBtnsBox {...args} />
}

export const BoxRadioButton = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Daily" checked />,
			<RadioBtn name="default" value="Weekly" />,
		],
		title: "Box style radio buttons",
		description: "Optional prompt text",
		isOptional: true,
	},
}

export const NegativeHighlight = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Yes" />,
			<RadioBtn name="default" value="No" checked isNegative />,
		],
		title: "Negative highlight",
		description: "Requires a modifier on the label",
	},
}

export const MultipleBoxRadioButton = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Daily" />,
			<RadioBtn name="default" value="Weekly" checked />,
			<RadioBtn name="default" value="Monthly" />,
		],
		title: "Multiple box-styled radio buttons",
	},
}

export const DisabledBoxRadioButton = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Daily" checked disabled />,
			<RadioBtn name="default" value="Weekly" checked disabled />,
		],
		title: "Disabled box-styled radio buttons",
	},
}

export const ErrorBoxRadioButton = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Yes" />,
			<RadioBtn name="default" value="No" />,
		],
		title: "Error box-style radio buttons",
		errorMessage: "An example error. Try again.",
	},
}

export const StateBoxRadioButton = {
	render: Template,

	args: {
		children: [
			<RadioBtn name="default" value="Daily" checked />,
			<RadioBtn name="default" value="Weekly" />,
		],
		title: "Stateful Box Button",
		description: "Also available with icon only",
		state: "saving",
	},
}
