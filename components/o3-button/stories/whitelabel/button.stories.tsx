import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';

import '../../src/css/brands/whitelabel.css';
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		controls: {include: ['label', 'type', 'size', 'icon', 'iconOnly']},
		backgrounds: {
			disable: true,
		},
		design: {
			type: 'figma',
			url: links['whitelabel-o3-button--button'].figma,
		}
	},
} as Meta;


export const Button = ButtonStories.Button;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;
Pagination.parameters = {
	design:  {
		type: 'figma',
		url: links['whitelabel-o3-button--pagination'].figma,
	},
};
export const SmallButton = ButtonStories.SmallButton;
