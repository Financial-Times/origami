import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import { BoxBtnDemo } from './Demos';
import './forms.scss';
import javascript from '../main.js';

export default {
	title: 'Components/o-forms/box-radio-buttons',
	component: BoxBtnDemo,
	decorators: [withDesign, withHtml],
	parameters: {},
} as ComponentMeta<typeof BoxBtnDemo>;

const FormStory = args => {
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <BoxBtnDemo {...args}/>;
};

export const BoxRadioButton: ComponentStory<typeof BoxBtnDemo> = FormStory.bind({});

export const NegativeHighlight: ComponentStory<typeof BoxBtnDemo> =
	FormStory.bind({});

export const MultipleBoxRadioButton: ComponentStory<typeof BoxBtnDemo> =
	FormStory.bind({});

export const DisabledBoxRadioButton: ComponentStory<typeof BoxBtnDemo> = FormStory.bind({});

export const ErrorBoxRadioButton: ComponentStory<typeof BoxBtnDemo> =
	FormStory.bind({});

export const StateBoxRadioButton: ComponentStory<typeof BoxBtnDemo> =
	FormStory.bind({});

BoxRadioButton.args = {
	Buttons: [
		{
			name: "default",
			value: "Daily",
			checked: true
		},
		{
			name: "default",
			value: "Weekly"
		}
	],
	title: "Box style radio buttons",
	description: "Optional prompt text",
	isOptional:true,
};

NegativeHighlight.args = {
	Buttons: [
		{
			name: "default",
			value: "Yes",
		},
		{
			name: "default",
			value: "No",
			checked: true,
			isNegative: true
		}
	],
	title: "Negative highlight",
	description: "Requires a modifier on the label",
}

MultipleBoxRadioButton.args = {
	Buttons: [
		{
			name: "default",
			value: "Daily",
		},
		{
			name: "default",
			value: "Weekly",
			checked: true
		},
		{
			name: "default",
			value: "Monthly",
		}
	],
	title: "Multiple box-styled radio buttons",
}


DisabledBoxRadioButton.args = {
	Buttons: [
		{
			name: "default",
			value: "Daily",
			checked: true,
			disabled: true,
		},
		{
			name: "default",
			value: "Weekly",
			disabled: true,
		}
	],
	title: "Disabled box-styled radio buttons",
};
ErrorBoxRadioButton.args = {
	Buttons: [
		{
			name: "default",
			value: "Yes",
		},
		{
			name: "default",
			value: "No",
		}
	],
	title: "Error box-style radio buttons",
	error: "An example error. Try again."
}

StateBoxRadioButton.args = {
Buttons: [
		{
			name: "default",
			value: "Daily",
			checked: true
		},
		{
			name: "default",
			value: "Weekly"
		}
	],
	title: "Stateful Box Button",
	description: "Also availble with icon only",
	state: 'saving',
};
