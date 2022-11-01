import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import { BoxRadioBtn, BoxRadioBtns } from "../src/tsx/BoxRadioBtns";
import './forms.scss';
import javascript from '../main.js';


export default {
	title: 'Components/o-forms/box-radio-buttons',
	component: BoxRadioBtns,
	decorators: [withDesign, withHtml],
} as ComponentMeta<typeof BoxRadioBtns>;

const FormStory = (args) => {
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <BoxRadioBtns {...args}/>;
};

export const BoxRadioButton: ComponentStory<typeof BoxRadioBtns> = FormStory.bind({});

export const NegativeHighlight: ComponentStory<typeof BoxRadioBtns> =
	FormStory.bind({});

export const MultipleBoxRadioButton: ComponentStory<typeof BoxRadioBtns> =
	FormStory.bind({});

export const DisabledBoxRadioButton: ComponentStory<typeof BoxRadioBtns> = FormStory.bind({});

export const ErrorBoxRadioButton: ComponentStory<typeof BoxRadioBtns> =
	FormStory.bind({});

export const StateBoxRadioButton: ComponentStory<typeof BoxRadioBtns> =
	FormStory.bind({});

BoxRadioButton.args = {
	children: [
		<BoxRadioBtn
		name="default"
		value="Daily"
		checked/>,
		<BoxRadioBtn
		name="default"
		value="Weekly"/>,
	],
	title: "Box style radio buttons",
	description: "Optional prompt text",
	isOptional:true,
};

NegativeHighlight.args = {
	children: [
		<BoxRadioBtn
		name="default"
		value="Yes"/>,
		<BoxRadioBtn
		name="default"
		value="No"
		checked
		isNegative/>
	],
	title: "Negative highlight",
	description: "Requires a modifier on the label",
};

MultipleBoxRadioButton.args = {
	children: [
		<BoxRadioBtn
		name="default"
		value="Daily"/>,
		<BoxRadioBtn
		name="default"
		value="Weekly"
		checked/>,
		<BoxRadioBtn
		name="default"
		value="Monthly"/>,
	],
	title: "Multiple box-styled radio buttons",
}


DisabledBoxRadioButton.args = {
	children: [
		<BoxRadioBtn
		name="default"
		value="Daily"
		checked
		disabled/>,
		<BoxRadioBtn
		name="default"
		value="Weekly"
		checked
		disabled/>,
	],
	title: "Disabled box-styled radio buttons",
};
ErrorBoxRadioButton.args = {
	children: [
		<BoxRadioBtn
		name="default"
		value="Yes"/>,
		<BoxRadioBtn
		name="default"
		value="No"/>
	],
	title: "Error box-style radio buttons",
	errorMessage: "An example error. Try again."
}

StateBoxRadioButton.args = {
children: [
		<BoxRadioBtn
		name="default"
		value="Daily"
		checked/>,
		<BoxRadioBtn
		name="default"
		value="Weekly"/>,
	],
	title: "Stateful Box Button",
	description: "Also availble with icon only",
	state: 'saving',
};
