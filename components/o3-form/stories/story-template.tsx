import type {StoryObj} from '@storybook/react';
import {CheckBox as CheckBoxTsx} from '../src/tsx/index';

type CheckBoxStory = StoryObj<typeof CheckBoxTsx>
const CheckBoxTemplate: CheckBoxStory = {
	render: args => {
		return <CheckBoxTsx {...args} />;
	},
};

export const CheckBoxStory: CheckBoxStory = {
	...CheckBoxTemplate,
	args: {
		id: 'checkbox-demo',
		label: 'Check this box',
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
