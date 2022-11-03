import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
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

export default {
	title: 'Components/o-forms/box-radio-buttons',
	component: RadioBtns,
	decorators: [withDesign, withHtml],
	/* add some args here? Array of objects */
} as ComponentMeta<typeof RadioBtns>;

const Template: ComponentStory<typeof RadioBtns> = args => {
	/* use these inpus to render buttons */
	useEffect(() => {
		let form = javascript.init();
		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <RadioBtns {...args} />;
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
	type: 'box',
};

NegativeHighlight.args = {
	children: [
		<RadioBtn name="default" value="Yes" />,
		<RadioBtn name="default" value="No" checked isNegative />,
	],
	title: 'Negative highlight',
	description: 'Requires a modifier on the label',
	type: 'box',
};

MultipleBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" />,
		<RadioBtn name="default" value="Weekly" checked />,
		<RadioBtn name="default" value="Monthly" />,
	],
	title: 'Multiple box-styled radio buttons',
	type: 'box',
};

DisabledBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked disabled />,
		<RadioBtn name="default" value="Weekly" checked disabled />,
	],
	title: 'Disabled box-styled radio buttons',
	type: 'box',
};
ErrorBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Yes" />,
		<RadioBtn name="default" value="No" />,
	],
	title: 'Error box-style radio buttons',
	errorMessage: 'An example error. Try again.',
	type: 'box',
};

StateBoxRadioButton.args = {
	children: [
		<RadioBtn name="default" value="Daily" checked />,
		<RadioBtn name="default" value="Weekly" />,
	],
	title: 'Stateful Box Button',
	description: 'Also availble with icon only',
	state: 'saving',
	type: 'box',
};
