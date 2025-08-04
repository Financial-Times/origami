import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../src/tsx/button';
import * as ButtonStories from './story-templates';
import {Pagination as PaginationTemplate} from './pagination-template';
import links from '@financial-times/o3-figma-sb-links';
import '../src/css/brands/core.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/sustainable-views.css';
import '../src/css/brands/whitelabel.css';

export default {
	title: 'o3-button',
	component: ButtonTsx,
	tags: [
		'autodocs',
		'core',
		'professional',
		'internal',
		'whitelabel',
		'sustainable-views',
	],
	decorators: [
		(Story, {args, globals}) => {
			return (
				<div data-o3-brand={globals.selectedBrand || 'whitelabel'}>
					<Story />
				</div>
			);
		},
	],
	parameters: {
		backgrounds: {
			default: 'paper',
		},
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
	design: {
		type: 'figma',
		url: links['core-o3-button--pagination'].figma,
	},
};
export const SmallButton = ButtonStories.SmallButton;
