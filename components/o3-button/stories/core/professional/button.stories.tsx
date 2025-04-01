import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../../src/tsx/button';
import * as ButtonStories from '../../story-templates';
import {Pagination as PaginationTemplate} from '../../pagination-template';

import '../../../src/css/brands/professional.css';
import links from '@financial-times/o3-figma-sb-links';

export default {
	title: 'Core/Professional/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	argTypes: Object.assign(ButtonStories.Button.argTypes, {
		theme: {
			options: ['standard', 'inverse', 'neutral'],
			mapping: {
				standard: '',
				inverse: 'inverse',
			},
		},
	}),
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['core-professional-o3-button--button'].figma,
		},
	},
} as Meta;

export const Button = ButtonStories.Button;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;
Pagination.parameters = {
	design: {
		type: 'figma',
		url: links['core-professional-o3-button--pagination'].figma,
	},
};
export const SmallButton = ButtonStories.SmallButton;
