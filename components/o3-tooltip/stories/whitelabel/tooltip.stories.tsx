import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../story-template';
import '../../src/css/brands/whitelabel.css';
import "@financial-times/o3-button/css/whitelabel.css"

export default {
	title: 'Whitelabel/o3-tooltip',
	component: OnboardingTooltipTsx,
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

export const OnboardingTooltip = OnboardingTooltipStory;
export const ToggleTooltip = ToggleToolTipStory;
