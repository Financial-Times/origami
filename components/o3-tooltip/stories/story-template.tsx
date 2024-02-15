import type {StoryObj} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../src/tsx/tooltip';
import type {TooltipProps} from '../src/types';
import {TemplateSBConfig} from './sb-story-config';
import '../src/ts/tooltip';
import './demo.css';
import '@financial-times/o3-button/css/whitelabel.css';
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
				<div className="demo-message">
					<p>Refresh to view bounce animation</p>
				</div>
				<button
					id="demo-o3-tooltip-id"
					className="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
					aria-describedby="o3-tooltip-content">
					Share
				</button>
				<TooltipTsx {...args} />
			</>
		);
	},
};

export const Tooltip: TooltipStory = {
	...ToolTipTemplate,
	args: {
		targetId: 'demo-o3-tooltip-id',
		content:
			'Tool tip content that is quite long, Tool tip content that is quite long, Tool tip content that is quite long',
		title: 'Title',
		contentId: 'o3-tooltip-content',
		tipPlacement: 'top',
	},
};
