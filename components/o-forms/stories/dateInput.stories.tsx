import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import './forms.scss';
import javascript from '../main.js';
import {DateInput} from '../src/tsx/o-forms';

const hideArg = {
	table: {
		disable: true,
	},
};

export default {
	title: 'Components/o-forms/date-input',
	component: DateInput,
	argTypes: {
		onChange: hideArg,
		values: hideArg,
    theme: hideArg
	},
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = args => {
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <DateInput {...args} />;
};

export const OptionalDateInput = Template.bind({});
export const DisabledDateInput = Template.bind({});
export const InvalidEntry = Template.bind({});
export const InlineDateInput = Template.bind({});

OptionalDateInput.args = {
	title: 'Optional text input',
	description: 'Optional prompt text',
	isOptional: true,
};

DisabledDateInput.args = {
	title: 'Text input with a valid entry',
	disabled: true,
};

InvalidEntry.args = {
	title: 'Text input with an invalid entry',
	errorMessage: 'An example error. Try again.',
};

InlineDateInput.args = {
	title: 'Inline file input: ',
	inlineField: true,
};
