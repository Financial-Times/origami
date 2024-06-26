import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';

import '../../src/css/brands/sustainable-views.css';

export default {
	title: 'Sustainable Views/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	argTypes: Object.assign(ButtonStories.Button.argTypes, {
		theme: {
			options: ['standard', 'inverse', 'mono'],
			mapping: {
				standard: '',
				inverse: 'inverse',
			},
		},
	}),
	parameters: {
		backgrounds: {default: 'white'},
	},
} as Meta;

const DesignParams = {
	type: 'figma',
	url: 'https://www.figma.com/file/VVM0PixrY3IRZq2ZUTdWfU/Core---Design-System?type=design&node-id=2819%3A133&mode=design&t=ISOqmF4aDY2CfuUR-1',
};

export const Button = ButtonStories.Button;

Button.parameters = {
	design: DesignParams,
};

export const LinkAsButton = ButtonStories.LinkAsButton;
LinkAsButton.parameters = {
	design: DesignParams,
};

export const GroupedButtons = ButtonStories.GroupedButtons;

export const Pagination = PaginationTemplate;

export const SmallButton = ButtonStories.SmallButton;
