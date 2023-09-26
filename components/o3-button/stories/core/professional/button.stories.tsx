import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../../src/tsx/button';
import * as ButtonStories from '../../story-templates';
import {Pagination as PaginationTemplate} from '../../pagination-template';

import '../../../professional.css';

export default {
	title: 'Core/Professional/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div className="o-brand-professional">
				<Story />
			</div>
		),
	],
	args: {}
} as Meta;

export const Button = ButtonStories.Button;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;
