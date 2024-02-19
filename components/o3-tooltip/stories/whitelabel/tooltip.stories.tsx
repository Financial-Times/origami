import type {Meta} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../../src/tsx/tooltip';
import {
	Tooltip as TooltipStory,
	HoverToolTip as HoverToolTipStory,
} from '../story-template';
import '../../src/css/brands/whitelabel.css';

export default {
	title: 'Whitelabel/o3-tooltip',
	component: TooltipTsx,
	decorators: [
		Story => (
			<div className="o3-brand-whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const Tooltip = TooltipStory;
export const HoverTooltip = HoverToolTipStory;
