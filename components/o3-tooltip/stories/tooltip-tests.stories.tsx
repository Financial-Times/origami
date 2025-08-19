import type {Meta} from '@storybook/react';
import {TooltipOnboarding as OnboardingTooltipTsx} from '../src/tsx/onboardingTooltip';
import {
	OnboardingTooltipTest as OnboardingTooltipInteractionStory,
	ToggleToolTipTest as ToggleToolTipInteractionStory,
} from './story-template';

import {userEvent, within, expect} from '@storybook/test';

import '../src/css/brands/core.css';
import '@financial-times/o3-button/src/css/brands/core.css';

export default {
	title: 'Tests/o3-tooltip',
	tags: ['!autodocs'],
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
		chromatic: {disableSnapshot: true},
	},
} as Meta;

export const OnboardingTooltipTest = OnboardingTooltipInteractionStory;
OnboardingTooltipTest.play = async ({canvasElement}) => {
	const canvas = within(canvasElement);

	const tooltipText =
		'Tool tip content that is quite long, Tool tip content that is quite long, Tool tip content that is quite long';

	await expect(await canvas.findByText(tooltipText)).not.toBeNull();

	await userEvent.click(canvas.getByRole('button', {name: 'Close tooltip'}));

	await expect(canvas.queryByText(tooltipText)).toBeNull();
};

export const ToggleTooltipTest = ToggleToolTipInteractionStory;
ToggleTooltipTest.play = async ({canvasElement}) => {
	const canvas = within(canvasElement);

	const tooltipText =
		'tooltip content that is quite long and has some information about the target';

	await expect(await canvas.queryByText(tooltipText)).toBeNull();

	await userEvent.click(
		await canvas.getByRole('button', {name: 'more information'})
	);

	await expect(await canvas.findByText(tooltipText)).not.toBeNull();

	await userEvent.click(
		await canvas.getByRole('button', {name: 'more information'})
	);

	await expect(await canvas.queryByText(tooltipText)).toBeNull();
};
