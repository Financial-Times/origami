import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {MultiSelect} from '../src/tsx/multi-select';
import './multi-select.scss';

export default {
	title: 'Components/o-multi-select',
	component: MultiSelect,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof MultiSelect>;

const MultiSelectStory = args => <MultiSelect {...args} />;
export const DefaultMultiSelect: ComponentStory<typeof MultiSelect> = MultiSelectStory.bind(
	{}
);
