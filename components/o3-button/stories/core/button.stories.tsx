import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';
import links from '@financial-times/o3-figma-sb-links';
import '../../src/css/brands/core.css';

export default {
	title: 'Core/o3-button',
	component: ButtonTsx,
	tags: ['autodocs'],
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		design: {
			type: 'figma',
			url: links['core-o3-button--button'].figma,
		},
	},
} as Meta;

export const Button = ButtonStories.Button;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;
Pagination.parameters = {
	design:  {
		type: 'figma',
		url: links['core-o3-button--pagination'].figma,
	},
};
export const SmallButton = ButtonStories.SmallButton;
