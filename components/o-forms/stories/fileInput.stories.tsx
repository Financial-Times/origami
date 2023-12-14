import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import './forms.scss';
import javascript from '../main.js';
import {FileInput} from '../src/tsx/o-forms';

const hideArg = {
	table: {
		disable: true,
	},
};

export default {
	title: 'Components/o-forms/file-input',
	component: FileInput,
	argTypes: {
		value: hideArg,
		theme: hideArg
	},
} as ComponentMeta<typeof FileInput>;

const Template: ComponentStory<typeof FileInput> = args => {
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <FileInput {...args} />;
};

export const OptionalText = Template.bind({});
export const ValidEntry = Template.bind({});
export const InvalidEntry = Template.bind({});
export const InlineFileInput = Template.bind({});

OptionalText.args = {
	title: 'Optional text input',
	description: 'Optional prompt text',
	isOptional: true,
};

ValidEntry.args = {
	title: 'Text input with a valid entry',
	highlightValid: true,
};

InvalidEntry.args = {
	title: 'Text input with an invalid entry',
	errorMessage: 'An example error. Try again.',
};

InlineFileInput.args = {
	title: 'Inline file input: ',
	inlineField: true,
	isVerticalCenter: true,
};
