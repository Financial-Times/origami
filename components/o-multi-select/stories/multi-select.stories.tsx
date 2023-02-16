import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import { useEffect } from 'react';
import {MultiSelect} from '../src/tsx/multi-select';
import './multi-select.scss';
import javascript from '../main.js';
export default {
	title: 'Components/o-multi-select',
	component: MultiSelect,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof MultiSelect>;

const MultiSelectStory = args => {
	useEffect(() => {
		let multiselect = javascript.init();

		return function cleanup() {
			multiselect = Array.isArray(multiselect) ? multiselect : [multiselect];
			multiselect.forEach(element => element.destroy());
		};
	}, []);
	return <MultiSelect {...args} />;
};
export const DefaultMultiSelect: ComponentStory<typeof MultiSelect> =
	MultiSelectStory.bind({});
	DefaultMultiSelect.storyName = "Multi Select";
DefaultMultiSelect.args = {
	multiSelectOptions: [
		'Apple',
		'Banana',
		'Blueberry',
		'Boysenberry',
		'Cherry',
		'Durian',
		'Eggplant',
		'Fig',
		'Grape',
		'Guava',
		'Huckleberry',
	],
};
