import {ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {MultiSelect} from '../src/tsx/multi-select';
import './multi-select.scss';
import javascript from '../main.js';
import {Form, GenericInput} from '@financial-times/o-forms/src/tsx/Form';

export default {
	title: 'Components/o-multi-select',
	component: MultiSelect,
	parameters: {},
	args: {},
} as ComponentMeta<typeof MultiSelect>;

export const MultiSelectDefault = args => {
	useEffect(() => {
		let multiSelect = javascript.init();
		return function cleanup() {
			multiSelect = Array.isArray(multiSelect) ? multiSelect : [multiSelect];
			multiSelect.forEach(multiSelect => multiSelect.destroy());
		};
	}, [args.id, args.title]);

	return (
		<Form>
			<GenericInput id={args.id} title={args.title}>
				<MultiSelect {...args} />
			</GenericInput>
		</Form>
	);
};
MultiSelectDefault.storyName = 'Multi Select';
MultiSelectDefault.args = {
	multiSelectOptions: [
		{label: 'Apple Pie', selected: false, value: 'apple-pie'},
		{label: 'Banana', selected: false},
		{label: 'Banana Split', selected: true, value: 'banana-split'},
		{label: 'Blueberry', selected: false},
		{label: 'Boysenberry', selected: true},
		{label: 'Cherry', selected: false},
		{label: 'Durian', selected: false},
		{label: 'Eggplant', selected: false},
		{label: 'Fig', selected: false},
		{label: 'Grape', selected: false},
		{label: 'Guava', selected: false},
		{label: 'Huckleberry', selected: false},
	],
	id: 'fruits',
	title: 'Select multiple options:',
	required: true,
};
