import type {Meta} from '@storybook/react-webpack5';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../../src/tsx/onboardingTooltip';
import {
	OnboardingTooltip as OnboardingTooltipStory,
	ToggleToolTip as ToggleToolTipStory,
} from '../story-template';
import '../../src/css/brands/whitelabel.css';
import "../../../o3-button/src/css/brands/whitelabel.css";
import links from '@financial-times/o3-figma-sb-links';
export default {
	title: 'Whitelabel/o3-tooltip',
	component: OnboardingTooltipTsx,
	decorators: [
		Story => (
			<div data-o3-brand="whitelabel">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {disable: true},
	},
} as Meta;

export const OnboardingTooltip = OnboardingTooltipStory;
OnboardingTooltip.parameters = {
	design: {
		type: 'figma',
		url: links['whitelabel-o3-tooltip--onboarding-tooltip'].figma,
	}
}
export const ToggleTooltip = ToggleToolTipStory;
ToggleTooltip.parameters = {
	design: {
		type: 'figma',
		url: links['whitelabel-o3-tooltip--toggle-tooltip'].figma,
	}
}
