import type {Meta, Story} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import './icons.scss';

const customIconLabelMapping = {
	'demo-icon-custom': 'lock',
	'demo-icon-custom-color': 'lock tinted',
	'demo-icon-custom-color-resized': 'lock resized and tinted',
};
interface CustomIconArgs {
	customIcon: keyof typeof customIconLabelMapping;
}

export default {
	title: 'Components/o-icons',
	decorators: [withDesign, withHtml],
	argTypes: {
		customIcon: {
			control: {
				type: 'radio',
				labels: customIconLabelMapping,
			},
			options: Object.keys(customIconLabelMapping),
		},
	},
} as Meta<CustomIconArgs>;

export const CustomIcons: Story<CustomIconArgs> = ({customIcon}) => (
	<span className={customIcon}></span>
);
CustomIcons.args = {customIcon: 'demo-icon-custom'};
