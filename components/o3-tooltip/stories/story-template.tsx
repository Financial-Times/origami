import type {StoryObj} from '@storybook/react';
import type {OnboardingToolTipProps, ToggleToolTipProps} from '../src/types';

import {TooltipOnboarding as OnboardingTooltipTsx} from '../src/tsx';
import {TooltipToggle as ToggleTooltipTsx} from '../src/tsx';
import {TemplateSBConfig} from './sb-story-config';

import '../src/ts/index';

import './demo.css';

// disable HMR(hot module replacement) for web-component file
import.meta.webpackHot.decline('../src/ts/index');

type OnBoardingTooltipStory = Omit<StoryObj, 'args'> & {
	args: OnboardingToolTipProps;
};

type ToggleTooltipStory = Omit<StoryObj, 'args'> & {
	args: ToggleToolTipProps;
};

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const OnboardingTemplateStory: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return (
			<div className="o3-tooltip-demo-wrapper">
				<div className="o3-tooltip-demo-message">
					<p>Refresh to view bounce animation</p>
				</div>
				<button
					id="demo-o3-tooltip-id"
					className="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
					aria-describedby="o3-tooltip-content">
					Share
				</button>
				<OnboardingTooltipTsx {...args} />
			</div>
		);
	},
};

const ToggleTemplateStory: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return (
			<div className="o3-tooltip-demo-wrapper">
				<div className="o3-tooltip-demo-message">
					<p>Click the info button to toggle the tooltip</p>
				</div>
				<ToggleTooltipTsx {...args} />
			</div>
		);
	},
};

export const OnboardingTooltip: OnBoardingTooltipStory = {
	...OnboardingTemplateStory,
	args: {
		targetId: 'demo-o3-tooltip-id',
		content:
			'Tool tip content that is quite long, Tool tip content that is quite long, Tool tip content that is quite long',
		title: 'Title',
		contentId: 'o3-tooltip-content',
		placement: 'top',
	},
};

export const ToggleToolTip: ToggleTooltipStory = {
	...ToggleTemplateStory,
	args: {
		content: 'click the button to see the tooltip',
		title: 'Title',
		placement: 'right',
	},
	argTypes: {
		placement: {
			options: ['top', 'right', 'bottom', 'left'],
		},
	},
	parameters: {
		controls: {exclude: ['targetId', 'contentId']},
	},
};
