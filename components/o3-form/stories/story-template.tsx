import type {StoryObj} from '@storybook/react';
import {CheckBoxGroup, CheckBoxItem, CheckBox} from '../src/tsx/index';

type CheckBoxStory = StoryObj<typeof CheckBox>
const CheckBoxTemplate: CheckBoxStory = {
	render: args => {
		return <CheckBox {...args} />;
	},
};

type CheckBoxGroupStory = StoryObj<typeof CheckBoxGroup>
const CheckBoxGroupTemplate: CheckBoxGroupStory = {
	render: args => {
		return <CheckBoxGroup {...args} />;
	},
};

export const CheckBoxStory: CheckBoxStory = {
	...CheckBoxTemplate,
	args: {
		id: 'checkbox-demo',
		label: 'Check this box',
		labelId: 'checkbox-demo-label',
		description: 'Please check the box to continue',
		descriptionId: 'checkbox-demo-description',
		checkBoxLabel: 'I agree to the terms and conditions',
		optional: false,
		attributes: {
			disabled: false,
			onChange: () => {},
		},
		error: false,
		feedback: {
			message: 'Error message',
			type: 'error',
		},
	},
};

export const CheckBoxGroupStory: CheckBoxGroupStory = {
	...CheckBoxGroupTemplate,
	args: {
		id: 'checkbox-group-demo',
		label: 'Check all that apply',
		labelId: 'checkbox-group-demo-label',
		description: 'Please check all that apply',
		descriptionId: 'checkbox-group-demo-description',
		optional: false,
		children: [
			<CheckBoxItem key="1" id="checkbox1" checkBoxLabel="Option 1" />,
			<CheckBoxItem key="2" id="checkbox2" checkBoxLabel="Option 2" />,
			<CheckBoxItem key="3" id="checkbox3" checkBoxLabel="Option 3" />,
		],
	},
};
