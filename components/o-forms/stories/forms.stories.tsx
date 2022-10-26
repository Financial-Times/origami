import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {Form, FormFieldset} from '../src/tsx/Form';
import { BoxRadioBtns, BoxRadioBtn } from '../src/tsx/BoxRadioBtns';
import './forms.scss';
import javascript from '../main.js';

export default {
	title: 'Components/o-forms/radio-box-buttons',
	component: Form,
	decorators: [withDesign, withHtml],
	parameters: {},
	/* args: {
		highlight: false,
		centered: false,
	}, */
} as ComponentMeta<typeof Form>;

const FormStory = args => {
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <Form {...args}>
		<FormFieldset title="Box style radio buttons" describedby='Optional prompt text'>
			<BoxRadioBtns state={"true"}>
				<BoxRadioBtn name="default" value='weekly' checked={true}/>
				<BoxRadioBtn name="default" value='daily'/>
			</BoxRadioBtns>
		</FormFieldset>
	</Form>;
};

export const BoxRadioButton: ComponentStory<typeof Form> = FormStory.bind({});

export const MultipleBoxRadioButton: ComponentStory<typeof Form> =
	FormStory.bind({});

export const DisabledBoxRadioButton: ComponentStory<typeof Form> = FormStory.bind({});

export const ErrorBoxRadioButton: ComponentStory<typeof Form> =
	FormStory.bind({});

export const StateBoxRadioButton: ComponentStory<typeof Form> =
	FormStory.bind({});
/*
BoxRadioButton.args = {
	inputs: [
		{
			type: 'radio',
			name: 'negative',
			value: 'Daily',
			checked: true,
			id: 'Daily',
		},
		{
			type: 'radio',
			name: 'negative',
			value: 'Weekly',
			id: 'Weekly',
		},
	],
	formField: {
		field: {
			type: 'radio-box',
			aria: {
				label: 'negative-radio-box-group-title',
				info: 'negative-radio-box-group-info',
			},
		},
		title: {
			mainTitle: 'Box Radio Button',
			promptTitle: 'This is a box radio button sample',
		},
	},
};

MultipleBoxRadioButton.args = {
	inputs: [
		{
			type: 'radio',
			name: 'multiple',
			value: 'Daily',
			id: 'Daily',
		},
		{
			type: 'radio',
			name: 'multiple',
			value: 'Weekly',
			checked: true,
			id: 'Weekly',
		},
		{
			type: 'radio',
			name: 'multiple',
			value: 'Monthly',
			id: 'Monthly',
		},
	],
	formField: {
		field: {
			type: 'radio-box',
			aria: {
				label: 'multiple-radio-box-group-title',
			},
		},
		title: {
			mainTitle: 'Multiple box-styled radio buttons',
		},
	},
};

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
