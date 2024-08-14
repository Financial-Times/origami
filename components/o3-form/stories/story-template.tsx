import type {StoryObj} from '@storybook/react';
import {Form, CheckBoxGroup, CheckBoxItem, CheckBox} from '../src/tsx/index';

type CheckBoxStory = StoryObj<typeof CheckBox>;
const CheckBoxTemplate: CheckBoxStory = {
	render: args => {
		return (
			<Form>
				<CheckBox {...args} />
			</Form>
		);
	},
};

type CheckBoxGroupStory = StoryObj<typeof CheckBoxGroup>;
const CheckBoxGroupTemplate: CheckBoxGroupStory = {
	render: args => {
		return (
			<Form>
				<CheckBoxGroup {...args} />
			</Form>
		);
	},
};

export const CheckBoxStory: CheckBoxStory = {
	...CheckBoxTemplate,
	args: {
		label: 'Check this box',
		description: 'Please check the box to continue',
		checkboxLabel: 'I agree to the terms and conditions',
		optional: false,
		attributes: {
			disabled: false,
			onChange: () => {},
		},
		feedback: {
			message: 'Error message',
			type: 'error',
		},
	},
};

export const CheckBoxGroupStory: CheckBoxGroupStory = {
	...CheckBoxGroupTemplate,
	args: {
		label: 'Check all that apply',
		description: 'This is a description of the checkbox group',
		children: [
			<CheckBoxItem
				key="1"
				optional={true}
				checkboxLabel="Option 1"
			/>,
			<CheckBoxItem
				key="2"
				optional={true}
				checkboxLabel="Option 2"
			/>,
			<CheckBoxItem
				key="3"
				optional={true}
				checkboxLabel="Option 3"
			/>,
		],
	},
};
