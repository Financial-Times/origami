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
		inputId: 'checkbox_1',
		label: 'Check this box',
		description: 'Please check the box to continue',
		checkboxLabel: 'I agree to the terms and conditions',
		optional: false,
		attributes: {
			disabled: false,
			onChange: () => {},
		},
	},
};

export const CheckBoxGroupStory: CheckBoxGroupStory = {
	...CheckBoxGroupTemplate,
	args: {
		label: 'Check all that apply',
		description: 'This is a description of the checkbox group',
		feedback: {
			checkboxIds: ['checkbox_5', 'checkbox_6'],
			message: 'Error message',
			type: 'error',
		},
		children: [
			<CheckBoxItem
				key="1"
				optional={true}
				checkboxLabel="Normal"
				inputId="checkbox_1"
			/>,
			<CheckBoxItem
				key="2"
				optional={true}
				checkboxLabel="Default checked"
				attributes={{defaultChecked: true}}
				inputId="checkbox_2"
			/>,
			<CheckBoxItem
				key="3"
				optional={true}
				checkboxLabel="Disabled"
				attributes={{disabled: true}}
				inputId="checkbox_3"
			/>,
			<CheckBoxItem
				key="4"
				optional={true}
				checkboxLabel="Disabled and checked"
				attributes={{disabled: true, defaultChecked: true}}
				inputId="checkbox_4"
			/>,
			<CheckBoxItem
				key="5"
				optional={true}
				checkboxLabel="Error"
				inputId="checkbox_5"
			/>,
			<CheckBoxItem
				key="6"
				optional={true}
				checkboxLabel="Error checked"
				attributes={{defaultChecked: true}}
				inputId="checkbox_6"
			/>,
		],
	},
};
