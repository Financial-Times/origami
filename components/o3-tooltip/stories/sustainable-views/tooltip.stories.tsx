import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../story-template';
import '../../src/css/brands/sustainable-views.css';
import "../../../o3-button/src/css/brands/sustainable-views.css"

export default {
	title: 'Sustainable Views/o3-tooltip',
	component: OnboardingTooltipTsx,
	decorators: [
		Story => (
			<div data-o3-brand="sustainable-views">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const OnboardingTooltip = OnboardingTooltipStory;
export const ToggleTooltip = ToggleToolTipStory;
