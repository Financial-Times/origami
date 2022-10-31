import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect, useState} from 'react';
import { TextBoxDemo } from './Demos';
import './forms.scss';
import javascript from '../main.js';

export default {
	title: 'Components/o-forms/text-box',
	component: TextBoxDemo,
	decorators: [withDesign, withHtml],
	parameters: {},
} as ComponentMeta<typeof TextBoxDemo>;

const FormStory = args => {
	const [value, setValue] = useState('this is a controlled input');
	const onChange = (e) => {setValue(e.target.value)}
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <TextBoxDemo {...args} value={value} onChange={onChange}/>;
};

export const TextBox: ComponentStory<typeof TextBoxDemo> = FormStory.bind({});


TextBox.args = {
	title: "demo thing",
	id: "test",
	description: "this is a description",
	type: 'text'
}
