import {StoryFn, Meta} from "@storybook/react"
import {useEffect, useState} from "react"
import "./forms.scss"
import javascript from "../main.js"
import {TextInput} from "../src/tsx/o-forms"
import {Button} from "../../o-buttons/src/tsx/button"

const hideArg = {
	table: {
		disable: true,
	},
}

export default {
	title: "Components/o-forms/text-box",
	component: TextInput,
	argTypes: {
		onChange: hideArg,
		children: hideArg,
		inlineInput: hideArg,
		value: hideArg,
		highlightValid: {
			if: {arg: "errorMessage", truthy: false},
		},
		theme: hideArg,
	},
} as Meta<typeof TextInput>

const Template: StoryFn<typeof TextInput> = args => {
	const [value, setValue] = useState(args.value)
	const onChange = e => {
		setValue(e.target.value)
	}
	useEffect(() => {
		let form = javascript.init()

		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <TextInput {...args} value={value} onChange={onChange} />
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
		value: "Valid Input",
	},
}

export const InvalidEntry = {
	render: Template,

	args: {
		title: "Text input with an invalid entry",
		errorMessage: "Please fill out this field",
	},
}

export const TextArea = {
	render: Template,

	args: {
		title: "Textarea input",
		type: "textarea",
		value: "This is a text input with type 'textarea'.",
	},
}

export const DisabledTextInput = {
	render: Template,

	args: {
		title: "Disabled text input",
		disabled: true,
		value: "Disabled",
	},
}

export const SmallTextInput = {
	render: Template,

	args: {
		title: "Small text input",
		isSmall: true,
		value: "Value",
	},
}

export const InputWithSuffix = {
	render: Template,

	args: {
		title: "Text input with suffix",
		isOptional: true,
		children: <Button label="Submit" type="secondary" size="big" />,
	},
}

export const SmallInputWithSuffix = {
	render: Template,

	args: {
		title: "Small text input with suffix",
		isSmall: true,
		children: <Button label="Submit" type="secondary" />,
	},
}

export const InlineWithShrunkenTitle = {
	render: Template,

	args: {
		title: "Inline & shruken title",
		description: "Vertically centered",
		inlineField: true,
		isVerticalCenter: true,
	},
}

export const PasswordInput = {
	render: Template,

	args: {
		title: "Password input",
		type: "password",
		value: "password",
	},
}
