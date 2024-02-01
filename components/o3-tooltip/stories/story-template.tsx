import type {StoryObj} from '@storybook/react';
import {Tooltip as TooltipTsx} from '../src/tsx/tooltip';
import type {TooltipProps} from '../src/tsx/tooltip';
import {TemplateSBConfig} from './sb-story-config';
import {useEffect} from 'react';
import javascript from '../main';
import '../src/ts/tooltip';

// disable HMR(hot module replacement) for web-component file
import.meta.webpackHot.decline('../src/ts/tooltip');

type TooltipStory = Omit<StoryObj, 'args'> & {
	args: TooltipProps & {disabled: Boolean};
};

export type TemplateType = StoryObj & {
	render: (args) => JSX.Element;
};

const ToolTipTemplate: TemplateType = {
	...TemplateSBConfig,
	render: args => {
		useEffect(() => {
			let tooltips = javascript.init();
			return function cleanup() {
				tooltips = Array.isArray(tooltips) ? tooltips : [tooltips];
				tooltips.forEach(tooltip => tooltip.destroy());
			};
		}, [args]);
		return (
			<>
				<button
					className="o3-button o3-button--secondary o3-button--big demo-tooltip-target"
					id="demo-tooltip-target">
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
		target: 'demo-tooltip-target',
	},
};
