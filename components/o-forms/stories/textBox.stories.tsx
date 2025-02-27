import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect, useState} from 'react';
import './forms.scss';
import javascript from '../main.js';
import {TextInput} from '../src/tsx/o-forms';

const hideArg = {
	table: {
		disable: true,
	},
};

export default {
	title: 'Maintained/o-forms/text-box',
	component: TextInput,
	argTypes: {
		onChange: hideArg,
		children: hideArg,
		inlineInput: hideArg,
		value: hideArg,
		highlightValid: {
			if: {arg: 'errorMessage', truthy: false},
		},
		theme: hideArg,
	},
} as ComponentMeta<typeof TextInput>;

const Template: ComponentStory<typeof TextInput> = args => {
	const [value, setValue] = useState(args.value);
	const onChange = e => {
		setValue(e.target.value);
	};
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <TextInput {...args} value={value} onChange={onChange} />;
};

export const OptionalText = Template.bind({});
export const ValidEntry = Template.bind({});
export const InvalidEntry = Template.bind({});
export const TextArea = Template.bind({});
export const DisabledTextInput = Template.bind({});
export const SmallTextInput = Template.bind({});
export const InputWithSuffix = Template.bind({});
export const SmallInputWithSuffix = Template.bind({});
export const InlineWithShrunkenTitle = Template.bind({});
export const PasswordInput = Template.bind({});

OptionalText.args = {
	title: 'Optional text input',
	description: 'Optional prompt text',
	isOptional: true,
};

ValidEntry.args = {
	title: 'Text input with a valid entry',
	highlightValid: true,
	value: 'Valid Input',
};

InvalidEntry.args = {
	title: 'Text input with an invalid entry',
	errorMessage: 'Please fill out this field',
};

TextArea.args = {
	title: 'Textarea input',
	type: 'textarea',
	value: "This is a text input with type 'textarea'.",
};

DisabledTextInput.args = {
	title: 'Disabled text input',
	disabled: true,
	value: 'Disabled',
};

SmallTextInput.args = {
	title: 'Small text input',
	isSmall: true,
	value: 'Value',
};

InputWithSuffix.args = {
	title: 'Text input with suffix',
	isOptional: true,
	children: <button className="demo-submit-button">Submit</button>,
};

InlineWithShrunkenTitle.args = {
	title: 'Inline & shruken title',
	description: 'Vertically centered',
	inlineField: true,
	isVerticalCenter: true,
};

SmallInputWithSuffix.args = {
	title: 'Small text input with suffix',
	isSmall: true,
	children: <button className="demo-submit-small-button">Submit</button>,
};

PasswordInput.args = {
	title: 'Password input',
	type: 'password',
	value: 'password',
};
