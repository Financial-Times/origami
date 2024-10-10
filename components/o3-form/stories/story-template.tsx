import {useEffect} from 'react';
import type {StoryObj} from '@storybook/react';
import {
	Form,
	CheckBoxGroup,
	CheckBoxItem,
	CheckBox,
	RadioButtonGroup,
	RadioButtonItem
} from '../src/tsx/index';
import type {CheckBoxProps} from '../src/types/index';

type CheckBoxStoryProps = CheckBoxProps & {
	enableIndeterminate?: boolean;
};

type CheckBoxStory = StoryObj<CheckBoxStoryProps>;

const CheckBoxTemplate: CheckBoxStory = {
	render: args => {
		useEffect(() => {
			const inputEl = document.getElementById(
				args.inputId
			) as HTMLInputElement | null;
			if (inputEl) {
				inputEl.indeterminate = args.enableIndeterminate || false;
			}
		}, [args.inputId, args.enableIndeterminate]);

		// Omit enableIndeterminate when passing props to CheckBox
		const {enableIndeterminate, ...checkBoxProps} = args;

		return (
			<Form>
				<CheckBox {...checkBoxProps} />
			</Form>
		);
	},
};

type CheckBoxGroupStory = StoryObj<typeof CheckBoxGroup>;
const CheckBoxGroupTemplate: CheckBoxGroupStory = {
	render: args => {
		return (
			<Form>
				<CheckBoxGroup {...args}>
					<CheckBoxItem
						key="1"
						optional={true}
						checkboxLabel="Normal"
						inputId="checkbox_1"
					/>
					<CheckBoxItem
						key="2"
						optional={true}
						checkboxLabel="Default checked"
						attributes={{defaultChecked: true}}
						inputId="checkbox_2"
					/>
					<CheckBoxItem
						key="3"
						optional={true}
						checkboxLabel="Disabled"
						attributes={{disabled: true}}
						inputId="checkbox_3"
					/>
					<CheckBoxItem
						key="4"
						optional={true}
						checkboxLabel="Disabled and checked"
						attributes={{disabled: true, defaultChecked: true}}
						inputId="checkbox_4"
					/>
					<CheckBoxItem
						key="5"
						optional={true}
						checkboxLabel="Error"
						inputId="checkbox_5"
					/>
					<CheckBoxItem
						key="6"
						optional={true}
						checkboxLabel="Error checked"
						attributes={{defaultChecked: true}}
						inputId="checkbox_6"
					/>
				</CheckBoxGroup>
			</Form>
		);
	},
};

type RadioButtonGroupStory = StoryObj<typeof RadioButtonGroup>;
const RadioButtonGroupTemplate: RadioButtonGroupStory = {
	render: args => {
		return (
			<Form>
				<RadioButtonGroup {...args}>
					<RadioButtonItem inputId='radio_1' radioButtonLabel='Option 1' />
					<RadioButtonItem inputId='radio_2' radioButtonLabel='Option 2' />
					<RadioButtonItem inputId='radio_3' radioButtonLabel='Option 3' attributes={{disabled: true}} />
				</RadioButtonGroup>
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
		enableIndeterminate: false,
	},
};

export const CheckBoxGroupStory: CheckBoxGroupStory = {
	...CheckBoxGroupTemplate,
	args: {
		label: 'Check all that apply',
		description: 'This is a description of the checkbox group',
		feedback: {
			errorElementIds: ['checkbox_5', 'checkbox_6'],
			message: 'Error message',
			type: 'error',
		},
	},
};


export const RadioButtonGroupStory: RadioButtonGroupStory = {
	...RadioButtonGroupTemplate,
	args: {
		label: 'Select an option',
		description: 'This is a description of the radio button group',
		feedback: {
			errorElementIds: ['radio_1'],
			message: 'Error message',
			type: 'error',
		},
	},
};
