import type {StoryObj} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../src/tsx/tooltip';
import type {TooltipProps} from '../src/tsx/tooltip';
import {TemplateSBConfig} from './sb-story-config';
import '../src/ts/tooltip';
import './demo.css';

// disable HMR(hot module replacement) for web-component file
import.meta.webpackHot.decline('../src/ts/tooltip');

type TooltipStory = Omit<StoryObj, 'args'> & {
	args: TooltipProps;
};

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const ToolTipTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		return (
			<>
				<button
					id="demo-o3-tooltip-id"
					className="o3-button o3-button--secondary o3-button--big demo-tooltip-target">
					Share
				</button>
				<TooltipTsx {...args}>
					<p>Tool tip content that is quite long</p>
					<p>Tool tip content that is quite long</p>
				</TooltipTsx>
			</>
		);
	},
};

export const Tooltip: TooltipStory = {
	...ToolTipTemplate,
	args: {
		targetId: 'demo-o3-tooltip-id',
		tipPosition: 'above',
		tipAlignment: 'top',
	},
};
