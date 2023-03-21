import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {MultiSelect} from '../src/tsx/multi-select';
import './multi-select.scss';
import javascript from '../main.js';
import {FormTemplate} from '@financial-times/o-forms/src/tsx/Form';

export default {
	title: 'Components/o-multi-select',
	component: MultiSelect,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof MultiSelect>;

export const MultiSelectDefault = args => {
	useEffect(() => {
		javascript.init();
	});

	return (
		<FormTemplate id={args.id} title={args.title}>
			<MultiSelect {...args} />
		</FormTemplate>
	);
};
MultiSelectDefault.storyName = 'Multi Select';
MultiSelectDefault.args = {
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
	id: 'fruits',
	title: 'Select multiple options:',
};
