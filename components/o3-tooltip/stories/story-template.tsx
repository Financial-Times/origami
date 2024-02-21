import type {StoryObj} from '@storybook/react';
import type {TooltipProps} from '../src/types';

import {TooltipOnboarding as OnboardingTooltipTsx} from '../src/tsx';
import {TooltipToggle as ToggleTooltipTsx} from '../src/tsx';
import {TemplateSBConfig} from './sb-story-config';

import '../src/ts/index';

import './demo.css';

// disable HMR(hot module replacement) for web-component file
import.meta.webpackHot.decline('../src/ts/index');

type TooltipStory = Omit<StoryObj, 'args'> & {
	args: TooltipProps;
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
					<p>Click the button to toggle the tooltip</p>
				</div>
				<button
					id="demo-o3-tooltip-id"
					className="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
					aria-describedby="o3-tooltip-content">
					Share
				</button>
				<ToggleTooltipTsx {...args} />
			</div>
		);
	},
};

export const OnboardingTooltip: TooltipStory = {
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

export const ToggleToolTip: TooltipStory = {
	...ToggleTemplateStory,
	args: {
		targetId: 'demo-o3-tooltip-id',
		content: 'Hover over the button to see the tooltip',
		title: 'Title',
		contentId: 'o3-tooltip-content',
		placement: 'top',
	},
};
