import {StoryFn, Meta} from "@storybook/react"
import {useEffect} from "react"
import "./forms.scss"
import javascript from "../main.js"
import {DateInput} from "../src/tsx/o-forms"

const hideArg = {
	table: {
		disable: true,
	},
}

export default {
	title: "Components/o-forms/date-input",
	component: DateInput,
	argTypes: {
		onChange: hideArg,
		values: hideArg,
		theme: hideArg,
	},
} as Meta<typeof DateInput>

const Template: StoryFn<typeof DateInput> = args => {
	useEffect(() => {
		let form = javascript.init()

		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <DateInput {...args} />
}

export const OptionalDateInput = {
	render: Template,

	args: {
		title: "Optional text input",
		description: "Optional prompt text",
		isOptional: true,
	},
}

export const DisabledDateInput = {
	render: Template,

	args: {
		title: "Text input with a valid entry",
		disabled: true,
	},
}

export const InvalidEntry = {
	render: Template,

	args: {
		title: "Text input with an invalid entry",
		errorMessage: "An example error. Try again.",
	},
}

export const InlineDateInput = {
	render: Template,

	args: {
		title: "Inline file input: ",
		inlineField: true,
	},
}
