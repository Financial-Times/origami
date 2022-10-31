import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect, useState} from 'react';
import './forms.scss';
import javascript from '../main.js';
import { TextInput } from '../src/tsx/TextInput';
import { Button } from '../../o-buttons/src/tsx/button';

export default {
	title: 'Components/o-forms/text-box',
	component: TextInput,
	decorators: [withDesign, withHtml],
	argTypes:{
		onChange: {
			table: {
        disable: true
      }
		},
		ref: {
			table: {
				disable: true
				}
			}
		}
	} as ComponentMeta<typeof TextInput>;

const FormStory = args => {
	const [value, setValue] = useState(args.value);
	const onChange = (e) => {setValue(e.target.value)}
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <TextInput {...args} value={value} onChange={onChange}/>;
};

export const OptionalText: ComponentStory<typeof TextInput> = FormStory.bind({});
export const ValidEntry: ComponentStory<typeof TextInput> = FormStory.bind({});
export const InvalidEntry: ComponentStory<typeof TextInput> = FormStory.bind({});
export const TextArea: ComponentStory<typeof TextInput> = FormStory.bind({});
export const DisabledTextInput: ComponentStory<typeof TextInput> = FormStory.bind({});
export const SmallTextInput: ComponentStory<typeof TextInput> = FormStory.bind({});
export const InputWithSuffix: ComponentStory<typeof TextInput> = FormStory.bind({});
export const SmallInputWithSuffix: ComponentStory<typeof TextInput> = FormStory.bind({});
export const InlineWithShrunkenTitle: ComponentStory<typeof TextInput> = FormStory.bind({});
export const PasswordInput: ComponentStory<typeof TextInput> = FormStory.bind({});



OptionalText.args = {
	title: "Optional text input",
	description: "Optional prompt text",
	isOptional: true
}

ValidEntry.args = {
	title: "Text input with a valid entry",
	highlight: 'valid',
	value: 'Valid Input'
}

InvalidEntry.args = {
	title: "Text input with an invalid entry",
	highlight: 'invalid',
	errorMessage: 'Please fill out this field'
}

TextArea.args = {
	title: "Optional text input",
	type: "textarea",
	value: "With type 'textarea'"
}

DisabledTextInput.args = {
	title: "Disabled text input",
	disabled: true,
	value: 'Disabled'
}

SmallTextInput.args = {
	title: "Small text input",
	isSmall: true,
	value: 'Value'
}

InputWithSuffix.args = {
	title: "Text input with suffix",
	isOptional: true,
	children: <Button label='Submit' type='secondary' size='big'/>
}

InlineWithShrunkenTitle.args = {
	title: "Shrunken title",
	isOptional: true,
	description: "Vertically centered",
	isInline: true,
	isVerticalCenter: true
}

SmallInputWithSuffix.args = {
	title: "Small text input with suffix",
	isSmall: true,
	children: <Button label='Submit' type='secondary'/>
}

PasswordInput.args = {
	title: "Password input",
	type: 'password',
	value: 'password'
}

