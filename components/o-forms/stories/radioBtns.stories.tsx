import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {RadioBtn, RadioBtns} from '../src/tsx/o-forms';
import './forms.scss';
import javascript from '../main.js';

const hideArg = {
	table: {
		disable: true,
	},
};

const Brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const themeControl =
	Brand === 'core'
		? {
				control: {
					type: 'select',
				},
				options: [undefined, 'professional', 'professional-inverse', 'ft-live'],
		  }
		: hideArg;

export default {
	title: 'Components/o-forms/radio-buttons',
	component: RadioBtns,
	argTypes: {
		children: hideArg,
		theme: themeControl,
	},
} as ComponentMeta<typeof RadioBtns>;

const Template: ComponentStory<typeof RadioBtns> = args => {
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <RadioBtns {...args} />;
};

export const RadioButton = Template.bind({});
export const DisabledRadioButton = Template.bind({});
export const ErrorRadioButton = Template.bind({});
export const MultipleInlineRadioButton = Template.bind({});
export const InlineField = Template.bind({});
export const InlineFieldAndInputs = Template.bind({});

RadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked />,
		<RadioBtn name="default" value="Weekly" />,
	],
	title: 'Radio buttons',
	description: 'Optional description text',
	isOptional: true,
};

MultipleInlineRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" />,
		<RadioBtn name="default" value="Weekly" checked />,
		<RadioBtn name="default" value="Monthly" />,
	],
	title: 'Inline round-style radio buttons',
	inlineInputs: true,
};

DisabledRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked disabled />,
		<RadioBtn name="default" value="Weekly" checked disabled />,
	],
	title: 'Disabled radio buttons',
};
ErrorRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Yes" />,
		<RadioBtn name="default" value="No" />,
	],
	title: 'Error round-style radio buttons',
	errorMessage: 'An example error. Try again.',
};

InlineField.args = {
	children: [
		<RadioBtn name="default" value="Daily" />,
		<RadioBtn name="default" value="Weekly" checked />,
		<RadioBtn name="default" value="Monthly" />,
	],
	title: 'Inline field',
	inlineField: true,
	description: 'stacked radio buttons',
};

InlineFieldAndInputs.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked />,
		<RadioBtn name="default" value="Weekly" />,
	],
	title: 'Radio buttons:',
	inlineInputs: true,
	inlineField: true,
};
