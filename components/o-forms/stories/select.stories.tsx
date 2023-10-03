import {StoryFn, Meta} from "@storybook/react"
import {useEffect} from "react"
import "./forms.scss"
import javascript from "../main.js"
import {Select} from "../src/tsx/Select"
import {Button} from "../../o-buttons/src/tsx/button"

const hideArg = {
	table: {
		disable: true,
	},
}

const children = [
	<option value="Option 1" selected>
		Option 1
	</option>,
	<option value="Option 2">Option 2</option>,
	<option value="Option 3">Option 3</option>,
	<option value="Option 4">Option 4</option>,
]

export default {
	title: "Components/o-forms/select-box",
	component: Select,
	argTypes: {
		onChange: hideArg,
		suffix: hideArg,
		children: hideArg,
		inlineInput: hideArg,
		value: hideArg,
		theme: hideArg,
	},
} as Meta<typeof Select>

const Template: StoryFn<typeof Select> = args => {
	useEffect(() => {
		let form = javascript.init()

		return function cleanup() {
			form = Array.isArray(form) ? form : [form]
			form.forEach(element => element.destroy())
		}
	}, [])
	return <Select {...args} />
}

export const OptionalText = {
	render: Template,

	args: {
		title: "Default",
		description: "Optional prompt/description text",
		isOptional: true,
		children,
	},
}

export const ValidSelection = {
	render: Template,

	args: {
		title: "Valid selection",
		highlight: "valid",
		children,
	},
}

export const InvalidSelection = {
	render: Template,

	args: {
		title: "Valid selection",
		errorMessage: "An example error. Try again.",
		children,
	},
}

export const DisabledSelectBox = {
	render: Template,

	args: {
		title: "Disabled select box",
		disabled: true,
		children,
	},
}

export const SmallSelectBox = {
	render: Template,

	args: {
		title: "Small select box",
		isSmall: true,
		children,
	},
}

export const MultipleSelectBox = {
	render: Template,

	args: {
		title: "Multiple select box",
		multiple: true,
		children,
	},
}

export const SelectBoxWithSuffix = {
	render: Template,

	args: {
		title: "Select box with suffix",
		description: "And prompt text for good measure",
		suffix: <Button label="Submit" type="secondary" size="big" />,
		children,
	},
}

export const InlineTitle = {
	render: Template,

	args: {
		title: "Inline title",
		description: "Multiple select boxes can also be inlined.",
		inlineField: true,
		multiple: true,
		children,
	},
}
