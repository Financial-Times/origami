import type {Meta} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../../src/tsx/tooltip';
import {
	Tooltip as TooltipStory,
	HoverToolTip as HoverToolTipStory,
} from '../story-template';
import '../../src/css/brands/internal.css';

export default {
	title: 'Internal/o3-tooltip',
	component: TooltipTsx,
	decorators: [
		Story => (
			<div className="o3-brand-internal">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'white'},
	},
} as Meta;

export const Tooltip = TooltipStory;
export const HoverTooltip = HoverToolTipStory;
