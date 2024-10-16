import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../story-template';

import links from '@financial-times/o3-figma-sb-links';

import '../../src/css/brands/core.css';
import '../../../o3-button/src/css/brands/core.css';

export default {
	title: 'Core/o3-tooltip',
	component: OnboardingTooltipTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
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
		url: links['core-o3-tooltip--onboarding-tooltip'].figma,
	},
};
export const ToggleTooltip = ToggleToolTipStory;
ToggleTooltip.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-tooltip--toggle-tooltip'].figma,
	},
};
