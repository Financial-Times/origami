import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import './forms.scss';
import javascript from '../main.js';
import {Select} from '../src/tsx/Select';
import {Button} from '../../o-buttons/src/tsx/button';

const hideArg = {
	table: {
		disable: true,
	},
};

export default {
	title: 'Components/o-forms/select-box',
	component: Select,
	argTypes: {
		onChange: hideArg,
		suffix: hideArg,
		children: hideArg,
		inlineInput: hideArg,
		value: hideArg,
		theme: hideArg
	},
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = args => {
	useEffect(() => {
		let form = javascript.init();

		return function cleanup() {
			form = Array.isArray(form) ? form : [form];
			form.forEach(element => element.destroy());
		};
	}, []);
	return <Select {...args} />;
};

export const OptionalText = Template.bind({});
export const ValidSelection = Template.bind({});
export const InvalidSelection = Template.bind({});
export const DisabledSelectBox = Template.bind({});
export const SmallSelectBox = Template.bind({});
export const MultipleSelectBox = Template.bind({});
export const SelectBoxWithSuffix = Template.bind({});
export const InlineTitle = Template.bind({});

const children = [
	<option value="Option 1" selected>
		Option 1
	</option>,
	<option value="Option 2">Option 2</option>,
	<option value="Option 3">Option 3</option>,
	<option value="Option 4">Option 4</option>,
];

OptionalText.args = {
	title: 'Default',
	description: 'Optional prompt/description text',
	isOptional: true,
	children,
};

ValidSelection.args = {
	title: 'Valid selection',
	highlight: 'valid',
	children,
};

InvalidSelection.args = {
	title: 'Valid selection',
	errorMessage: 'An example error. Try again.',
	children,
};

DisabledSelectBox.args = {
	title: 'Disabled select box',
	disabled: true,
	children,
};

SmallSelectBox.args = {
	title: 'Small select box',
	isSmall: true,
	children,
};

MultipleSelectBox.args = {
	title: 'Multiple select box',
	multiple: true,
	children,
};

SelectBoxWithSuffix.args = {
	title: 'Select box with suffix',
	description: 'And prompt text for good measure',
	suffix: <Button label="Submit" type="secondary" size="big" />,
	children,
};

InlineTitle.args = {
	title: 'Inline title',
	description: 'Multiple select boxes can also be inlined.',
	inlineField: true,
	multiple: true,
	children,
};
