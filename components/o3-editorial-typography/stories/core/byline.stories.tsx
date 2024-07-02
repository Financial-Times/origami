import type {Meta} from '@storybook/react';
import {Byline as BylineTsx} from '../../src/tsx/index';
import * as StoryTemplates from '../story-templates';

import '../../src/css/brands/core.css';
import links from '../../../../libraries/o3-figma-sb-links/src/links.json';

export default {
	title: 'Core/o3-editorial-typography',
	component: BylineTsx,
	decorators: [
		Story => (
			<div data-o3-brand="core">
				<Story />
			</div>
		),
	],
	parameters: {
		backgrounds: {default: 'paper'},
		controls: {exclude: ['children']},
	},
} as Meta;


export const Byline = StoryTemplates.Byline;
Byline.parameters = {
	design: {
		type: 'figma',
		url: links['core-o3-editorial-typography--byline'].figma
	},
};
