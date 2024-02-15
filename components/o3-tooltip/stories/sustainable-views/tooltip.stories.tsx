import type {Meta} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../../src/tsx/tooltip';
import {Tooltip as TooltipStory} from '../story-template';
import '../../src/css/brands/sustainable-views.css';

export default {
	title: 'Sustainable Views/o3-tooltip',
	component: TooltipTsx,
	decorators: [
		Story => (
			<div className="o3-brand-sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const Tooltip = TooltipStory;
