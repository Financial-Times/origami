import type {Meta} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../../../src/tsx/tooltip';
import {Tooltip as TooltipStory, HoverToolTip as HoverToolTipStory} from '../../story-template';
import '../../../src/css/brands/professional.css';

export default {
	title: 'Core/Professional/o3-tooltip',
	component: TooltipTsx,
	decorators: [
		Story => (
			<div className="o3-brand-professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;

export const Tooltip = TooltipStory;
export const HoverTooltip = HoverToolTipStory
