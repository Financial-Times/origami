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
		feedback: {
			message: 'Error message',
			type: 'error',
		},
		children: [
			<CheckBoxItem key="1" optional={true} checkboxLabel="Normal" />,
			<CheckBoxItem
				key="2"
				optional={true}
				checkboxLabel="Default checked"
				checked={true}
			/>,
			<CheckBoxItem
				key="3"
				optional={true}
				checkboxLabel="Disabled"
				disabled={true}
			/>,
			<CheckBoxItem
				key="4"
				optional={true}
				checkboxLabel="Disabled and checked"
				checked={true}
				disabled={true}
			/>,
			<CheckBoxItem
				key="5"
				optional={true}
				checkboxLabel="Error"
				error={'error'}
			/>,
		],
	},
};
