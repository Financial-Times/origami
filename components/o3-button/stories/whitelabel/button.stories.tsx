import type {Meta} from '@storybook/react';
import {Button as ButtonTsx} from '../../src/tsx/button';
import * as ButtonStories from '../story-templates';
import {Pagination as PaginationTemplate} from '../pagination-template';

import '../../whitelabel.css';

export default {
	title: 'Whitelabel/o3-button',
	component: ButtonTsx,
	decorators: [
		Story => (
			<div className="o-brand-whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		controls: {include: ['label', 'type', 'size', 'icon', 'iconOnly']},
		backgrounds: {
			disable: true,
		},
	},
} as Meta;

export const Button = ButtonStories.Button;
export const LinkAsButton = ButtonStories.LinkAsButton;
export const GroupedButtons = ButtonStories.GroupedButtons;
export const Pagination = PaginationTemplate;
