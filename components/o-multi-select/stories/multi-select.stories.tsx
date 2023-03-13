import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
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
		javascript.init();
	},);
	return <MultiSelect {...args} />;
};
export const DefaultMultiSelect: ComponentStory<typeof MultiSelect> =
	MultiSelectStory.bind({});

DefaultMultiSelect.storyName = 'Multi Select';
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
	label: 'lsjkdjdsl',
	id: 'hello'
};

export const MultiSelectWithOForm = args => {
	const {label, id} = args;
	useEffect(() => {
		javascript.init()
	})

	return (
		<div className="o-forms-field">
			<span className="o-forms-title">
				<label className="o-forms-title__main" htmlFor={id}>
					{label}
				</label>
			</span>

			<div className="o-forms-input">
				<MultiSelect {...args} />
			</div>
		</div>
	)
}
MultiSelectWithOForm.storyName = 'Multi Select with o-form'
MultiSelectWithOForm.args = {
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
	label: 'Select multiple options:',
	id: 'hello'
};
