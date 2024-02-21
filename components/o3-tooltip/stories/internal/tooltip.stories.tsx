import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../story-template';
import '../../src/css/brands/internal.css';
import "@financial-times/o3-button/css/internal.css"

export default {
	title: 'Internal/o3-tooltip',
	component: OnboardingTooltipTsx,
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

export const OnboardingTooltip = OnboardingTooltipStory;
export const ToggleTooltip = ToggleToolTipStory;
