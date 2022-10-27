import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {Form, FormFieldset} from '../src/tsx/Form';
import { BoxRadioBtns, BoxRadioBtn } from '../src/tsx/BoxRadioBtns';
import { BoxBtnDemo } from './RadioBobDemos';
import './forms.scss';
import javascript from '../main.js';



export default {
	title: 'Components/o-forms/radio-box-buttons',
	component: BoxBtnDemo,
	decorators: [withDesign, withHtml],
	argTypes: {
		saved: {control: "boolean"}
	},
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

BoxRadioButton.args ={saved: true, ...data.variants[6]};
BoxRadioButton.args ={
	title: "Box style radio buttons",
	describedby: "Optional prompt text",
	isOptional:true,
	boxBtns: [
		{name: "default",
		value: "Daily",
	checked: true},
		{name: "default",
		value: "Weekly"}

	]
};
NegativeHighlight.args = {
	title: "Negative highlight",
	describedby: "Requires a modifier on the label",
	boxBtns: [
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
	]
};

MultipleBoxRadioButton.args = {
	title: "Multiple box-styled radio buttons",
	boxBtns: [
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
	]
}
/*

DisabledBoxRadioButton.args = {
	inputs: [
		{
			type: 'radio',
			name: 'disabled',
			value: 'Daily',
			checked: true,
			disabled: true,
			id: 'Daily',
		},
		{
			type: 'radio',
			name: 'disabled',
			value: 'Monthly',
			disabled: true,
			id: 'Monthly',
		},
	],
	formField: {
		field: {
			type: 'radio-box',
			aria: {
				label: 'disabled-radio-box-group-title',
			},
		},
		title: {
			mainTitle: 'Disabled box-styled radio buttons',
		},
	},
};

ErrorBoxRadioButton.args = {
	inputs: [
		{
			type: 'radio',
			name: 'error',
			value: 'Yes',
			id: 'Yes',
		},
		{
			type: 'radio',
			name: 'error',
			value: 'No',
			id: 'No',
		},
	],
	formField: {
		field: {
			type: 'radio-box',
			aria: {
				label: 'error-radio-box-group-title',
			},
			error: 'Please select an option',
			modifiers: ['invalid'],
		},
		title: {
			mainTitle: 'Error box-style radio buttons',
		},
	},
};

StateBoxRadioButton.args = {
	saved: false,
	inputs: [
		{
			type: 'radio',
			name: 'icon',
			value: 'Daily',
			id: 'Daily',
		},
		{
			type: 'radio',
			name: 'icon',
			value: 'Weekly',
			checked: true,
			id: 'Weekly',
		},
	],
	formField: {
		field: {
			type: 'radio-box',
			aria: {
				label: 'saving-state-group-title',
				info: 'saving-state-group-info',
			},
			modifiers: ['saving', 'inline'],
			state: 'Saving',
			icon: true,
		},
		title: {
			mainTitle: 'Radio box with state',
			promptTitle: 'Icon available for saved/saving states',
		},
	},
};
 */
