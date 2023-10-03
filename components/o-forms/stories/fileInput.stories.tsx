import {StoryFn, Meta} from "@storybook/react"
import {useEffect} from "react"
import "./forms.scss"
import javascript from "../main.js"
import {FileInput} from "../src/tsx/o-forms"

const hideArg = {
	table: {
		disable: true,
	},
}

export default {
	title: "Components/o-forms/file-input",
	component: FileInput,
	argTypes: {
		value: hideArg,
		theme: hideArg,
	},
} as Meta<typeof FileInput>

const Template: StoryFn<typeof FileInput> = args => {
	useEffect(() => {
		let form = javascript.init()

		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <FileInput {...args} />
}

export const OptionalText = {
	render: Template,

	args: {
		title: "Optional text input",
		description: "Optional prompt text",
		isOptional: true,
	},
}

export const ValidEntry = {
	render: Template,

	args: {
		title: "Text input with a valid entry",
		highlightValid: true,
	},
}

export const InvalidEntry = {
	render: Template,

	args: {
		title: "Text input with an invalid entry",
		errorMessage: "An example error. Try again.",
	},
}

export const InlineFileInput = {
	render: Template,

	args: {
		title: "Inline file input: ",
		inlineField: true,
		isVerticalCenter: true,
	},
}
