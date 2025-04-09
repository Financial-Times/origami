import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {RadioBtn, RadioBtnsBox} from '../src/tsx/o-forms';
import './forms.scss';
import javascript from '../main.js';
import {useArgs} from '@storybook/preview-api';

const hideArg = {
	table: {
		disable: true,
	},
};

const Brand = process.env.STORYBOOK_BRAND;
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
	title: 'Maintained/o-forms/box-radio-buttons',
	component: RadioBtnsBox,
	argTypes: {
		children: hideArg,
		theme: themeControl,
	},
} as ComponentMeta<typeof RadioBtnsBox>;

const Template: ComponentStory<typeof RadioBtnsBox> = args => {
	const [_, updateArgs] = useArgs();
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
			updateArgs({...args, theme: undefined});
		};
	}, []);
	return <RadioBtnsBox {...args} />;
};

export const BoxRadioButton = Template.bind({});
export const NegativeHighlight = Template.bind({});
export const MultipleBoxRadioButton = Template.bind({});
export const DisabledBoxRadioButton = Template.bind({});
export const ErrorBoxRadioButton = Template.bind({});
export const StateBoxRadioButton = Template.bind({});

BoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked />,
		<RadioBtn name="default" value="Weekly" />,
	],
	title: 'Box style radio buttons',
	description: 'Optional prompt text',
	isOptional: true,
};

NegativeHighlight.args = {
	children: [
		<RadioBtn name="default" value="Yes" />,
		<RadioBtn name="default" value="No" checked isNegative />,
	],
	title: 'Negative highlight',
	description: 'Requires a modifier on the label',
};

MultipleBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" />,
		<RadioBtn name="default" value="Weekly" checked />,
		<RadioBtn name="default" value="Monthly" />,
	],
	title: 'Multiple box-styled radio buttons',
};

DisabledBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked disabled />,
		<RadioBtn name="default" value="Weekly" checked disabled />,
	],
	title: 'Disabled box-styled radio buttons',
};
ErrorBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Yes" />,
		<RadioBtn name="default" value="No" />,
	],
	title: 'Error box-style radio buttons',
	errorMessage: 'An example error. Try again.',
};

StateBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked />,
		<RadioBtn name="default" value="Weekly" />,
	],
	title: 'Stateful Box Button',
	description: 'Also available with icon only',
	state: 'saving',
};
