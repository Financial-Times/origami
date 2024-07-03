import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../../story-template';
import '../../../src/css/brands/professional.css';
import "../../../../o3-button/src/css/brands/professional.css"
import links from '../../../../../libraries/o3-figma-sb-links/src/links.json';
export default {
	title: 'Core/Professional/o3-tooltip',
	component: OnboardingTooltipTsx,
	decorators: [
		Story => (
			<div data-o3-brand="professional">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
	},
} as Meta;

export const OnboardingTooltip = OnboardingTooltipStory;
OnboardingTooltip.parameters = {
	design: {
		type: 'figma',
		url: links['core-professional-o3-tooltip--onboarding-tooltip'].figma,
	}
}
export const ToggleTooltip = ToggleToolTipStory;
ToggleTooltip.parameters = {
	design: {
		type: 'figma',
		url: links['core-professional-o3-tooltip--toggle-tooltip'].figma,
	}
}
