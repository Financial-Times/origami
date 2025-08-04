import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from './story-template';

import links from '@financial-times/o3-figma-sb-links';

import '../src/css/brands/core.css';
import '../src/css/brands/internal.css';
import '../src/css/brands/professional.css';
import '../src/css/brands/sustainable-views.css';
import '../src/css/brands/whitelabel.css';
import '@financial-times/o3-button/src/css/brands/core.css';
import '@financial-times/o3-button/src/css/brands/internal.css';
import '@financial-times/o3-button/src/css/brands/professional.css';
import '@financial-times/o3-button/src/css/brands/sustainable-views.css';
import '@financial-times/o3-button/src/css/brands/whitelabel.css';

export default {
	title: 'o3-tooltip',
	tags: ['core', 'professional'],
	component: OnboardingTooltipTsx,
	decorators: [
		(Story, {globals}) => (
			<div data-o3-brand={globals.selectedBrand}>
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
